"use client";

import { create } from 'zustand';
import { useEffect } from 'react';

// 1. Store
type ToastType = 'success' | 'info' | 'whatsapp';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastStore {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
    toasts: [],
    addToast: (message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));

        // Auto remove after 5s
        setTimeout(() => {
            set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 5000);
    },
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));


// 2. Component
export const ToastContainer = () => {
    const toasts = useToastStore((state) => state.toasts);

    return (
        <div className="fixed top-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className="pointer-events-auto min-w-[300px] p-4 rounded-xl bg-zinc-900 border border-white/10 shadow-xl flex items-center gap-3 animate-in slide-in-from-right-10 fade-in duration-300"
                >
                    <div className={`text-xl ${toast.type === 'whatsapp' ? 'text-green-500' :
                        toast.type === 'success' ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                        {toast.type === 'whatsapp' ? '📱' : toast.type === 'success' ? '✅' : 'ℹ️'}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{toast.message}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">{toast.type === 'whatsapp' ? 'WhatsApp Integration' : 'System Notification'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
