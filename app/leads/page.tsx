"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import leadsData from "@/data/leads.json";
import followupsData from "@/data/followups.json";
import { formatCurrency, getStatusColor, getTimelineText } from "@/lib/leadScoring";
import { generateFollowUpMessages } from "@/lib/whatsappMessages";

export default function LeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState(leadsData);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [followupTimeline, setFollowupTimeline] = useState<any[]>([]);

  const filters = ["All", "High", "Medium", "Cold"];

  const filteredLeads =
    selectedFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === selectedFilter);

  const handleViewFollowups = (lead: any) => {
    setSelectedLead(lead);
    const leadFollowups = followupsData.filter((f) => f.leadId === lead.id);
    setFollowupTimeline(leadFollowups);
    setShowFollowupModal(true);
  };

  const closeModal = () => {
    setShowFollowupModal(false);
    setSelectedLead(null);
    setFollowupTimeline([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Leads</h1>
                <p className="text-sm text-gray-600">{filteredLeads.length} leads found</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/landing")}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              + Add New Lead
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-md p-2 mb-6 border border-gray-100 inline-flex gap-2">
          {filters.map((filter) => {
            const count =
              filter === "All"
                ? leads.length
                : leads.filter((l) => l.status === filter).length;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter}
                <span className="ml-2 text-sm opacity-80">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
            <div className="text-sm text-green-800 font-medium mb-1">Avg. Intent Score</div>
            <div className="text-3xl font-bold text-green-700">
              {(
                filteredLeads.reduce((sum, l) => sum + l.intentScore, 0) /
                filteredLeads.length
              ).toFixed(0)}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
            <div className="text-sm text-blue-800 font-medium mb-1">Avg. Budget</div>
            <div className="text-2xl font-bold text-blue-700">
              {formatCurrency(
                filteredLeads.reduce((sum, l) => sum + parseInt(l.budget), 0) /
                  filteredLeads.length
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
            <div className="text-sm text-purple-800 font-medium mb-1">Investment Purpose</div>
            <div className="text-3xl font-bold text-purple-700">
              {filteredLeads.filter((l) => l.purpose === "Investment").length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
            <div className="text-sm text-orange-800 font-medium mb-1">Urgent (&lt;30 days)</div>
            <div className="text-3xl font-bold text-orange-700">
              {filteredLeads.filter((l) => parseInt(l.timeline) <= 30).length}
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Lead Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">
                            {lead.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{lead.name}</div>
                          <div className="text-sm text-gray-600">{lead.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(lead.budget)}
                      </div>
                      <div className="text-xs text-gray-600">{lead.purpose}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {getTimelineText(lead.timeline)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {lead.intentScore}
                        </div>
                        <div className="text-xs text-gray-600">/100</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div
                          className={`h-1.5 rounded-full ${
                            lead.intentScore >= 70
                              ? "bg-green-600"
                              : lead.intentScore >= 40
                              ? "bg-yellow-600"
                              : "bg-gray-600"
                          }`}
                          style={{ width: `${lead.intentScore}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">{lead.source}</span>
                        {lead.source === "Facebook" && <span>📘</span>}
                        {lead.source === "Website" && <span>🌐</span>}
                        {lead.source === "WhatsApp" && <span>💬</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewFollowups(lead)}
                        className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition text-sm"
                      >
                        View Follow-ups
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Follow-up Modal */}
      {showFollowupModal && selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Follow-up Timeline</h3>
                  <p className="text-blue-100">{selectedLead.name}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/20 rounded-lg transition"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Lead Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Intent Score</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedLead.intentScore}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Status</div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                        selectedLead.status
                      )}`}
                    >
                      {selectedLead.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Budget</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedLead.budget)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Timeline</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {getTimelineText(selectedLead.timeline)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {followupTimeline.length > 0 ? (
                  <div className="space-y-4">
                    {followupTimeline.map((followup, index) => (
                      <div key={followup.id} className="relative pl-8">
                        {/* Timeline line */}
                        {index < followupTimeline.length - 1 && (
                          <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                        )}
                        
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-0 top-2 w-6 h-6 rounded-full border-4 ${
                            followup.sent
                              ? "bg-green-500 border-green-200"
                              : "bg-gray-300 border-gray-100"
                          }`}
                        ></div>

                        {/* Message Card */}
                        <div
                          className={`rounded-xl p-4 border-2 ${
                            followup.sent
                              ? "bg-green-50 border-green-200"
                              : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-gray-900">
                              Day {followup.day} Follow-up
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                followup.sent
                                  ? "bg-green-600 text-white"
                                  : "bg-yellow-600 text-white"
                              }`}
                            >
                              {followup.sent ? "✓ Sent" : "⏰ Scheduled"}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-2">{followup.message}</p>
                          <div className="text-xs text-gray-500">
                            {followup.sent
                              ? `Sent: ${new Date(followup.sentAt!).toLocaleString()}`
                              : `Scheduled: ${new Date(followup.scheduledFor!).toLocaleString()}`}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <span className="text-4xl mb-4 block">📭</span>
                    <p>No follow-ups scheduled yet</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t flex gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    router.push("/whatsapp-simulation");
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Send WhatsApp Message
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
