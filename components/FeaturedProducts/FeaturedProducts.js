"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function FeaturedProducts({ products = [] }) {
    const { addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl,
        });
    };

    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Best Sellers</h2>
                        <p className="text-applex-muted text-sm mt-1">Our most popular devices</p>
                    </div>
                    <Link href="/category" className="text-applex-cyan hover:text-applex-cyan-dark text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
                    {products.slice(0, 8).map((product, idx) => (
                        <div key={product.id} className="group rounded-2xl bg-[#111] border border-gray-800 overflow-hidden hover:border-applex-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-applex-cyan/10 flex flex-col relative">
                            {/* Rank badge */}
                            {idx < 3 && (
                                <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[10px] font-black text-[#0a0a0a] shadow-md">
                                    #{idx + 1}
                                </div>
                            )}
                            {idx >= 3 && (
                                <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-400 text-[9px] font-bold">
                                    🔥 Popular
                                </div>
                            )}

                            {/* Image */}
                            <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}>
                                <div className="aspect-square relative bg-white p-4">
                                    <Image
                                        src={product.imageUrl || "/no-image.svg"}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                                        unoptimized
                                    />
                                    {product.discount && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-md">
                                            {product.discount}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            {/* Info */}
                            <div className="p-3 md:p-4 flex-1 flex flex-col">
                                <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}>
                                    <h3 className="text-sm md:text-base font-semibold text-white line-clamp-2 mb-2 leading-tight group-hover:text-applex-cyan transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                <div className="mt-auto flex items-center justify-between gap-2">
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                        <span className="text-base md:text-lg font-bold text-white">{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-[10px] md:text-xs text-gray-500 line-through">{product.oldPrice}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-applex-cyan/10 hover:bg-applex-cyan text-applex-cyan hover:text-[#0a0a0a] flex items-center justify-center transition-all duration-300 flex-shrink-0"
                                        aria-label="Add to cart"
                                    >
                                        <FiShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
