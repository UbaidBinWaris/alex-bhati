export function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground text-sm">
                <div>
                    <span className="font-bold text-white text-lg block mb-2">Daya Properties</span>
                    <p>© 2026 Daya Properties Ltd. All rights reserved.</p>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
