import Link from "next/link";
import { FiChevronRight, FiTag } from "react-icons/fi";

export const metadata = {
    title: "Special Offers | Exclusive Deals & Combo Offers",
    description: "Discover the best deals, limited-time promotions, and exclusive combo offers at our store.",
};

export default function SpecialOffersPage() {
    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center py-32 bg-gray-50 rounded-[60px] border-2 border-dashed border-gray-200">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <FiTag size={40} className="text-gray-300" />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">No active offers right now</h2>
                    <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                        We're currently preparing some amazing deals for you. Check back soon or subscribe to our newsletter for instant updates!
                    </p>
                    <Link href="/" className="mt-10 inline-flex items-center gap-3 bg-brand-purple text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
                        Return Home <FiChevronRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}
