'use client';
import { TrendingUp, UserPlus, Phone, Mail, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DragEvent, useState } from 'react';

// Mock Kanban Data
const initialColumns = {
    new: [
        { id: 1, name: "John Doe", interest: "Sunset Ridge", source: "Website", budget: "1.5M" },
        { id: 2, name: "Jane Smith", interest: "Green Valley", source: "WhatsApp", budget: "850k" },
    ],
    contacted: [
        { id: 3, name: "David Wilson", interest: "Royal Palms", source: "Referral", budget: "2.5M" },
    ],
    viewing: [
        { id: 4, name: "Sarah Connor", interest: "Sunset Ridge", source: "Facebook", budget: "1.5M" },
    ],
    closed: [
        { id: 5, name: "Mike Ross", interest: "Green Valley", source: "Website", budget: "850k" },
    ]
};

export default function LeadsPage() {
    const [columns, setColumns] = useState(initialColumns);

    return (
        <div className="space-y-6 animate-fade-in h-[calc(100vh-100px)] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Leads & CRM</h1>
                    <p className="text-muted-foreground">Manage your sales pipeline and potential tenants.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Add Lead
                </button>
            </div>

            {/* Pipeline / Kanban Board */}
            <div className="flex-1 grid grid-cols-4 gap-4 overflow-hidden min-w-[800px]">
                {Object.entries(columns).map(([columnId, items]) => (
                    <div key={columnId} className="flex flex-col h-full bg-white/5 rounded-xl border border-white/10">
                        <div className="p-4 border-b border-white/10 flex justify-between items-center">
                            <h3 className="font-bold capitalize">{columnId}</h3>
                            <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full">{items.length}</span>
                        </div>
                        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                            {items.map(item => (
                                <div key={item.id} className="glass-card p-4 rounded-lg border border-white/5 hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold">{item.name}</h4>
                                        <span className="text-[10px] uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                            {item.source}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{item.interest}</p>

                                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                                        <span className="font-semibold text-xs">KES {item.budget}</span>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-green-400">
                                                <Phone className="w-3 h-3" />
                                            </button>
                                            <button className="p-1.5 hover:bg-white/10 rounded-full text-muted-foreground hover:text-blue-400">
                                                <Mail className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
