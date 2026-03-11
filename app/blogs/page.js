"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock, FiSearch } from 'react-icons/fi';
import { getBlogs } from '../../lib/api';

const DUMMY_POSTS = [
    {
        id: "d1",
        title: "How to Choose the Perfect Smartphone for Your Needs",
        slug: "choose-perfect-smartphone",
        category: "GUIDES",
        date: "March 10, 2024",
        readTime: "5 min read",
        excerpt: "With so many options in the market, finding the right phone can be overwhelming. Here's a comprehensive guide to help you decide.",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800"
    },
    {
        id: "d2",
        title: "Top 5 Accessories for Your New iPhone 15",
        slug: "top-5-iphone-accessories",
        category: "REVIEWS",
        date: "March 8, 2024",
        readTime: "4 min read",
        excerpt: "From MagSafe chargers to premium cases, these are the essential accessories you need for your new device.",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800"
    },
    {
        id: "d3",
        title: "Why Battery Health Matters and How to Maintain It",
        slug: "battery-health-maintenance",
        category: "TECH TIPS",
        date: "March 5, 2024",
        readTime: "6 min read",
        excerpt: "Understanding how your smartphone battery works can help you extend its lifespan and maintain performance over time.",
        image: "https://images.unsplash.com/photo-1583573636246-18cb2246697f?q=80&w=800"
    },
    {
        id: "d4",
        title: "The Future of Foldable Technology",
        slug: "future-of-foldables",
        category: "TECH NEWS",
        date: "March 1, 2024",
        readTime: "8 min read",
        excerpt: "Are foldable phones here to stay? We dive deep into the latest trends and what's coming next in the industry.",
        image: "https://images.unsplash.com/photo-1611186871348-b1ec696e520b?q=80&w=800"
    }
];

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchBlogs() {
            try {
                const res = await getBlogs();
                if (res?.success && res.data && res.data.length > 0) {
                    setPosts(res.data);
                } else {
                    setPosts(DUMMY_POSTS);
                }
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
                setPosts(DUMMY_POSTS);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, []);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <div className="bg-blue-600 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                        Applex Insights
                    </h1>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                        Your go-to source for smartphone reviews, tech guides, and industry news.
                    </p>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 p-4 md:p-6 border border-gray-100">
                    <div className="relative max-w-xl mx-auto">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="animate-pulse bg-white rounded-3xl h-[400px] border border-gray-100"></div>
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredPosts.map((post) => (
                            <Link 
                                key={post.id} 
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden hover:border-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500"
                            >
                                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                                    <Image 
                                        src={post.image || "/no-image.svg"} 
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm border border-white/20">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-medium">
                                        <span className="flex items-center gap-1.5"><FiCalendar className="w-3.5 h-3.5" /> {post.date}</span>
                                        <span className="flex items-center gap-1.5"><FiClock className="w-3.5 h-3.5" /> {post.readTime}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-500 text-sm md:text-base line-clamp-3 leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center text-blue-600 font-bold text-sm gap-2">
                                        Read Article <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <h3 className="text-xl font-bold text-gray-900">No matching articles found</h3>
                        <p className="text-gray-500 mt-2">Try searching with a different keyword.</p>
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
