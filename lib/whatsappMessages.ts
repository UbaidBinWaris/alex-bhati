export interface WhatsAppMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: "bot" | "user";
  delay?: number;
}

export function generateWhatsAppSequence(leadName: string, budget: string, purpose: string): WhatsAppMessage[] {
  const firstName = leadName.split(" ")[0];
  
  return [
    {
      id: "msg-1",
      text: `Hi ${firstName}! 👋 Thank you for your interest in our premium properties.`,
      timestamp: new Date(),
      sender: "bot",
      delay: 1000,
    },
    {
      id: "msg-2",
      text: `I see you're looking for a ${purpose.toLowerCase()} property with a budget of ${budget}. Great choice!`,
      timestamp: new Date(),
      sender: "bot",
      delay: 2500,
    },
    {
      id: "msg-3",
      text: `We have some exclusive properties that match your requirements perfectly. Would you like to schedule a site visit?`,
      timestamp: new Date(),
      sender: "bot",
      delay: 4000,
    },
    {
      id: "msg-4",
      text: `📅 I can book a viewing for you at your preferred time. Click the link below to choose a slot:`,
      timestamp: new Date(),
      sender: "bot",
      delay: 5500,
    },
    {
      id: "msg-5",
      text: `🔗 Book Your Site Visit →`,
      timestamp: new Date(),
      sender: "bot",
      delay: 6500,
    },
  ];
}

export function generateFollowUpMessages(leadName: string, day: number): string {
  const firstName = leadName.split(" ")[0];
  
  const messages: { [key: number]: string } = {
    1: `Hi ${firstName}! Thank you for your interest. I'm excited to help you find your perfect property! 🏡`,
    3: `Hi ${firstName}, just following up on your property search. Would you like to schedule a site visit this week? 📅`,
    7: `Hi ${firstName}, I wanted to share our exclusive new properties that just came on the market. Interested? ✨`,
    14: `Hi ${firstName}, hope you're doing well! We have some great deals this month. Let me know if you'd like details. 💼`,
    30: `Hi ${firstName}, just checking in. Are you still looking for properties? We have fresh inventory! 🏢`,
  };
  
  return messages[day] || `Hi ${firstName}, following up on your property search. Let me know if I can help! 😊`;
}

export function generateReactivationMessage(leadName: string): string {
  const firstName = leadName.split(" ")[0];
  return `Hi ${firstName}! 🎉 We have exciting new properties that match your previous search criteria. The market has some great opportunities right now. Would you like to explore them? Let me know! 🏡`;
}
