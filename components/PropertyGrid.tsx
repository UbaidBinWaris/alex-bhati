'use client';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const properties = [
    {
        id: 1,
        title: "Sunset Ridge Phase 2",
        location: "Kitengela, Kajiado",
        price: "KES 1.5M",
        size: "50x100",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2664&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Green Valley Gardens",
        location: "Juja Farm",
        price: "KES 850,000",
        size: "40x80",
        image: "https://images.unsplash.com/photo-1505576391880-b3f9d713dc4f?q=80&w=2570&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Royal Palms Estate",
        location: "Malindi",
        price: "KES 2.1M",
        size: "1/4 Acre",
        image: "https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=2671&auto=format&fit=crop"
    }
];

export function PropertyGrid() {
    return (
        <section className="py-24 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Listings</h2>
                        <p className="text-muted-foreground">Hand-picked prime locations for high ROI.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-primary hover:text-amber-300 transition-colors">
                        View All Properties <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((prop, i) => (
                        <motion.div
                            key={prop.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
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
                                <button className="w-full py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-medium">
                                    View Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
