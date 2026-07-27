"use client";

import { create } from "zustand";
import {
  AUTH_KEY,
  DEV_ADMIN_PASSWORD,
  DEV_ADMIN_USERNAME,
} from "@/lib/constants";

/**
 * LOCAL DEVELOPMENT ONLY.
 * This authentication is intentionally insecure and must be replaced
 * with Supabase Auth, Auth.js, or another secure system before deployment.
 */
interface AuthState {
  isAuthenticated: boolean;
  hydrated: boolean;
  hydrate: () => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hydrated: false,

  hydrate: () => {
    if (typeof window === "undefined") return;
    const value = window.sessionStorage.getItem(AUTH_KEY);
    set({ isAuthenticated: value === "true", hydrated: true });
  },

  login: (username, password) => {
    const ok =
      username === DEV_ADMIN_USERNAME && password === DEV_ADMIN_PASSWORD;
    if (ok && typeof window !== "undefined") {
      window.sessionStorage.setItem(AUTH_KEY, "true");
      set({ isAuthenticated: true });
    }
    return ok;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(AUTH_KEY);
    }
    set({ isAuthenticated: false });
  },
}));
