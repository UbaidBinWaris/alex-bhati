import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyGrid } from "@/components/PropertyGrid";
import { ProductionWorkflow } from "@/components/ProductionWorkflow";
import { ProjectInfo } from "@/components/ProjectInfo";
import { Footer } from "@/components/Footer";
import { AIChatWidget } from "@/components/ai/AIChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-foreground selection:bg-primary selection:text-black">
      <Navbar />
      <Hero />
      <PropertyGrid />
      <ProductionWorkflow />
      {/* <ProjectInfo /> */}
      <Footer />
      <AIChatWidget />
    </main>
  );
}
