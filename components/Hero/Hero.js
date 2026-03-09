"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

export default function Hero({ slides = [], banners = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const DUMMY_SLIDES = [
        {
            id: 1,
            title: "iPhone 16 Pro Max",
            subtitle: "Titanium. So strong. So light. So Pro.",
            image: "https://www.apple.com/v/iphone-16-pro/c/images/overview/welcome/hero__d71kikngtoyu_large.jpg",
            bgColor: "bg-gray-50",
            textColor: "text-gray-900",
            cta: "Buy Now",
            link: "/product/iphone-16-pro-max",
            badge: "New Arrival",
        },
        {
            id: 2,
            title: "Galaxy S25 Ultra",
            subtitle: "Galaxy AI is here. Welcome to the era of mobile AI.",
            image: "https://images.samsung.com/is/image/samsung/assets/us/smartphones/galaxy-s24-ultra/buy/S24Ultra-Color-Titanium_Gray_PC_0527_Final.jpg",
            bgColor: "bg-gray-100",
            textColor: "text-gray-900",
            cta: "Pre-order",
            link: "/product/galaxy-s25-ultra",
            badge: "Pre-order Now",
        },
        {
            id: 3,
            title: "Google Pixel 9 Pro",
            subtitle: "The most powerful Pixel yet.",
            image: "https://lh3.googleusercontent.com/x0RDEv_D3PzWp8sEYoIurqF5b_oW-_Xw7P_Jm_9uXjA27U7C7oE44D316N8Q12E9Qe374_4W5N4v2Oq_I7E=w1000",
            bgColor: "bg-gray-50",
            textColor: "text-gray-900",
            cta: "Explore",
            link: "/category/google-pixel",
            badge: "Bestseller",
        }
    ];

    const activeSlides = slides.length > 0 ? slides : DUMMY_SLIDES;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);

    return (
        <div className="w-full bg-gray-50 pt-4 pb-2 md:pt-6 md:pb-6">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-4 h-full">

                    {/* ── LEFT: MAIN SLIDER ── */}
                    <div className="w-full lg:w-[73%] relative h-[250px] sm:h-[350px] md:h-[450px] rounded-lg overflow-hidden shadow-sm group bg-white border border-gray-200">
                        {/* Slides */}
                        {activeSlides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                className={`absolute inset-0 transition-opacity duration-700 ease-in-out h-full w-full ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                    } ${slide.bgColor || 'bg-white'}`}
                            >
                                {/* Full Background Image */}
                                {slide.image && slide.image !== "/no-image.svg" && (
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-cover object-center"
                                            unoptimized
                                            priority={idx === 0}
                                        />
                                        {/* Optional dark gradient overlay so text is readable if image is bright */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                                    </div>
                                )}

                                {/* Fallback Background */}
                                {(!slide.image || slide.image === "/no-image.svg") && (
                                    <div className="absolute inset-0 bg-gray-200 z-0 flex flex-col items-center justify-center text-gray-400 text-xs text-center border-2 border-dashed border-gray-300">
                                        <span className="bg-white px-2 py-1 rounded">No Image provided</span>
                                    </div>
                                )}

                                {/* Slide Content Container */}
                                <div className="absolute inset-0 flex items-center px-6 md:px-12 z-10 w-full h-full">
                                    <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-start">
                                        {slide.badge && (
                                            <span className="inline-block px-2.5 py-1 mb-2 md:mb-4 text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-100 rounded-sm">
                                                {slide.badge}
                                            </span>
                                        )}

                                        <h1 className={`text-xl sm:text-3xl md:text-[2.75rem] font-black mb-2 md:mb-4 leading-tight tracking-tight ${slide.image && slide.image !== "/no-image.svg" ? 'text-white' : (slide.textColor || 'text-gray-900')}`}>
                                            {slide.title}
                                        </h1>

                                        <p className={`text-xs sm:text-sm md:text-base font-medium mb-4 md:mb-8 line-clamp-2 md:line-clamp-none ${slide.image && slide.image !== "/no-image.svg" ? 'text-gray-200' : 'text-gray-600'} `}>
                                            {slide.subtitle}
                                        </p>

                                        <Link
                                            href={slide.link || "/"}
                                            className="px-6 py-3 md:px-8 md:py-3.5 bg-blue-600 text-white rounded-md font-bold text-xs md:text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                                        >
                                            {slide.cta || "Shop Now"}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Carousel Dots */}
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

                        {/* Left/Right Arrows */}
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
                    </div>

                    {/* ── RIGHT: SIDE PROMO BANNERS ── */}
                    <div className="hidden lg:flex w-[27%] flex-col gap-4 h-[450px]">
                        {banners.length >= 2 ? (
                            <>
                                <Link href={banners[0].link || "#"} className="flex-1 relative rounded-lg overflow-hidden group shadow-sm bg-white border border-gray-200 block">
                                    {banners[0].image && banners[0].image !== "/no-image.svg" ? (
                                        <Image
                                            src={banners[0].image}
                                            alt="Promo 1"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 p-6 flex flex-col justify-center">
                                            <span className="text-blue-100 text-xs font-bold uppercase tracking-wider mb-2">Clearance Sale</span>
                                            <h3 className="text-white text-xl font-black leading-tight mb-2">Up to 50% Off<br />Accessories</h3>
                                            <span className="mt-auto text-white text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Shop Now <FiArrowRight /></span>
                                        </div>
                                    )}
                                </Link>

                                {/* Banner 2 */}
                                <Link href={banners[1].link || "#"} className="flex-1 relative rounded-lg overflow-hidden group shadow-sm bg-white border border-gray-200 block">
                                    {banners[1].image && banners[1].image !== "/no-image.svg" ? (
                                        <Image
                                            src={banners[1].image}
                                            alt="Promo 2"
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-red-500 to-rose-600 p-6 flex flex-col justify-center">
                                            <span className="text-red-100 text-xs font-bold uppercase tracking-wider mb-2">Limited Offer</span>
                                            <h3 className="text-white text-xl font-black leading-tight mb-2">Buy 1 Get 1<br />Free Cases</h3>
                                            <span className="mt-auto text-white text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Explore <FiArrowRight /></span>
                                        </div>
                                    )}
                                </Link>
                            </>
                        ) : (
                            <div className="w-full h-full bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-300">
                                <span>Promo Banners</span>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
