import { getBlogs } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiClock, FiCalendar } from "react-icons/fi";

export const metadata = {
    title: "Blog | Tech Insights & Guides",
    description: "Stay updated with the latest technology trends, product reviews, and helpful guides.",
};

export default async function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            title: "iPhone 16 Pro Max vs Samsung Galaxy S25 Ultra: Which One Wins?",
            excerpt: "We compare the two flagship titans head-to-head across camera, performance, battery, and value for money...",
            date: "March 5, 2026",
            category: "Comparison",
            readTime: "7 min read",
            image: "/no-image.svg",
            slug: "iphone-16-vs-samsung-s25"
        },
        {
            id: 2,
            title: "Top 5 Budget Phones Under ৳30,000 in 2026",
            excerpt: "Looking for the best value? Here are our top picks for budget-friendly smartphones that don't compromise...",
            date: "March 3, 2026",
            category: "Buying Guide",
            readTime: "5 min read",
            image: "/no-image.svg",
            slug: "top-5-budget-phones-2026"
        },
        {
            id: 3,
            title: "How to Spot Fake Phones: A Complete Guide",
            excerpt: "Protect yourself from counterfeit devices. Learn the telltale signs of fake smartphones and how to verify authenticity...",
            date: "February 28, 2026",
            category: "Tips",
            readTime: "4 min read",
            image: "/no-image.svg",
            slug: "how-to-spot-fake-phones"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Header / Breadcrumbs */}
            <div className="bg-gray-50 py-8 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6">
                    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <FiChevronRight size={14} />
                        <span className="text-blue-600 font-bold">Blog</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                        Latest Tech <span className="text-blue-600">Insights</span>
                    </h1>
                    <p className="mt-4 text-gray-600 max-w-2xl text-lg">
                        Stay ahead of the curve with our expert guides, product comparisons, and deep dives into the world of premium electronics.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                {blogPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {blogPosts.map((post) => (
                            <Link
                                href={`/blog/${post.slug || post.id}`}
                                key={post.id}
                                className="group flex flex-col bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500"
                            >
                                <div className="w-full aspect-[16/10] relative overflow-hidden bg-gray-100">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-md text-blue-600 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><FiCalendar className="text-blue-600" /> {post.date}</span>
                                        <span className="flex items-center gap-1.5"><FiClock className="text-blue-600" /> {post.readTime}</span>
                                    </div>
                                    <h3 className="font-black text-gray-900 text-xl mb-4 leading-snug group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-gray-50 flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Read Story <FiChevronRight />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCalendar size={32} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">No stories found</h2>
                        <p className="text-gray-500">We're currently writing new insights. Please check back later!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
