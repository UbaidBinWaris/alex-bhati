"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import leadsData from "@/data/leads.json";
import oldLeadsData from "@/data/oldLeads.json";
import bookingsData from "@/data/bookings.json";
import followupsData from "@/data/followups.json";
import { formatCurrency, getStatusColor } from "@/lib/leadScoring";

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState(leadsData);
  const [bookings, setBookings] = useState(bookingsData);
  const [isReactivating, setIsReactivating] = useState(false);
  const [showReactivationModal, setShowReactivationModal] = useState(false);
  const [reactivationProgress, setReactivationProgress] = useState(0);

  // Calculate metrics
  const totalLeads = leads.length;
  const highIntentLeads = leads.filter((l) => l.status === "High").length;
  const mediumIntentLeads = leads.filter((l) => l.status === "Medium").length;
  const coldLeads = leads.filter((l) => l.status === "Cold").length;
  const totalBookings = bookings.length;
  const conversionRate = totalLeads > 0 ? ((totalBookings / totalLeads) * 100).toFixed(1) : "0";

  // Lead sources
  const leadsBySource = {
    Facebook: leads.filter((l) => l.source === "Facebook").length,
    Website: leads.filter((l) => l.source === "Website").length,
    WhatsApp: leads.filter((l) => l.source === "WhatsApp").length,
  };

  const handleReactivateOldLeads = async () => {
    setShowReactivationModal(true);
    setIsReactivating(true);
    setReactivationProgress(0);

    // Simulate reactivation progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setReactivationProgress(i);
    }

    setIsReactivating(false);
  };

  const closeModal = () => {
    setShowReactivationModal(false);
    setReactivationProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
                <p className="text-sm text-gray-600">Real Estate Lead Management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/leads")}
                className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-gray-300 transition"
              >
                View All Leads
              </button>
              <button
                onClick={() => router.push("/landing")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                + Add New Lead
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Leads */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalLeads}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>

          {/* High Intent Leads */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                High Priority
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{highIntentLeads}</div>
            <div className="text-sm text-gray-600">High Intent Leads</div>
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                Active
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{totalBookings}</div>
            <div className="text-sm text-gray-600">Site Visits Booked</div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
              <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                Trending
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Lead Sources Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Lead Sources</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Facebook Ads</span>
                  <span className="text-sm font-bold text-gray-900">{leadsBySource.Facebook}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${(leadsBySource.Facebook / totalLeads) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Website</span>
                  <span className="text-sm font-bold text-gray-900">{leadsBySource.Website}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${(leadsBySource.Website / totalLeads) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">WhatsApp</span>
                  <span className="text-sm font-bold text-gray-900">{leadsBySource.WhatsApp}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all"
                    style={{
                      width: `${(leadsBySource.WhatsApp / totalLeads) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Intent Distribution */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Intent Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <div className="text-sm font-medium text-green-800">High Intent</div>
                  <div className="text-xs text-green-600">Hot leads</div>
                </div>
                <div className="text-2xl font-bold text-green-700">{highIntentLeads}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <div className="text-sm font-medium text-yellow-800">Medium Intent</div>
                  <div className="text-xs text-yellow-600">Warm leads</div>
                </div>
                <div className="text-2xl font-bold text-yellow-700">{mediumIntentLeads}</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="text-sm font-medium text-gray-800">Cold Intent</div>
                  <div className="text-xs text-gray-600">Need nurturing</div>
                </div>
                <div className="text-2xl font-bold text-gray-700">{coldLeads}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Automation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Old Lead Reactivation */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl shadow-md p-6 border-2 border-orange-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔄</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Old Lead Reactivation
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {oldLeadsData.length} inactive leads from last 90 days. Send automated WhatsApp messages to re-engage them.
                </p>
                <button
                  onClick={handleReactivateOldLeads}
                  disabled={isReactivating}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {isReactivating ? "Reactivating..." : "Reactivate Old Leads"}
                </button>
              </div>
            </div>
          </div>

          {/* Follow-up Automation */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl shadow-md p-6 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Automated Follow-ups
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {followupsData.filter(f => !f.sent).length} follow-up messages scheduled. All leads receive timely WhatsApp updates automatically.
                </p>
                <button
                  onClick={() => router.push("/leads")}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  View Follow-up Timeline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Leads</h3>
            <button
              onClick={() => router.push("/leads")}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              View All →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Lead
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {lead.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {formatCurrency(lead.budget)}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900">{lead.intentScore}</div>
                        <div className="text-xs text-gray-600">/100</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{lead.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Upcoming Site Visits</h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📅</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{booking.leadName}</div>
                    <div className="text-sm text-gray-600">
                      {booking.date} at {booking.time}
                    </div>
                  </div>
                </div>
                <span className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg">
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reactivation Modal */}
      {showReactivationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔄</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isReactivating ? "Reactivating Leads..." : "Reactivation Complete!"}
              </h3>
              <p className="text-gray-600 mb-6">
                {isReactivating 
                  ? `Sending WhatsApp messages to ${oldLeadsData.length} inactive leads`
                  : `Successfully sent messages to ${oldLeadsData.length} old leads`}
              </p>

              {isReactivating && (
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${reactivationProgress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{reactivationProgress}%</div>
                </div>
              )}

              {!isReactivating && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-green-800">Messages Sent</span>
                    <span className="text-sm font-bold text-green-700">{oldLeadsData.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-sm font-medium text-blue-800">Expected Responses</span>
                    <span className="text-sm font-bold text-blue-700">30-40%</span>
                  </div>
                </div>
              )}

              {!isReactivating && (
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Got it!
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
