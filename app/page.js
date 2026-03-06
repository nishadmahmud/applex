import Hero from "../components/Hero/Hero";
import TrustStats from "../components/TrustStats/TrustStats";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import NewArrivals from "../components/NewArrivals/NewArrivals";
import PromoBanners from "../components/PromoBanners/PromoBanners";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import BestDeals from "../components/BestDeals/BestDeals";
import Testimonials from "../components/Testimonials/Testimonials";
import FAQ from "../components/FAQ/FAQ";
import BlogTips from "../components/BlogTips/BlogTips";
import CTABanner from "../components/CTABanner/CTABanner";

// When .env is configured, uncomment these imports:
// import {
//   getSlidersFromServer,
//   getCategoriesFromServer,
//   getNewArrivalsFromServer,
//   getProducts,
//   getBlogs,
//   getBannerFromServer,
//   getBestDealsFromServer,
//   getBestSellersFromServer
// } from "../lib/api";

export default async function Home() {
  // ═══════════════════════════════════════════
  // DUMMY DATA — Replace with API calls when .env is ready
  // ═══════════════════════════════════════════

  const heroSlides = [
    {
      id: 1,
      title: "iPhone 16 Pro Max",
      subtitle: "Titanium. Forged in innovation.",
      buttonText: "Shop Now",
      buttonLink: "/product/iphone-16-pro-max-1",
      image: "/no-image.svg",
      price: "৳ 1,89,900",
    },
    {
      id: 2,
      title: "Samsung Galaxy S25 Ultra",
      subtitle: "The ultimate Galaxy experience.",
      buttonText: "Explore",
      buttonLink: "/product/samsung-galaxy-s25-ultra-2",
      image: "/no-image.svg",
      price: "৳ 1,64,999",
    },
    {
      id: 3,
      title: "Google Pixel 9 Pro",
      subtitle: "AI-powered photography.",
      buttonText: "Learn More",
      buttonLink: "/product/google-pixel-9-pro-6",
      image: "/no-image.svg",
      price: "৳ 99,999",
    },
  ];

  const homeBanners = [
    { id: 1, image: "/no-image.svg", link: "/special-offers" },
    { id: 2, image: "/no-image.svg", link: "/category/accessories" },
  ];

  const categories = [
    { id: 1, name: "iPhone", slug: "iphone", image: "/no-image.svg" },
    { id: 2, name: "Samsung", slug: "samsung", image: "/no-image.svg" },
    { id: 3, name: "OnePlus", slug: "oneplus", image: "/no-image.svg" },
    { id: 4, name: "Xiaomi", slug: "xiaomi", image: "/no-image.svg" },
    { id: 5, name: "Google Pixel", slug: "google-pixel", image: "/no-image.svg" },
    { id: 6, name: "Tablets", slug: "tablets", image: "/no-image.svg" },
    { id: 7, name: "Accessories", slug: "accessories", image: "/no-image.svg" },
    { id: 8, name: "Smart Watches", slug: "smart-watches", image: "/no-image.svg" },
  ];

  const newArrivals = [
    {
      id: 1,
      name: "iPhone 16 Pro Max 256GB",
      brand: "Apple",
      price: "৳ 1,89,900",
      oldPrice: "৳ 1,99,900",
      discount: "-5%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S25 Ultra",
      brand: "Samsung",
      price: "৳ 1,64,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 3,
      name: "OnePlus 13 5G",
      brand: "OnePlus",
      price: "৳ 74,999",
      oldPrice: "৳ 79,999",
      discount: "-6%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 4,
      name: "Xiaomi 15 Ultra",
      brand: "Xiaomi",
      price: "৳ 89,999",
      oldPrice: "৳ 94,999",
      discount: "-5%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 5,
      name: "Samsung Galaxy A56 5G",
      brand: "Samsung",
      price: "৳ 36,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 6,
      name: "Google Pixel 9 Pro",
      brand: "Google",
      price: "৳ 99,999",
      oldPrice: "৳ 1,09,999",
      discount: "-9%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 7,
      name: "iPhone 16 128GB",
      brand: "Apple",
      price: "৳ 1,29,900",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 8,
      name: "OnePlus Nord 4",
      brand: "OnePlus",
      price: "৳ 39,999",
      oldPrice: "৳ 42,999",
      discount: "-7%",
      imageUrl: "/no-image.svg",
    },
  ];

  const flashSaleProducts = [
    {
      id: 10,
      name: "Samsung Galaxy A16",
      price: "৳ 18,499",
      oldPrice: "৳ 21,999",
      discount: "-16%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 11,
      name: "Xiaomi Redmi Note 14 Pro",
      price: "৳ 28,999",
      oldPrice: "৳ 32,999",
      discount: "-12%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 12,
      name: "iPhone 15 128GB",
      price: "৳ 1,09,900",
      oldPrice: "৳ 1,24,900",
      discount: "-12%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 13,
      name: "OnePlus 12R",
      price: "৳ 49,999",
      oldPrice: "৳ 54,999",
      discount: "-9%",
      imageUrl: "/no-image.svg",
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "iPhone 16 Pro Max 256GB",
      price: "৳ 1,89,900",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S25 Ultra",
      price: "৳ 1,64,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 14,
      name: "Samsung Galaxy Z Fold 6",
      price: "৳ 1,99,999",
      oldPrice: "৳ 2,19,999",
      discount: "-9%",
      imageUrl: "/no-image.svg",
    },
    {
      id: 15,
      name: "iPhone 16 Pro 128GB",
      price: "৳ 1,59,900",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 3,
      name: "OnePlus 13 5G",
      price: "৳ 74,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 6,
      name: "Google Pixel 9 Pro",
      price: "৳ 99,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 4,
      name: "Xiaomi 15 Ultra",
      price: "৳ 89,999",
      oldPrice: null,
      discount: null,
      imageUrl: "/no-image.svg",
    },
    {
      id: 16,
      name: "Samsung Galaxy Z Flip 6",
      price: "৳ 1,14,999",
      oldPrice: "৳ 1,24,999",
      discount: "-8%",
      imageUrl: "/no-image.svg",
    },
  ];

  const bestDealsCards = [
    {
      id: 12,
      title: "iPhone 15 128GB",
      description: "Apple • Save ৳ 15,000",
      price: "৳ 1,09,900",
      oldPrice: "৳ 1,24,900",
      savings: "Save ৳ 15,000",
      imageUrl: "/no-image.svg",
      badge: "-12%",
      link: "/product/iphone-15-128gb-12",
    },
    {
      id: 14,
      title: "Samsung Galaxy Z Fold 6",
      description: "Samsung • Flagship Foldable • Save ৳ 20,000",
      price: "৳ 1,99,999",
      oldPrice: "৳ 2,19,999",
      savings: "Save ৳ 20,000",
      imageUrl: "/no-image.svg",
      badge: "BEST DEAL",
      link: "/product/samsung-galaxy-z-fold-6-14",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "iPhone 16 Pro Max vs Samsung Galaxy S25 Ultra: Which One Wins?",
      excerpt: "We compare the two flagship titans head-to-head across camera, performance, battery, and value for money...",
      date: "March 5, 2026",
      category: "Comparison",
      readTime: "7 min read",
      image: "/no-image.svg",
      slug: "iphone-16-vs-samsung-s25",
    },
    {
      id: 2,
      title: "Top 5 Budget Phones Under ৳30,000 in 2026",
      excerpt: "Looking for the best value? Here are our top picks for budget-friendly smartphones that don't compromise...",
      date: "March 3, 2026",
      category: "Buying Guide",
      readTime: "5 min read",
      image: "/no-image.svg",
      slug: "top-5-budget-phones-2026",
    },
    {
      id: 3,
      title: "How to Spot Fake Phones: A Complete Guide",
      excerpt: "Protect yourself from counterfeit devices. Learn the telltale signs of fake smartphones and how to verify authenticity...",
      date: "February 28, 2026",
      category: "Tips",
      readTime: "4 min read",
      image: "/no-image.svg",
      slug: "how-to-spot-fake-phones",
    },
  ];

  return (
    <>
      <Hero slides={heroSlides} banners={homeBanners} />
      <TrustStats />
      <ShopCategories categories={categories} flashSaleProducts={flashSaleProducts} />
      <NewArrivals products={newArrivals} />
      <PromoBanners />
      <FeaturedProducts products={featuredProducts} />
      <BestDeals deals={bestDealsCards} />
      <BlogTips posts={blogPosts} />
      <CTABanner />
      <Testimonials />
      <FAQ />
    </>
  );
}
