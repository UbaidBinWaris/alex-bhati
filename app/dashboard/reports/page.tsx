'use client';
import { FileText, Download, BarChart3, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const reports = [
    { id: 1, name: "Monthly Rent Statement (Jan 2026)", type: "Financial", date: "Feb 01, 2026", size: "1.2 MB" },
    { id: 2, name: "Occupancy Report Q1 2026", type: "Operational", date: "Feb 05, 2026", size: "850 KB" },
    { id: 3, name: "Maintenance Cost Analysis", type: "Financial", date: "Feb 04, 2026", size: "2.4 MB" },
    { id: 4, name: "Tenant Turnover Report", type: "Operational", date: "Jan 15, 2026", size: "600 KB" },
];

export default function ReportsPage() {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Reports Center</h1>
                    <p className="text-muted-foreground">Generate statements and analyze performance.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Income vs Expense
                    </h3>
                    <div className="h-48 flex items-end justify-between gap-4 px-4 bg-white/5 rounded-lg border border-white/5 border-dashed">
                        <div className="w-1/3 bg-green-500/20 h-[80%] rounded-t-lg relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-500">Income</div>
                        </div>
                        <div className="w-1/3 bg-red-500/20 h-[30%] rounded-t-lg relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-red-500">Exp</div>
                        </div>
                        <div className="w-1/3 bg-blue-500/20 h-[50%] rounded-t-lg relative group">
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-blue-500">Net</div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-primary" />
                        Occupancy Split
                    </h3>
                    <div className="h-48 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-[16px] border-primary border-r-transparent border-b-white/10 rotate-45 relative">
                            <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                                <span className="text-xl font-bold">94%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl border border-white/10">
                <div className="p-6 border-b border-white/10">
                    <h3 className="text-lg font-bold">Generated Reports</h3>
                </div>
                <div className="divide-y divide-white/5">
                    {reports.map((report) => (
                        <div key={report.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-lg text-muted-foreground">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-sm">{report.name}</h4>
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        <span>{report.date}</span>
                                        <span>•</span>
                                        <span>{report.size}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-white/10 rounded-full text-primary transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
