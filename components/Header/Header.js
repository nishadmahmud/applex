"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronRight, FiHeart } from 'react-icons/fi';
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
      {/* ── EXTREMELY COMPACT, LIGHT HEADER ── */}
      <header className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">

        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          {/* Main Bar (Logo | Search | Icons | Categories) */}
          <div className="flex items-center justify-between py-2 md:py-3 gap-4 md:gap-6">

            {/* Mobile Menu Button + Logo */}
            <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-1 text-gray-700 hover:text-applex-cyan" aria-label="Menu">
                <FiMenu className="w-6 h-6" />
              </button>

              {/* Logo */}
              <Link href="/" aria-label="Applex Home">
                <Image
                  src="/Applex Logo.svg"
                  alt="Applex"
                  width={120}
                  height={32}
                  className="h-7 md:h-8 w-auto object-contain"
                  unoptimized
                  priority
                />
              </Link>
            </div>

            {/* Combined Search & Navigation (Desktop) */}
            <div className="hidden md:flex flex-1 items-center gap-6 xl:gap-10">

              {/* Category Pills Strip */}
              <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {displayCategories.map((cat, idx) => (
                  <Link
                    key={cat.id || idx}
                    href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-gray-100/80 text-gray-700 hover:bg-gray-900 hover:text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ))}
                <Link href="/special-offers" className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ml-1 border border-red-100">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                  </span>
                  Deals
                </Link>
              </nav>

              {/* Compact Search Bar */}
              <div className="flex-1 max-w-sm ml-auto relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative group">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 group-focus-within:text-applex-cyan transition-colors" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[13px] text-gray-900 placeholder:text-gray-400 outline-none focus:bg-white focus:border-applex-cyan focus:ring-2 focus:ring-applex-cyan/10 transition-all shadow-inner"
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => { setSearchQuery(''); closeSearchModal(); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <FiX className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </form>

                {/* Search Dropdown Overlay */}
                {isSearchOpen && (
                  <div className="absolute top-[calc(100%+12px)] right-0 w-[600px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-[70vh] flex flex-col overflow-hidden">
                    {/* (Search Dropdown Content Remained Same Light Theme Style) */}
                    {isSearching ? (
                      <div className="p-12 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-applex-cyan"></div>
                      </div>
                    ) : searchError ? (
                      <div className="p-8 text-center text-red-500">{searchError}</div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-12 text-center text-gray-400">No results found for &quot;{searchQuery}&quot;</div>
                    ) : (
                      <div className="flex h-full max-h-[60vh]">
                        {/* Left: Categories */}
                        <div className="w-1/3 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto">
                          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Filter by</h3>
                          <div className="space-y-1">
                            <button onClick={() => setActiveSearchCategory('all')} className={`w-full text-left px-3 py-2 rounded-xl text-[13px] transition-all ${activeSearchCategory === 'all' ? 'bg-white shadow-sm border border-gray-100 text-applex-cyan font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
                              All ({searchResults.length})
                            </button>
                            {searchCategories.map(cat => (
                              <button key={cat} onClick={() => setActiveSearchCategory(cat)} className={`w-full text-left px-3 py-2 rounded-xl text-[13px] flex justify-between items-center transition-all ${activeSearchCategory === cat ? 'bg-white shadow-sm border border-gray-100 text-applex-cyan font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <span className="truncate pr-2">{cat}</span>
                                <span className="text-[10px] text-gray-400">{searchResults.filter(p => p.categoryName === cat).length}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Right: Results */}
                        <div className="w-2/3 p-4 overflow-y-auto">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[13px] font-bold text-gray-900">{activeSearchCategory === 'all' ? 'Top Results' : activeSearchCategory}</h3>
                            <button onClick={closeSearchModal} className="text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase">Close</button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {filteredSearchResults.map(product => (
                              <Link key={product.id} href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`} onClick={closeSearchModal} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                <div className="w-12 h-12 relative bg-white border border-gray-100 rounded-lg flex-shrink-0">
                                  <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-1.5" unoptimized />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-[11px] font-semibold text-gray-900 truncate group-hover:text-applex-cyan transition-colors">{product.name}</h4>
                                  <p className="text-[11px] font-bold text-gray-900 mt-0.5">{product.price}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions (Account, Wishlist, Cart) */}
            <div className="flex items-center justify-end gap-2 md:gap-4 flex-shrink-0">
              <button
                onClick={handleUserClick}
                className="flex items-center gap-1.5 text-gray-600 hover:text-applex-cyan transition-all"
                aria-label="Account"
              >
                {user?.image ? (
                  <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-applex-cyan/40">
                    <Image src={user.image} alt="Profile" width={24} height={24} className="w-full h-full object-cover" unoptimized />
                  </div>
                ) : user ? (
                  <div className="w-6 h-6 rounded-full bg-applex-cyan/10 flex items-center justify-center text-[10px] font-bold text-applex-cyan ring-1 ring-applex-cyan/20">
                    {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser className="w-5 h-5" />
                )}
              </button>

              <Link href="/wishlist" className="hidden md:flex text-gray-600 hover:text-applex-cyan transition-all">
                <FiHeart className="w-5 h-5" />
              </Link>

              <button
                onClick={openCart}
                className="flex items-center gap-1.5 text-gray-600 hover:text-applex-cyan transition-all relative group"
                aria-label="Cart"
              >
                <div className="relative">
                  <FiShoppingCart className="w-5 h-5 md:w-[22px] md:h-[22px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-applex-cyan text-white text-[9px] font-bold h-[15px] w-[15px] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>

          </div>

          {/* Mobile Search Bar (Expandable, very compact) */}
          <div className="md:hidden pb-2.5">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-[13px] text-gray-900 placeholder:text-gray-400 outline-none focus:border-applex-cyan transition-all"
                />
              </div>
            </form>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════ */}
        {/* MOBILE CATEGORY PILLS STRIP (HORIZONTAL SCROLL) */}
        {/* ═══════════════════════════════════════════════════ */}
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="overflow-x-auto no-scrollbar py-2 px-4 flex items-center gap-2">
            <Link href="/special-offers" className="bg-red-50 text-red-600 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 flex items-center gap-1 border border-red-100">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span></span>
              Deals
            </Link>
            {displayCategories.map((cat, idx) => (
              <Link
                key={cat.id || idx}
                href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gray-100 text-gray-700 hover:bg-gray-900 hover:text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex-shrink-0 transition-colors"
              >
                {cat.name}
              </Link>
            ))}
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
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <Link href="/" onClick={closeSidebar} aria-label="Home">
            <Image src="/Applex Logo.svg" alt="Applex" width={110} height={28} className="h-6 w-auto object-contain" unoptimized />
          </Link>
          <button onClick={closeSidebar} className="p-2 -mr-2 text-gray-400 hover:text-gray-900 transition-colors">
            <FiX size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-2">Brand Showcase</h4>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {displayCategories.map((cat, idx) => (
                <Link
                  key={cat.id || idx}
                  href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={closeSidebar}
                  className="flex items-center justify-between px-4 py-3 text-[13px] text-gray-800 font-semibold border-b border-gray-50 last:border-0 hover:text-applex-cyan transition-colors"
                >
                  {cat.name}
                  <FiChevronRight size={14} className="text-gray-300" />
                </Link>
              ))}
            </div>

            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2 px-2">Support</h4>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              {[
                { name: 'Track Order', href: '/track-order' },
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link key={link.name} href={link.href} onClick={closeSidebar} className="flex items-center justify-between px-4 py-3 text-[13px] text-gray-600 font-medium border-b border-gray-50 last:border-0 hover:text-applex-cyan transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-2">
          <button onClick={() => { closeSidebar(); handleUserClick(); }} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-gray-200 text-[13px] font-bold text-gray-700 hover:text-applex-cyan hover:border-applex-cyan/30 transition-all">
            <FiUser size={16} />
            {user ? 'Profile' : 'Sign In'}
          </button>
          <button onClick={() => { closeSidebar(); openCart(); }} className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-gray-900 text-white text-[13px] font-bold hover:bg-black transition-all">
            <FiShoppingCart size={16} />
            Cart
          </button>
        </div>
      </div>
    </>
  );
}
