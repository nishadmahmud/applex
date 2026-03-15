"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images = [] }) {
    const imageArray = images && images.length > 0 
        ? images.map(img => typeof img === 'string' ? img.trim() : img) 
        : ['/no-image.svg'];
    const [mainImage, setMainImage] = useState(imageArray[0]);

    // When images prop changes (e.g., variant color selected), reset to first image
    useEffect(() => {
        if (imageArray.length > 0) {
            setMainImage(imageArray[0]);
        }
    }, [images]);

    return (
        <div className="flex flex-col md:flex-row-reverse gap-4 lg:gap-6">
            {/* Main Image Container */}
            <div className="flex-1 aspect-square relative bg-[#f5f5f5] rounded-2xl border border-gray-100 overflow-hidden flex items-center justify-center p-4">
                <Image
                    src={mainImage}
                    alt="Product Image"
                    fill
                    unoptimized
                    className="object-contain"
                />
            </div>

            {/* Thumbnail Strip (Left on Desktop, Bottom on Mobile) */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 no-scrollbar shrink-0 md:w-20 lg:w-24">
                {imageArray.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`relative w-16 h-16 md:w-full aspect-square shrink-0 rounded-xl border-2 overflow-hidden bg-[#f5f5f5] transition-all ${mainImage === img ? 'border-blue-600' : 'border-gray-100 hover:border-gray-300'
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            fill
                            unoptimized
                            className="object-contain p-2"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
