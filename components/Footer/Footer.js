"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-applex-dark border-t border-applex-border/30 text-white/80 mt-auto">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8 mb-8 md:mb-12">

                    {/* Brand & Contact */}
                    <div className="flex flex-col gap-4 md:gap-5 col-span-2 sm:col-span-1">
                        <Link href="/" className="inline-block" aria-label="Home">
                            <Image
                                src="/Applex Logo.svg"
                                alt="Applex"
                                width={130}
                                height={40}
                                className="h-9 md:h-10 w-auto object-contain invert"
                                unoptimized
                            />
                        </Link>
                        <p className="text-xs md:text-sm leading-relaxed text-white/60 font-medium">
                            Bangladesh&apos;s premier destination for authentic smartphones, tablets, and tech accessories.
                        </p>
                        <div className="flex flex-col gap-2 text-xs md:text-sm text-white/70">
                            <p className="flex gap-2 items-start">
                                <strong className="text-white/90">Address:</strong>
                                <span>Dhaka, Bangladesh</span>
                            </p>
                            <p className="flex gap-2 items-center">
                                <strong className="text-white/90">Phone:</strong>
                                <a href="/" className="hover:text-applex-cyan font-semibold transition-colors">+880 1234 567890</a>
                            </p>
                        </div>
                        <div className="flex gap-3 mt-1">
                            <a href="/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full text-white/60 hover:bg-applex-cyan/15 hover:text-applex-cyan transition-all" aria-label="Facebook"><FaFacebook size={16} /></a>
                            <a href="/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full text-white/60 hover:bg-applex-cyan/15 hover:text-applex-cyan transition-all" aria-label="Instagram"><FaInstagram size={16} /></a>
                            <a href="/" target="_blank" rel="noopener noreferrer" className="bg-white/5 p-2 rounded-full text-white/60 hover:bg-applex-cyan/15 hover:text-applex-cyan transition-all" aria-label="YouTube"><FaYoutube size={16} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">Quick Links</h3>
                        <div className="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
                            <Link href="/about" className="text-white/60 hover:text-applex-cyan transition-colors">About Us</Link>
                            <Link href="/contact" className="text-white/60 hover:text-applex-cyan transition-colors">Contact Us</Link>
                            <Link href="/special-offers" className="text-applex-cyan font-bold hover:text-applex-cyan-light transition-colors">Special Offers</Link>
                            <Link href="/track-order" className="text-white/60 hover:text-applex-cyan transition-colors">Track Order</Link>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div className="flex flex-col gap-4 md:gap-5">
                        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">Support</h3>
                        <div className="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
                            <Link href="/warranty" className="text-white/60 hover:text-applex-cyan transition-colors">Warranty Policy</Link>
                            <Link href="/refund" className="text-white/60 hover:text-applex-cyan transition-colors">Refund & Returns</Link>
                            <Link href="/terms" className="text-white/60 hover:text-applex-cyan transition-colors">Terms & Conditions</Link>
                        </div>
                    </div>

                    {/* Connect With Us */}
                    <div className="flex flex-col gap-4 md:gap-5 col-span-2 sm:col-span-1">
                        <h3 className="text-sm md:text-base font-bold text-white uppercase tracking-wider">Connect</h3>
                        <div className="flex flex-col gap-2.5 text-xs md:text-sm font-medium">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-applex-cyan transition-colors"><FaFacebook size={14} /> Facebook</a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-applex-cyan transition-colors"><FaInstagram size={14} /> Instagram</a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-applex-cyan transition-colors"><FaYoutube size={14} /> YouTube</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Legal Bar */}
            <div className="border-t border-applex-border/20 bg-applex-black">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-xs font-semibold text-applex-muted/60 tracking-wide uppercase">
                    <p>&copy; {new Date().getFullYear()} Applex. All rights reserved.</p>
                    <div className="flex gap-4 md:gap-6">
                        <Link href="/terms" className="hover:text-applex-cyan transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-applex-cyan transition-colors">Terms</Link>
                        <Link href="/refund" className="hover:text-applex-cyan transition-colors">Refund</Link>
                        <Link href="/warranty" className="hover:text-applex-cyan transition-colors">Warranty</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
