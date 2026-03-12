"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const router = useRouter();

    const slug = product.name
        ? `${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`
        : String(product.id);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // If product has variants, send user to product page to pick options
        if (product.hasVariants) {
            router.push(`/product/${slug}`);
            return;
        }

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl || product.image,
        });
    };

    return (
        <div className="group relative rounded-2xl bg-white border border-gray-100 overflow-hidden hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden bg-gray-50 p-4">
                <Image
                    src={product.imageUrl || product.image || "/no-image.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                />

                {product.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                        {product.discount}
                    </div>
                )}

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 w-9 h-9 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20 flex items-center justify-center translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:bg-blue-700"
                    title="Quick Add to Cart"
                >
                    <FiShoppingCart className="w-4 h-4" />
                </button>
            </Link>

            {/* Info Container */}
            <div className="p-3.5 md:p-4 flex flex-col grow">
                <div className="flex flex-col gap-1 mb-2">
                    {product.brand && (
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                            {product.brand}
                        </span>
                    )}

                    <Link href={`/product/${slug}`}>
                        <h3 className="text-[12px] md:text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <div className="mt-auto pt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-[15px] md:text-[17px] font-black text-gray-900 leading-none">
                            {product.price}
                        </span>
                        {product.oldPrice && (
                            <span className="text-[11px] text-gray-400 line-through">
                                {product.oldPrice}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="md:hidden w-full mt-3 py-2 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-wider rounded-lg hover:bg-blue-100 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
