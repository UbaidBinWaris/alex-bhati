'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-10" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.15),transparent_50%)]" />
                {/* Animated Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-medium tracking-wide uppercase text-white/80">Now Selling: Phase 4 Plots</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        Discover Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200">
                            Dream Investment
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Secure prime inputs with Dayo Properties. Whether for residential settlement or commercial growth, we provide the foundation for your future.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/book-visit">
                            <button className="px-8 py-4 rounded-xl bg-primary text-black font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(251,191,36,0.3)] flex items-center gap-2">
                                Schedule Site Visit
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                            View Listings
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
            >
                <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-current rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}
