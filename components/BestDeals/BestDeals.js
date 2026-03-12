import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiClock } from 'react-icons/fi';

export default function BestDeals({ deals = [] }) {
    return (
        <section className="w-full bg-blue-50/40 py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
                            Big Saves
                        </h2>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mt-1">
                            <FiClock className="w-3 h-3" /> Ends in: <span className="text-red-500 font-bold">12h 45m</span>
                        </div>
                    </div>
                    <Link href="/special-offers" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Deal Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
                                    <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {deal.title}
                                    </h3>
                                </Link>

                                <p className="text-xs text-gray-400 mb-3 line-clamp-2 hidden md:block">
                                    {deal.description}
                                </p>

                                <div className="mt-auto flex items-end justify-between gap-2">
                                    <div>
                                        {deal.oldPrice && (
                                            <div className="text-[11px] text-gray-400 line-through mb-0.5">
                                                {deal.oldPrice}
                                            </div>
                                        )}
                                        <div className="text-lg md:text-xl font-black text-gray-900">
                                            {deal.price}
                                        </div>
                                    </div>

                                    <Link href={deal.link || "#"} className="px-3 md:px-4 py-2 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
                                        Grab Deal
                                    </Link>
                                </div>

                                {deal.savings && (
                                    <div className="mt-3 pt-3 border-t border-gray-100">
                                        <div className="flex justify-between text-[9px] font-medium text-gray-400 uppercase mb-1">
                                            <span>Sold: {Math.floor(Math.random() * 80) + 20}%</span>
                                            <span className="text-red-500 font-bold">Hot</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                                            <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${Math.floor(Math.random() * 60) + 30}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
