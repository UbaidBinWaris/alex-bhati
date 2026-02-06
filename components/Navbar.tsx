import Link from 'next/link';

import { Home, Calendar, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold group-hover:scale-105 transition-transform">
                        D
                    </div>
                    <span className="text-xl font-bold tracking-tight">Daya<span className="text-primary">Properties</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Properties</Link>
                    <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
                    <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Owner Portal</span>
                    </Link>
                    <Link href="/book-visit">
                        <button className={cn(
                            "px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300",
                            "bg-primary text-primary-foreground hover:bg-amber-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)]",
                            "flex items-center gap-2"
                        )}>
                            <Calendar className="w-4 h-4" />
                            Book Site Visit
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
