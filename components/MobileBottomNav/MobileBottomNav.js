"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiGrid,
    FiShoppingCart,
    FiUser,
    FiHeart
} from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const { cartCount } = useCart();

    const navItems = [
        { icon: FiHome, label: 'Home', path: '/' },
        { icon: FiGrid, label: 'Categories', path: '/categories' },
        { icon: FiHeart, label: 'Wishlist', path: '/wishlist' },
        { icon: FiShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
        { icon: FiUser, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-around items-center h-[60px] px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full relative ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
                        >
                            {/* Active Top Border */}
                            {isActive && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b" />
                            )}

                            <div className="relative mb-1 mt-1">
                                <Icon className={`w-5 h-5 ${isActive ? 'fill-blue-50' : ''}`} strokeWidth={isActive ? 2.5 : 2} />

                                {/* Badge */}
                                {item.badge > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold h-[15px] w-[15px] rounded-full flex items-center justify-center shadow-sm">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <span className={`text-[10px] font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
