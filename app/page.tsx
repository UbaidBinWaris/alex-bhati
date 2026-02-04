"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              PropTech Realty
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/leads")}
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Leads
            </button>
            <button
              onClick={() => router.push("/landing")}
              className="text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Add Lead
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-fadeIn">
            🚀 AI-Powered Real Estate CRM Demo
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slideIn">
            Automated Lead Conversion
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              System Demo
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-slideIn">
            Experience a complete frontend MVP showcasing lead capture, scoring,
            WhatsApp automation, booking, and CRM dashboard — all without a backend.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slideIn">
            <button
              onClick={() => router.push("/landing")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-lg"
            >
              Start Demo: Capture Lead 🎯
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200 text-lg"
            >
              View Dashboard 📊
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lead Scoring
              </h3>
              <p className="text-gray-600">
                Automatic intent scoring based on budget, timeline, and purpose
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                WhatsApp Automation
              </h3>
              <p className="text-gray-600">
                Simulated automated follow-up messages with realistic timing
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Auto Booking
              </h3>
              <p className="text-gray-600">
                Calendar-based site visit scheduling with confirmations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Flow Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Demo Flow
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Landing Page</h3>
                <p className="text-gray-600">Capture lead info with a beautiful form</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">WhatsApp Simulation</h3>
                <p className="text-gray-600">Watch automated messages appear in real-time</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Booking Page</h3>
                <p className="text-gray-600">Select date & time for site visit</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">CRM Dashboard</h3>
                <p className="text-gray-600">View metrics, leads, and automation features</p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => router.push("/landing")}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 text-xl"
            >
              Start the Demo Now →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p className="mb-2">
            <span className="font-bold text-gray-900">PropTech Realty</span> - Automated Lead Conversion System
          </p>
          <p className="text-sm">
            Frontend-only MVP Demo • Built with Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
