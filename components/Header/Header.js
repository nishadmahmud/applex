"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, FiChevronRight, FiHeart, FiHeadphones, FiTruck, FiFileText, FiCopy, FiZap, FiInfo } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useCompare } from '../../context/CompareContext';
import { useWishlist } from '../../context/WishlistContext';
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
  const { count: compareCount } = useCompare();
  const { wishlistCount } = useWishlist();
  const router = useRouter();

  const searchContainerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const defaultCategories = [
    { name: "iPhone", slug: "iphone" },
    { name: "Samsung", slug: "samsung" },
    { name: "OnePlus", slug: "oneplus" },
    { name: "Xiaomi", slug: "xiaomi" },
    { name: "Google Pixel", slug: "google-pixel" },
    { name: "Tablets", slug: "tablets" },
    { name: "Accessories", slug: "accessories" },
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  const handleUserClick = () => {
    if (user) {
      router.push('/profile');
    } else {
      openAuthModal('login');
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const toggleMobileCategory = (catId) => {
    setExpandedMobileCategory(prev => prev === catId ? null : catId);
  };

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
          id: p.id,
          name: p.name,
          price: `৳ ${price.toLocaleString('en-IN')}`,
          oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString('en-IN')}` : null,
          discount: discountLabel,
          imageUrl,
          brand: p.brands?.name || '',
          categoryName: p.category?.name || 'Others',
          raw: p,
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
        <div className="bg-[#111827] text-[13px] text-gray-300 py-1 border-b border-gray-800/50 hidden md:block">
          <div className="max-w-[1550px] mx-auto px-4 md:px-8 flex justify-end gap-6 font-medium">
            <Link href="/contact" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiHeadphones className="text-[#facc15]" /> Contact Us
            </Link>
            <Link href="/blogs" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiFileText className="text-blue-400" /> Blogs
            </Link>
            <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiTruck className="text-purple-400" /> Track Order
            </Link>
            <Link href="/compare" className="hover:text-white transition-colors flex items-center gap-1.5">
              <FiCopy className="text-blue-300" /> Compare
            </Link>
          </div>
        </div>

        {/* MAIN TOP BAR (Dark Bluish) */}
        <div className="bg-[#111827] py-2">
          <div className="max-w-[1550px] mx-auto px-4 md:px-8 flex items-center justify-between gap-6 md:gap-10">

            {/* Logo */}
            <div className="flex items-center flex-shrink-0 order-1 md:order-none">
              <Link href="/" aria-label="Applex Home" className="relative z-50 -mt-4 -mb-3 md:-mt-10 md:-mb-8 transition-transform hover:scale-105 duration-300">
                <Image
                  src="/Applex Logo.svg"
                  alt="Applex Logo"
                  width={320}
                  height={110}
                  className="h-24 md:h-26 w-auto object-contain brightness-0 invert"
                  unoptimized
                  priority
                />
              </Link>
            </div>

            {/* Main Search Bar (Middle on Mobile) */}
            <div ref={searchContainerRef} className="flex-1 max-w-2xl relative order-2 mx-1 md:mx-0 md:order-none">
              <form onSubmit={handleSearchSubmit} className="flex relative w-full bg-white rounded-full items-center p-1 overflow-hidden shadow-inner">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-5 pr-2 py-1.5 text-base text-gray-900 outline-none border-none bg-transparent"
                />

                {searchQuery && (
                  <button type="button" onClick={() => { setSearchQuery(''); closeSearchModal(); }} className="mr-3 text-gray-400 hover:text-gray-600">
                    <FiX className="w-4 h-4" />
                  </button>
                )}

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-8 h-8 md:w-12 md:h-9 flex items-center justify-center font-bold transition-colors shadow-sm ml-1 flex-shrink-0">
                  <FiSearch className="w-4 h-4" />
                </button>
              </form>

              {/* Desktop Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[1000px] max-w-[calc(100vw-32px)] bg-white border border-gray-200 rounded-lg shadow-2xl z-50 max-h-[70vh] flex flex-col overflow-hidden">
                  {isSearching ? (
                    <div className="p-8 flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>
                  ) : searchError ? (
                    <div className="p-6 text-center text-red-500">{searchError}</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">No results found for &quot;{searchQuery}&quot;</div>
                  ) : (
                    <div className="flex h-full max-h-[60vh]">
                      <div className="w-1/3 md:w-64 bg-gray-50 border-r border-gray-100 p-4 md:p-6 overflow-y-auto">
                        <div className="space-y-1.5">
                          <button onClick={() => setActiveSearchCategory('all')} className={`w-full text-left px-4 py-2.5 rounded-md text-sm ${activeSearchCategory === 'all' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>All ({searchResults.length})</button>
                          {searchCategories.map(cat => (
                            <button key={cat} onClick={() => setActiveSearchCategory(cat)} className={`w-full text-left px-4 py-2.5 rounded-md text-sm ${activeSearchCategory === cat ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-100'}`}>{cat}</button>
                          ))}
                        </div>
                      </div>
                      <div className="w-2/3 md:flex-1 p-4 md:p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 content-start">
                        {filteredSearchResults.map(product => (
                          <Link
                            key={product.id}
                            href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}-${product.id}`}
                            onClick={closeSearchModal}
                            className="group flex flex-row items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all shadow-sm shadow-transparent hover:shadow-gray-200/50"
                          >
                            <div className="w-16 h-16 md:w-20 md:h-20 relative bg-white border border-gray-100 rounded-lg shrink-0 overflow-hidden">
                              <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-2 hover:scale-110 transition-transform duration-300" unoptimized />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col gap-1">
                              <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-base font-extrabold text-gray-900">{product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions & Menu (Right on Mobile) */}
            <div className="flex items-center justify-end gap-3 md:gap-5 flex-shrink-0 text-white order-3 md:order-none">
              <button onClick={handleUserClick} className="hidden md:flex items-center gap-2 hover:text-blue-400 transition-colors group text-left" aria-label="Account">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 group-hover:bg-gray-700 transition-colors">
                  <FiUser className="w-3.5 h-3.5" />
                </div>
                <div className="hidden lg:flex flex-col text-[13px]">
                  <span className="font-bold leading-none">{user ? 'My Profile' : 'Join / Sign in'}</span>
                  <span className="text-gray-400 mt-0.5">My Account</span>
                </div>
              </button>

              <Link href="/wishlist" className="hidden md:flex items-center justify-center hover:text-blue-400 transition-colors relative" title="Wishlist">
                <div className="w-7 h-7 flex items-center justify-center relative">
                  <FiHeart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#111827]">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>

              <button onClick={openCart} className="hidden md:flex items-center gap-2 hover:text-blue-400 transition-colors relative" aria-label="Cart">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <FiShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center border border-[#111827]">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[14px] font-bold hidden xl:block">Cart</span>
              </button>

              {/* Mobile Menu Button (Hamburger at far right) */}
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-1 text-white flex-shrink-0 ml-1" aria-label="Menu">
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR (Dark Category Strip) */}
        <div className="hidden md:block bg-[#111827] border-b border-gray-900/50 shadow-sm relative z-40">
          <div className="max-w-[1550px] mx-auto px-4 md:px-8 flex items-center h-10">

            {/* All Categories Dropdown Trigger */}
            <div className="flex items-center px-4 font-bold cursor-pointer transition-all gap-2 text-white border-r border-gray-800 pr-6 mr-6 hover:text-blue-400 group relative py-2">
              <FiMenu size={18} className="group-hover:text-blue-400" />
              <span className="text-xs tracking-wider uppercase">ALL CATEGORIES</span>

              {/* All Categories Dropdown */}
              <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 rounded-b-lg py-2 flex flex-col">
                <div className="max-h-[70vh] overflow-y-auto overflow-x-hidden">
                  {displayCategories.map((cat, idx) => (
                    <div key={cat.id || idx} className="group/item relative">
                      <Link
                        href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between px-5 py-3 text-[13px] font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                      >
                        {cat.name}
                        {cat.sub_category && cat.sub_category.length > 0 && (
                          <FiChevronRight size={14} className="text-gray-400" />
                        )}
                      </Link>

                      {/* Subcategories Flyout */}
                      {cat.sub_category && cat.sub_category.length > 0 && (
                        <div className="absolute top-0 left-full w-56 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-200 z-[100] rounded-lg py-2 flex flex-col pt-0">
                          <div className="absolute -left-2 top-0 bottom-0 w-2 bg-transparent"></div> {/* Invisible bridge to prevent hover loss */}
                          {cat.sub_category.map(sub => (
                            <Link
                              key={sub.id}
                              href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}/${sub.slug || sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-5 py-2.5 text-[13px] font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Horizontal Links */}
            <nav className="flex-1 flex items-center overflow-x-auto no-scrollbar scroll-smooth pr-6">
              <div className="flex items-center gap-6 md:gap-8 min-w-max">
                {displayCategories.map((cat, idx) => (
                  <div key={cat.id || idx} className="relative group/nav py-2 h-full hidden lg:block">
                    <Link
                      href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-[13px] font-semibold text-gray-400 hover:text-white whitespace-nowrap transition-colors flex items-center gap-1"
                    >
                      {cat.name}
                    </Link>
                    {/* Subcategories Dropdown */}
                    {cat.sub_category && cat.sub_category.length > 0 && (
                      <div className="absolute top-full left-0 w-48 pt-0 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all z-50">
                        <div className="bg-white border border-gray-100 shadow-xl rounded-b-lg py-2 flex flex-col relative">
                          <div className="absolute -top-4 left-0 right-0 h-4 bg-transparent"></div>
                          {cat.sub_category.map(sub => (
                            <Link
                              key={sub.id}
                              href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}/${sub.slug || sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="px-4 py-2.5 text-[13px] font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors whitespace-normal"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Flash Sale & Offer on Far Right */}
            <div className="flex items-center gap-8 ml-auto">
              <Link href="/special-offers" className="text-[13px] font-bold text-gray-200 hover:text-white whitespace-nowrap flex items-center gap-1.5 transition-colors">
                <span className="text-yellow-400 text-base">⚡</span> Flash Deals
              </Link>
              <Link href="/offers" className="text-[13px] font-bold text-gray-200 hover:text-white whitespace-nowrap flex items-center gap-1.5 transition-colors">
                <span className="text-red-500 text-base">🎁</span> Offer
              </Link>
            </div>
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
        <div className="py-0 px-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between min-h-[70px]">
          <Image
            src="/Applex Logo.svg"
            alt="Applex Logo"
            width={240}
            height={80}
            className="h-20 w-auto object-contain brightness-0 invert"
            unoptimized
          />
          <button onClick={closeSidebar} className="text-gray-400 hover:text-white p-1">
            <FiX size={22} />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categories</h4>
              <div className="border border-gray-100 rounded-lg overflow-hidden">
                {displayCategories.map((cat, idx) => (
                  <div key={cat.id || idx} className="border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between px-4 py-3 text-[14px] text-gray-700 font-medium hover:bg-gray-50 hover:text-blue-600 transition-colors">
                      <Link
                        href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={closeSidebar}
                        className="flex-1"
                      >
                        {cat.name}
                      </Link>
                      {cat.sub_category && cat.sub_category.length > 0 ? (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleMobileCategory(cat.id || idx);
                          }}
                          className="p-1 -mr-1 text-gray-400 hover:text-blue-600"
                        >
                          <FiChevronRight
                            size={16}
                            className={`transform transition-transform ${expandedMobileCategory === (cat.id || idx) ? "rotate-90" : ""
                              }`}
                          />
                        </button>
                      ) : (
                        <FiChevronRight size={16} className="text-gray-400" />
                      )}
                    </div>

                    {cat.sub_category &&
                      cat.sub_category.length > 0 &&
                      expandedMobileCategory === (cat.id || idx) && (
                        <div className="bg-gray-50/50 px-4 py-2 border-t border-gray-100/50 flex flex-col gap-1">
                          {cat.sub_category.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/category/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}/${sub.slug || sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                              onClick={closeSidebar}
                              className="py-2 text-[13px] text-gray-600 hover:text-blue-600 pl-3 border-l-[3px] border-gray-200 hover:border-blue-600 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>

            {/* Other Links */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quick Links</h4>
              <div className="flex flex-col gap-1">
                <Link
                  href="/track-order"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiTruck className="w-4 h-4 text-blue-500" />
                  <span>Track Order</span>
                </Link>
                <Link
                  href="/compare"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiCopy className="w-4 h-4 text-blue-500" />
                  <span>Compare Phones</span>
                </Link>
                <Link
                  href="/special-offers"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiZap className="w-4 h-4 text-red-500" />
                  <span>Flash Deals & Offers</span>
                </Link>
                <Link
                  href="/blogs"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiFileText className="w-4 h-4 text-purple-500" />
                  <span>Blogs</span>
                </Link>
                <Link
                  href="/about"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiInfo className="w-4 h-4 text-gray-500" />
                  <span>About Us</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={closeSidebar}
                  className="px-3 py-2 rounded text-[13px] text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors flex items-center gap-2"
                >
                  <FiHeadphones className="w-4 h-4 text-green-500" />
                  <span>Contact Us</span>
                </Link>
              </div>
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
