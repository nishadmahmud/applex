"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    FiHome,
    FiGrid,
    FiShoppingBag,
    FiUser,
    FiBookmark
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
        if (e) e.preventDefault();
        if (user) {
            router.push('/profile');
        } else {
            openAuthModal('login');
        }
    };

    const navItems = [
        { icon: FiHome, label: 'Home', path: '/' },
        { icon: FiGrid, label: 'Categories', path: '/categories' },
        { icon: FiShoppingBag, label: 'Cart', path: null, badge: cartCount, onClick: openCart },
        { icon: FiBookmark, label: 'Wishlist', path: '/wishlist', badge: wishlistCount },
        { icon: FiUser, label: 'Profile', path: null, onClick: handleProfileClick },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] pb-safe pointer-events-none">
            {/* Floating glass pill */}
            <div className="mx-auto w-[calc(100%-32px)] max-w-[400px] mb-5 rounded-full bg-white/40 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 pointer-events-auto">
                <div className="flex justify-between items-center h-[64px] px-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isProfile = item.label === 'Profile';
                        
                        const isActive = item.path
                            ? pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
                            : (isProfile && pathname === '/profile');

                        const commonInner = (
                            <div className="relative flex items-center justify-center w-full h-full">
                                <Icon
                                    className={`w-[22px] h-[22px] transition-all duration-300 ${isActive ? 'text-blue-600 scale-110' : 'text-gray-900 hover:text-gray-600'}`}
                                    strokeWidth={isActive ? 2.8 : 2}
                                />
                                {/* Badge */}
                                {item.badge > 0 && (
                                    <span className="absolute top-1/2 -mt-4 left-1/2 ml-1 bg-red-500 text-white text-[9px] font-bold h-[16px] min-w-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                        );

                        if (item.onClick) {
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={item.onClick}
                                    className="flex items-center justify-center w-12 h-12 relative rounded-full"
                                    aria-label={item.label}
                                >
                                    {commonInner}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.path || '/'}
                                className="flex items-center justify-center w-12 h-12 relative rounded-full"
                                aria-label={item.label}
                            >
                                {commonInner}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
