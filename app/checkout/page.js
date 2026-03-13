"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import { saveSalesOrder, getCouponList, applyCoupon } from "../../lib/api";
import {
    MapPin,
    CreditCard,
    ShoppingBag,
    Shield,
    Truck,
    User,
    Phone,
    CheckCircle2,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import AddressSelect from "../../components/Checkout/AddressSelect";

export default function CheckoutPage() {
    const { cartItems, getSubtotal, deliveryFee, updateDeliveryFee, clearCart } =
        useCart();

    const router = useRouter();
    const subTotal = getSubtotal();

    // Format price helper function
    const formatPrice = (amount) => {
        return `৳${Number(amount).toLocaleString('en-US')}`;
    };

    // District & City state
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        phone: "",
        email: "",
        address: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [isAccepted, setIsAccepted] = useState(false);

    const formRef = useRef(null);

    // Load saved details on mount
    useEffect(() => {
        const savedDetails = localStorage.getItem("applexCheckoutDetails");
        if (savedDetails) {
            try {
                const parsed = JSON.parse(savedDetails);
                setFormData(prev => ({
                    ...prev,
                    firstName: parsed.firstName || prev.firstName,
                    phone: parsed.phone || prev.phone,
                    email: parsed.email || prev.email,
                    address: parsed.address || prev.address,
                }));
                if (parsed.district) setSelectedDistrict(parsed.district);
                if (parsed.city) setSelectedCity(parsed.city);
            } catch (e) {
                console.error("Failed to parse saved checkout details", e);
            }
        }
    }, []);

    // Update delivery fee based on selection
    const updateDeliveryFeeCallback = useCallback(() => {
        if (!selectedDistrict && !selectedCity) {
            updateDeliveryFee(0);
            return;
        }

        let fee = 130; // Default: Outside Dhaka

        if (
            selectedCity === "Demra" ||
            selectedCity?.includes("Savar") ||
            selectedDistrict === "Gazipur" ||
            selectedCity?.includes("Keraniganj")
        ) {
            fee = 90;
        } else if (selectedDistrict === "Dhaka") {
            fee = 70;
        } else {
            fee = 130;
        }
        updateDeliveryFee(fee);
    }, [selectedDistrict, selectedCity, updateDeliveryFee]);

    useEffect(() => {
        updateDeliveryFeeCallback();
    }, [updateDeliveryFeeCallback]);

    const grandTotal = subTotal + deliveryFee - couponDiscount;

    // Coupon handling
    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponError("Please enter a coupon code");
            return;
        }

        setCouponLoading(true);
        setCouponError("");

        try {
            const response = await getCouponList();

            if (response.success && response.data) {
                const matchingCoupon = response.data.find(
                    coupon => coupon.coupon_code.toUpperCase() === couponCode.trim().toUpperCase()
                );

                if (matchingCoupon) {
                    const now = new Date();
                    const expireDate = new Date(matchingCoupon.expire_date);

                    if (expireDate < now) {
                        setCouponError("This coupon has expired");
                        setCouponDiscount(0);
                        setAppliedCoupon(null);
                        return;
                    }

                    const minOrderAmount = parseFloat(matchingCoupon.minimum_order_amount) || 0;
                    if (minOrderAmount > 0 && subTotal < minOrderAmount) {
                        setCouponError(`Minimum order amount is ${formatPrice(minOrderAmount)}`);
                        setCouponDiscount(0);
                        setAppliedCoupon(null);
                        return;
                    }

                    const couponAmount = parseFloat(matchingCoupon.amount) || 0;
                    const amountLimit = parseFloat(matchingCoupon.amount_limit) || 0;
                    let discount = 0;

                    if (matchingCoupon.coupon_amount_type === "percentage") {
                        discount = Math.round(subTotal * (couponAmount / 100));
                    } else {
                        discount = couponAmount;
                    }

                    if (amountLimit > 0 && discount > amountLimit) {
                        discount = amountLimit;
                    }

                    discount = Math.min(discount, subTotal);

                    setCouponDiscount(discount);
                    setAppliedCoupon(matchingCoupon);
                    toast.success(`Coupon applied! You saved ${formatPrice(discount)}`);
                } else {
                    setCouponError("Invalid coupon code");
                    setCouponDiscount(0);
                    setAppliedCoupon(null);
                }
            } else {
                setCouponError("Unable to validate coupon");
                setCouponDiscount(0);
                setAppliedCoupon(null);
            }
        } catch (error) {
            console.error("Coupon error:", error);
            setCouponError("Failed to apply coupon");
            setCouponDiscount(0);
            setAppliedCoupon(null);
        } finally {
            setCouponLoading(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode("");
        setCouponDiscount(0);
        setAppliedCoupon(null);
        setCouponError("");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDistrict || !selectedCity) {
            toast.error("Please select both District and Area");
            return;
        }

        if (!isAccepted) {
            toast.error("Please accept the Terms, Warranty, and Refund Policy to proceed.");
            return;
        }

        const phoneRegex = /^01[3-9]\d{8}$/;
        if (!phoneRegex.test(formData.phone)) {
            toast.error("Please enter a valid 11-digit Bangladeshi phone number");
            return;
        }

        setIsSubmitting(true);

        // Save details to localStorage
        try {
            const detailsToSave = {
                firstName: formData.firstName,
                phone: formData.phone,
                email: formData.email,
                address: formData.address,
                district: selectedDistrict,
                city: selectedCity
            };
            localStorage.setItem("applexCheckoutDetails", JSON.stringify(detailsToSave));
        } catch (error) {
            console.error("Failed to save checkout details to local storage", error);
        }

        const orderPayload = {
            pay_mode: paymentMethod,
            paid_amount: 0,
            user_id: process.env.NEXT_PUBLIC_USER_ID,
            sub_total: subTotal,
            vat: 0,
            tax: 0,
            discount: couponDiscount,
            product: cartItems.map((item) => ({
                product_id: item.id,
                qty: item.quantity,
                price: item.numericPrice,
                mode: 1,
                size: item.variants?.storage || "Free Size",
                sales_id: process.env.NEXT_PUBLIC_USER_ID,
            })),
            delivery_method_id: 1,
            delivery_info_id: 1,
            delivery_customer_name: formData.firstName,
            delivery_customer_address: `${formData.address}, ${selectedCity}, ${selectedDistrict}`,
            delivery_customer_phone: formData.phone,
            delivery_fee: deliveryFee,
            variants: [],
            imeis: [null],
            created_at: new Date().toISOString(),
            customer_name: formData.firstName,
            customer_phone: formData.phone,
            sales_id: process.env.NEXT_PUBLIC_USER_ID,
            wholeseller_id: 1,
            status: 1,
            delivery_city: selectedCity,
            delivery_district: selectedDistrict,
            detailed_address: formData.address,
        };

        try {
            if (appliedCoupon && couponCode) {
                try {
                    await applyCoupon(couponCode);
                } catch (couponError) {
                    console.warn("Error tracking coupon usage:", couponError);
                }
            }

            const response = await saveSalesOrder(orderPayload);

            if (response.success) {
                clearCart();
                toast.success("Order placed successfully!");
                const invoiceId = response.data?.invoice_id || response.invoice_id || "INV-" + Date.now();
                router.push(`/order-success?invoice=${invoiceId}`);
            } else {
                toast.error("Failed to place order. Please try again.");
                console.error("Order failed:", response);
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Empty cart state
    if (cartItems.length === 0) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50">
                <div className="text-center px-4">
                    <div className="w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-12 w-12 text-brand-purple/40" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-gray-900">
                        Your cart is empty
                    </h2>
                    <p className="mt-2 text-gray-500 max-w-xs mx-auto">
                        Add some products to your cart before checking out.
                    </p>
                    <Link
                        href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-8 py-3.5 text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            {/* Simple Premium Header */}
            <div className="bg-white border-b border-gray-100 py-6 md:py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">Checkout</h1>
                            <p className="text-gray-500 font-medium mt-1">Review your details and complete your purchase</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-black text-purple-600 uppercase tracking-widest bg-purple-50 px-4 py-2 rounded-full w-fit">
                            <Shield className="w-4 h-4" /> Secure Checkout
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 md:mt-12">
                {/* ═══ Progress Tracker ═══ */}
                <div className="mb-10 bg-white rounded-3xl p-5 md:p-8 shadow-sm border border-gray-100">
                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 relative">
                        {/* Step 1 */}
                        <li className="flex items-center gap-4 relative z-10">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-green-500/20">
                                <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Step 01</h3>
                                <p className="font-black text-gray-900 uppercase tracking-tight text-sm">Shopping Cart</p>
                            </div>
                        </li>

                        {/* Step 2 (Active) */}
                        <li className="flex items-center gap-4 relative z-10">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-purple-600/30 ring-4 ring-purple-100">
                                02
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-brand-purple uppercase tracking-widest leading-none mb-1">Step 02</h3>
                                <p className="font-black text-gray-900 uppercase tracking-tight text-sm">Checkout Details</p>
                            </div>
                        </li>

                        {/* Step 3 */}
                        <li className="flex items-center gap-4 relative z-10 opacity-60">
                            <div className="flex-shrink-0 w-12 h-12 bg-gray-200 text-gray-600 rounded-2xl flex items-center justify-center font-black text-xl">
                                03
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Step 03</h3>
                                <p className="font-black text-gray-900 uppercase tracking-tight text-sm">Order Complete</p>
                            </div>
                        </li>

                        {/* Desktop Connector Lines */}
                        <div className="hidden md:block absolute top-5 left-[15%] right-[15%] h-0.5 bg-gray-100 -z-0">
                            <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-green-500 to-purple-600"></div>
                        </div>
                    </ol>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-8 xl:gap-12">
                    
                    {/* ═══ Main Checkout Flow ═══ */}
                    <div className="space-y-8">
                        
                        {/* Step 1: Shipping Details */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-gray-900/20">
                                        1
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Shipping Information</h2>
                                        <div className="h-1 w-12 bg-purple-600 rounded-full mt-1"></div>
                                    </div>
                                </div>

                                <form id="checkout-form" ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-purple transition-colors" />
                                            <input
                                                required
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="e.g. Abdullah Al Mamun"
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-[1.25rem] py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:border-brand-purple focus:outline-none transition-all"
                                                style={{ fontSize: '16px' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-wider ml-1">Phone Number</label>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-brand-purple transition-colors" />
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="01XXXXXXXXX"
                                                className={`w-full bg-gray-50 border-2 rounded-[1.25rem] py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:outline-none transition-all ${formData.phone && !/^01[3-9]\d{8}$/.test(formData.phone) ? "border-red-200 focus:border-red-400" : "border-transparent focus:border-brand-purple"}`}
                                                style={{ fontSize: '16px' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-wider ml-1">Email (Optional)</label>
                                        <div className="relative group">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-purple transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="your@email.com"
                                                className="w-full bg-gray-50 border-2 border-transparent rounded-[1.25rem] py-4 pl-12 pr-4 text-gray-900 font-medium focus:bg-white focus:border-brand-purple focus:outline-none transition-all"
                                                style={{ fontSize: '16px' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <AddressSelect
                                            selectedDistrict={selectedDistrict}
                                            setSelectedDistrict={setSelectedDistrict}
                                            selectedCity={selectedCity}
                                            setSelectedCity={setSelectedCity}
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-sm font-black text-gray-900 uppercase tracking-wider ml-1">Detailed Address</label>
                                        <textarea
                                            required
                                            name="address"
                                            rows={3}
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="House no, Flat, Road, Landmark..."
                                            className="w-full bg-gray-50 border-2 border-transparent rounded-[1.5rem] p-5 text-gray-900 font-medium focus:bg-white focus:border-brand-purple focus:outline-none transition-all resize-none"
                                            style={{ fontSize: '16px' }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Step 2: Payment Method */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                            <div className="p-6 md:p-10">
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="flex-shrink-0 w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shadow-gray-900/20">
                                        2
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Payment Method</h2>
                                        <div className="h-1 w-12 bg-purple-600 rounded-full mt-1"></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className={`group relative flex items-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${paymentMethod === "Cash" ? "border-brand-purple bg-purple-50/30" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"}`}>
                                        <input type="radio" name="paymentMethod" value="Cash" checked={paymentMethod === "Cash"} onChange={(e) => setPaymentMethod(e.target.value)} className="sr-only" />
                                        <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all ${paymentMethod === "Cash" ? "border-purple-600 bg-purple-600" : "border-gray-300"}`}>
                                            {paymentMethod === "Cash" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-gray-900 uppercase tracking-tight">Cash on Delivery</span>
                                            <span className="text-xs text-gray-500 font-medium mt-0.5">Pay when your order arrives</span>
                                        </div>
                                        <Truck className={`ml-auto w-6 h-6 transition-colors ${paymentMethod === "Cash" ? "text-purple-600" : "text-gray-300"}`} />
                                    </label>

                                    <div className="group relative flex items-center p-6 rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50/30 opacity-60">
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-200 mr-4"></div>
                                        <div className="flex flex-col">
                                            <span className="font-black text-gray-400 uppercase tracking-tight">Online Payment</span>
                                            <span className="text-[10px] font-black bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full w-fit mt-1">COMING SOON</span>
                                        </div>
                                        <CreditCard className="ml-auto w-6 h-6 text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Confirmation (Mobile Only or Bottom of Flow) */}
                        <div className="lg:hidden space-y-6">
                            <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-gray-900/30">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-6 flex items-center justify-between">
                                    Final Summary
                                    <span className="text-purple-600 text-2xl">{formatPrice(grandTotal)}</span>
                                </h3>
                                <div className="space-y-4 mb-8 text-gray-400 font-medium text-sm">
                                    <div className="flex justify-between"><span>Subtotal</span><span className="text-white">{formatPrice(subTotal)}</span></div>
                                    <div className="flex justify-between"><span>Delivery</span><span className="text-white">{formatPrice(deliveryFee)}</span></div>
                                    {couponDiscount > 0 && <div className="flex justify-between text-green-400"><span>Discount</span><span>-{formatPrice(couponDiscount)}</span></div>}
                                </div>
                                <button type="submit" form="checkout-form" disabled={isSubmitting} className="w-full py-5 bg-white text-gray-900 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                                    {isSubmitting ? "Processing..." : "Confirm My Order"}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ═══ Sidebar Summary (Large Screen Only) ═══ */}
                    <div className="hidden lg:block">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8">Order Summary</h3>
                            
                            <div className="space-y-5 mb-10 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 group">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden flex-shrink-0 relative">
                                            <Image src={item.imageUrl || item.image || "/no-image.svg"} alt={item.name} fill className="object-contain p-2 group-hover:scale-110 transition duration-500" unoptimized />
                                        </div>
                                        <div className="flex flex-col justify-center min-w-0">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">{item.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-black bg-gray-100 px-2 py-0.5 rounded-md text-gray-500 uppercase">x{item.quantity}</span>
                                                <span className="text-xs font-black text-purple-600">{formatPrice(item.numericPrice * item.quantity)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 pt-6 border-t border-gray-50">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">{formatPrice(subTotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>Delivery Fee</span>
                                    <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
                                </div>
                                {couponDiscount > 0 && (
                                    <div className="flex justify-between text-sm font-bold text-green-600">
                                        <span>Discount</span>
                                        <span>-{formatPrice(couponDiscount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center pt-4 border-t-2 border-gray-900 mt-4">
                                    <span className="text-lg font-black text-gray-900 uppercase">Total Bill</span>
                                    <span className="text-2xl font-black text-purple-600">{formatPrice(grandTotal)}</span>
                                </div>
                            </div>

                            {/* Acceptance Section */}
                            <div className="mb-6 p-4 bg-green-50 rounded-2xl border border-green-100">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input type="checkbox" checked={isAccepted} onChange={(e) => setIsAccepted(e.target.checked)} className="mt-1 h-5 w-5 rounded-md border-gray-300 text-purple-600 focus:ring-purple-600 transition-all accent-purple-600 cursor-pointer" />
                                    <span className="text-[11px] font-medium leading-relaxed text-gray-600">
                                        I agree to the <Link href="/terms" className="font-extrabold text-purple-600 hover:underline">Terms</Link>, <Link href="/warranty" className="font-extrabold text-purple-600 hover:underline">Warranty</Link> & <Link href="/refund" className="font-extrabold text-purple-600 hover:underline">Refund Policy</Link>
                                    </span>
                                </label>
                            </div>

                            <button type="submit" form="checkout-form" disabled={isSubmitting} className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl shadow-gray-900/20 active:scale-95 disabled:opacity-50">
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </button>
                            
                            <div className="mt-6 flex flex-wrap justify-center gap-3 opacity-40 grayscale">
                                <span className="text-[10px] font-black border border-gray-400 px-2 py-0.5 rounded tracking-tighter">PATHAO</span>
                                <span className="text-[10px] font-black border border-gray-400 px-2 py-0.5 rounded tracking-tighter">STEADFAST</span>
                                <span className="text-[10px] font-black border border-gray-400 px-2 py-0.5 rounded tracking-tighter">REDX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Footer Fix */}
            <div className="h-10 md:hidden"></div>
        </div>
    );
}
