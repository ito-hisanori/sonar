import { create } from "zustand";
import { User } from "@/interfaces";

const usersGlobalStore = create((set) => ({
  user: null,
  setUser: (payload: User) => set({ user: payload }),
}));

export default usersGlobalStore;

export interface UsersGlobalStore {
  user: User | null;
  setUser: (user: User) => void;
}
