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
}

export const useOChatSimulation = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [stage, setStage] = useState<'acquisition' | 'qualification' | 'recommendation' | 'booking' | 'closing'>('acquisition');
    const [userDetails, setUserDetails] = useState<UserDetails>({});
    const [isOpen, setIsOpen] = useState(false);
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
        }, 1500); // 1.5s delay for realism
    }, []);

    // Initial Greeting
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addAiMessage("Hi there! 👋 I'm your AI Property Assistant. I can help you find the perfect plot or book a site visit instantly. What are you looking for today?", 'options', ['Investment Plot', 'Residential Plot', 'Commercial Plot']);
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

        // Simple State Machine for Simulation
        if (stage === 'acquisition') {
            setStage('qualification');
            addAiMessage(`Great choice! To find the best options for you, what is your approximate budget?`, 'options', ['Below 10 Lakhs', '10-20 Lakhs', '20-50 Lakhs', 'Above 50 Lakhs']);
        } else if (stage === 'qualification') {
            setUserDetails(prev => ({ ...prev, budget: text }));
            setStage('recommendation');
            addAiMessage("Got it. And what size of plot do you prefer?", 'options', ['1200 Sq.ft', '1500 Sq.ft', '2400 Sq.ft', 'Larger']);

            // Simulating Backend Activity
            setTimeout(() => {
                addToast("AI analyzing 50+ properties...", "info");
            }, 1000);

        } else if (stage === 'recommendation') {
            setUserDetails(prev => ({ ...prev, plotSize: text }));
            setIsTyping(true);
            setTimeout(() => {
                addToast("Found 3 High-Match Leads", "success");
                addAiMessage("🔍 I found 3 premium plots that match your criteria in North Avenue & Green Valley. Properties in this range are selling fast! 🚀", 'text');
                setTimeout(() => {
                    setStage('booking');
                    addAiMessage("Would you like to schedule a site visit to see them? I can book a car for you.", 'options', ['Book Site Visit', 'Send Details on WhatsApp']);
                }, 1000);
            }, 1500);
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
        userDetails
    };
};
