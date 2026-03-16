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
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function MobileBottomNav() {
    const pathname = usePathname();
    const { cartCount, openCart } = useCart();
    const { wishlistCount } = useWishlist();
    const { user, openAuthModal } = useAuth();
    const router = useRouter();

    const handleProfileClick = (e) => {
        e.preventDefault();
        if (user) {
            router.push('/profile');
        } else {
            openAuthModal('login');
        }
    };

    const navItems = [
        { icon: FiHome, label: 'Home', path: '/' },
        { icon: FiGrid, label: 'Categories', path: '/categories' },
        { icon: FiHeart, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
        // Cart and Profile will handle their own clicks
        { icon: FiShoppingCart, label: 'Cart', path: null, badge: cartCount },
        { icon: FiUser, label: 'Profile', path: null },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] pb-safe">
            {/* Floating liquid-glass pill */}
            <div className="mx-auto w-[calc(100%-24px)] max-w-[520px] mb-3 rounded-[22px] bg-white/12 backdrop-blur-3xl shadow-[0_18px_55px_rgba(15,23,42,0.45)] border border-white/25 ring-1 ring-white/15">
                <div className="flex justify-around items-center h-[64px] px-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.path
                        ? pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
                        : false;

                    const isCart = item.label === 'Cart';
                    const isProfile = item.label === 'Profile';

                    const commonInner = (
                        <>
                            <div className="relative mb-1 mt-1">
                                <Icon
                                    className={`w-5 h-5 ${(isActive || (isProfile && pathname === '/profile')) ? 'text-blue-700' : 'text-gray-800/70'}`}
                                    strokeWidth={(isActive || (isProfile && pathname === '/profile')) ? 2.6 : 2.2}
                                />

                                {/* Badge */}
                                {item.badge > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold h-[15px] w-[15px] rounded-full flex items-center justify-center shadow-sm">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <span className={`text-[10px] font-semibold ${isActive ? 'text-blue-700' : 'text-gray-700/70'}`}>
                                {item.label}
                            </span>
                        </>
                    );

                    if (isCart || isProfile) {
                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={isCart ? openCart : handleProfileClick}
                                    className={`flex flex-col items-center justify-center w-full h-full relative rounded-[18px] transition-all ${isActive || (isProfile && pathname === '/profile')
                                    ? 'bg-white/22 shadow-[0_10px_30px_rgba(37,99,235,0.45)]'
                                    : 'hover:bg-white/10'
                                    }`}
                            >
                                {(isActive || (isProfile && pathname === '/profile')) && (
                                    <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-blue-600 rounded-b-full" />
                                )}
                                {commonInner}
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.label}
                            href={item.path || '/'}
                            className={`flex flex-col items-center justify-center w-full h-full relative rounded-[18px] transition-all ${isActive
                                ? 'bg-white/22 shadow-[0_10px_30px_rgba(37,99,235,0.45)]'
                                : 'hover:bg-white/10'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-blue-600 rounded-b-full" />
                            )}
                            {commonInner}
                        </Link>
                    );
                })}
            </div>
            </div>
        </div>
    );
}
