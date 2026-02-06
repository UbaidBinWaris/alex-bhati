'use client';

import { motion } from 'framer-motion';
import { Search, Map, FileCheck, Key } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Browse Listings",
        description: "Explore our curated list of prime properties with verified titles.",
        icon: Search
    },
    {
        id: 2,
        title: "Book a Visit",
        description: "Schedule a free site visit to see the property layout and amenities.",
        icon: Map
    },
    {
        id: 3,
        title: "Due Diligence",
        description: "We facilitate title searches and legal verification for your peace of mind.",
        icon: FileCheck
    },
    {
        id: 4,
        title: "Ownership Transfer",
        description: "Complete payment and receive your title deed within 60 days.",
        icon: Key
    }
];

export function ProductionWorkflow() {
    return (
        <section className="py-24 bg-zinc-900/50 relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-muted-foreground">Your journey to land ownership in 4 simple steps.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />

                    <div className="grid md:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="relative text-center group"
                            >
                                <div className="w-24 h-24 bg-black border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                                    <step.icon className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
