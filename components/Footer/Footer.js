"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaYoutube, FaTiktok, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCcw, FiSend } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="mt-auto flex flex-col pt-10">
            {/* ── TOP BADGE STRIP (Light) ── */}
            <div className="bg-white border-t border-gray-100">
                <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* Badge 1 */}
                        <div className="flex items-center gap-5 md:justify-center py-4 md:py-0">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                <FiTruck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Free Delivery</h4>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Orders over ৳1000</p>
                            </div>
                        </div>
                        {/* Badge 2 */}
                        <div className="flex items-center gap-5 md:justify-center py-4 md:py-0 md:pl-8">
                            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                <FiShield className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Secure Payment</h4>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">100% Secure Transaction</p>
                            </div>
                        </div>
                        {/* Badge 3 */}
                        <div className="flex items-center gap-5 md:justify-center py-4 md:py-0 md:pl-8">
                            <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                <FiRefreshCcw className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">7 Days Return</h4>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Easy Return Policy</p>
                            </div>
                        </div>
                        {/* Badge 4 */}
                        <div className="flex items-center gap-5 md:justify-center py-4 md:py-0 md:pl-8">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                                <FiHeadphones className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">24/7 Support</h4>
                                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">Dedicated Assistance</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT (Light) ── */}
            <div className="relative bg-white text-gray-600 overflow-hidden">

                {/* ── Wave + logo BEHIND everything, anchored to bottom ── */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <svg
                        className="absolute bottom-[100px] md:bottom-[120px] left-0 w-[200%] h-[350px] md:h-[450px] animate-wave"
                        viewBox="0 0 2400 300"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,60 C200,10 400,120 600,40 C800,0 1000,100 1200,30 C1400,0 1600,90 1800,20 C2000,0 2200,70 2400,10 L2400,300 L0,300 Z" fill="rgba(37, 99, 235, 0.04)" />
                        <path d="M0,100 C200,40 400,155 600,80 C800,15 1000,135 1200,60 C1400,10 1600,120 1800,50 C2000,10 2200,100 2400,40 L2400,300 L0,300 Z" fill="rgba(37, 99, 235, 0.08)" />
                        <path d="M0,140 C200,80 400,190 600,120 C800,50 1000,170 1200,100 C1400,40 1600,155 1800,85 C2000,35 2200,130 2400,70 L2400,300 L0,300 Z" fill="rgba(37, 99, 235, 0.12)" />
                    </svg>
                    {/* Floating Logo resting naturally on the wave */}
                    <div className="absolute bottom-[200px] md:bottom-[250px] left-[50%] md:left-[55%] z-10 animate-wave-ride transform -translate-x-1/2">
                        <Image
                            src="/Applex Logo.svg"
                            alt="Applex Logo watermark"
                            width={220}
                            height={220}
                            className="w-40 md:w-64 h-auto object-contain opacity-[0.15] drop-shadow-md"
                            unoptimized
                        />
                    </div>
                </div>

                {/* ── Actual footer content ON TOP ── */}
                <div className="relative z-10 max-w-[1550px] mx-auto px-4 md:px-8 pt-16 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                        {/* Col 1: Brand & About (4 columns -> 3 columns) */}
                        <div className="lg:col-span-3 flex flex-col gap-6">
                            <Link href="/" className="inline-block" aria-label="Home">
                                <Image
                                    src="/Applex Logo.svg"
                                    alt="Applex Logo"
                                    width={380}
                                    height={100}
                                    className="h-16 w-auto object-contain"
                                    unoptimized
                                />
                            </Link>
                            <p className="text-[14px] leading-relaxed text-gray-600 font-medium">
                                Applex is your ultimate wholesale destination for genuine electronics, gadgets, and accessories at unbeatable prices.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://web.facebook.com/Applex.bd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 hover:text-white hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-sm"><FaFacebook size={18} /></a>
                                <a href="https://www.tiktok.com/@applexofficialbd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 hover:text-white hover:bg-black hover:-translate-y-1 transition-all duration-300 shadow-sm"><FaTiktok size={18} /></a>
                                <a href="https://www.youtube.com/@user-lh5pe6ug2b" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 hover:text-white hover:bg-[#ff0000] hover:-translate-y-1 transition-all duration-300 shadow-sm"><FaYoutube size={18} /></a>
                            </div>
                        </div>

                        {/* Col 2: Company & Quick Navigation (3 columns) */}
                        <div className="lg:col-span-3 flex flex-col md:flex-row gap-12 lg:gap-8">
                            <div className="flex flex-col gap-5 flex-1">
                                <h3 className="text-base font-bold text-gray-900 tracking-tight border-l-4 border-blue-600 pl-3">Company</h3>
                                <div className="flex flex-col gap-3.5 mt-2">
                                    <Link href="/about" className="text-[14px] font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></span>
                                        About Us
                                    </Link>
                                    <Link href="/categories" className="text-[14px] font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></span>
                                        Shop Categories
                                    </Link>
                                    <Link href="/blogs" className="text-[14px] font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></span>
                                        Latest Blogs
                                    </Link>
                                    <Link href="/special-offers" className="text-[14px] font-medium text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-blue-600 transition-colors"></span>
                                        Special Offers
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5 flex-1 xl:ml-8">
                                <h3 className="text-base font-bold text-gray-900 tracking-tight border-l-4 border-blue-600 pl-3 uppercase">Navigate</h3>
                                <div className="flex flex-col gap-3.5 mt-2">
                                    <Link href="/track-order" className="text-[14px] text-gray-600 hover:text-blue-600 transition-colors font-medium">Track Order</Link>
                                    <Link href="/warranty" className="text-[14px] text-gray-600 hover:text-blue-600 transition-colors font-medium">Warranty Policy</Link>
                                    <Link href="/privacy" className="text-[14px] text-gray-600 hover:text-blue-600 transition-colors font-medium">Privacy</Link>
                                    <Link href="/terms" className="text-[14px] text-gray-600 hover:text-blue-600 transition-colors font-medium">Terms</Link>
                                </div>
                            </div>
                        </div>

                        {/* Col 3: Support & Policies (3 columns) */}
                        <div className="lg:col-span-3 flex flex-col gap-5 xl:pr-8">
                            <h3 className="text-base font-bold text-gray-900 tracking-tight border-l-4 border-blue-600 pl-3">Contact Us</h3>
                            <div className="flex flex-col gap-5 mt-2">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <FaMapMarkerAlt size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-gray-900 font-bold">Location</p>
                                        <p className="text-[13px] text-gray-600 leading-relaxed mt-0.5 font-medium">4D-018B1, Block D, Lvl 4, Jamuna Future Park, Dhaka</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <FaPhoneAlt size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-gray-900 font-bold">Emergency Contact</p>
                                        <p className="text-[13px] text-gray-600 mt-0.5 font-medium">01980-803060</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                        <FaClock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-gray-900 font-bold">Office Time</p>
                                        <p className="text-[13px] text-gray-600 mt-0.5 font-medium">11:00 am To 9:00 pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 4: Newsletter (3 columns) */}
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <h3 className="text-base font-bold text-gray-900 tracking-tight border-l-4 border-blue-600 pl-3">Newsletter</h3>
                            <p className="text-[14px] text-gray-600 mt-2 font-medium">
                                Sign up for get latest news and update about our products and offers.
                            </p>
                            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white border border-gray-200 text-gray-900 px-5 py-4 rounded-xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-sm font-medium shadow-sm"
                                />
                                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                                    Subscribe <FiSend />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                {/* Secure Payment Footer */}
                <div className="relative z-10 border-t border-gray-100 pt-10 pb-10 xl:mt-8">
                    <div className="max-w-[1550px] mx-auto px-4 md:px-8">
                        <div className="flex flex-col items-center gap-6">
                            <span className="text-[11px] uppercase text-gray-500 font-black tracking-[0.3em]">Official Payment Partner</span>
                            <div className="w-full relative h-12 md:h-16">
                                <Image
                                    src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-03.png"
                                    alt="SSLCommerz Payment Methods"
                                    fill
                                    className="object-contain brightness-100 unoptimized px-4"
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Strip */}
                <div className="bg-gray-50 border-t border-gray-100">
                    <div className="max-w-[1550px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-center text-center">
                        <p className="text-[13px] text-gray-500 font-medium">
                            &copy; {new Date().getFullYear()} <span className="text-gray-900 font-bold">Applex Ltd.</span> All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes waveScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes waveRide {
                    0% { transform: translate(-50%, 20px) rotate(-3deg); }
                    25% { transform: translate(-50%, -10px) rotate(1deg); }
                    50% { transform: translate(-50%, 15px) rotate(-1deg); }
                    75% { transform: translate(-50%, -15px) rotate(2deg); }
                    100% { transform: translate(-50%, 20px) rotate(-3deg); }
                }
                .animate-wave {
                    animation: waveScroll 26s linear infinite;
                }
                .animate-wave-ride {
                    animation: waveRide 18s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
}
