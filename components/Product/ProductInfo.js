"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { FiShare2, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import ProductExtras from './ProductExtras';

export default function ProductInfo({ product, onVariantImageChange }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    const imeis = product.rawImeis || [];
    const hasVariants = imeis.length > 0;

    // Extract unique color options with their hex codes
    const allColors = useMemo(() => {
        const colorMap = new Map();
        imeis.forEach(i => {
            if (i.color && !colorMap.has(i.color)) {
                colorMap.set(i.color, { name: i.color, hex: i.color_code || '#e5e7eb' });
            }
        });
        return Array.from(colorMap.values());
    }, [imeis]);

    // Extract unique storage options
    const allStorages = useMemo(() => {
        return [...new Set(imeis.map(i => i.storage).filter(Boolean))];
    }, [imeis]);

    // Extract unique region options
    const allRegions = useMemo(() => {
        return [...new Set(imeis.map(i => i.region).filter(Boolean))];
    }, [imeis]);

    // Selection state
    const [selectedColor, setSelectedColor] = useState(allColors[0]?.name || null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    // Applex Care Plan state
    const [selectedCarePlans, setSelectedCarePlans] = useState([]);

    const toggleCarePlan = (plan) => {
        setSelectedCarePlans(prev => {
            const exists = prev.find(p => p.id === plan.id);
            if (exists) {
                return prev.filter(p => p.id !== plan.id);
            }
            return [...prev, plan];
        });
    };

    // When color is selected, auto-select the first available storage and region for that color
    useEffect(() => {
        if (!hasVariants) return;

        const matchingImeis = imeis.filter(i => !selectedColor || i.color === selectedColor);

        const availableStorages = [...new Set(matchingImeis.map(i => i.storage).filter(Boolean))];
        if (availableStorages.length > 0) {
            if (!selectedStorage || !availableStorages.includes(selectedStorage)) {
                setSelectedStorage(availableStorages[0]);
            }
        } else {
            setSelectedStorage(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor]);

    // When color+storage changes, auto-select region
    useEffect(() => {
        if (!hasVariants) return;

        const matchingImeis = imeis.filter(i => {
            let match = true;
            if (selectedColor && i.color) match = match && i.color === selectedColor;
            if (selectedStorage && i.storage) match = match && i.storage === selectedStorage;
            return match;
        });

        const availableRegions = [...new Set(matchingImeis.map(i => i.region).filter(Boolean))];
        if (availableRegions.length > 0) {
            if (!selectedRegion || !availableRegions.includes(selectedRegion)) {
                setSelectedRegion(availableRegions[0]);
            }
        } else {
            setSelectedRegion(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColor, selectedStorage]);

    // Compute available options based on current selection state
    const availableStorages = useMemo(() => {
        const matchingImeis = imeis.filter(i => !selectedColor || i.color === selectedColor);
        return [...new Set(matchingImeis.map(i => i.storage).filter(Boolean))];
    }, [imeis, selectedColor]);

    const availableRegions = useMemo(() => {
        const matchingImeis = imeis.filter(i => {
            let match = true;
            if (selectedColor && i.color) match = match && i.color === selectedColor;
            if (selectedStorage && i.storage) match = match && i.storage === selectedStorage;
            return match;
        });
        return [...new Set(matchingImeis.map(i => i.region).filter(Boolean))];
    }, [imeis, selectedColor, selectedStorage]);

    // Get the best matching IMEI for the current selection to determine price
    const matchedImei = useMemo(() => {
        if (!hasVariants) return null;

        // Try exact match first
        let match = imeis.find(i =>
            (!selectedColor || i.color === selectedColor) &&
            (!selectedStorage || i.storage === selectedStorage) &&
            (!selectedRegion || i.region === selectedRegion)
        );

        // Fallback: color + storage
        if (!match) {
            match = imeis.find(i =>
                (!selectedColor || i.color === selectedColor) &&
                (!selectedStorage || i.storage === selectedStorage)
            );
        }

        // Fallback: color only
        if (!match) {
            match = imeis.find(i => !selectedColor || i.color === selectedColor);
        }

        return match;
    }, [imeis, selectedColor, selectedStorage, selectedRegion, hasVariants]);

    // Dynamic price based on matched IMEI
    const displayPrice = useMemo(() => {
        if (matchedImei && matchedImei.sale_price) {
            return `৳ ${Number(matchedImei.sale_price).toLocaleString('en-IN')}`;
        }
        return product.price;
    }, [matchedImei, product.price]);

    // Old price for strikethrough — show the base product price if variant price differs
    const displayOldPrice = useMemo(() => {
        if (matchedImei && matchedImei.sale_price) {
            const variantPrice = Number(matchedImei.sale_price);
            if (product.hasDiscount && product.originalPrice > variantPrice) {
                return `৳ ${product.originalPrice.toLocaleString('en-IN')}`;
            }
        }
        return product.oldPrice;
    }, [matchedImei, product]);

    // Memoized variant images based on selected color
    const currentVariantImages = useMemo(() => {
        if (!hasVariants || !selectedColor) return null;
        const colorImeis = imeis.filter(i => i.color === selectedColor && i.image_path);
        return [...new Set(colorImeis.map(i => i.image_path))].filter(Boolean);
    }, [hasVariants, selectedColor, imeis]);

    // When color changes, update the gallery images in the parent component
    useEffect(() => {
        if (!onVariantImageChange || !hasVariants) return;
        
        if (currentVariantImages && currentVariantImages.length > 0) {
            onVariantImageChange(currentVariantImages);
        } else {
            // No IMEI images for this color — fall back to default product images
            onVariantImageChange(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentVariantImages]);

    const handleAddToCart = () => {
        const variants = {};
        if (selectedStorage) variants.storage = selectedStorage;
        if (selectedColor) variants.colors = { name: selectedColor, hex: allColors.find(c => c.name === selectedColor)?.hex };
        if (selectedRegion) variants.region = selectedRegion;

        // Use the selected variant image if available, otherwise fallback to default product image
        const currentImageUrl = (currentVariantImages && currentVariantImages.length > 0) 
            ? currentVariantImages[0] 
            : (product.images && product.images.length > 0 ? product.images[0] : null);

        addToCart(
            { 
                ...product, 
                imageUrl: currentImageUrl,
                carePlans: selectedCarePlans 
            }, 
            quantity, 
            Object.keys(variants).length > 0 ? variants : null
        );
    };

    const handleShare = () => {
        if (typeof window !== 'undefined') {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                toast.success('Link copied to clipboard!');
            }).catch(() => {
                toast.error('Failed to copy link.');
            });
        }
    };

    return (
        <div className="flex flex-col">
            {/* Header: Brand, Title, Reviews, Share */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-600 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest shadow-sm">
                            In Stock
                        </div>
                        {product.brand?.id && product.brand?.name && (
                            <Link
                                href={`/brand/${product.brand.id}`}
                                className="inline-flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
                                title={`View all ${product.brand.name} products`}
                            >
                                {product.brand.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={product.brand.image}
                                        alt={product.brand.name}
                                        className="w-5 h-5 rounded-full object-contain bg-white border border-gray-100"
                                    />
                                ) : (
                                    <span className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200" />
                                )}
                                <span>{product.brand.name}</span>
                            </Link>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar key={star} className="text-yellow-400 w-3 h-3" />
                            ))}
                            <span className="text-xs font-black text-gray-900 ml-1">4.9</span>
                        </div>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
                            128 Reviews
                        </span>
                    </div>
                </div>

                <button 
                    onClick={handleShare}
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all border border-gray-100 shadow-sm"
                >
                    <FiShare2 size={20} />
                </button>
            </div>

            {/* Price section */}
            <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black text-gray-900 tracking-tighter">
                            {displayPrice}
                        </span>
                        {displayOldPrice && (
                            <span className="text-lg text-gray-400 line-through font-bold">
                                {displayOldPrice}
                            </span>
                        )}
                    </div>
                    {product.discount && (
                        <span className="text-xs font-black text-white bg-red-600 px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/20">
                            {product.discount}
                        </span>
                    )}
                </div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Inclusive of all local taxes</p>
            </div>

            {/* Core Highlights */}
            <div className="mb-10">
                <h3 className="text-xs font-black text-gray-900 mb-4 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1 h-3 bg-blue-600 rounded-full" /> Key Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {[
                        "Genuine Global / Official Product",
                        "Secured and Sealed Box",
                        "Cash on Delivery Available",
                        "7 Days Replacement Warranty"
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 group">
                            <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                                <FiCheck className="text-blue-600 w-3 h-3 font-bold group-hover:text-white" />
                            </div>
                            <span className="text-[13px] font-bold text-gray-600">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Variants */}
            {hasVariants && (
                <div className="space-y-8 mb-10">

                    {/* Colors — use actual color swatches */}
                    {allColors.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">
                                Pick a Color: <span className="text-blue-600">{selectedColor || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {allColors.map(color => {
                                    const isSelected = selectedColor === color.name;
                                    const isWhite = color.hex?.toLowerCase() === '#ffffff' || color.hex?.toLowerCase() === '#fff';
                                    return (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${isSelected
                                                ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-500/10'
                                                : 'border-gray-100 hover:border-gray-200 bg-white hover:shadow-sm'
                                                }`}
                                            title={color.name}
                                        >
                                            <span
                                                className={`w-6 h-6 rounded-full shadow-inner ${isWhite ? 'border border-gray-200' : ''}`}
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span className={`text-sm font-black ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                                                {color.name}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Storage / Size */}
                    {allStorages.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">
                                Storage: <span className="text-blue-600">{selectedStorage || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {allStorages.map(size => {
                                    const isAvailable = availableStorages.includes(size);
                                    const isSelected = selectedStorage === size;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => isAvailable && setSelectedStorage(size)}
                                            disabled={!isAvailable}
                                            className={`cursor-pointer px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest border-2 transition-all duration-300 ${isSelected
                                                ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-600/20'
                                                : isAvailable
                                                    ? 'border-gray-100 bg-white text-gray-600 hover:border-blue-600/30 hover:shadow-sm'
                                                    : 'border-gray-50 text-gray-300 cursor-not-allowed bg-gray-50/50'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Region */}
                    {allRegions.length > 0 && (
                        <div>
                            <h3 className="text-xs font-black text-gray-400 mb-4 uppercase tracking-widest">
                                Region: <span className="text-blue-600">{selectedRegion || ''}</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {allRegions.map(region => {
                                    const isAvailable = availableRegions.includes(region);
                                    const isSelected = selectedRegion === region;
                                    return (
                                        <button
                                            key={region}
                                            onClick={() => isAvailable && setSelectedRegion(region)}
                                            disabled={!isAvailable}
                                            className={`cursor-pointer px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider border-2 transition-all duration-300 ${isSelected
                                                ? 'border-blue-600 text-blue-600 bg-blue-50 shadow-md shadow-blue-500/10'
                                                : isAvailable
                                                    ? 'border-gray-100 bg-white text-gray-500 hover:border-blue-600/30 hover:shadow-sm'
                                                    : 'border-gray-50 text-gray-300 cursor-not-allowed bg-gray-50/50 grayscale'
                                                }`}
                                        >
                                            {region}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Product Extras: Applex Care, EMI, Specs, Delivery */}
            <div className="mb-10">
                <ProductExtras 
                    product={product} 
                    currentPrice={matchedImei?.sale_price || product.rawPrice}
                    selectedCarePlans={selectedCarePlans}
                    toggleCarePlan={toggleCarePlan}
                />
            </div>

            {/* Delivery Est */}
            <div className="mb-10 p-5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                <div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Standard Delivery</span>
                    <p className="text-sm font-bold text-gray-900">Reach you within <span className="text-blue-600 underline underline-offset-4 decoration-blue-600/30">0-3 business days</span></p>
                </div>
                <button 
                    onClick={handleShare}
                    className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm hover:text-blue-600 transition-colors"
                >
                    <FiShare2 className="text-blue-600" />
                </button>
            </div>

            {/* Add to Cart / Buy Now */}
            <div className="flex flex-row items-stretch gap-3 mt-4">
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-gray-100 rounded-2xl py-1 px-1 w-[120px] shrink-0 bg-white shadow-sm">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="cursor-pointer w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                        <FiMinus size={16} />
                    </button>
                    <span className="font-black text-gray-900 w-8 text-center text-sm">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="cursor-pointer w-10 h-10 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                    >
                        <FiPlus size={16} />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-1 bg-white border-2 border-blue-600 text-blue-600 font-black py-4 px-2 rounded-2xl hover:bg-blue-50 transition-all text-xs uppercase tracking-[0.1em] shadow-sm"
                >
                    Add to Cart
                </button>

                <button
                    onClick={handleAddToCart}
                    className="cursor-pointer flex-[1.5] bg-blue-600 text-white font-black py-4 px-2 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all text-xs uppercase tracking-[0.2em]"
                >
                    Buy Now
                </button>
            </div>

            {/* Social links */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.22em]">Social</p>
                    <p className="text-sm font-bold text-gray-900">Follow Applex</p>
                </div>
                <div className="flex items-center gap-3">
                    <a
                        href="https://web.facebook.com/Applex.bd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Applex Facebook"
                    >
                        <FaFacebook size={18} />
                    </a>
                    <a
                        href="https://www.tiktok.com/@applexofficialbd"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-black hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Applex TikTok"
                    >
                        <FaTiktok size={18} />
                    </a>
                    <a
                        href="https://www.youtube.com/@user-lh5pe6ug2b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#ff0000] hover:text-white transition-all duration-200 shadow-sm"
                        aria-label="Applex YouTube"
                    >
                        <FaYoutube size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}
