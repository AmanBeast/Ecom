"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BookingRecord, OrderRecord, ConversationRecord, WorkspaceItem, ProductItem } from "../data/mockData";

interface ToastInfo {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

interface AppContextType {
  favorites: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;

  toasts: ToastInfo[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;

  activeChat: ConversationRecord | null;
  openChatWithSeller: (productId: string, initialMsg?: string) => void;
  closeChat: () => void;
  sendChatMessage: (content: string) => void;

  activeOfferProduct: ProductItem | null;
  openOfferModal: (product: ProductItem) => void;
  closeOfferModal: () => void;

  activeCheckoutProduct: ProductItem | null;
  openCheckoutModal: (product: ProductItem) => void;
  closeCheckoutModal: () => void;

  activeBookingWorkspace: WorkspaceItem | null;
  openBookingModal: (workspace: WorkspaceItem) => void;
  closeBookingModal: () => void;

  confirmedBooking: BookingRecord | null;
  setConfirmedBooking: (b: BookingRecord | null) => void;

  bookings: BookingRecord[];
  refreshBookings: () => Promise<void>;

  orders: OrderRecord[];
  refreshOrders: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [activeChat, setActiveChat] = useState<ConversationRecord | null>(null);
  const [activeOfferProduct, setActiveOfferProduct] = useState<ProductItem | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ProductItem | null>(null);
  const [activeBookingWorkspace, setActiveBookingWorkspace] = useState<WorkspaceItem | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  useEffect(() => {
    refreshBookings();
    refreshOrders();
  }, []);

  const refreshBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      const json = await res.json();
      if (json.success) {
        setBookings(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const toggleFavorite = (id: string, name?: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(name ? `Removed ${name} from Wishlist` : "Removed from Wishlist", "info");
        return prev.filter((item) => item !== id);
      } else {
        showToast(name ? `Saved ${name} to Wishlist` : "Saved to Wishlist", "success");
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const openChatWithSeller = async (productId: string, initialMsg?: string) => {
    try {
      const res = await fetch("/api/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, initialText: initialMsg }),
      });
      const json = await res.json();
      if (json.success) {
        setActiveChat(json.data);
      }
    } catch (err) {
      console.error(err);
      showToast("Connecting to secure messenger...", "info");
    }
  };

  const closeChat = () => setActiveChat(null);

  const sendChatMessage = async (content: string) => {
    if (!activeChat || !content.trim()) return;
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: activeChat.id, content }),
      });
      const json = await res.json();
      if (json.success) {
        setActiveChat((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            lastMessage: content,
            messages: [...prev.messages, json.data],
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openOfferModal = (product: ProductItem) => setActiveOfferProduct(product);
  const closeOfferModal = () => setActiveOfferProduct(null);

  const openCheckoutModal = (product: ProductItem) => setActiveCheckoutProduct(product);
  const closeCheckoutModal = () => setActiveCheckoutProduct(null);

  const openBookingModal = (workspace: WorkspaceItem) => setActiveBookingWorkspace(workspace);
  const closeBookingModal = () => setActiveBookingWorkspace(null);

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        toasts,
        showToast,
        activeChat,
        openChatWithSeller,
        closeChat,
        sendChatMessage,
        activeOfferProduct,
        openOfferModal,
        closeOfferModal,
        activeCheckoutProduct,
        openCheckoutModal,
        closeCheckoutModal,
        activeBookingWorkspace,
        openBookingModal,
        closeBookingModal,
        confirmedBooking,
        setConfirmedBooking,
        bookings,
        refreshBookings,
        orders,
        refreshOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
