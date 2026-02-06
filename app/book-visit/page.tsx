'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';

const timeSlots = [
    "09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "04:00 PM"
];

// Mock Calendar Dates for the current month
const days = Array.from({ length: 30 }, (_, i) => i + 1);

export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

    const handleDateSelect = (day: number) => {
        setSelectedDate(day);
        setSelectedTime(null); // Reset time when date changes
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would call the API to send email/WhatsApp
        console.log("Booking Confirmed:", { selectedDate, selectedTime, ...formData });

        // Mock Success
        setTimeout(() => setStep(3), 1000);
    };

    return (
        <div className="min-h-screen bg-black text-foreground pb-20">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-4">Schedule Your Site Visit</h1>
                    <p className="text-muted-foreground">Select a date and time for our agents to pick you up.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Visual Progress / Instructions */}
                    <div className="md:col-span-1 space-y-8">
                        {/* Step 1 */}
                        <div className={cn("flex items-start gap-4 p-4 rounded-xl transition-colors", step === 1 ? "bg-white/5 border border-primary/20" : "")}>
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 1 ? "bg-primary text-black" : "bg-white/10")}>1</div>
                            <div>
                                <h3 className="font-semibold mb-1">Select Date & Time</h3>
                                <p className="text-xs text-muted-foreground">Pick a slot that works for you.</p>
                            </div>
                        </div>
                        {/* Step 2 */}
                        <div className={cn("flex items-start gap-4 p-4 rounded-xl transition-colors", step === 2 ? "bg-white/5 border border-primary/20" : "")}>
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 2 ? "bg-primary text-black" : "bg-white/10")}>2</div>
                            <div>
                                <h3 className="font-semibold mb-1">Your Details</h3>
                                <p className="text-xs text-muted-foreground">We need this to contact you.</p>
                            </div>
                        </div>
                        {/* Step 3 */}
                        <div className={cn("flex items-start gap-4 p-4 rounded-xl transition-colors", step === 3 ? "bg-white/5 border border-primary/20" : "")}>
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 3 ? "bg-primary text-black" : "bg-white/10")}>3</div>
                            <div>
                                <h3 className="font-semibold mb-1">Confirmation</h3>
                                <p className="text-xs text-muted-foreground">Receive instant details.</p>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Area */}
                    <div className="md:col-span-2 glass-card rounded-2xl p-8 min-h-[500px] relative overflow-hidden">
                        <AnimatePresence mode='wait'>
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <CalendarIcon className="w-5 h-5 text-primary" />
                                            February 2026
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                                            <button className="p-2 hover:bg-white/10 rounded-full"><ChevronRight className="w-4 h-4" /></button>
                                        </div>
                                    </div>

                                    {/* Calendar Grid */}
                                    <div className="grid grid-cols-7 gap-2 text-center mb-6">
                                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} className="text-xs text-muted-foreground py-2">{d}</span>)}
                                        {days.map(day => (
                                            <button
                                                key={day}
                                                onClick={() => handleDateSelect(day)}
                                                className={cn(
                                                    "h-10 w-10 rounded-full text-sm font-medium transition-all mx-auto",
                                                    selectedDate === day
                                                        ? "bg-primary text-black shadow-[0_0_10px_rgba(251,191,36,0.4)] scale-110"
                                                        : "hover:bg-white/10 text-white"
                                                )}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Time Slots */}
                                    {selectedDate && (
                                        <div className='animate-fade-in'>
                                            <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                                <Clock className="w-4 h-4" /> Available Slots
                                            </h4>
                                            <div className="grid grid-cols-3 gap-3">
                                                {timeSlots.map(time => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={cn(
                                                            "py-2 px-3 rounded-lg text-sm border transition-all",
                                                            selectedTime === time
                                                                ? "border-primary bg-primary/10 text-primary"
                                                                : "border-white/10 hover:border-white/20 text-muted-foreground"
                                                        )}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-6 border-t border-white/5 flex justify-end">
                                        <button
                                            disabled={!selectedDate || !selectedTime}
                                            onClick={() => setStep(2)}
                                            className="px-6 py-2 bg-primary disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h3 className="text-2xl font-bold mb-6">Enter Details</h3>
                                    <form onSubmit={handleConfirm} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">WhatsApp Number</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="+254 700 000 000"
                                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-primary focus:outline-none transition-colors"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>

                                        <div className="pt-6 flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors font-medium"
                                            >
                                                Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-1 px-6 py-3 bg-primary text-black font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                                            >
                                                Confirm Booking
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center pt-10"
                                >
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 text-green-500">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-2">Booking Confirmed!</h3>
                                    <p className="text-muted-foreground max-w-sm mb-8">
                                        We have sent a confirmation email to <span className="text-white">{formData.email}</span> and a WhatsApp message to your number.
                                    </p>

                                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 w-full mb-8 text-left">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-muted-foreground">Date:</span>
                                            <span className="font-semibold text-white">February {selectedDate}, 2026</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Time:</span>
                                            <span className="font-semibold text-white">{selectedTime}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => window.location.href = '/'}
                                        className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
                                    >
                                        Back to Home
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
