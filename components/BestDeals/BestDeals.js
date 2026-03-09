import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiClock, FiTag } from 'react-icons/fi';

export default function BestDeals({ deals = [] }) {
    return (
        <section className="w-full bg-orange-50/50 py-10 md:py-14 border-t border-orange-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                            <span className="text-orange-600">Big</span> Saves
                        </h2>
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                            <FiClock className="w-3.5 h-3.5" /> Ends in: 12h 45m
                        </div>
                    </div>
                    <Link href="/special-offers" className="text-orange-600 hover:text-orange-800 text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Deal Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {deals.map((deal) => (
                        <div key={deal.id} className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-orange-100 hover:border-orange-300 transition-all duration-300">

                            {/* Image Section - Left */}
                            <Link href={deal.link || "#"} className="relative w-full sm:w-2/5 h-48 sm:h-auto bg-gray-50 flex-shrink-0 flex items-center justify-center p-6">
                                <Image
                                    src={deal.imageUrl || "/no-image.svg"}
                                    alt={deal.title}
                                    fill
                                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                    unoptimized
                                />
                                {/* Discount tag over image */}
                                {deal.badge && (
                                    <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase shadow-sm">
                                        {deal.badge}
                                    </div>
                                )}
                            </Link>

                            {/* Details Section - Right */}
                            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30">

                                <Link href={deal.link || "#"} className="mb-2 block">
                                    <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
                                        {deal.title}
                                    </h3>
                                </Link>

                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {deal.description}
                                </p>

                                <div className="mt-auto pt-2 border-t border-gray-100 flex items-end justify-between">
                                    <div>
                                        {deal.oldPrice && (
                                            <div className="text-sm text-gray-400 line-through mb-0.5">
                                                {deal.oldPrice}
                                            </div>
                                        )}
                                        <div className="text-2xl md:text-3xl font-black text-red-600 flex items-baseline gap-1">
                                            {deal.price}
                                        </div>
                                    </div>

                                    <Link href={deal.link || "#"} className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center">
                                        Grab Deal
                                    </Link>
                                </div>

                                {/* Progress Bar */}
                                {deal.savings && (
                                    <div className="mt-5">
                                        <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-1.5">
                                            <span>Already Sold: {Math.floor(Math.random() * 80) + 20}%</span>
                                            <span className="text-orange-600 px-1.5 py-0.5 rounded bg-orange-100">Hot</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                            <div className="bg-gradient-to-r from-orange-400 to-red-500 h-1.5 rounded-full" style={{ width: `${Math.floor(Math.random() * 60) + 30}%` }}></div>
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
