'use client';
import { Wrench, CheckCircle2, Clock, DollarSign, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const requests = [
    { id: "REQ-001", unit: "A4", issue: "Leaking Tap", priority: "Low", status: "Open", assignedTo: "Pending", cost: 0 },
    { id: "REQ-002", unit: "B2", issue: "Broken Window", priority: "High", status: "In Progress", assignedTo: "John (Field Tech)", cost: 4500 },
    { id: "REQ-003", unit: "C1", issue: "Power Outage", priority: "Critical", status: "Resolved", assignedTo: "KPLC", cost: 0 },
    { id: "REQ-004", unit: "A5", issue: "Door Lock Jammed", priority: "Medium", status: "Resolved", assignedTo: "Mike (Carpenter)", cost: 1500 },
];

export default function MaintenancePage() {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Maintenance & Field Ops</h1>
                    <p className="text-muted-foreground">Track repairs, assign tasks, and monitor costs.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Log New Request
                </button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 glass-card rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg"><Clock className="w-6 h-6" /></div>
                    <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-xs text-muted-foreground">Open Requests</div>
                    </div>
                </div>
                <div className="p-4 glass-card rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 text-amber-500 rounded-lg"><Wrench className="w-6 h-6" /></div>
                    <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                </div>
                <div className="p-4 glass-card rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 text-green-500 rounded-lg"><CheckCircle2 className="w-6 h-6" /></div>
                    <div>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-muted-foreground">Resolved (Feb)</div>
                    </div>
                </div>
                <div className="p-4 glass-card rounded-xl border border-white/10 flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 text-red-500 rounded-lg"><DollarSign className="w-6 h-6" /></div>
                    <div>
                        <div className="text-2xl font-bold">18.5k</div>
                        <div className="text-xs text-muted-foreground">Total Cost (Feb)</div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Request ID</th>
                            <th className="px-6 py-4 font-semibold">Unit / Tenant</th>
                            <th className="px-6 py-4 font-semibold">Issue</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold">Priority</th>
                            <th className="px-6 py-4 font-semibold">Assigned To</th>
                            <th className="px-6 py-4 font-semibold text-right">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {requests.map((req) => (
                            <tr key={req.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs">{req.id}</td>
                                <td className="px-6 py-4 text-muted-foreground">{req.unit}</td>
                                <td className="px-6 py-4 font-medium">{req.issue}</td>
                                <td className="px-6 py-4">
                                    <div className={cn(
                                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                                        req.status === 'Resolved' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                            req.status === 'Open' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    )}>
                                        {req.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "text-xs font-bold",
                                        req.priority === 'Critical' ? "text-red-500" :
                                            req.priority === 'High' ? "text-amber-500" :
                                                "text-muted-foreground"
                                    )}>{req.priority}</span>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{req.assignedTo}</td>
                                <td className="px-6 py-4 text-right font-bold">
                                    {req.cost > 0 ? `KES ${req.cost}` : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
