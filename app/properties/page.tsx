'use client';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { properties } from "@/data/properties";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

export default function PropertiesPage() {
    return (
        <main className="min-h-screen bg-black text-foreground">
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Our <span className="text-primary">Properties</span></h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Explore verified, high-potential land listings across Kenya. Your future investment starts here.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {properties.map((prop, i) => (
                        <motion.div
                            key={prop.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group glass-card rounded-2xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={prop.image}
                                    alt={prop.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                    <span className="text-primary font-bold">{prop.price}</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{prop.title}</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{prop.location}</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-sm">{prop.size}</span>
                                </div>
                                <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium flex items-center justify-center gap-2 group-hover:text-white">
                                    View Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
