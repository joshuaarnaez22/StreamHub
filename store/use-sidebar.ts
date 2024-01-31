import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface SidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("sidebar-store", useSidebarStore);
}
