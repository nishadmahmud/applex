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
        { icon: FiGrid, label: 'Brands', path: '/category' },
        { icon: FiHeart, label: 'Wishlist', path: '/wishlist' },
        { icon: FiShoppingCart, label: 'Cart', path: '/cart', badge: cartCount },
        { icon: FiUser, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.label}
                            href={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full relative ${isActive ? 'text-applex-cyan' : 'text-gray-500 hover:text-gray-900'
                                } transition-colors`}
                        >
                            <div className="relative mb-1">
                                <Icon className={`w-6 h-6 ${isActive ? 'fill-applex-cyan/20' : ''}`} />

                                {/* Badge for Cart */}
                                {item.badge > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-white">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <span className={`text-[10px] font-semibold ${isActive ? 'text-applex-cyan' : 'text-gray-500'}`}>
                                {item.label}
                            </span>

                            {/* Active Indicator Dot */}
                            {isActive && (
                                <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] bg-applex-cyan rounded-b-full shadow-[0_2px_8px_rgba(0,180,216,0.6)]" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
