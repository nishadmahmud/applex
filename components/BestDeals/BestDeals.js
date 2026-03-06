import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiTag } from 'react-icons/fi';

export default function BestDeals({ deals = [] }) {
    return (
        <section className="w-full bg-gray-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Exclusive Deals</h2>
                        <p className="text-applex-muted text-sm mt-1">Massive savings on premium phones</p>
                    </div>
                    <Link href="/special-offers" className="text-applex-cyan hover:text-applex-cyan-dark text-sm font-semibold flex items-center gap-1 transition-colors">
                        All Offers <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Deal Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {deals.map((deal) => (
                        <Link
                            key={deal.id}
                            href={deal.link || "#"}
                            className="group relative rounded-2xl overflow-hidden bg-[#111] border border-gray-800 hover:border-applex-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-applex-cyan/10"
                        >
                            <div className="flex flex-col sm:flex-row items-center p-5 md:p-7 gap-5 md:gap-7">
                                {/* Image */}
                                <div className="relative w-36 h-36 md:w-44 md:h-44 flex-shrink-0 rounded-xl bg-white overflow-hidden">
                                    <Image
                                        src={deal.imageUrl || "/no-image.svg"}
                                        alt={deal.title}
                                        fill
                                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                                        unoptimized
                                    />
                                </div>

                                {/* Text */}
                                <div className="flex-1 text-center sm:text-left">
                                    {/* Badge */}
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 text-[10px] md:text-xs font-bold uppercase mb-3">
                                        <FiTag className="w-3 h-3" /> {deal.badge}
                                    </span>

                                    <h3 className="text-lg md:text-xl font-bold text-white mb-1.5 group-hover:text-applex-cyan transition-colors leading-tight">
                                        {deal.title}
                                    </h3>

                                    <p className="text-xs md:text-sm text-gray-400 mb-3 leading-relaxed">
                                        {deal.description}
                                    </p>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2 flex-wrap justify-center sm:justify-start mb-2">
                                        <span className="text-2xl md:text-3xl font-black text-white">{deal.price}</span>
                                        {deal.oldPrice && (
                                            <span className="text-sm md:text-base text-gray-500 line-through">{deal.oldPrice}</span>
                                        )}
                                    </div>

                                    {deal.savings && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                                            {deal.savings}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Gradient accent border at bottom */}
                            <div className="h-1 w-full bg-gradient-to-r from-applex-cyan/40 via-applex-cyan to-applex-cyan/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
