import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-[1550px] mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Just Landed</h2>
                            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">New</span>
                        </div>
                        <p className="text-gray-400 text-xs md:text-sm mt-1">Fresh arrivals, just for you</p>
                    </div>
                    <Link href="/categories" className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 transition-colors">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
                    {products.slice(0, 10).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
