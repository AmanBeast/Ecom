import {
  WorkspaceItem,
  ProductItem,
  BookingRecord,
  OrderRecord,
  ConversationRecord,
  initialWorkspaces,
  initialProducts,
  initialBookings,
  initialOrders,
  initialConversations,
} from "../data/mockData";

// Global in-memory storage during session
let workspacesStore: WorkspaceItem[] = [...initialWorkspaces];
let productsStore: ProductItem[] = [...initialProducts];
let bookingsStore: BookingRecord[] = [...initialBookings];
let ordersStore: OrderRecord[] = [...initialOrders];
let conversationsStore: ConversationRecord[] = [...initialConversations];

export const dataService = {
  // Workspaces
  getWorkspaces: (params?: {
    query?: string;
    city?: string;
    type?: string;
    maxPrice?: number;
  }) => {
    let result = [...workspacesStore];
    if (params?.query) {
      const q = params.query.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.location.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q)
      );
    }
    if (params?.city && params.city !== "All") {
      result = result.filter((w) => w.city === params.city);
    }
    if (params?.type && params.type !== "ALL") {
      result = result.filter((w) => w.type === params.type);
    }
    if (params?.maxPrice) {
      result = result.filter((w) => w.dailyPrice <= params.maxPrice!);
    }
    return result;
  },

  getWorkspaceById: (id: string) => {
    return workspacesStore.find((w) => w.id === id) || null;
  },

  createBooking: (data: {
    workspaceId: string;
    bookingDate: string;
    durationDays: number;
  }) => {
    const ws = workspacesStore.find((w) => w.id === data.workspaceId);
    if (!ws) throw new Error("Workspace not found");

    const daily = ws.dailyPrice;
    const taxes = Math.round(daily * data.durationDays * 0.18);
    const totalPrice = daily * data.durationDays + taxes;
    const randomPin = `NX-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: `bk-${Date.now()}`,
      workspaceId: ws.id,
      workspaceTitle: ws.title,
      location: ws.location,
      bookingDate: data.bookingDate,
      durationDays: data.durationDays,
      totalPrice,
      status: "CONFIRMED",
      checkInPin: randomPin,
      createdAt: new Date().toISOString(),
      image: ws.images[0],
    };

    bookingsStore = [newBooking, ...bookingsStore];
    return newBooking;
  },

  getBookings: () => {
    return [...bookingsStore];
  },

  // Electronics Products
  getProducts: (params?: {
    query?: string;
    category?: string;
    condition?: string;
    sort?: "price-asc" | "price-desc" | "rating" | "latest";
  }) => {
    let result = [...productsStore];
    if (params?.query) {
      const q = params.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    if (params?.category && params.category !== "all") {
      result = result.filter((p) => p.category === params.category);
    }
    if (params?.condition && params.condition !== "ALL") {
      result = result.filter((p) => p.condition === params.condition);
    }
    if (params?.sort) {
      if (params.sort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
      } else if (params.sort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
      } else if (params.sort === "rating") {
        result.sort((a, b) => b.seller.rating - a.seller.rating);
      }
    }
    return result;
  },

  getProductById: (id: string) => {
    return productsStore.find((p) => p.id === id) || null;
  },

  createOrder: (productId: string) => {
    const prod = productsStore.find((p) => p.id === productId);
    if (!prod) throw new Error("Product not found");

    const newOrder: OrderRecord = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      productId: prod.id,
      productTitle: prod.title,
      amount: prod.price,
      status: "PAID_ESCROW",
      escrowStatus: "Protected in Nexus Escrow (48h Inspection Window)",
      createdAt: new Date().toISOString(),
      image: prod.images[0],
      sellerName: prod.seller.name,
      trackingNumber: `NX-DEL-${Math.floor(10000 + Math.random() * 90000)}-EXP`,
    };

    ordersStore = [newOrder, ...ordersStore];
    return newOrder;
  },

  getOrders: () => {
    return [...ordersStore];
  },

  // Conversations & Messaging
  getConversations: () => {
    return [...conversationsStore];
  },

  getConversationById: (id: string) => {
    return conversationsStore.find((c) => c.id === id) || null;
  },

  sendMessage: (conversationId: string, content: string) => {
    const conv = conversationsStore.find((c) => c.id === conversationId);
    if (!conv) throw new Error("Conversation not found");

    const newMsg = {
      id: `m-${Date.now()}`,
      conversationId,
      senderId: "user-alex",
      senderName: "Alex Rivera",
      content,
      timestamp: "Just now",
      isSelf: true,
    };

    conv.messages.push(newMsg);
    conv.lastMessage = content;
    conv.updatedAt = "Just now";

    return newMsg;
  },

  startConversationWithSeller: (productId: string, initialText?: string) => {
    const prod = productsStore.find((p) => p.id === productId);
    if (!prod) throw new Error("Product not found");

    let existing = conversationsStore.find((c) => c.productId === productId);
    if (existing) {
      if (initialText) {
        dataService.sendMessage(existing.id, initialText);
      }
      return existing;
    }

    const newConv: ConversationRecord = {
      id: `conv-${Date.now()}`,
      productId: prod.id,
      productTitle: prod.title,
      participantName: prod.seller.name,
      participantAvatar: prod.seller.avatar,
      lastMessage: initialText || `Hi ${prod.seller.name}, is this still available?`,
      updatedAt: "Just now",
      messages: [
        {
          id: `m-${Date.now()}`,
          conversationId: `conv-${Date.now()}`,
          senderId: "user-alex",
          senderName: "Alex Rivera",
          content: initialText || `Hi ${prod.seller.name}, I am interested in ${prod.title}. Is it available?`,
          timestamp: "Just now",
          isSelf: true,
        },
      ],
    };

    conversationsStore = [newConv, ...conversationsStore];
    return newConv;
  },
};
