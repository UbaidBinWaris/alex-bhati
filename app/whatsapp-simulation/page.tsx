"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateWhatsAppSequence } from "@/lib/whatsappMessages";

export default function WhatsAppSimulation() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);
  const [showBookingButton, setShowBookingButton] = useState(false);

  useEffect(() => {
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
    const displayNextMessage = () => {
      if (currentIndex < sequence.length) {
        setIsTyping(true);

        setTimeout(() => {
          setMessages((prev) => [...prev, sequence[currentIndex]]);
          setIsTyping(false);
          currentIndex++;

          if (currentIndex < sequence.length) {
            setTimeout(displayNextMessage, 1000);
          } else {
            // Show booking button after all messages
            setTimeout(() => setShowBookingButton(true), 1500);
          }
        }, sequence[currentIndex].delay || 2000);
      }
    };

    // Start sequence after 500ms
    setTimeout(displayNextMessage, 500);
  }, [router]);

  const handleBookNow = () => {
    router.push("/booking");
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  if (!leadData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto max-w-2xl flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl">🏢</span>
          </div>
          <div className="flex-1">
            <h1 className="font-semibold">Alex Properties</h1>
            <p className="text-xs text-green-100">Online • AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 pb-4">
        <div className="container mx-auto max-w-2xl px-4 py-6">
          {/* Welcome Banner */}
          <div className="mb-6 text-center">
            <div className="inline-block bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-2 text-sm text-yellow-800">
              🔒 End-to-end encrypted • Automated property assistant
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={msg.id} className="animate-fadeIn">
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">AP</span>
                  </div>
                  <div className="max-w-xs">
                    <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                      <p className="text-gray-800">{msg.text}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">AP</span>
                </div>
                <div className="bg-white rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
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
              <button
                onClick={handleBookNow}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                📅 Book Site Visit Now
              </button>
              <button
                onClick={handleViewDashboard}
                className="w-full py-4 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg transition-all border-2 border-gray-200"
              >
                📊 View Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lead Info Card */}
      <div className="bg-white border-t p-4">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {leadData.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{leadData.name}</p>
                <p className="text-sm text-gray-500">{leadData.phone}</p>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  leadData.status === "High"
                    ? "bg-green-100 text-green-700"
                    : leadData.status === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {leadData.status} Intent
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Score: {leadData.intentScore}/100
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
