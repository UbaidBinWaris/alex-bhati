'use client';
import { Building2, MapPin, Ruler, Bed, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const properties = [
    {
        id: 1,
        name: "Sunset Ridge Apartments",
        location: "Kitengela, Kajiado",
        type: "Residential",
        units: 24,
        vacant: 2,
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Green Valley Plaza",
        location: "Juja Farm",
        type: "Commercial",
        units: 15,
        vacant: 0,
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Royal Palms Estate",
        location: "Malindi",
        type: "Mixed Use",
        units: 10,
        vacant: 1,
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop"
    },
];

export default function PropertiesPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Properties Portfolio</h1>
                    <p className="text-muted-foreground">Manage your building inventory and units.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Property
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((prop) => (
                    <div key={prop.id} className="glass-card rounded-2xl overflow-hidden border border-white/10 group hover:border-primary/50 transition-colors">
                        <div className="h-48 relative overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={prop.image}
                                alt={prop.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-white">
                                {prop.type}
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-xl font-bold mb-1">{prop.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    {prop.location}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5 border-b">
                                <div>
                                    <div className="text-xs text-muted-foreground mb-1">Total Units</div>
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <Building2 className="w-4 h-4 text-muted-foreground" />
                                        {prop.units}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground mb-1">Vacant Units</div>
                                    <div className="flex items-center gap-2 font-bold text-lg">
                                        <Bed className="w-4 h-4 text-muted-foreground" />
                                        <span className={cn(prop.vacant > 0 ? "text-amber-400" : "text-green-400")}>{prop.vacant}</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 font-semibold transition-colors border border-white/5">
                                Manage Units
                            </button>
                        </div>
                    </div>
                ))}

                {/* Optional "Add New" Card Placeholder */}
                <button className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all min-h-[400px]">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-bold">Add New Property</span>
                </button>
            </div>
        </div>
    );
}
