import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function PromoBanners() {
    return (
        <section className="w-full bg-white py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Banner Container */}
                <div className="relative rounded-3xl overflow-hidden bg-gray-50 border border-gray-200">

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-applex-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8">

                        {/* Text Content */}
                        <div className="text-center md:text-left md:max-w-xl">
                            <span className="inline-block px-3 py-1 bg-white border border-gray-200 text-gray-900 text-xs font-bold rounded-full mb-4 shadow-sm">
                                Trade-in Offer
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                                Upgrade to the latest. <br />
                                <span className="text-applex-cyan">Save up to ৳35,000.</span>
                            </h2>
                            <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
                                Exchange your old smartphone for a brand new one. Get an instant valuation and massive discounts on top brands.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <Link
                                    href="/trade-in"
                                    className="px-8 py-3.5 rounded-full bg-applex-black text-white font-bold hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2 group"
                                >
                                    Value My Phone
                                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/how-it-works"
                                    className="px-8 py-3.5 rounded-full bg-white text-gray-900 border border-gray-200 font-bold hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>

                        {/* Visual/Stats */}
                        <div className="w-full md:w-auto flex-shrink-0 grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-black text-applex-cyan mb-1">5k+</span>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Phones Traded</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-black text-applex-cyan mb-1">2min</span>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Quick Process</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
