import { FiBell } from 'react-icons/fi';

export default function CTABanner() {
    return (
        <section className="w-full bg-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-applex-cyan/10 border border-applex-cyan/20">

                    <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6">
                            <FiBell className="w-8 h-8 text-applex-cyan" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            Stay in the loop.
                        </h2>
                        <p className="text-gray-600 text-sm md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                            Join 50,000+ subscribers. Get exclusive early access to flash sales, new phone launches, and expert tech reviews directly in your inbox.
                        </p>

                        <form className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 outline-none focus:border-applex-cyan focus:ring-4 focus:ring-applex-cyan/20 transition-all font-medium shadow-sm"
                                required
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 rounded-full bg-applex-black text-white font-bold hover:bg-gray-800 transition-colors shadow-md whitespace-nowrap"
                            >
                                Subscribe Now
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-4">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
