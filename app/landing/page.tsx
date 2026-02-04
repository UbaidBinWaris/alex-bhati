"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { calculateLeadScore, getLeadStatus } from "@/lib/leadScoring";

export default function LandingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    timeline: "",
    purpose: "Residential",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Calculate lead score
    const score = calculateLeadScore(formData);
    const status = getLeadStatus(score);

    // Store in sessionStorage for the next page
    sessionStorage.setItem(
      "newLead",
      JSON.stringify({
        ...formData,
        intentScore: score,
        status,
        id: `lead-${Date.now()}`,
        source: "Website",
        createdAt: new Date().toISOString(),
      })
    );

    setShowSuccess(true);
    
    // Redirect to WhatsApp simulation after showing success
    setTimeout(() => {
      router.push("/whatsapp-simulation");
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
              Alex Properties
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Properties
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              🏆 #1 Real Estate Platform in India
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Find Your Dream Property in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Minutes
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered property matching • Instant site visits • 100% verified
              listings
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Premium Properties</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">24hrs</div>
                  <div className="text-sm text-gray-600">Quick Response</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Get Instant Property Matches
              </h2>
              <p className="text-gray-600">
                Fill the form & get personalized recommendations via WhatsApp
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (₹) *
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select budget range</option>
                  <option value="2500000">₹25 Lakhs - ₹50 Lakhs</option>
                  <option value="5000000">₹50 Lakhs - ₹75 Lakhs</option>
                  <option value="7500000">₹75 Lakhs - ₹1 Crore</option>
                  <option value="10000000">₹1 Crore - ₹2 Crores</option>
                  <option value="15000000">₹2 Crores+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Timeline *
                </label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select timeline</option>
                  <option value="7">Within 1 week</option>
                  <option value="15">Within 2 weeks</option>
                  <option value="30">Within 1 month</option>
                  <option value="60">Within 2 months</option>
                  <option value="90">Within 3 months</option>
                  <option value="120">3+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, purpose: "Residential" })
                    }
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                      formData.purpose === "Residential"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    🏠 Residential
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, purpose: "Investment" })
                    }
                    className={`py-3 px-4 rounded-lg border-2 font-medium transition ${
                      formData.purpose === "Investment"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    💰 Investment
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Get Instant Recommendations 🚀"
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to receive property recommendations via
                WhatsApp
              </p>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Lead Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-4">Redirecting to WhatsApp automation...</p>
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 border-t">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI-Powered Matching
            </h3>
            <p className="text-gray-600">
              Our intelligent system finds properties that perfectly match your
              requirements
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              WhatsApp Updates
            </h3>
            <p className="text-gray-600">
              Get instant property updates and book site visits via WhatsApp
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              24/7 Instant Response
            </h3>
            <p className="text-gray-600">
              Automated follow-ups ensure you never miss an opportunity
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
