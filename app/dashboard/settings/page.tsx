'use client';
import { User, Bell, Shield, Wallet, Smartphone, Mail, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold mb-2">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and system configuration.</p>
            </div>

            <div className="flex gap-8">
                {/* Settings Sidebar */}
                <div className="w-64 shrink-0 space-y-2">
                    {[
                        { id: 'profile', label: 'My Profile', icon: User },
                        { id: 'notifications', label: 'Notifications', icon: Bell },
                        { id: 'security', label: 'Security & Access', icon: Shield },
                        { id: 'billing', label: 'Billing & Plans', icon: Wallet },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors",
                                activeTab === tab.id
                                    ? "bg-primary text-black font-bold"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="flex-1 glass-card rounded-2xl p-8 border border-white/10 min-h-[500px]">
                    {activeTab === 'profile' && (
                        <div className="space-y-8 animate-fade-in">
                            <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-amber-700 border-4 border-black shadow-xl" />
                                <div>
                                    <h3 className="text-xl font-bold">Admin User</h3>
                                    <p className="text-muted-foreground">Super Administrator</p>
                                    <button className="mt-2 text-sm text-primary hover:underline">Change Avatar</button>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input type="text" defaultValue="Daya Admin" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <input type="email" defaultValue="admin@dayaproperties.co.ke" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <input type="tel" defaultValue="+254 700 000 000" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <input type="text" disabled defaultValue="Owner / Manager" className="w-full bg-white/5 border border-white/10 text-muted-foreground rounded-lg p-3 cursor-not-allowed" />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button type="button" className="px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-2">
                                        <Save className="w-4 h-4" /> Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-fade-in">
                            <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/10 rounded-full text-blue-500"><Mail className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-semibold">Email Alerts</h4>
                                            <p className="text-xs text-muted-foreground">Receive daily summaries and critical alerts.</p>
                                        </div>
                                    </div>
                                    <div className="relative w-12 h-6 bg-primary rounded-full cursor-pointer">
                                        <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-500/10 rounded-full text-green-500"><Smartphone className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-semibold">WhatsApp Integration</h4>
                                            <p className="text-xs text-muted-foreground">Receive booking notifications via WhatsApp.</p>
                                        </div>
                                    </div>
                                    <div className="relative w-12 h-6 bg-primary rounded-full cursor-pointer">
                                        <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-500/10 rounded-full text-red-500"><Wallet className="w-5 h-5" /></div>
                                        <div>
                                            <h4 className="font-semibold">Payment Reminders</h4>
                                            <p className="text-xs text-muted-foreground">Auto-send reminders to late tenants.</p>
                                        </div>
                                    </div>
                                    <div className="relative w-12 h-6 bg-primary rounded-full cursor-pointer">
                                        <div className="absolute top-1 right-1 w-4 h-4 bg-black rounded-full shadow-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
