"use client";

import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function FeaturedProducts({ products = [] }) {
    const [activeTab, setActiveTab] = useState('For You');
    const tabs = ['For You', 'Top Ranked', 'Best Sellers', 'Trending'];

    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Discover More</h2>
                        <p className="text-gray-400 text-sm md:text-base mt-1">Curated picks you&#39;ll love</p>
                    </div>

                    {/* Pill Toggles */}
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                    {products.slice(0, 10).map((product, idx) => (
                        <div key={product.id} className="relative">
                            {idx < 3 ? (
                                <div className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-[11px] font-bold text-white border-2 border-white shadow-sm">
                                    {idx + 1}
                                </div>
                            ) : null}
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="mt-12 flex justify-center">
                    <button className="group px-10 py-4 rounded-full bg-gray-900 text-white font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-all shadow-md flex items-center gap-2">
                        Load More <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
