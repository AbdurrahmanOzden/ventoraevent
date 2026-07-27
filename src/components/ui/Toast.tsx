"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: ToastItem[];
  push: (message: string, type?: ToastType) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, type = "success") => {
    const id = `toast-${Date.now()}`;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    window.setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

const icons = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

export function ToastViewport() {
  const { toasts, remove } = useToastStore();

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[100] flex w-[min(100%,22rem)] flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type];
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="pointer-events-auto flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl"
              role="status"
            >
              <Icon
                className={
                  toast.type === "success"
                    ? "text-[var(--success)]"
                    : toast.type === "error"
                      ? "text-[var(--danger)]"
                      : "text-[var(--primary)]"
                }
              />
              <p className="flex-1 text-sm leading-relaxed">{toast.message}</p>
              <button
                type="button"
                aria-label="Bildirimi kapat"
                onClick={() => remove(toast.id)}
                className="text-[var(--muted)] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  return useToastStore((s) => s.push);
}
