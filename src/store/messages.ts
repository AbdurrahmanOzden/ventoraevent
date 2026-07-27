"use client";

import { create } from "zustand";
import { MESSAGES_KEY } from "@/lib/constants";
import { generateId } from "@/lib/utils";
import type { ContactMessage } from "@/types/content";

type NewMessage = Omit<ContactMessage, "id" | "submittedAt" | "read">;

interface MessagesState {
  messages: ContactMessage[];
  hydrated: boolean;
  hydrate: () => void;
  addMessage: (message: NewMessage) => ContactMessage;
  markRead: (id: string, read: boolean) => void;
  deleteMessage: (id: string) => void;
}

function persistMessages(messages: ContactMessage[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }
}

function readMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(MESSAGES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ContactMessage[];
  } catch {
    return [];
  }
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  messages: [],
  hydrated: false,

  hydrate: () => {
    set({ messages: readMessages(), hydrated: true });
  },

  addMessage: (message) => {
    const entry: ContactMessage = {
      ...message,
      id: generateId("msg"),
      submittedAt: new Date().toISOString(),
      read: false,
    };
    const messages = [entry, ...get().messages];
    persistMessages(messages);
    set({ messages });
    return entry;
  },

  markRead: (id, read) => {
    const messages = get().messages.map((item) =>
      item.id === id ? { ...item, read } : item
    );
    persistMessages(messages);
    set({ messages });
  },

  deleteMessage: (id) => {
    const messages = get().messages.filter((item) => item.id !== id);
    persistMessages(messages);
    set({ messages });
  },
}));
