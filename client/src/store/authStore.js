import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api/client";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const { data } = await api.post("/auth/login", { email, password });
        localStorage.setItem("earthian_token", data.token);
        set({ user: data.user, token: data.token });
        return data.user;
      },
      register: async (payload) => {
        const { data } = await api.post("/auth/register", payload);
        localStorage.setItem("earthian_token", data.token);
        set({ user: data.user, token: data.token });
        return data.user;
      },
      logout: () => {
        localStorage.removeItem("earthian_token");
        set({ user: null, token: null });
      }
    }),
    { name: "earthian_auth" }
  )
);
