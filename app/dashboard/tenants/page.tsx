'use client';
import { Search, Filter, MoreVertical, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const mockTenants = [
    { id: 1, name: "Alice Johnson", property: "Sunset Ridge A4", status: "Paid", amount: "45,000", nextDue: "15 Mar" },
    { id: 2, name: "Bob Smith", property: "Green Valley B2", status: "Late", amount: "32,000", nextDue: "01 Feb", overdue: true },
    { id: 3, name: "Charlie Brown", property: "Royal Palms C1", status: "Paid", amount: "120,000", nextDue: "05 Mar" },
    { id: 4, name: "Diana Prince", property: "Sunset Ridge A5", status: "Paid", amount: "45,000", nextDue: "15 Mar" },
    { id: 5, name: "Evan Wright", property: "Green Valley B3", status: "Pending", amount: "32,000", nextDue: "10 Feb" },
];

export default function TenantsPage() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Tenant Management</h1>
                    <p className="text-muted-foreground">Manage leases, payments, and communication.</p>
                </div>
                <button className="px-4 py-2 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors">
                    Add New Tenant
                </button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-lg border border-white/10 w-fit">
                {['All', 'Paid', 'Late', 'Pending'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                            filter === f ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Tenant Name</th>
                                <th className="px-6 py-4 font-semibold">Property</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Rent Amount</th>
                                <th className="px-6 py-4 font-semibold">Next Due</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockTenants.map((tenant) => (
                                <tr key={tenant.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4 font-medium">{tenant.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{tenant.property}</td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                                            tenant.status === 'Paid' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                tenant.status === 'Late' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                        )}>
                                            {tenant.status === 'Paid' ? <CheckCircle className="w-3 h-3" /> :
                                                tenant.status === 'Late' ? <AlertCircle className="w-3 h-3" /> :
                                                    <div className="w-3 h-3 rounded-full border-2 border-current border-t-transparent animate-spin" />}
                                            {tenant.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white">KES {tenant.amount}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{tenant.nextDue}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-white/10 rounded-full text-muted-foreground hover:text-white transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-white/5 text-center text-xs text-muted-foreground">
                    Showing 5 of 45 tenants
                </div>
            </div>
        </div>
    );
}
