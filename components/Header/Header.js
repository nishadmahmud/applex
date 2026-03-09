"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronRight, FiHeart, FiHeadphones, FiTruck } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { searchProducts } from '../../lib/api';

export default function Header({ categories = [] }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCategories, setSearchCategories] = useState([]);
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');

  const { cartCount, openCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  const defaultCategories = [
    { name: "iPhone", slug: "iphone" },
    { name: "Samsung", slug: "samsung" },
    { name: "OnePlus", slug: "oneplus" },
    { name: "Xiaomi", slug: "xiaomi" },
    { name: "Google Pixel", slug: "google-pixel" },
    { name: "Tablets", slug: "tablets" },
    { name: "Accessories", slug: "accessories" },
  ];

  const displayCategories = (categories && categories.length > 0 ? categories : defaultCategories).slice(0, 9);

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  // ── Search Logic ──
  const runSearch = async (q) => {
    if (!q) {
      setIsSearchOpen(false);
      setSearchResults([]);
      setSearchCategories([]);
      setSearchError('');
      return;
    }

    setIsSearchOpen(true);
    setIsSearching(true);
    setSearchError('');

    try {
      const res = await searchProducts(q);
      const payload = res?.data || res;
      const items = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

      const mapped = items.map((p) => {
        const basePrice = Number(p.retails_price || p.discounted_price || 0);
        const discountValue = Number(p.discount || 0);
        const discountType = String(p.discount_type || '').toLowerCase();
        const hasDiscount = discountValue > 0 && discountType !== '0';

        const price = hasDiscount
          ? discountType === 'percentage'
            ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
            : Math.max(0, basePrice - discountValue)
          : basePrice;

        const discountLabel = hasDiscount
          ? discountType === 'percentage'
            ? `-${discountValue}%`
            : `৳ ${discountValue.toLocaleString('en-IN')}`
          : null;

        const imageUrl =
          p.image_path || p.image_path1 || p.image_path2 ||
          (Array.isArray(p.image_paths) && p.image_paths[0]) || '/no-image.svg';

        return {
          id: p.id, name: p.name, price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel, imageUrl,
          brand: p.brands?.name || '', categoryName: p.category?.name || 'Others',
        };
      });

      setSearchResults(mapped);
      const cats = Array.from(new Set(mapped.map((m) => m.categoryName))).sort();
      setSearchCategories(cats);
      setActiveSearchCategory('all');
    } catch {
      setSearchError('Something went wrong. Please try again.');
      setSearchResults([]);
      setSearchCategories([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    runSearch(q);
  };

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) { setIsSearchOpen(false); setSearchResults([]); setSearchCategories([]); setSearchError(''); return; }
    const timeout = setTimeout(() => runSearch(q), 500);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const closeSearchModal = () => setIsSearchOpen(false);

  const filteredSearchResults = useMemo(() => {
    if (activeSearchCategory === 'all') return searchResults;
    return searchResults.filter((p) => p.categoryName === activeSearchCategory);
  }, [searchResults, activeSearchCategory]);

  return (
    <>
      {/* ── MARKETPLACE HEADER ── */}
      <header className="w-full sticky top-0 z-50 flex flex-col">

        {/* ── ALERTS / MINI TOP BAR (Dark Bluish) ── */}
        <div className="bg-[#111827] text-[11px] text-gray-300 py-1 px-4 md:px-8 border-b border-gray-800/50 hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-end gap-6 font-medium">
            <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5"><FiHeadphones className="text-[#facc15]" /> Contact Us</Link>
            <Link href="/blogs" className="hover:text-white transition-colors flex items-center gap-1.5"><FiSearch className="text-green-500" /> Blogs</Link>
            <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-1.5"><FiTruck className="text-purple-400" /> Track Order</Link>
          </div>
        </div>

        {/* MAIN TOP BAR (Dark Bluish) */}
        <div className="bg-[#111827] py-1.5 md:py-2 px-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 md:gap-10">

            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-1 text-white" aria-label="Menu">
                <FiMenu className="w-5 h-5" />
              </button>
              <Link href="/" aria-label="Applex Home">
                <Image
                  src="/Applex Logo.svg"
                  alt="Applex Logo"
                  width={160}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain brightness-0 invert"
                  unoptimized
                  priority
                />
              </Link>
            </div>

            {/* Main Search Bar (Desktop - Pill Shaped) */}
            <div className="hidden md:block flex-1 max-w-2xl relative">
              <form onSubmit={handleSearchSubmit} className="flex relative w-full bg-white rounded-full items-center p-1 overflow-hidden shadow-inner">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-5 pr-2 py-1.5 text-[14px] text-gray-900 outline-none border-none bg-transparent"
                />

                {searchQuery && (
                  <button type="button" onClick={() => { setSearchQuery(''); closeSearchModal(); }} className="mr-3 text-gray-400 hover:text-gray-600">
                    <FiX className="w-4 h-4" />
                  </button>
                )}

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-9 h-9 md:w-14 flex items-center justify-center font-bold transition-colors shadow-sm ml-1 flex-shrink-0">
                  <FiSearch className="w-4 h-4" />
                </button>
              </form>

              {/* Desktop Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-gray-200 rounded-lg shadow-2xl z-50 max-h-[60vh] flex flex-col overflow-hidden">
                  {isSearching ? (
                    <div className="p-8 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
                  ) : searchError ? (
                    <div className="p-6 text-center text-red-500">{searchError}</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No results found for &quot;{searchQuery}&quot;</div>
                  ) : (
                    <div className="flex h-full max-h-[50vh]">
                      <div className="w-1/3 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto">
                        <div className="space-y-1">
                          <button onClick={() => setActiveSearchCategory('all')} className={`w-full text-left px-3 py-2 rounded text-[13px] ${activeSearchCategory === 'all' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>All ({searchResults.length})</button>
                          {searchCategories.map(cat => (
                            <button key={cat} onClick={() => setActiveSearchCategory(cat)} className={`w-full text-left px-3 py-2 rounded text-[13px] ${activeSearchCategory === cat ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>{cat}</button>
                          ))}
                        </div>
                      </div>
                      <div className="w-2/3 p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredSearchResults.map(product => (
                          <Link key={product.id} href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`} onClick={closeSearchModal} className="group flex flex-row items-center gap-3 p-2 rounded hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                            <div className="w-12 h-12 relative bg-white border border-gray-100 rounded flex-shrink-0"><Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1" unoptimized /></div>
                            <div className="flex-1 min-w-0"><h4 className="text-[12px] text-gray-800 truncate group-hover:text-blue-600">{product.name}</h4><p className="text-[12px] font-bold text-gray-900">{product.price}</p></div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions (White text on black bg) */}
            <div className="flex items-center justify-end gap-5 flex-shrink-0 text-white">
              <button onClick={handleUserClick} className="flex items-center gap-2 hover:text-blue-400 transition-colors group text-left" aria-label="Account">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 group-hover:bg-gray-700 transition-colors">
                  <FiUser className="w-3.5 h-3.5" />
                </div>
                <div className="hidden lg:flex flex-col text-[11px]">
                  <span className="font-bold leading-none">{user ? 'My Profile' : 'Join / Sign in'}</span>
                  <span className="text-gray-400 mt-0.5">My Account</span>
                </div>
              </button>

              <Link href="/wishlist" className="hidden md:flex items-center justify-center hover:text-blue-400 transition-colors">
                <div className="w-7 h-7 flex items-center justify-center">
                  <FiHeart className="w-5 h-5" />
                </div>
              </Link>

              <button onClick={openCart} className="flex items-center gap-2 hover:text-blue-400 transition-colors relative" aria-label="Cart">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <FiShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#111827]">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[12px] font-bold hidden xl:block">Cart</span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar (Below Logo on Mobile) */}
          <div className="md:hidden mt-2 relative">
            <form onSubmit={handleSearchSubmit} className="flex relative w-full bg-white rounded-full items-center p-0.5 overflow-hidden shadow-inner">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-2 py-1 text-[12px] text-gray-900 outline-none bg-transparent"
              />
              <button type="submit" className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 ml-1">
                <FiSearch className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR (Dark Category Strip) */}
        <div className="hidden md:block bg-[#111827] border-b border-gray-900/50 shadow-sm relative z-40">
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center h-10">

            {/* All Categories Dropdown Trigger */}
            <div className="flex items-center px-4 font-bold cursor-pointer transition-all gap-2 text-white border-r border-gray-800 pr-6 mr-6 hover:text-blue-400 group">
              <FiMenu size={18} className="group-hover:text-blue-400" />
              <span className="text-xs tracking-wider uppercase">ALL CATEGORIES</span>
            </div>

            {/* Horizontal Links */}
            <nav className="flex-1 flex items-center overflow-x-auto no-scrollbar">
              {/* Categories in Middle area */}
              <div className="flex items-center gap-8">
                {displayCategories.slice(0, 6).map((cat, idx) => (
                  <Link
                    key={cat.id || idx}
                    href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs font-semibold text-gray-400 hover:text-white whitespace-nowrap transition-colors hidden lg:block"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              {/* Flash Sale & Offer on Far Right */}
              <div className="flex items-center gap-8 ml-auto">
                <Link href="/special-offers" className="text-xs font-bold text-gray-200 hover:text-white whitespace-nowrap flex items-center gap-1.5 transition-colors">
                  <span className="text-yellow-400 text-base">⚡</span> Flash Deals
                </Link>
                <Link href="/brand-offers" className="text-xs font-bold text-gray-200 hover:text-white whitespace-nowrap flex items-center gap-1.5 transition-colors">
                  <span className="text-red-500 text-base">🎁</span> Offer
                </Link>
              </div>
            </nav>
          </div>
        </div>

      </header>

      {/* ═══════════════════════════════════════════════════ */}
      {/* MOBILE SIDEBAR */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity" onClick={closeSidebar} />
      )}

      {/* Drawer */}
      <div className={`fixed inset-y-0 left-0 w-[280px] bg-white z-[70] transform transition-transform duration-300 ease-in-out flex flex-col md:hidden shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Header */}
        <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
          <Image src="/Applex Logo.svg" alt="Applex Logo" width={110} height={28} className="h-6 w-auto object-contain brightness-0 invert" unoptimized />
          <button onClick={closeSidebar} className="text-gray-400 hover:text-white p-1"><FiX size={20} /></button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</h4>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              {displayCategories.map((cat, idx) => (
                <Link
                  key={cat.id || idx}
                  href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={closeSidebar}
                  className="flex items-center justify-between px-4 py-3 text-[14px] text-gray-700 font-medium border-b border-gray-100 last:border-0 hover:bg-gray-50 hover:text-blue-600"
                >
                  {cat.name} <FiChevronRight size={16} className="text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 grid grid-cols-2 gap-3 bg-gray-50">
          <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex justify-center items-center gap-2 py-2.5 bg-white border border-gray-200 rounded font-bold text-gray-700 hover:text-blue-600">
            <FiUser size={16} /> {user ? 'Profile' : 'Login'}
          </button>
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex justify-center items-center gap-2 py-2.5 bg-blue-600 rounded font-bold text-white hover:bg-blue-700">
            <FiShoppingCart size={16} /> Cart
          </button>
        </div>
      </div>
    </>
  );
}
