"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from 'react-icons/fa';
import { FiTruck, FiShield, FiHeadphones, FiRefreshCcw } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="mt-auto flex flex-col pt-10">
            {/* ── TOP BADGE STRIP (Light) ── */}
            <div className="bg-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-x-0 md:divide-x divide-gray-100">
                        {/* Badge 1 */}
                        <div className="flex items-center gap-4 md:justify-center">
                            <FiTruck className="w-8 h-8 text-blue-600" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Free Delivery</h4>
                                <p className="text-xs text-gray-500">For orders over ৳1000</p>
                            </div>
                        </div>
                        {/* Badge 2 */}
                        <div className="flex items-center gap-4 md:justify-center pl-0 md:pl-8">
                            <FiShield className="w-8 h-8 text-blue-600" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">Secure Payment</h4>
                                <p className="text-xs text-gray-500">100% secure payment</p>
                            </div>
                        </div>
                        {/* Badge 3 */}
                        <div className="flex items-center gap-4 md:justify-center pl-0 md:pl-8">
                            <FiRefreshCcw className="w-8 h-8 text-blue-600" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">7 Days Return</h4>
                                <p className="text-xs text-gray-500">If goods have problems</p>
                            </div>
                        </div>
                        {/* Badge 4 */}
                        <div className="flex items-center gap-4 md:justify-center pl-0 md:pl-8">
                            <FiHeadphones className="w-8 h-8 text-blue-600" />
                            <div>
                                <h4 className="text-sm font-bold text-gray-900">24/7 Support</h4>
                                <p className="text-xs text-gray-500">Dedicated support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── MAIN COLUMNS (Dark) ── */}
            <div className="bg-[#111827] text-gray-400">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 justify-between lg:grid-cols-5 gap-8 md:gap-10">

                        {/* Col 1: Brand & Contact */}
                        <div className="lg:col-span-2 flex flex-col gap-5">
                            <Link href="/" className="inline-block" aria-label="Home">
                                <Image
                                    src="/Applex Logo.svg"
                                    alt="Applex Logo"
                                    width={200}
                                    height={56}
                                    className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
                                    unoptimized
                                />
                            </Link>
                            <p className="text-[13px] leading-relaxed max-w-sm mt-2">
                                Applex is your ultimate wholesale destination for genuine electronics, gadgets, and accessories at unbeatable prices.
                            </p>
                            <div className="flex flex-col gap-3 text-[13px] mt-2">
                                <p><strong className="text-white">Email:</strong> support@applex.com.bd</p>
                                <p><strong className="text-white">Phone:</strong> +880 1234 567890</p>
                                <p><strong className="text-white">Address:</strong> Level 4, Tech City, Dhaka</p>
                            </div>
                            <div className="flex gap-3 mt-2">
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><FaFacebook size={14} /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><FaInstagram size={14} /></a>
                                <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white hover:bg-blue-600 transition-colors"><FaYoutube size={14} /></a>
                            </div>
                        </div>

                        {/* Col 2: Customer Service */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[15px] font-bold text-white uppercase tracking-wider mb-2">Customer Service</h3>
                            <Link href="/track-order" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Track Order</Link>
                            <Link href="/refund" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Returns & Refunds</Link>
                            <Link href="/warranty" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Warranty Policy</Link>
                            <Link href="/faq" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">FAQs</Link>
                            <Link href="/contact" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Contact Us</Link>
                        </div>

                        {/* Col 3: About Applex */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[15px] font-bold text-white uppercase tracking-wider mb-2">About Applex</h3>
                            <Link href="/about" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Our Story</Link>
                            <Link href="/careers" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Careers</Link>
                            <Link href="/terms" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Terms & Conditions</Link>
                            <Link href="/privacy" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Privacy Policy</Link>
                            <Link href="/flash-sale" className="text-[13px] hover:text-white transition-colors hover:translate-x-1 duration-200">Campaigns</Link>
                        </div>

                        {/* Col 4: Newsletter/App */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[15px] font-bold text-white uppercase tracking-wider mb-2">Download App</h3>
                            <div className="bg-gray-800 rounded p-4 border border-gray-700">
                                <p className="text-[12px] mb-3 leading-snug">Get access to exclusive mobile-only deals and early sales.</p>
                                <div className="space-y-2">
                                    <button className="w-full py-2 bg-gray-900 hover:bg-black text-white rounded text-[12px] font-bold border border-gray-600 transition-colors">App Store</button>
                                    <button className="w-full py-2 bg-gray-900 hover:bg-black text-white rounded text-[12px] font-bold border border-gray-600 transition-colors">Google Play</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ── BOTTOM STRIP (Darker) ── */}
            <div className="bg-[#030712] border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Applex Electronics Ltd. All rights reserved.</p>

                    {/* Payment Badges */}
                    <div className="flex items-center gap-3 text-gray-600">
                        <span className="mr-2 uppercase tracking-wides text-[10px] font-bold">Safe Payments</span>
                        <FaCcVisa className="w-8 h-8 hover:text-white transition-colors" />
                        <FaCcMastercard className="w-8 h-8 hover:text-white transition-colors" />
                        <FaCcPaypal className="w-8 h-8 hover:text-white transition-colors" />
                        <FaApplePay className="w-8 h-8 hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
