'use client';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Users, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black text-foreground">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <h1 className="text-5xl font-bold mb-6">Building The Future, <br /> <span className="text-primary">One Plot at a Time</span></h1>
                    <p className="text-xl text-muted-foreground">
                        Daya Properties is a next-generation real estate firm dedicated to simplifying property ownership and management in Kenya. We bridge the gap between plot acquisition and long-term asset growth.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Target className="w-32 h-32 text-primary" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-primary flex items-center gap-3">
                            <Target className="w-8 h-8" />
                            Our Mission
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To democratize land ownership by providing transparent, affordable, and high-value real estate solutions. We aim to shield investors from fraud and bureaucracy through automated, verified, and seamless property transactions.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-10 rounded-3xl border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Shield className="w-32 h-32 text-blue-500" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 text-blue-500 flex items-center gap-3">
                            <Shield className="w-8 h-8" />
                            Our Vision
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            To be the most trusted real estate partner in East Africa, leveraging technology to create a future where every plot of land is a secure, profitable, and stress-free asset for generations to come.
                        </p>
                    </motion.div>
                </div>

                <div className="text-center mb-24">
                    <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass-card p-8 rounded-2xl border border-white/10">
                            <div className="w-14 h-14 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <Users className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Customer First</h4>
                            <p className="text-muted-foreground">We prioritize your needs, offering personalized support from inquiry to title deed delivery.</p>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-white/10">
                            <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-500">
                                <Shield className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Integrity</h4>
                            <p className="text-muted-foreground">We operate with 100% transparency. No hidden fees, no ambiguous terms, just honest deals.</p>
                        </div>
                        <div className="glass-card p-8 rounded-2xl border border-white/10">
                            <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-amber-500">
                                <Target className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold mb-3">Innovation</h4>
                            <p className="text-muted-foreground">Using modern tech to streamline site visits, payments, and documentation for you.</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 rounded-3xl p-12 text-center border border-white/10">
                    <h2 className="text-3xl font-bold mb-4">Ready to Invest?</h2>
                    <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Join hundreds of happy landowners who have trusted Daya Properties.</p>
                    <a href="/book-visit" className="px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-amber-400 transition-colors inline-block">
                        Book a Free Site Visit
                    </a>
                </div>
            </div>

            <Footer />
        </div>
    );
}
