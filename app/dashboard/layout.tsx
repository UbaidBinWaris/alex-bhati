'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Settings, Bell, Search, LogOut, Wrench, TrendingUp, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
        { icon: Users, label: 'Tenants', href: '/dashboard/tenants' },
        { icon: CreditCard, label: 'Finances', href: '/dashboard/finances' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <div className="flex h-screen bg-black text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 hidden md:flex flex-col bg-card">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            D
                        </div>
                        <span className="text-xl font-bold tracking-tight">Daya<span className="text-primary">PMS</span></span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Topbar */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-card/50 backdrop-blur-md">
                    <div className="flex items-center gap-4 text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/5 w-96">
                        <Search className="w-4 h-4" />
                        <input type="text" placeholder="Search tenants, properties..." className="bg-transparent border-none outline-none text-sm w-full text-white placeholder:text-muted-foreground/50" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-black" />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-amber-600 border border-white/20" />
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 bg-black">
                    {children}
                </main>
            </div>
        </div>
    );
}
