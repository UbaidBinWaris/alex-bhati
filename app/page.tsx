import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <PropertyGrid />
      <Footer />
    </main>
  );
}
