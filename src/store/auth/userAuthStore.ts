import { create } from "zustand";
import type { AuthStore } from "./types";

export const authStore = create<AuthStore>(() => ({
  authUser: null,
}));
