"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  BookingRecord,
  OrderRecord,
  ConversationRecord,
  WorkspaceItem,
  ProductItem,
} from "../data/mockData";

interface ToastInfo {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

interface AppContextType {
  // Theme
  theme: "light" | "dark";
  toggleTheme: () => void;

  // Location
  currentLocation: string;
  setCurrentLocation: (loc: string) => void;
  isLocationModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string, name?: string) => void;
  isFavorite: (id: string) => boolean;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: "success" | "info" | "error") => void;

  // Chat
  activeChat: ConversationRecord | null;
  openChatWithSeller: (productId: string, initialMsg?: string) => void;
  closeChat: () => void;
  sendChatMessage: (content: string) => void;

  // Seller Onboarding & Selling
  isSeller: boolean;
  storeInfo: { storeName: string; category: string; city: string } | null;
  becomeSeller: (data: { storeName: string; category: string; city: string }) => void;
  isBecomeSellerModalOpen: boolean;
  openBecomeSellerModal: () => void;
  closeBecomeSellerModal: () => void;

  // Add Product & Add Workspace Modals
  isAddProductModalOpen: boolean;
  openAddProductModal: () => void;
  closeAddProductModal: () => void;

  isAddWorkspaceModalOpen: boolean;
  openAddWorkspaceModal: () => void;
  closeAddWorkspaceModal: () => void;

  // Modals for Actions
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

  // Dynamic Data Lists
  workspaces: WorkspaceItem[];
  refreshWorkspaces: () => Promise<void>;

  products: ProductItem[];
  refreshProducts: () => Promise<void>;

  bookings: BookingRecord[];
  refreshBookings: () => Promise<void>;

  orders: OrderRecord[];
  refreshOrders: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme State
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Location State
  const [currentLocation, setCurrentLocationState] = useState<string>("Chandigarh 160017");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // Seller State
  const [isSeller, setIsSeller] = useState(false);
  const [storeInfo, setStoreInfo] = useState<{ storeName: string; category: string; city: string } | null>(null);
  const [isBecomeSellerModalOpen, setIsBecomeSellerModalOpen] = useState(false);

  // Add Modals
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddWorkspaceModalOpen, setIsAddWorkspaceModalOpen] = useState(false);

  // Existing interactive modals
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastInfo[]>([]);
  const [activeChat, setActiveChat] = useState<ConversationRecord | null>(null);
  const [activeOfferProduct, setActiveOfferProduct] = useState<ProductItem | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ProductItem | null>(null);
  const [activeBookingWorkspace, setActiveBookingWorkspace] = useState<WorkspaceItem | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Data collections
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);

  // Initialize theme from storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("nexus_theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const savedLocation = localStorage.getItem("nexus_location");
    if (savedLocation) {
      setCurrentLocationState(savedLocation);
    }

    const savedSeller = localStorage.getItem("nexus_is_seller");
    if (savedSeller === "true") {
      setIsSeller(true);
    }

    refreshWorkspaces();
    refreshProducts();
    refreshBookings();
    refreshOrders();
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("nexus_theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const setCurrentLocation = (loc: string) => {
    setCurrentLocationState(loc);
    localStorage.setItem("nexus_location", loc);
    showToast(`Location set to ${loc}`, "success");
  };

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const becomeSeller = (data: { storeName: string; category: string; city: string }) => {
    setIsSeller(true);
    setStoreInfo(data);
    localStorage.setItem("nexus_is_seller", "true");
    setIsBecomeSellerModalOpen(false);
    showToast(`Welcome! Your seller profile "${data.storeName}" is now active.`, "success");
  };

  const openBecomeSellerModal = () => setIsBecomeSellerModalOpen(true);
  const closeBecomeSellerModal = () => setIsBecomeSellerModalOpen(false);

  const openAddProductModal = () => setIsAddProductModalOpen(true);
  const closeAddProductModal = () => setIsAddProductModalOpen(false);

  const openAddWorkspaceModal = () => setIsAddWorkspaceModalOpen(true);
  const closeAddWorkspaceModal = () => setIsAddWorkspaceModalOpen(false);

  const refreshWorkspaces = async () => {
    try {
      const res = await fetch("/api/workspaces");
      const json = await res.json();
      if (json.success) {
        setWorkspaces(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const refreshProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
        theme,
        toggleTheme,
        currentLocation,
        setCurrentLocation,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,
        isSeller,
        storeInfo,
        becomeSeller,
        isBecomeSellerModalOpen,
        openBecomeSellerModal,
        closeBecomeSellerModal,
        isAddProductModalOpen,
        openAddProductModal,
        closeAddProductModal,
        isAddWorkspaceModalOpen,
        openAddWorkspaceModal,
        closeAddWorkspaceModal,
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
        workspaces,
        refreshWorkspaces,
        products,
        refreshProducts,
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
