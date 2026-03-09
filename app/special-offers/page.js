import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiZap, FiPercent, FiPackage } from "react-icons/fi";

export const metadata = {
    title: "Special Offers | Applex Exclusive Deals",
    description: "Discover limited-time promotions, bundle offers, and massive discounts on premium tech at Applex.",
};

export default function SpecialOffersPage() {
    const offers = [
        {
            id: 1,
            title: "iPhone 16 Pro + Apple Watch Bundle",
            description: "Get the ultimate ecosystem experience. Save ৳5,000 on the Watch when you buy any iPhone 16 Pro.",
            image: "/no-image.svg",
            badge: "Bundle Deal",
            discount: "Save ৳5,000",
            expiry: "Ends in 2 days",
            color: "from-blue-600 to-indigo-700"
        },
        {
            id: 2,
            title: "Accessories Clearance - Up to 60% Off",
            description: "Huge discounts on original cases, chargers, and screen protectors. Limited stock remaining!",
            image: "/no-image.svg",
            badge: "Clearance",
            discount: "60% OFF",
            expiry: "While stocks last",
            color: "from-red-600 to-rose-700"
        },
        {
            id: 3,
            title: "Student Discount Program",
            description: "Are you a student? Verify your ID and get an extra ৳2,000 off on any MacBook or iPad.",
            image: "/no-image.svg",
            badge: "Education",
            discount: "Extra ৳2,000 Off",
            expiry: "Academic Year 2026",
            color: "from-emerald-600 to-teal-700"
        }
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header / Hero */}
            <div className="bg-[#111827] py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] -rotate-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="text-left max-w-2xl">
                            <span className="inline-block px-4 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                                Exclusive Deals
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                                Premium Tech,<br /> <span className="text-blue-500 italic">Unbeatable</span> Prices.
                            </h1>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                                Explore our curated selection of limited-time offers and exclusive bundles.
                                High-end performance shouldn't always have a high-end price.
                            </p>
                        </div>
                        <div className="hidden lg:block w-80 h-80 relative">
                            <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-6 opacity-20"></div>
                            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 flex items-center justify-center -rotate-3 transition-transform hover:rotate-0 duration-700">
                                <FiZap size={120} className="text-blue-500 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Offers Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {offers.map((offer) => (
                        <div key={offer.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 flex flex-col h-full">
                            <div className={`h-48 relative bg-gradient-to-br ${offer.color}`}>
                                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                                        {offer.badge}
                                    </span>
                                    <span className="text-white text-3xl font-black tracking-tighter">
                                        {offer.discount}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 right-4 text-white/50">
                                    <FiPackage size={80} strokeWidth={1} />
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                                    {offer.description}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Validity</span>
                                        <span className="text-xs font-black text-red-500">{offer.expiry}</span>
                                    </div>
                                    <Link
                                        href="/category"
                                        className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all shadow-lg"
                                    >
                                        <FiChevronRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 rounded-[40px] bg-blue-600 p-8 md:p-16 text-center text-white shadow-2xl shadow-blue-600/30">
                    <h2 className="text-3xl md:text-4xl font-black mb-4">Want First Access to New Deals?</h2>
                    <p className="text-blue-100 max-w-xl mx-auto mb-10 text-lg">
                        Our most exclusive offers often sell out in minutes. Join 20k+ subcribers and get notified the moment they drop.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 sm:w-80 font-bold"
                        />
                        <button className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
