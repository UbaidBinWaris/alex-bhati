"use client";

import Link from 'next/link';
import { WorkflowNode } from '@/components/admin/WorkflowNode';

export default function AutomationsPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 relative overflow-hidden">

            {/* Cyberpunk Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/50 to-transparent"></div>

            <div className="relative z-10 p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12 pb-6 border-b border-white/5">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                            System Automations
                        </h1>
                        <p className="text-gray-400 mt-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Neural Engine Active • 24/7 Operations
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/admin-demo" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm transition-all hover:scale-105 active:scale-95 text-gray-300 backdrop-blur-md">
                            ← Returns to Command Center
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Main Workflow Canvas (Left 3 cols) */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* 📊 FIXED: SVG Performance Graph Card */}
                        <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                            <div className="absolute top-0 right-0 p-4 opacity-20">
                                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                                    <circle cx="50" cy="50" r="40" />
                                    <circle cx="50" cy="50" r="30" />
                                    <path d="M50 10 L50 90 M10 50 L90 50" />
                                </svg>
                            </div>

                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                        Network Traffic
                                    </h3>
                                    <p className="text-sm text-gray-400">Real-time webhook processing load</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white font-mono">1,492</div>
                                    <div className="text-xs text-green-400 font-mono">▲ 14% vs last hour</div>
                                </div>
                            </div>

                            {/* SVG Graph Implementation */}
                            <div className="h-48 w-full relative">
                                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                                    {/* Gradient Defs */}
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>

                                    {/* Area Path */}
                                    <path
                                        d="M0,50 L0,30 Q10,10 20,25 T40,20 T60,35 T80,15 T100,25 L100,50 Z"
                                        fill="url(#chartGradient)"
                                    />
                                    {/* Line Path */}
                                    <path
                                        d="M0,30 Q10,10 20,25 T40,20 T60,35 T80,15 T100,25"
                                        fill="none"
                                        stroke="#ec4899"
                                        strokeWidth="1.5"
                                        vectorEffect="non-scaling-stroke"
                                        className="drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                                    />
                                </svg>

                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                                    <div className="w-full border-t border-white border-dashed"></div>
                                    <div className="w-full border-t border-white border-dashed"></div>
                                    <div className="w-full border-t border-white border-dashed"></div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono uppercase tracking-widest">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>NOW</span>
                            </div>
                        </div>


                        {/* Workflow 1: Speed to Lead */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl"></div>

                            <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-green-500 to-transparent"></div>
                            <div className="absolute left-[29px] top-0 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>

                            <h2 className="text-xl font-bold text-white mb-8 pl-14 flex items-center gap-3">
                                <span className="font-mono text-green-400 text-sm tracking-wider">[PROTOCOL_01]</span>
                                Speed-to-Lead
                            </h2>

                            <div className="pl-14 flex flex-col items-start gap-12 relative z-10">
                                <WorkflowNode
                                    id="1"
                                    type="trigger"
                                    status="active"
                                    label="WhatsApp Incoming"
                                    executionCount={1452}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>}
                                    config={{ "source": "Meta Cloud API", "webhook": "active" }}
                                />
                                <WorkflowNode
                                    id="2"
                                    type="logic"
                                    status="active"
                                    label="AI Intent Classifier"
                                    executionCount={1450}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5c0-1.1.9-2 2-2z" /></svg>}
                                    config={{ "model": "gpt-4o", "temp": "0.2" }}
                                />
                                <WorkflowNode
                                    id="3"
                                    type="action"
                                    status="active"
                                    label="Auto-Reply & Tag"
                                    executionCount={1448}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>}
                                    config={{ "template": "welcome_v2", "crm_sync": "true" }}
                                />
                            </div>
                        </div>

                        {/* Workflow 2: Booking Engine */}
                        <div className="relative pt-12 border-t border-white/5">
                            <div className="absolute left-8 top-12 bottom-0 w-[1px] bg-gradient-to-b from-blue-500 to-transparent"></div>
                            <div className="absolute left-[29px] top-12 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>

                            <h2 className="text-xl font-bold text-white mb-8 pl-14 flex items-center gap-3">
                                <span className="font-mono text-blue-400 text-sm tracking-wider">[PROTOCOL_02]</span>
                                Site Visit Booking
                            </h2>

                            <div className="pl-14 flex flex-col items-start gap-12 relative z-10">
                                <WorkflowNode
                                    id="4"
                                    type="trigger"
                                    status="active"
                                    label="Intent Score > 70"
                                    executionCount={85}
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>}
                                    config={{ "min_score": "70", "source": "lead_engine" }}
                                />

                                <div className="flex gap-12">
                                    <WorkflowNode
                                        id="5"
                                        type="action"
                                        status="active"
                                        label="Google Calendar Sync"
                                        executionCount={82}
                                        icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>}
                                        config={{ "calendar": "primary", "reminders": "on" }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Hacker Terminal Logs */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-24">
                            <div className="bg-black border border-green-500/30 rounded-xl p-4 shadow-[0_0_30px_rgba(34,197,94,0.1)] font-mono text-xs">
                                <div className="flex justify-between items-center mb-4 border-b border-green-500/20 pb-2">
                                    <span className="text-green-500 font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 bg-green-500 rounded-sm animate-pulse"></span>
                                        SYSTEM_LOGS
                                    </span>
                                    <span className="text-green-500/50">v2.4.0</span>
                                </div>

                                <div className="space-y-3 max-h-[600px] overflow-hidden relative">
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-scan pointer-events-none z-10"></div>

                                    <LogItem action="INCOMING_MSG" detail="Src: +91 98***" time="00:01" type="info" />
                                    <LogItem action="AI_PROCESSING" detail="Intent: BUYING (0.98)" time="00:02" type="success" />
                                    <LogItem action="CALENDAR_API" detail="POST /events" time="02:14" type="warning" />
                                    <LogItem action="EMAIL_DISPATCH" detail="Template: brochure_full" time="05:22" type="info" />
                                    <LogItem action="REACTIVATION" detail="Batch #441 Triggered" time="08:45" type="info" />
                                    <LogItem action="CRM_SYNC" detail="Lead #882 written" time="12:30" type="success" />
                                    <LogItem action="INCOMING_MSG" detail="Src: +91 98***" time="12:32" type="info" />
                                    <LogItem action="AI_PROCESSING" detail="Intent: INQUIRY (0.45)" time="12:32" type="success" />
                                </div>

                                <div className="mt-4 pt-2 border-t border-green-500/20 text-center">
                                    <span className="text-green-500/50 animate-pulse">_waiting for traffic</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

const LogItem = ({ action, detail, time, type }: { action: string, detail: string, time: string, type: 'info' | 'success' | 'warning' }) => {
    const colors = {
        info: 'text-blue-400',
        success: 'text-green-400',
        warning: 'text-amber-400'
    };
    return (
        <div className="flex gap-3 items-start group hover:bg-white/5 p-1 rounded transition-colors cursor-default">
            <span className="text-gray-600">[{time}]</span>
            <div className="flex-1">
                <span className={`font-bold ${colors[type]}`}>{action}</span>
                <span className="text-gray-500 mx-2">::</span>
                <span className="text-gray-400">{detail}</span>
            </div>
        </div>
    );
}
