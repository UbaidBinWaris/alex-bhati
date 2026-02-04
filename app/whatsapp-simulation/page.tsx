"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateWhatsAppSequence } from "@/lib/whatsappMessages";
import { formatCurrency } from "@/lib/leadScoring";

export default function WhatsAppSimulation() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const [showBookingButton, setShowBookingButton] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Get lead data from session storage
    const storedLead = sessionStorage.getItem("newLead");
    if (!storedLead) {
      router.push("/landing");
      return;
    }

    const lead = JSON.parse(storedLead);
    setLeadData(lead);

    // Generate WhatsApp sequence
    const sequence = generateWhatsAppSequence(
      lead.name,
      lead.budget,
      lead.purpose
    );

    // Display messages with delays
    let currentIndex = 0;
    let isMounted = true;
    
    const displayNextMessage = () => {
      if (!isMounted || currentIndex >= sequence.length) return;
      
      setIsTyping(true);

      setTimeout(() => {
        if (!isMounted) return;
        setMessages((prev) => [...prev, sequence[currentIndex]]);
        setIsTyping(false);
        setMessageIndex(currentIndex + 1);
        currentIndex++;

        if (currentIndex < sequence.length) {
          setTimeout(displayNextMessage, 1200);
        } else {
          // Show booking button after all messages
          setTimeout(() => {
            if (isMounted) setShowBookingButton(true);
          }, 2000);
        }
      }, sequence[currentIndex].delay || 2000);
    };

    // Start sequence after 1 second
    const initialTimeout = setTimeout(displayNextMessage, 1000);
    
    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
    };
  }, [router, mounted]);

  const handleBookNow = () => {
    router.push("/booking");
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  if (!mounted || !leadData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e5ddd5] flex flex-col">
      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white p-3 shadow-md">
        <div className="container mx-auto max-w-3xl flex items-center gap-3">
          <button 
            onClick={() => router.push("/landing")}
            className="text-white hover:bg-white/10 p-2 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🏢</span>
          </div>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">PropTech Realty</h1>
            <p className="text-xs text-green-100">Online • Automated Assistant</p>
          </div>
          <button className="text-white hover:bg-white/10 p-2 rounded-full transition">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto py-4" style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}>
        <div className="container mx-auto max-w-3xl px-4">
          {/* Date Badge */}
          <div className="text-center mb-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-gray-700 shadow-sm">
              Today
            </div>
          </div>

          {/* Lead Score Badge */}
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <div className="text-sm text-blue-800 mb-1">🎯 Lead Intent Score Calculated</div>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{leadData.intentScore}</div>
                  <div className="text-xs text-blue-700">Score</div>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    leadData.status === 'High' ? 'bg-green-100 text-green-800' :
                    leadData.status === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {leadData.status} Intent
                  </span>
                </div>
              </div>
              <div className="text-xs text-blue-600 mt-2">
                Budget: {formatCurrency(leadData.budget)} • Timeline: {leadData.timeline} days
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3">
            {messages.filter(msg => msg && msg.text).map((msg, index) => (
              <div key={msg.id} className="flex items-end gap-2 animate-slideIn">
                <div className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div className="max-w-[75%]">
                  <div className="bg-white rounded-lg rounded-bl-none px-4 py-2 shadow-md">
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <p className="text-[10px] text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2 animate-slideIn">
                <div className="w-8 h-8 bg-[#25d366] rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showBookingButton && (
            <div className="mt-8 space-y-3 animate-fadeIn">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border-2 border-green-200">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-2">🎉</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">Automation Complete!</h3>
                  <p className="text-sm text-gray-600">Your lead has been captured and scored automatically</p>
                </div>
                <button
                  onClick={handleBookNow}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] mb-2 text-lg"
                >
                  📅 Book Site Visit Now
                </button>
                <button
                  onClick={handleViewDashboard}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  📊 View Full CRM Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-white border-t p-3">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500">
              Automated message sequence active...
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
