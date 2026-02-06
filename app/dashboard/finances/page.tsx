'use client';
import { Download, ArrowUpRight, ArrowDownLeft, XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const transactions = [
    { id: "TXN-8821", date: "Feb 06, 2026", tenant: "Alice Johnson", unit: "A4", amount: 45000, type: "Rent", method: "M-Pesa", status: "Reconciled" },
    { id: "TXN-8820", date: "Feb 05, 2026", tenant: "Bob Smith", unit: "B2", amount: 12000, type: "Service Charge", method: "Bank", status: "Pending" },
    { id: "TXN-8819", date: "Feb 05, 2026", tenant: "Unknown", unit: "-", amount: 5000, type: "Unidentified", method: "M-Pesa", status: "Unreconciled" },
    { id: "TXN-8818", date: "Feb 04, 2026", tenant: "Diana Prince", unit: "A5", amount: 45000, type: "Rent", method: "Bank", status: "Reconciled" },
    { id: "TXN-8817", date: "Feb 04, 2026", tenant: "Charlie Brown", unit: "C1", amount: 120000, type: "Rent", method: "Cheque", status: "Reconciled" },
];

export default function FinancesPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Financial Management</h1>
                    <p className="text-muted-foreground">Track rent, automate reconciliation, and handle payouts.</p>
                </div>
                <button className="px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export Report
                </button>
            </div>

            {/* Financial Stats */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 glass-card rounded-xl border border-white/10">
                    <div className="text-sm text-muted-foreground mb-2">Total Collected (Feb)</div>
                    <div className="text-3xl font-bold text-green-400">KES 4.2M</div>
                    <div className="text-xs text-green-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3" /> +12% vs last month
                    </div>
                </div>
                <div className="p-6 glass-card rounded-xl border border-white/10">
                    <div className="text-sm text-muted-foreground mb-2">Pending Reconciliation</div>
                    <div className="text-3xl font-bold text-amber-400">KES 85,000</div>
                    <div className="text-xs text-amber-500 flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-3 h-3" /> 5 transactions pending
                    </div>
                </div>
                <div className="p-6 glass-card rounded-xl border border-white/10">
                    <div className="text-sm text-muted-foreground mb-2">Expenses (Maintenance)</div>
                    <div className="text-3xl font-bold text-red-400">KES 320,000</div>
                    <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <ArrowDownLeft className="w-3 h-3" /> -5% vs last month
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="glass-card rounded-xl border border-white/10 overflow-hidden">
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-lg font-bold">Recent Transactions</h3>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs rounded-md bg-white/10 text-white hover:bg-white/20">All</button>
                        <button className="px-3 py-1 text-xs rounded-md text-muted-foreground hover:bg-white/10">Unreconciled</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-muted-foreground uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Transaction ID</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Tenant / Unit</th>
                                <th className="px-6 py-4 font-semibold">Type</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{txn.id}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{txn.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{txn.tenant}</div>
                                        <div className="text-xs text-muted-foreground">{txn.unit}</div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{txn.type} <span className="text-xs opacity-50">via {txn.method}</span></td>
                                    <td className="px-6 py-4 font-bold">KES {txn.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                                            txn.status === 'Reconciled' ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                txn.status === 'Unreconciled' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                    "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                        )}>
                                            {txn.status === 'Reconciled' ? <CheckCircle className="w-3 h-3" /> :
                                                txn.status === 'Unreconciled' ? <XCircle className="w-3 h-3" /> : null}
                                            {txn.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {txn.status === 'Unreconciled' && (
                                            <button className="text-xs text-primary hover:text-amber-300 underline">Match Tenant</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
