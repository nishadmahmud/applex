"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl || product.image,
        });
    };

    const slug = product.name
        ? `${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`
        : String(product.id);

    return (
        <div className="group relative rounded-xl bg-white border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden bg-white p-4">
                <Image
                    src={product.imageUrl || product.image || "/no-image.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    unoptimized
                />

                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-sm z-10 uppercase tracking-tighter">
                        {product.discount}
                    </div>
                )}

                {/* Floating Add to Cart (Desktop only hover) */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-blue-700"
                    title="Quick Add to Cart"
                >
                    <FiShoppingCart className="w-4 h-4" />
                </button>
            </Link>

            {/* Info Container */}
            <div className="p-4 flex flex-col flex-grow border-t border-gray-50/50">
                <div className="flex flex-col gap-1 mb-3">
                    {product.brand && (
                        <span className="text-blue-600 text-[10px] font-black uppercase tracking-wider">
                            {product.brand}
                        </span>
                    )}

                    <Link href={`/product/${slug}`}>
                        <h3 className="text-[13px] md:text-[14px] font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[16px] md:text-[18px] font-black text-gray-900 leading-none">
                            {product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-[12px] text-gray-400 line-through decoration-red-400/50">
                                {product.oldPrice}
                            </span>
                        )}
                    </div>

                    {/* Mobile Only: Add to Cart Link/Button */}
                    <button
                        onClick={handleAddToCart}
                        className="md:hidden w-full mt-4 py-2 border border-blue-100 text-blue-600 text-[11px] font-black uppercase tracking-widest rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
