import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiClock } from 'react-icons/fi';

export default function BestDeals({ deals = [] }) {
    return (
        <section className="w-full bg-blue-50/40 py-12 md:py-16">
            <div className="max-w-[1550px] mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                            Big Saves
                        </h2>
                    </div>
                    <Link href="/special-offers" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Deal Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {deals.map((deal) => (
                        <div key={deal.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300">

                            <Link href={deal.link || "#"} className="relative w-full h-44 md:h-52 bg-gray-50 shrink-0 flex items-center justify-center p-4 md:p-6">
                                <Image
                                    src={deal.imageUrl || "/no-image.svg"}
                                    alt={deal.title}
                                    fill
                                    className="object-contain p-4 md:p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                    unoptimized
                                />
                                {deal.badge && (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase z-10">
                                        {deal.badge}
                                    </div>
                                )}
                            </Link>

                            <div className="p-4 md:p-5 flex-1 flex flex-col">
                                <Link href={deal.link || "#"} className="mb-2 block">
                                    <h3 className="text-[15px] md:text-[17px] font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {deal.title}
                                    </h3>
                                </Link>

                                <p className="text-xs text-gray-400 mb-3 line-clamp-2 hidden md:block">
                                    {deal.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4">
                                        <div className="flex items-center flex-wrap gap-2 leading-none">
                                            <div className="text-lg md:text-2xl font-black text-gray-900 leading-none">
                                                {deal.price}
                                            </div>
                                            {deal.oldPrice && (
                                                <div className="text-[11px] md:text-[13px] text-gray-400 line-through font-medium">
                                                    {deal.oldPrice}
                                                </div>
                                            )}
                                        </div>

                                        <Link href={deal.link || "#"} className="w-full md:w-auto text-center px-4 py-2.5 md:py-2 rounded-xl bg-blue-600 text-white font-bold text-[11px] md:text-xs hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20 active:scale-95">
                                            Grab Deal
                                        </Link>
                                    </div>

                                    {/* Sold Progress Bar - Always Visible */}
                                    <div className="pt-3 border-t border-gray-100">
                                        {(() => {
                                            const idNum = Number(deal.id) || 0;
                                            const soldPercentage = Math.floor(((idNum * 7 + 65) % 35) + 60);
                                            const isHot = soldPercentage > 80;

                                            return (
                                                <>
                                                    <div className="flex justify-between text-[9px] font-bold text-gray-400 uppercase mb-1.5">
                                                        <span>Sold: {soldPercentage}%</span>
                                                        {isHot && <span className="text-blue-600 font-extrabold animate-pulse">Hot</span>}
                                                    </div>
                                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                                                            style={{ width: `${soldPercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
