"use client";

import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products = [] }) {
    const [activeTab, setActiveTab] = useState('For You');
    const tabs = ['For You', 'Top Ranked', 'Best Sellers', 'Trending'];

    return (
        <section className="w-full bg-white py-10 md:py-14 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10 border-b border-gray-200 pb-5">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">Discover <span className="text-blue-600 italic">More</span></h2>
                    </div>

                    {/* Pill Toggles */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {products.slice(0, 10).map((product, idx) => (
                        <div key={product.id} className="relative">
                            {/* Rank and Hot badges */}
                            {idx < 3 ? (
                                <div className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-[12px] font-black text-white shadow-lg border-2 border-white">
                                    {idx + 1}
                                </div>
                            ) : (
                                <div className="absolute top-2 left-2 z-20 bg-red-100/80 backdrop-blur-sm text-red-600 text-[9px] font-black px-2 py-1 rounded-lg border border-red-200 shadow-sm uppercase tracking-tighter">
                                    Hot
                                </div>
                            )}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-12 flex justify-center">
                    <button className="group px-10 py-4 rounded-2xl bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl flex items-center gap-3">
                        Load More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
