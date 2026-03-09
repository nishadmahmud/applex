"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export default function ShopCategories({ categories = [], flashSaleProducts = [] }) {
    return (
        <section className="w-full bg-white py-10 md:py-14 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Shop by Brand</h2>
                        <p className="text-gray-500 text-xs md:text-sm mt-1">Find your perfect device</p>
                    </div>
                    <Link href="/category" className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Brand Grid (Circular) */}
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 md:gap-8 mb-12 md:mb-16">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id ? `cat-${cat.id}-${idx}` : `cat-fallback-${idx}`}
                            href={`/category/${cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`}
                            className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1 duration-300"
                        >
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-blue-500 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all duration-500 relative">
                                <Image
                                    src={cat.image || "/no-image.svg"}
                                    alt={cat.name || 'Category'}
                                    width={56}
                                    height={56}
                                    className="w-10 h-10 md:w-14 md:h-14 object-contain group-hover:scale-110 transition-all duration-500"
                                    unoptimized
                                />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-black text-gray-700 group-hover:text-blue-600 transition-colors text-center leading-tight uppercase tracking-tighter">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Flash Sale Strip — PREMIUM REFINEMENT */}
                {flashSaleProducts.length > 0 && (
                    <div className="rounded-2xl border border-red-100 bg-gradient-to-r from-red-50/50 to-white p-5 md:p-8 mb-8 relative overflow-hidden shadow-sm">
                        {/* Background Decor */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100/30 rounded-full blur-3xl"></div>

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20 rotate-3">
                                    <FiZap className="w-6 h-6 text-white animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 flex items-center gap-2">
                                        Flash <span className="text-red-600 italic">Sale</span>
                                    </h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex gap-1">
                                            <span className="bg-gray-900 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">02</span>
                                            <span className="text-gray-900 font-bold">:</span>
                                            <span className="bg-gray-900 text-white text-[11px] font-bold px-1.5 py-0.5 rounded">45</span>
                                            <span className="text-gray-900 font-bold">:</span>
                                            <span className="bg-red-600 text-white text-[11px] font-bold px-1.5 py-0.5 rounded animate-pulse">12</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Remaining Time</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/flash-sale" className="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 self-start md:self-center">
                                View Deals <FiArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Flash Sale Products Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                            {flashSaleProducts.map((product, idx) => (
                                <Link
                                    key={product.id ? `flash-${product.id}-${idx}` : `flash-fallback-${idx}`}
                                    href={`/product/${product.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}-${product.id || idx}`}
                                    className="group relative rounded-2xl bg-white border border-gray-100 p-4 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500 flex flex-col h-full"
                                >
                                    <div className="aspect-square relative mb-4 rounded-xl overflow-hidden bg-gray-50/50 flex items-center justify-center p-4">
                                        <Image
                                            src={product.imageUrl || "/no-image.svg"}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-700"
                                            unoptimized
                                        />
                                        {product.discount && (
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-lg z-10 uppercase">
                                                -{product.discount}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors mb-3">
                                        {product.name}
                                    </h4>
                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-2 mb-3">
                                            <span className="text-lg font-black text-red-600">{product.price}</span>
                                            {product.oldPrice && (
                                                <span className="text-xs text-gray-400 line-through decoration-gray-300">{product.oldPrice}</span>
                                            )}
                                        </div>

                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
                                                <span>Sold: {Math.floor(Math.random() * 30) + 5}</span>
                                                <span className="text-red-600">Only {Math.floor(Math.random() * 10) + 2} Left</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${Math.floor(Math.random() * 40) + 50}%` }}></div>
                                            </div>
                                        </div>
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
