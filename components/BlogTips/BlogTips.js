import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';

export default function BlogTips({ posts = [] }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 md:mb-10">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Tech Insights</h2>
                        <p className="text-gray-500 text-sm mt-1">Reviews, guides & expert tips</p>
                    </div>
                    <Link href="/blogs" className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1 transition-colors">
                        All Posts <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group rounded-2xl bg-white border border-gray-200 overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col"
                        >
                            {/* Image */}
                            <div className="aspect-video relative bg-white overflow-hidden">
                                <Image
                                    src={post.image || "/no-image.svg"}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    unoptimized
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-sm shadow-sm text-gray-900 text-[10px] font-bold uppercase">
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-5 flex flex-col flex-1">
                                <div className="flex items-center gap-3 text-[10px] md:text-xs text-gray-500 mb-3">
                                    <span className="flex items-center gap-1"><FiCalendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><FiClock className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
