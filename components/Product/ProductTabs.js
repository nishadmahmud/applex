"use client";

import { useMemo, useState } from 'react';

export default function ProductTabs({ description, specifications }) {
    const [activeTab, setActiveTab] = useState('description');

    const specRows = useMemo(() => {
        if (!Array.isArray(specifications)) return [];
        return specifications;
    }, [specifications]);

    return (
        <div className="mt-12 md:mt-24 w-full">
            {/* Tabs Header */}
            <div className="flex items-center gap-6 md:gap-10 border-b border-gray-200 mb-8">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`cursor-pointer pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'description'
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    Description
                    {activeTab === 'description' && (
                        <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-600 rounded-full"></span>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('specifications')}
                    className={`cursor-pointer pb-4 text-xs font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === 'specifications'
                        ? 'text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                        }`}
                >
                    Specifications
                    {activeTab === 'specifications' && (
                        <span className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-blue-600 rounded-full"></span>
                    )}
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'description' ? (
                <div className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed md:leading-loose break-words overflow-x-hidden">
                    <div dangerouslySetInnerHTML={{ __html: description || '' }} />
                </div>
            ) : (
                <div className="w-full border border-gray-200 rounded-2xl overflow-hidden shadow-sm bg-white">
                    <div className="px-5 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                        <h3 className="text-base md:text-lg font-extrabold text-gray-800 tracking-tight">
                            Specification
                        </h3>
                        <span className="hidden md:inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                            Details
                        </span>
                    </div>

                    {specRows.length === 0 ? (
                        <div className="px-5 py-6 text-sm text-gray-500">
                            No technical specifications available for this product yet.
                        </div>
                    ) : (
                        <div>
                            {specRows.map((spec, idx) => (
                                <div
                                    key={`${spec.name}-${idx}`}
                                    className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 px-5 py-3 border-b border-gray-100 last:border-b-0 bg-white"
                                >
                                    <div className="w-full sm:w-1/3 text-[12px] font-semibold text-gray-500 uppercase tracking-wide">
                                        {spec.name}
                                    </div>
                                    <div className="w-full sm:flex-1 text-[13px] md:text-sm text-gray-800 leading-relaxed">
                                        {spec.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
