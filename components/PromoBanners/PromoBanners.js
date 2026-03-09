import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function PromoBanners() {
    return (
        <section className="w-full bg-white py-8 md:py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

                    {/* Banner 1: Super Sale */}
                    <Link href="/special-offers" className="relative rounded-2xl overflow-hidden group block shadow-sm border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 opacity-90 transition-opacity group-hover:opacity-100"></div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

                        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[250px] justify-center text-white">
                            <span className="inline-block px-3 py-1 bg-white/20 uppercase tracking-widest text-[10px] font-bold rounded shadow-sm mb-4 w-fit backdrop-blur-sm border border-white/10">
                                Super Sale
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                Top Tech Deals <br />
                                <span className="text-blue-100">Up to 40% Off</span>
                            </h2>
                            <p className="text-blue-50 text-xs md:text-sm mb-6 max-w-[250px] font-medium leading-relaxed">
                                Grab the latest laptops, tablets, and smartwatches at unbeatable prices.
                            </p>

                            <span className="mt-auto px-6 py-2.5 rounded-full bg-white text-blue-700 font-bold hover:bg-gray-50 transition-all shadow-md w-fit flex items-center gap-2 text-sm">
                                Shop Deals <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                    {/* Banner 2: Trade In */}
                    <Link href="/trade-in" className="relative rounded-2xl overflow-hidden group block shadow-sm border border-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500 to-red-600 opacity-90 transition-opacity group-hover:opacity-100"></div>

                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

                        <div className="relative z-10 p-8 md:p-10 flex flex-col h-full min-h-[250px] justify-center text-white">
                            <span className="inline-block px-3 py-1 bg-white/20 uppercase tracking-widest text-[10px] font-bold rounded shadow-sm mb-4 w-fit backdrop-blur-sm border border-white/10">
                                Trade-in Offer
                            </span>
                            <h2 className="text-2xl md:text-3xl font-black mb-2 leading-tight">
                                Upgrade Today <br />
                                <span className="text-red-100">Save up to ৳35k</span>
                            </h2>
                            <p className="text-red-50 text-xs md:text-sm mb-6 max-w-[250px] font-medium leading-relaxed">
                                Exchange your old smartphone for massive discounts on brand new flagship devices.
                            </p>

                            <span className="mt-auto px-6 py-2.5 rounded-full bg-white text-red-600 font-bold hover:bg-gray-50 transition-all shadow-md w-fit flex items-center gap-2 text-sm">
                                Value My Phone <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>

                </div>

            </div>
        </section>
    );
}
