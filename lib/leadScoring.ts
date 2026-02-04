export interface Lead {
  id: string;
  name: string;
  phone: string;
  budget: string;
  timeline: string;
  purpose: string;
  intentScore?: number;
  status?: string;
  source?: string;
  createdAt?: string;
}

export function calculateLeadScore(lead: {
  budget: string;
  timeline: string;
  purpose: string;
}): number {
  let score = 0;

  // Budget scoring
  const budgetValue = parseInt(lead.budget);
  if (budgetValue >= 10000000) {
    score += 30;
  } else if (budgetValue >= 7000000) {
    score += 25;
  } else if (budgetValue >= 5000000) {
    score += 20;
  } else if (budgetValue >= 3000000) {
    score += 15;
  } else {
    score += 10;
  }

  // Timeline scoring
  const timelineValue = parseInt(lead.timeline);
  if (timelineValue <= 7) {
    score += 40;
  } else if (timelineValue <= 15) {
    score += 35;
  } else if (timelineValue <= 30) {
    score += 30;
  } else if (timelineValue <= 60) {
    score += 20;
  } else if (timelineValue <= 90) {
    score += 15;
  } else {
    score += 5;
  }

  // Purpose scoring
  if (lead.purpose === "Investment") {
    score += 30;
  } else {
    score += 20;
  }

  return Math.min(score, 100);
}

export function getLeadStatus(score: number): string {
  if (score >= 70) return "High";
  if (score >= 40) return "Medium";
  return "Cold";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "High":
      return "bg-green-100 text-green-800 border-green-200";
    case "Medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Cold":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function formatCurrency(amount: string | number): string {
  const num = typeof amount === "string" ? parseInt(amount) : amount;
  if (num >= 10000000) {
    return `₹${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `₹${(num / 100000).toFixed(2)} L`;
  } else {
    return `₹${num.toLocaleString("en-IN")}`;
  }
}

export function getTimelineText(days: string | number): string {
  const numDays = typeof days === "string" ? parseInt(days) : days;
  if (numDays <= 7) return `${numDays} days (Urgent)`;
  if (numDays <= 30) return `${numDays} days`;
  if (numDays <= 90) return `~${Math.round(numDays / 30)} months`;
  return `${Math.round(numDays / 30)} months`;
}
