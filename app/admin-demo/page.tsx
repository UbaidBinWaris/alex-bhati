"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useToastStore } from '@/components/ui/ToastSystem';

export default function AdminDashboard() {
    const { addToast } = useToastStore();
    const [isReacting, setIsReacting] = useState(false);

    const triggerReactivation = () => {
        setIsReacting(true);
        addToast("Uploading 500 Legacy Leads...", "info");

        setTimeout(() => {
            addToast("Filtering Inactive Numbers...", "info");
            setTimeout(() => {
                addToast("Campaign 'Q3 Reactivation' Started", "success");
                setIsReacting(false);

                // Simulate blast
                let count = 0;
                const interval = setInterval(() => {
                    count++;
                    addToast(`Sent WhatsApp to +91 98*** ${Math.floor(Math.random() * 999)}`, "whatsapp");
                    if (count > 4) clearInterval(interval);
                }, 800);
            }, 1500);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans">

            {/* Header */}
            <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                        AI Sales Command Center
                    </h1>
                    <p className="text-gray-400 mt-1">Real-time Lead Acquisition & Conversion Engine</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-green-400 text-sm font-medium">System Active</span>
                    </div>
                    <Link href="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-sm transition-colors">
                        View Live Site
                    </Link>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* KPI Cards */}
                <div className="col-span-1 lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card title="Acquired Leads" value="142" change="+12% this week" color="blue" />
                    <Card title="Avg. Intent Score" value="78/100" change="High Quality" color="indigo" />
                    <Card title="Site Visits Booked" value="34" change="+8 today" color="green" />
                    <Card title="Est. Revenue Pipeline" value="$2.8M" change="High Value" color="amber" />
                </div>

                {/* Left Col: Live Feed & Reactivation */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    {/* Live Conversation Feed */}
                    <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <span className="text-xl">💬</span> Live AI Conversations
                        </h3>
                        <div className="space-y-4">
                            <ConversationItem
                                name="Rahul Sharma"
                                status="Booking"
                                score={92}
                                lastMsg="Does Saturday 10 AM work for the site visit?"
                                time="Now"
                            />
                            <ConversationItem
                                name="Priya V."
                                status="Qualifying"
                                score={45}
                                lastMsg="I am looking for a 2400 sqft plot near the highway."
                                time="2m ago"
                            />
                            <ConversationItem
                                name="Amit Kumar"
                                status="Acquisition"
                                score={10}
                                lastMsg="Send me details about the new project."
                                time="5m ago"
                            />
                        </div>
                    </div>

                    {/* Reactivation Panel */}
                    <div className="bg-zinc-900/50 rounded-2xl border border-yellow-500/20 p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h3 className="text-lg font-semibold mb-2 text-white">🔥 Dead Lead Reactivation</h3>
                        <p className="text-sm text-gray-400 mb-6">Upload Excel sheet of old leads to trigger AI wake-up campaign.</p>

                        <button
                            onClick={triggerReactivation}
                            disabled={isReacting}
                            className="w-full py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white rounded-xl font-medium shadow-lg shadow-orange-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isReacting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Running Campaign...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                    Upload & Reactivate 500 Leads
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Col: CRM Pipeline & Follow-up */}
                <div className="col-span-1 lg:col-span-2 space-y-6">
                    {/* Follow-up Timeline */}
                    <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white">📅 Automated Follow-up Queue</h3>
                        <div className="space-y-4 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                            <TimelineItem day="Day 1" action="WhatsApp: Brochure Sent" count={12} />
                            <TimelineItem day="Day 3" action="Email: Investment Analysis" count={8} />
                            <TimelineItem day="Day 7" action="SMS: Site Visit Discount" count={24} />
                            <TimelineItem day="Day 14" action="Call Task: Sales Manager" count={5} isManual />
                        </div>
                    </div>

                    {/* Simple Kanban Snapshot */}
                    <div className="bg-zinc-900/50 rounded-2xl border border-white/10 p-6">
                        <h3 className="text-lg font-semibold mb-4 text-white">📊 Pipeline Health</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <PipelineStage label="New" count={45} color="bg-blue-500" />
                            <PipelineStage label="Qualified" count={28} color="bg-purple-500" />
                            <PipelineStage label="Visit Booked" count={12} color="bg-green-500" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

const Card = ({ title, value, change, color }: { title: string, value: string, change: string, color: string }) => {
    const colors: Record<string, string> = {
        blue: "text-blue-400 border-blue-500/20 bg-blue-500/5",
        indigo: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
        green: "text-green-400 border-green-500/20 bg-green-500/5",
        amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    };

    return (
        <div className={`p-6 rounded-xl border ${colors[color]}`}>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <h2 className="text-3xl font-bold text-white mb-2">{value}</h2>
            <p className={`text-xs font-medium opacity-80`}>{change}</p>
        </div>
    );
}

const ConversationItem = ({ name, status, score, lastMsg, time }: { name: string, status: string, score: number, lastMsg: string, time: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xs font-bold relative">
            {name[0]}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold border border-black ${score > 70 ? 'bg-green-500 text-black' : score > 40 ? 'bg-yellow-500 text-black' : 'bg-gray-500 text-white'
                }`}>
                {score}
            </div>
        </div>
        <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-white text-sm">{name}</h4>
                <span className="text-xs text-gray-500">{time}</span>
            </div>
            <p className="text-xs text-gray-400 mb-2 line-clamp-1">"{lastMsg}"</p>
            <div className="flex gap-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${status === 'Booking' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                        status === 'Qualifying' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' :
                            'bg-zinc-700 border-zinc-600 text-gray-400'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    </div>
)

const TimelineItem = ({ day, action, count, isManual }: { day: string, action: string, count: number, isManual?: boolean }) => (
    <div className="relative pl-8">
        <div className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full border-2 ${isManual ? 'border-amber-500 bg-black' : 'border-blue-500 bg-blue-500'} z-10`}></div>
        <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{day}</span>
            <span className="text-xs text-gray-400">{count} Active</span>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-sm text-gray-300 flex justify-between items-center">
            {action}
            {isManual && <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Manual</span>}
        </div>
    </div>
)

const PipelineStage = ({ label, count, color }: { label: string, count: number, color: string }) => (
    <div className="bg-black/40 rounded-lg p-3 border border-white/5 text-center">
        <div className={`w-full h-1 rounded-full ${color} mb-2 opacity-50`}></div>
        <div className="text-2xl font-bold text-white mb-1">{count}</div>
        <div className="text-xs text-gray-500">{label}</div>
    </div>
)
