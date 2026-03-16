"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiZap } from 'react-icons/fi';

export default function ShopCategories({ categories = [], flashSaleProducts = [] }) {
    return (
        <section className="w-full bg-gray-50 py-12 md:py-16">
            <div className="max-w-[1550px] mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Shop by Category</h2>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">Find your perfect device</p>
                    </div>
                    <Link href="/categories" className="hidden md:flex text-blue-600 hover:text-blue-700 text-sm font-semibold items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Brand Grid */}
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6 md:gap-8 mb-8 md:mb-16">
                    {categories.map((cat, idx) => (
                        <Link
                            key={cat.id ? `cat-${cat.id}-${idx}` : `cat-fallback-${idx}`}
                            href={`/category/${cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}`}
                            className={`${idx >= 8 ? 'hidden md:flex' : 'flex'} flex-col items-center gap-3 transition-transform hover:-translate-y-1 duration-300`}
                        >
                            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:border-blue-400 group-hover:shadow-lg group-hover:shadow-blue-500/10 transition-all duration-300">
                                <Image
                                    src={cat.image || "/no-image.svg"}
                                    alt={cat.name || 'Category'}
                                    width={56}
                                    height={56}
                                    className="w-10 h-10 md:w-14 md:h-14 object-contain group-hover:scale-110 transition-all duration-500"
                                    unoptimized
                                />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-600 group-hover:text-blue-600 transition-colors text-center leading-tight uppercase tracking-tight">
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Mobile-only View All Button */}
                <div className="flex md:hidden justify-center mb-10 -mt-2">
                    <Link 
                        href="/categories" 
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-xl text-blue-600 font-bold text-sm shadow-sm hover:bg-gray-50 transition-all"
                    >
                        View All Categories <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Flash Sale Strip */}
                {flashSaleProducts.length > 0 && (
                    <div className="rounded-2xl bg-gray-900 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/8 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10 p-5 md:p-8">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 rounded-xl bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                                        <FiZap className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-black text-white">
                                            Flash Sale
                                        </h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex gap-1">
                                                <span className="bg-white/15 text-white text-[11px] font-bold px-2 py-0.5 rounded">02</span>
                                                <span className="text-white/40 font-bold">:</span>
                                                <span className="bg-white/15 text-white text-[11px] font-bold px-2 py-0.5 rounded">45</span>
                                                <span className="text-white/40 font-bold">:</span>
                                                <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded animate-pulse">12</span>
                                            </div>
                                            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider ml-1">Left</span>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/flash-sale" className="bg-white text-gray-900 hover:bg-gray-100 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-black/10 flex items-center gap-2 self-start md:self-center">
                                    View Deals <FiArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Flash Sale Products Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                {flashSaleProducts.map((product, idx) => (
                                    <Link
                                        key={product.id ? `flash-${product.id}-${idx}` : `flash-fallback-${idx}`}
                                        href={`/product/${product.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown'}-${product.id || idx}`}
                                        className="group relative rounded-xl bg-white p-3 md:p-4 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 flex flex-col h-full"
                                    >
                                        <div className="aspect-square relative mb-3 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-3">
                                            <Image
                                                src={product.imageUrl || "/no-image.svg"}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                                unoptimized
                                            />
                                            {product.discount && (
                                                <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                                                    {product.discount}
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-[12px] font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors mb-2">
                                            {product.name}
                                        </h4>
                                        <div className="mt-auto">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-sm font-black text-gray-900">{product.price}</span>
                                                {product.oldPrice && (
                                                    <span className="text-[10px] text-gray-400 line-through">{product.oldPrice}</span>
                                                )}
                                            </div>
                                            {(() => {
                                                const idNum = Number(product.id) || 0;
                                                const soldPercentage = Math.floor(((idNum * 13 + 45) % 30) + 65);
                                                const isHot = soldPercentage > 80;
                                                const leftCount = Math.floor(((idNum * 7) % 5) + 2);

                                                return (
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between items-center text-[9px] font-medium text-gray-400 uppercase">
                                                            <span>Sold: {soldPercentage}%</span>
                                                            {isHot ? (
                                                                <span className="text-red-500 font-bold animate-pulse">Hot: {leftCount} Left</span>
                                                            ) : (
                                                                <span className="text-gray-400">{leftCount} Left</span>
                                                            )}
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                                                            <div className="bg-red-500 h-1 rounded-full" style={{ width: `${soldPercentage}%` }}></div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
