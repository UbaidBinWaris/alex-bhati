"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToastStore } from '@/components/ui/ToastSystem';

export type MessageType = 'text' | 'options' | 'calendar' | 'form';

export interface ChatMessage {
    id: string;
    sender: 'ai' | 'user';
    text: string;
    type?: MessageType;
    options?: string[];
    timestamp: Date;
}

export interface UserDetails {
    budget?: string;
    plotSize?: string;
    location?: string;
    name?: string;
    phone?: string;
    visitDate?: Date;
    timeline?: string;
    purpose?: string;
    funding?: string;
}

export const useOChatSimulation = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [stage, setStage] = useState<'acquisition' | 'qualification' | 'deep_qual' | 'recommendation' | 'booking' | 'closing'>('acquisition');
    const [userDetails, setUserDetails] = useState<UserDetails>({});
    const [isOpen, setIsOpen] = useState(false);
    const [leadScore, setLeadScore] = useState(10); // Start with base interest
    const { addToast } = useToastStore();

    // Helper to add AI message with delay
    const addAiMessage = useCallback((text: string, type: MessageType = 'text', options?: string[]) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Math.random().toString(36).substr(2, 9),
                sender: 'ai',
                text,
                type,
                options,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1200);
    }, []);

    // Update Score Helper - Visual "ding"
    const boostScore = (amount: number, reason: string) => {
        setLeadScore(prev => Math.min(prev + amount, 100));
        setTimeout(() => addToast(`Lead Score +${amount}: ${reason}`, 'success'), 500);
    };

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addAiMessage("Hi there! 👋 I'm your AI Property Assistant. I can help you find premium plots or book a site visit instantly. What are you looking for today?", 'options', ['Investment Plot', 'Residential Plot', 'Commercial Plot']);
        }
    }, [isOpen, messages.length, addAiMessage]);

    const handleUserResponse = (text: string) => {
        // Add User Message
        setMessages(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            sender: 'user',
            text,
            timestamp: new Date()
        }]);

        // --- State Machine ---

        // 1. Acquisition -> Budget
        if (stage === 'acquisition') {
            setUserDetails(prev => ({ ...prev, purpose: text }));
            boostScore(10, "Intent Captured");
            setStage('qualification');
            addAiMessage(`Great choice! To find the best ${text} options, what is your approximate budget?`, 'options', ['Below 20 Lakhs', '20-50 Lakhs', 'Above 50 Lakhs', 'Flexible']);

            // 2. Budget -> Timeline (Deep Qual)
        } else if (stage === 'qualification') {
            setUserDetails(prev => ({ ...prev, budget: text }));
            if (text === 'Above 50 Lakhs' || text === '20-50 Lakhs') boostScore(20, "High Budget");
            setStage('deep_qual');
            addAiMessage("Got it. And how soon are you looking to finalize a plot?", 'options', ['Immediate (1-2 weeks)', 'This Month', '3-6 Months', 'Just Browsing']);

            // 3. Timeline -> Funding -> Recommendation
        } else if (stage === 'deep_qual') {
            setUserDetails(prev => ({ ...prev, timeline: text }));

            if (text.includes('Immediate') || text.includes('Month')) {
                boostScore(30, "High Urgency");
                addAiMessage("Understood. One last question to get you the best deal: How are you planning to fund this?", 'options', ['Self Funding / Cash', 'Bank Loan', 'Mix of Both']);
                setStage('recommendation'); // Skip straight to recommendation after funding
            } else {
                // Slower track for 3-6 months
                boostScore(5, "Future Prospect");
                setStage('recommendation');
                addAiMessage("Okay. What size of plot do you prefer?", 'options', ['1200 Sq.ft', '1500 Sq.ft', '2400 Sq.ft', 'Larger']);
            }

            // 4. Recommendation (Handle Funding or Size response)
        } else if (stage === 'recommendation') {
            // If coming from Funding question
            if (text.includes('Cash') || text.includes('Loan')) {
                setUserDetails(prev => ({ ...prev, funding: text }));
                if (text.includes('Cash')) boostScore(15, "Cash Buyer");
            } else {
                setUserDetails(prev => ({ ...prev, plotSize: text }));
            }

            setIsTyping(true);
            setTimeout(() => {
                addToast("AI Matching 3 Properties...", "info");
                setTimeout(() => {
                    addAiMessage("🔍 I found 3 premium plots that match your criteria in North Avenue. Properties here are appreciating fast! 🚀", 'text');
                    setTimeout(() => {
                        setStage('booking');
                        boostScore(10, "Proposal Viewed");
                        addAiMessage("Would you like to schedule a VIP site visit this week? I can arrange a car for you.", 'options', ['Book Site Visit', 'Send Details on WhatsApp']);
                    }, 1200);
                }, 1500);
            }, 1000);

            // 5. Booking
        } else if (stage === 'booking') {
            if (text.includes('WhatsApp')) {
                setStage('closing');
                addToast("Lead synced to WhatsApp CRM", "whatsapp");
                addAiMessage("✅ Done! I've sent the brochures and layout maps to your WhatsApp number. Our team will follow up shortly.", 'text');
            } else {
                addAiMessage("Excellent! Please select a date for your visit.", 'calendar');
            }
        }
    };

    const handleBookingConfirm = (date: Date) => {
        setUserDetails(prev => ({ ...prev, visitDate: date }));
        setMessages(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            sender: 'user',
            text: `Booked for ${date.toLocaleDateString()}`,
            timestamp: new Date()
        }]);
        setStage('closing');
        boostScore(20, "Visit Confirmed"); // Max out score
        addAiMessage(`🎉 Perfect! Your site visit is confirmed for ${date.toLocaleDateString()}. I've added this to your Google Calendar and sent a confirmation SMS.`, 'text');

        addToast("Google Calendar Event Created", "success");
        setTimeout(() => addToast("Confirmation SMS Sent", "info"), 1500);
    };

    return {
        messages,
        isTyping,
        isOpen,
        setIsOpen,
        handleUserResponse,
        handleBookingConfirm,
        userDetails,
        leadScore
    };
};
