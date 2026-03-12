import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function PromoBanners() {
    return (
        <section className="w-full bg-gray-50 py-10 md:py-14">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    {/* Banner 1: Super Sale */}
                    <Link href="/special-offers" className="relative rounded-2xl overflow-hidden group block min-h-[220px] md:min-h-[260px] bg-gray-900">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>

                        <div className="relative z-10 p-7 md:p-10 flex flex-col h-full justify-center text-white">
                            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 uppercase tracking-wider text-[10px] font-bold rounded-full mb-4 w-fit border border-blue-500/20">
                                Super Sale
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                Top Tech Deals <br />
                                <span className="text-gray-400">Up to 40% Off</span>
                            </h2>
                            <p className="text-gray-400 text-xs md:text-sm mb-6 max-w-[250px] font-medium leading-relaxed">
                                Grab the latest laptops, tablets, and smartwatches at unbeatable prices.
                            </p>

                            <span className="mt-auto px-6 py-2.5 rounded-full bg-white text-gray-900 font-bold hover:bg-blue-50 transition-all w-fit flex items-center gap-2 text-sm shadow-lg shadow-black/10">
                                Shop Deals <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                    {/* Banner 2: Trade In */}
                    <Link href="/trade-in" className="relative rounded-2xl overflow-hidden group block min-h-[220px] md:min-h-[260px] bg-blue-600">
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full translate-y-1/3 -translate-x-1/4"></div>

                        <div className="relative z-10 p-7 md:p-10 flex flex-col h-full justify-center text-white">
                            <span className="inline-block px-3 py-1 bg-white/15 uppercase tracking-wider text-[10px] font-bold rounded-full mb-4 w-fit border border-white/10">
                                Trade-in Offer
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                Upgrade Today <br />
                                <span className="text-blue-200">Save up to ৳35k</span>
                            </h2>
                            <p className="text-blue-100 text-xs md:text-sm mb-6 max-w-[250px] font-medium leading-relaxed">
                                Exchange your old smartphone for massive discounts on brand new flagship devices.
                            </p>

                            <span className="mt-auto px-6 py-2.5 rounded-full bg-white text-blue-700 font-bold hover:bg-blue-50 transition-all w-fit flex items-center gap-2 text-sm shadow-lg shadow-blue-900/20">
                                Value My Phone <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                </div>

            </div>
        </section>
    );
}
