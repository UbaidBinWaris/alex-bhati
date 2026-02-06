"use client";

import React, { useRef, useEffect } from 'react';
import { useOChatSimulation, ChatMessage } from '@/lib/ai-simulation';
import { Calendar } from 'lucide-react';

// Simple simulated Calendar Component (Visual only for now, or use a library if available)
const SimpleCalendar = ({ onSelect }: { onSelect: (date: Date) => void }) => {
    const today = new Date();
    const dates = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i + 1);
        return d;
    });

    return (
        <div className="p-3 bg-zinc-800 rounded-lg mt-2 border border-blue-500/30">
            <p className="text-sm text-gray-300 mb-2 font-medium">Select Available Slot:</p>
            <div className="grid grid-cols-2 gap-2">
                {dates.map((date) => (
                    <button
                        key={date.toISOString()}
                        onClick={() => onSelect(date)}
                        className="text-xs p-2 rounded bg-zinc-700 hover:bg-blue-600 text-white transition-colors"
                    >
                        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </button>
                ))}
            </div>
        </div>
    );
};

export const AIChatWidget = () => {
    const { messages, isTyping, isOpen, setIsOpen, handleUserResponse, handleBookingConfirm } = useOChatSimulation();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            {isOpen && (
                <div className="pointer-events-auto w-[350px] h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 mb-4 ring-1 ring-blue-500/20">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <h3 className="text-white font-semibold text-sm">AI Sales Agent</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-none'
                                    : 'bg-zinc-800 text-gray-200 rounded-tl-none border border-white/5'
                                    }`}>
                                    <p>{msg.text}</p>

                                    {/* Action Options */}
                                    {msg.type === 'options' && msg.options && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {msg.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => handleUserResponse(opt)}
                                                    className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs rounded-full hover:bg-blue-500 hover:text-white transition-all cursor-pointer"
                                                >
                                                    {opt}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {/* Calendar Type */}
                                    {msg.type === 'calendar' && (
                                        <SimpleCalendar onSelect={handleBookingConfirm} />
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800 rounded-2xl rounded-tl-none p-3 border border-white/5 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area (Simulated) */}
                    <div className="p-3 border-t border-white/10 bg-zinc-900/50">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const input = e.currentTarget.elements.namedItem('msg') as HTMLInputElement;
                                if (input.value.trim()) {
                                    handleUserResponse(input.value);
                                    input.value = '';
                                }
                            }}
                            className="flex gap-2"
                        >
                            <input
                                name="msg"
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 placeholder:text-zinc-600"
                            />
                            <button type="submit" className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg shadow-blue-900/40 hover:scale-110 transition-transform duration-300"
                >
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 bg-white/10 backdrop-blur px-3 py-1 rounded-lg text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        Chat with AI Agent
                    </span>
                </button>
            )}
        </div>
    );
};
