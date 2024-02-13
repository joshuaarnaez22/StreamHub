import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

export enum ChatType {
  Chat = "chat",
  Community = "community",
}
interface ChatSidebarStore {
  collapsed: boolean;
  type: ChatType;
  onChangeType: (type: ChatType) => void;
  onExpand: () => void;
  onCollapse: () => void;
}

export const useChatSidebarStore = create<ChatSidebarStore>((set) => ({
  collapsed: false,
  type: ChatType.Chat,
  onExpand: () => set({ collapsed: false }),
  onCollapse: () => set({ collapsed: true }),
  onChangeType: (type: ChatType) => set({ type }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("chat-sidebar-store", useChatSidebarStore);
}
