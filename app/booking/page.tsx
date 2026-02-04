"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/leadScoring";

export default function BookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [leadData, setLeadData] = useState<any>(null);

  useEffect(() => {
    const storedLead = sessionStorage.getItem("newLead");
    if (storedLead) {
      setLeadData(JSON.parse(storedLead));
    }
  }, []);

  const availableDates = [
    { date: "2026-02-05", display: "Wed, Feb 5" },
    { date: "2026-02-06", display: "Thu, Feb 6" },
    { date: "2026-02-07", display: "Fri, Feb 7" },
    { date: "2026-02-08", display: "Sat, Feb 8" },
    { date: "2026-02-10", display: "Mon, Feb 10" },
    { date: "2026-02-11", display: "Tue, Feb 11" },
  ];

  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store booking
    const booking = {
      id: `B${Date.now()}`,
      leadId: leadData?.id,
      leadName: leadData?.name,
      date: selectedDate,
      time: selectedTime,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    sessionStorage.setItem("lastBooking", JSON.stringify(booking));

    setIsConfirming(false);
    setShowConfirmation(true);
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  if (!leadData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your site visit has been scheduled successfully
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-100">
              <div className="grid grid-cols-2 gap-6 text-left">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Name</div>
                  <div className="font-semibold text-gray-900">{leadData.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phone</div>
                  <div className="font-semibold text-gray-900">{leadData.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Date</div>
                  <div className="font-semibold text-gray-900">
                    {availableDates.find((d) => d.date === selectedDate)?.display}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Time</div>
                  <div className="font-semibold text-gray-900">{selectedTime}</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div className="text-left flex-1">
                  <div className="font-semibold text-gray-900 mb-1">
                    WhatsApp Reminder Scheduled
                  </div>
                  <div className="text-sm text-gray-600">
                    You'll receive location details and property brochures 24 hours before your visit
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleViewDashboard}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                View Full Dashboard 📊
              </button>
              <button
                onClick={() => router.push("/landing")}
                className="w-full py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition"
              >
                Add Another Lead
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Book Site Visit</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Lead Info Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {leadData.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">{leadData.name}</h2>
                <p className="text-gray-600">{leadData.phone}</p>
              </div>
              <div>
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  leadData.status === 'High' ? 'bg-green-100 text-green-800 border-2 border-green-200' :
                  leadData.status === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-200' :
                  'bg-gray-100 text-gray-800 border-2 border-gray-200'
                }`}>
                  {leadData.status} Intent • Score: {leadData.intentScore}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <div className="text-sm text-gray-600 mb-1">Budget</div>
                <div className="font-semibold text-gray-900">{formatCurrency(leadData.budget)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Timeline</div>
                <div className="font-semibold text-gray-900">{leadData.timeline} days</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Purpose</div>
                <div className="font-semibold text-gray-900">{leadData.purpose}</div>
              </div>
            </div>
          </div>

          {/* Booking Calendar */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Select Date & Time
            </h3>

            {/* Date Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Date
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableDates.map((date) => (
                  <button
                    key={date.date}
                    onClick={() => setSelectedDate(date.date)}
                    className={`p-4 rounded-xl border-2 font-medium transition text-left ${
                      selectedDate === date.date
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-lg font-bold">{date.display.split(", ")[1].split(" ")[1]}</div>
                    <div className="text-sm">{date.display.split(", ")[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Choose Time Slot
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                    className={`p-3 rounded-xl border-2 font-medium transition ${
                      selectedTime === time
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmBooking}
              disabled={!selectedDate || !selectedTime || isConfirming}
              className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
            >
              {isConfirming ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                  Confirming Booking...
                </span>
              ) : (
                "Confirm Booking 📅"
              )}
            </button>

            {selectedDate && selectedTime && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2 text-green-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">
                    Selected: {availableDates.find((d) => d.date === selectedDate)?.display} at {selectedTime}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
