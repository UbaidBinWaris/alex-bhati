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

                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-muted-foreground">To empower investors by providing transparent, high-value land deals and automated management solutions.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-500">
                            <Shield className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Trust & Security</h3>
                        <p className="text-muted-foreground">We ensure every title deed is genuine and every transaction is secure. No hidden fees, no complications.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8 rounded-2xl border border-white/10 text-center"
                    >
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Customer First</h3>
                        <p className="text-muted-foreground">From site visits to title transfer, our team walks with you every step of the journey.</p>
                    </motion.div>
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
