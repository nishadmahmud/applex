import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function PromoBanners() {
    return (
        <section className="w-full bg-gray-50 py-10 md:py-14">
            <div className="max-w-[1550px] mx-auto px-4 md:px-8">
                <div className="text-center mb-8">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Special Promotions</h2>
                </div>
                {/* Banners hidden until API data available */}
            </div>
        </section>
    );
}
