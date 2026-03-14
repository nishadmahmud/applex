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
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10">
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

            {/* ── MAIN CONTENT (Dark) ── */}
            <div className="bg-[#111827] text-gray-400">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 pt-16 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                        
                        {/* Col 1: Brand & About (4 columns) */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <Link href="/" className="inline-block" aria-label="Home">
                                <Image
                                    src="/Applex Logo.svg"
                                    alt="Applex Logo"
                                    width={380}
                                    height={100}
                                    className="h-20 w-auto object-contain brightness-0 invert"
                                    unoptimized
                                />
                            </Link>
                            <p className="text-[14px] leading-relaxed max-w-sm text-gray-400">
                                Applex is your ultimate wholesale destination for genuine electronics, gadgets, and accessories at unbeatable prices. We bridge the gap between quality and affordability.
                            </p>
                            <div className="flex gap-4">
                                <a href="https://web.facebook.com/Applex.bd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-white hover:bg-blue-600 hover:-translate-y-1 transition-all duration-300 shadow-lg"><FaFacebook size={18} /></a>
                                <a href="https://www.tiktok.com/@applexofficialbd" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-white hover:bg-black hover:-translate-y-1 transition-all duration-300 shadow-lg"><FaTiktok size={18} /></a>
                                <a href="https://www.youtube.com/@user-lh5pe6ug2b" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-gray-800/50 flex items-center justify-center text-white hover:bg-[#ff0000] hover:-translate-y-1 transition-all duration-300 shadow-lg"><FaYoutube size={18} /></a>
                            </div>

                            <div className="flex flex-col gap-5 mt-4">
                                <h3 className="text-base font-bold text-white tracking-tight border-l-4 border-blue-600 pl-3 uppercase">Quick Navigation</h3>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                    <Link href="/track-order" className="text-[13px] hover:text-white transition-colors">Track Order</Link>
                                    <Link href="/warranty" className="text-[13px] hover:text-white transition-colors">Warranty Policy</Link>
                                    <Link href="/privacy" className="text-[13px] hover:text-white transition-colors">Privacy Policy</Link>
                                    <Link href="/terms" className="text-[13px] hover:text-white transition-colors">Terms & Conditions</Link>
                                </div>
                            </div>
                        </div>

                        {/* Col 2: Company Links (2 columns) */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            <h3 className="text-base font-bold text-white tracking-tight border-l-4 border-blue-600 pl-3">Company</h3>
                            <div className="flex flex-col gap-3.5 mt-2">
                                <Link href="/about" className="text-[14px] hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors"></span>
                                    About Us
                                </Link>
                                <Link href="/categories" className="text-[14px] hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors"></span>
                                    Shop Categories
                                </Link>
                                <Link href="/blogs" className="text-[14px] hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors"></span>
                                    Latest Blogs
                                </Link>
                                <Link href="/special-offers" className="text-[14px] hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-blue-500 transition-colors"></span>
                                    Special Offers
                                </Link>
                            </div>
                        </div>

                        {/* Col 3: Support & Policies (3 columns) */}
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <h3 className="text-base font-bold text-white tracking-tight border-l-4 border-blue-600 pl-3">Contact Us</h3>
                            <div className="flex flex-col gap-5 mt-2">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                                        <FaMapMarkerAlt size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white font-semibold">Our Location</p>
                                        <p className="text-[13px] text-gray-400 leading-relaxed mt-0.5">Shop: 4D-018B1, Block D, Level 4, Jamuna Future Park, Dhaka, 1229</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                                        <FaPhoneAlt size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white font-semibold">Emergency Contact</p>
                                        <p className="text-[13px] text-gray-400 mt-0.5">01980-803060</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                                        <FaClock size={16} />
                                    </div>
                                    <div>
                                        <p className="text-[13px] text-white font-semibold">Office Time</p>
                                        <p className="text-[13px] text-gray-400 mt-0.5">11:00 am To 9:00 pm</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Col 4: Newsletter (3 columns) */}
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <h3 className="text-base font-bold text-white tracking-tight border-l-4 border-blue-600 pl-3">Newsletter</h3>
                            <p className="text-[14px] text-gray-400 mt-2">
                                Sign up for get latest news and update about our products and offers.
                            </p>
                            <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="w-full bg-gray-800/50 border border-gray-700 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all text-base"
                                />
                                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2">
                                    Subscribe <FiSend />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>

                {/* Secure Payment Footer - FULL WIDTH SINGLE ROW */}
                <div className="border-t border-gray-800/50 py-10 bg-black/20">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8">
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
                <div className="bg-[#030712] border-t border-white/5">
                    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 flex flex-col md:flex-row items-center justify-center text-center">
                        <p className="text-[13px] text-gray-500 font-medium">
                            &copy; {new Date().getFullYear()} <span className="text-gray-300 font-bold">Applex Ltd.</span> All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
