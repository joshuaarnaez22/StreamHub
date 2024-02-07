import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

interface CreatorSidebarStore {
  collapsed: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useCreatorSidebarStore = create<CreatorSidebarStore>((set) => ({
  collapsed: false,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("creator-sidebar-store", useCreatorSidebarStore);
}
