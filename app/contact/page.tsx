'use client';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-foreground">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground mb-12">
                            Have questions about a property or our management services? We are here to help.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Visit Our Office</h3>
                                    <p className="text-muted-foreground">Daya Plaza, 4th Floor</p>
                                    <p className="text-muted-foreground">Thika Road, Nairobi</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Call Us</h3>
                                    <p className="text-muted-foreground">+254 700 123 456</p>
                                    <p className="text-muted-foreground">+254 722 987 654</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Email Us</h3>
                                    <p className="text-muted-foreground">info@dayaproperties.co.ke</p>
                                    <p className="text-muted-foreground">support@dayaproperties.co.ke</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                    <Clock className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Working Hours</h3>
                                    <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 5:00 PM</p>
                                    <p className="text-muted-foreground">Sat: 9:00 AM - 1:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 rounded-3xl border border-white/10"
                    >
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors" placeholder="Your Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email Address</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors" placeholder="your@email.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors">
                                    <option>General Inquiry</option>
                                    <option>Plot Viewing</option>
                                    <option>Property Management</option>
                                    <option>Partnership</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea className="w-full bg-black/50 border border-white/10 rounded-lg p-3 h-32 focus:border-primary focus:outline-none transition-colors resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
