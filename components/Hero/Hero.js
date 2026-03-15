"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiArrowRight, FiShield, FiTruck, FiRefreshCcw, FiCreditCard, FiHeadphones } from 'react-icons/fi';

export default function Hero({ slides = [], banners = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeSlides = Array.isArray(slides) ? slides : [];

    useEffect(() => {
        if (activeSlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const prevSlide = () => activeSlides.length && setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    const nextSlide = () => activeSlides.length && setCurrentSlide((prev) => (prev + 1) % activeSlides.length);

    return (
        <div className="w-full bg-gray-50 pt-4 pb-4 md:pt-6 md:pb-6">
            <div className="max-w-[1550px] mx-auto px-4 md:px-8 space-y-4 md:space-y-6">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 h-full">

                    {/* ── LEFT: MAIN SLIDER ── */}
                    <div className="w-full lg:w-[73%] relative aspect-[16/7.5] md:aspect-[24/10] rounded-lg md:rounded-2xl overflow-hidden shadow-sm group bg-white border border-gray-200">
                        {/* No slides from API */}
                        {activeSlides.length === 0 && (
                            <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200">
                                <span>Hero slides will appear here</span>
                            </div>
                        )}
                        {/* Slides */}
                        {activeSlides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out h-full w-full ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    } ${slide.bgColor || 'bg-white'}`}
                            >
                                {/* Full Background Image & Clickable Link */}
                                {slide.image && slide.image !== "/no-image.svg" && (
                                    <Link href={slide.link || "/"} className="absolute inset-0 z-0">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title || "Hero Slide"}
                                            fill
                                            className="object-cover object-center"
                                            unoptimized
                                            priority={idx === 0}
                                        />
                                    </Link>
                                )}

                                {/* Fallback Background */}
                                {(!slide.image || slide.image === "/no-image.svg") && (
                                    <div className="absolute inset-0 bg-gray-200 z-0 flex flex-col items-center justify-center text-gray-400 text-xs text-center border-2 border-dashed border-gray-300">
                                        <span className="bg-white px-2 py-1 rounded">No Image provided</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Carousel Dots - only when we have slides */}
                        {activeSlides.length > 0 && (
                            <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                                {activeSlides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className="group py-2 px-1"
                                        aria-label={`Go to slide ${idx + 1}`}
                                    >
                                        <div className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                            }`} />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Left/Right Arrows */}
                        {activeSlides.length > 0 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                >
                                    <FiChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                                >
                                    <FiChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>

                    {/* ── RIGHT: SIDE PROMO BANNERS ── */}
                    <div className="flex lg:flex flex-row lg:flex-col w-full lg:w-[27%] gap-2 md:gap-4">
                        {banners.length >= 2 ? (
                            <>
                                <Link href={banners[0].link || "#"} className="flex-1 relative aspect-[4/3] lg:aspect-auto lg:flex-1 rounded-lg md:rounded-2xl overflow-hidden group shadow-sm bg-white border border-gray-200 block">
                                    {banners[0].image && banners[0].image !== "/no-image.svg" ? (
                                        <Image
                                            src={banners[0].image}
                                            alt="Promo 1"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 p-4 md:p-6 flex flex-col justify-center">
                                            <span className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-1">Promo</span>
                                            <h3 className="text-white text-sm md:text-xl font-black leading-tight">Flash Sale</h3>
                                        </div>
                                    )}
                                </Link>

                                {/* Banner 2 */}
                                <Link href={banners[1].link || "#"} className="flex-1 relative aspect-[4/3] lg:aspect-auto lg:flex-1 rounded-lg md:rounded-2xl overflow-hidden group shadow-sm bg-white border border-gray-200 block">
                                    {banners[1].image && banners[1].image !== "/no-image.svg" ? (
                                        <Image
                                            src={banners[1].image}
                                            alt="Promo 2"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-rose-600 p-4 md:p-6 flex flex-col justify-center">
                                            <span className="text-red-100 text-[10px] font-bold uppercase tracking-wider mb-1">New</span>
                                            <h3 className="text-white text-sm md:text-xl font-black leading-tight">Arrivals</h3>
                                        </div>
                                    )}
                                </Link>
                            </>
                        ) : (
                            <div className="hidden lg:flex w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
                                <span>Promo Banners</span>
                            </div>
                        )}
                    </div>

                </div>

                {/* Trust / USP strip */}
                <div className="rounded-2xl border border-gray-100 bg-white shadow-xl shadow-gray-100/50 p-3 md:p-6 translate-y-2 md:translate-y-0">
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6">
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-blue-200">
                                <FiShield className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">Genuine Products</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-emerald-200">
                                <FiTruck className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 transition-all duration-300 group-hover:bg-amber-600 group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-amber-200">
                                <FiRefreshCcw className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">Easy Warranty</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-purple-200">
                                <FiCreditCard className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 transition-all duration-300 group-hover:bg-rose-600 group-hover:text-white group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-rose-200">
                                <FiRefreshCcw className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">7-Day Return</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center gap-1.5 group cursor-default">
                            <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl md:rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:-rotate-6 group-hover:shadow-lg group-hover:shadow-indigo-200">
                                <FiHeadphones className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[11px] md:text-[12px] font-bold text-gray-700 uppercase tracking-tight">24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
