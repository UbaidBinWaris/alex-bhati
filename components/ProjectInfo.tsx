'use client';

import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layout, ShieldCheck, Zap } from 'lucide-react';

const technologies = [
    { name: "Next.js 15", icon: Globe, description: "App Router & Server Actions" },
    { name: "TypeScript", icon: Code2, description: "Type-safe development" },
    { name: "Tailwind CSS", icon: Layout, description: "Responsive styling" },
    { name: "PostgreSQL", icon: Database, description: "Relational database" },
    { name: "Authentication", icon: ShieldCheck, description: "Secure user sessions" },
    { name: "Performance", icon: Zap, description: "Optimized core vitals" },
];

export function ProjectInfo() {
    return (
        <section className="py-24 bg-black relative border-t border-white/10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Under The Hood</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Built with modern technologies to ensure scalability, security, and a seamless user experience.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {technologies.map((tech, i) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 rounded-xl border border-white/10 flex items-start gap-4 hover:bg-white/5 transition-colors"
                        >
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <tech.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                                <p className="text-sm text-muted-foreground">{tech.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
