"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

export default function Hero({ slides = [], banner1, banner2 }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    // High-quality modern tech hero banner
    const DUMMY_SLIDES = [
        {
            id: 1,
            title: "iPhone 16 Pro Max",
            subtitle: "Titanium. So strong. So light. So Pro.",
            image: "https://www.apple.com/v/iphone-16-pro/c/images/overview/welcome/hero__d71kikngtoyu_large.jpg",
            bgColor: "bg-white",
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
            bgColor: "bg-gray-50",
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
            bgColor: "bg-white",
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
        }, 6000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % activeSlides.length);

    return (
        <div className="w-full bg-white relative">
            <div className="w-full relative h-[450px] md:h-[550px] xl:h-[650px] overflow-hidden group border-b border-gray-100">

                {/* Slides */}
                {activeSlides.map((slide, idx) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center h-full w-full ${idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            } ${slide.bgColor || 'bg-white'}`}
                    >
                        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 h-full flex items-center justify-center md:justify-between flex-col md:flex-row gap-8">

                            {/* Text Content */}
                            <div className={`z-10 text-center md:text-left md:w-1/2 flex flex-col items-center md:items-start transform transition-all duration-700 delay-100 ${idx === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}>
                                {slide.badge && (
                                    <span className="inline-block px-3 py-1 mb-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-applex-cyan bg-applex-cyan/10 rounded-full">
                                        {slide.badge}
                                    </span>
                                )}

                                <h1 className={`text-4xl md:text-6xl xl:text-7xl font-black mb-4 tracking-tighter ${slide.textColor || 'text-gray-900'}`}>
                                    {slide.title}
                                </h1>

                                <p className="text-gray-500 text-sm md:text-lg lg:text-xl font-medium mb-8 max-w-sm md:max-w-md mx-auto md:mx-0">
                                    {slide.subtitle}
                                </p>

                                <Link
                                    href={slide.link || "/"}
                                    className="group relative px-6 md:px-8 py-3 md:py-4 bg-[#0a0a0a] text-white overflow-hidden rounded-full font-bold text-sm md:text-base flex items-center gap-2 transition-transform hover:scale-105"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {slide.cta || "Shop Now"}
                                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-applex-cyan opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                </Link>
                            </div>

                            {/* Image Hero (Right side) */}
                            <div className={`hidden md:flex relative w-1/2 h-full items-center justify-center transform transition-all duration-1000 delay-200 ${idx === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
                                }`}>
                                {slide.image && (
                                    <div className="relative w-[300px] h-[300px] lg:w-[450px] lg:h-[450px]">
                                        <Image
                                            src={slide.image}
                                            alt={slide.title}
                                            fill
                                            className="object-contain"
                                            unoptimized
                                            priority={idx === 0}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Carousel Navigation */}
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
                    {activeSlides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className="group py-2"
                            aria-label={`Go to slide ${idx + 1}`}
                        >
                            <div className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-10 bg-applex-cyan' : 'w-2 bg-gray-300 hover:bg-gray-400'
                                }`} />
                        </button>
                    ))}
                </div>

                {/* Left/Right Arrows (Desktop) */}
                <button
                    onClick={prevSlide}
                    className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                    <FiChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
                >
                    <FiChevronRight size={24} />
                </button>

            </div>
        </div>
    );
}
