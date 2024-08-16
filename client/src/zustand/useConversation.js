import { create } from "zustand"

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessage: (messages) => set({ messages }),
    clearMessages: () => set({ messages: [] }) // Add this function to clear the messages array

}))

export default useConversation