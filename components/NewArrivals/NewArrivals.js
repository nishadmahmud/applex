import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../Shared/ProductCard';

export default function NewArrivals({ products = [] }) {
    return (
        <section className="w-full bg-gray-50 py-10 md:py-14 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10 border-b border-gray-200 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight uppercase">Just Landed</h2>
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">New Arrivals</span>
                    </div>
                    <Link href="/category" className="bg-white border border-gray-200 hover:border-blue-600 text-blue-600 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2">
                        View All <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {products.slice(0, 10).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
