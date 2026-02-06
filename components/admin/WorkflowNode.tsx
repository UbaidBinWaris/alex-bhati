"use client";

import { useState } from 'react';

interface WorkflowNodeProps {
    id: string;
    icon: React.ReactNode;
    label: string;
    type: 'trigger' | 'action' | 'logic';
    status: 'active' | 'inactive';
    executionCount: number;
    config: Record<string, string>;
}

export const WorkflowNode = ({ icon, label, type, status, executionCount, config }: WorkflowNodeProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const colors = {
        trigger: 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20',
        action: 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20',
        logic: 'border-yellow-500/50 bg-yellow-500/10 hover:bg-yellow-500/20',
    };

    return (
        <div className="relative group">
            {/* Node Card */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-10 w-64 p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-300 transform hover:scale-105 ${colors[type]}`}
            >
                <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-black/40 rounded-lg text-white">
                        {icon}
                    </div>
                    <div className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${status === 'active' ? 'bg-green-500 text-black' : 'bg-zinc-700 text-gray-400'}`}>
                        {status}
                    </div>
                </div>

                <h4 className="text-white font-medium mb-1">{label}</h4>
                <p className="text-xs text-white/50">{executionCount.toLocaleString()} executions</p>

                {/* Pulse Effect for Active Nodes */}
                {status === 'active' && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                )}
            </div>

            {/* Pop-out Details Panel */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-zinc-900 border border-white/10 rounded-xl p-4 shadow-2xl z-50 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="flex justify-between items-center mb-3">
                        <h5 className="text-sm font-semibold text-white">Configuration</h5>
                        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-500 hover:text-white">✕</button>
                    </div>
                    <div className="space-y-2">
                        {Object.entries(config).map(([key, value]) => (
                            <div key={key} className="text-xs">
                                <span className="text-gray-500 block uppercase tracking-wider mb-0.5">{key.replace(/_/g, ' ')}</span>
                                <code className="bg-black/50 px-2 py-1 rounded text-blue-300 block overflow-hidden text-ellipsis whitespace-nowrap">
                                    {value}
                                </code>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-between text-xs text-gray-400">
                        <span>Success Rate: 99.8%</span>
                        <span>Latency: 45ms</span>
                    </div>
                </div>
            )}

            {/* Connecting Line (Downward) */}
            <div className="absolute left-1/2 bottom-0 w-[2px] h-12 bg-white/10 -mb-12 z-0 group-last:hidden"></div>
        </div>
    );
};
