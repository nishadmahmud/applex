"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export default function ShopCategories({ categories = [], flashSaleProducts = [] }) {
    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Shop by Brand</h2>
                        <p className="text-gray-500 text-sm mt-1">Find your perfect device</p>
                    </div>
                    <Link href="/category" className="text-applex-cyan hover:text-applex-cyan-dark text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-5 mb-12 md:mb-16">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-applex-cyan flex-shrink-0 transition-all duration-300">
                                <Image
                                    src={cat.image || "/no-image.svg"}
                                    alt={cat.name}
                                    width={40}
                                    height={40}
                                    className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-110 transition-all duration-300"
                                    unoptimized
                                />
                            </div>
                            <span className="text-[11px] md:text-xs font-semibold text-gray-600 group-hover:text-applex-cyan transition-colors text-center leading-tight">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Strip — CONVERTED TO LIGHT THEME */}
                {flashSaleProducts.length > 0 && (
                    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5 md:p-7">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <FiZap className="w-4 h-4 text-red-500" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900">Flash Sale</h3>
                            <span className="ml-2 px-2.5 py-0.5 rounded-md bg-red-500 text-white text-[10px] font-bold uppercase tracking-wider">
                                Ending Soon
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {flashSaleProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                                    className="group rounded-xl bg-[#111] border border-gray-800 p-3 md:p-4 hover:border-applex-cyan/50 hover:shadow-lg hover:shadow-applex-cyan/10 transition-all duration-300"
                                >
                                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-white flex items-center justify-center p-3">
                                        <Image
                                            src={product.imageUrl || "/no-image.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                                            unoptimized
                                        />
                                        {product.discount && (
                                            <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                                                {product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-xs md:text-sm font-semibold text-white line-clamp-2 mb-1.5 leading-tight group-hover:text-applex-cyan transition-colors">
                                        {product.name}
                                    </h4>
                                    <div className="flex items-baseline gap-1.5 flex-wrap">
                                        <span className="text-sm md:text-base font-bold text-white">{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-[10px] md:text-xs text-gray-500 line-through">{product.oldPrice}</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
