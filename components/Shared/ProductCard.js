"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const router = useRouter();

    const slug = product.name
        ? `${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`
        : String(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // If product has variants, send user to product page to pick options
        if (product.hasVariants) {
            router.push(`/product/${slug}`);
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || product.image,
        });
    };

    return (
        <div className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden bg-gray-50 p-4">
                <Image
                    src={product.imageUrl || product.image || "/no-image.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                />

                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                        {product.discount}
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
                        isInWishlist(product.id) 
                        ? 'bg-red-50 text-red-500 shadow-sm border border-red-100' 
                        : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 border border-transparent shadow-sm'
                    }`}
                    title={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <FiHeart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} />
                </button>

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20 flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-blue-700"
                    title="Quick Add to Cart"
                >
                    <FiShoppingCart className="w-4 h-4" />
                </button>
            </Link>

            {/* Info Container */}
            <div className="p-3.5 md:p-4 flex flex-col grow">
                <div className="flex flex-col gap-1 mb-2">
                    {product.brand && (
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            {product.brand}
                        </span>
                    )}

                    <Link href={`/product/${slug}`}>
                        <h3 className="text-[12px] md:text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto pt-2">
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                        <span className="text-[15px] md:text-[17px] font-black text-gray-900 leading-none">
                            {product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-[11px] text-gray-400 line-through font-medium">
                                {product.oldPrice}
                            </span>
                        )}
                    </div>
                    
                    {/* Deterministic Sold Percentage to avoid hydration mismatch */}
                    {(() => {
                        const soldPercentage = Math.floor((((parseInt(String(product.id).replace(/\D/g, '')) || 0) * 7 + 65) % 31) + 65);
                        return (
                            <div className="mb-4">
                                <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase tracking-tight mb-1.5">
                                    <span>Sold: {soldPercentage}%</span>
                                    <span className="text-blue-600 font-extrabold">Hot</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div 
                                        className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${soldPercentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })()}

                    <button
                        onClick={handleAddToCart}
                        className="md:hidden w-full py-2.5 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/10 active:scale-95"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
