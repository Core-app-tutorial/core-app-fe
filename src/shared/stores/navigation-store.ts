import { create } from "zustand";

interface NavigationStore {
  isNavigating: boolean;
  setNavigating: (navigating: boolean) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  isNavigating: false,
  setNavigating: (navigating: boolean) => set({ isNavigating: navigating }),
}));
