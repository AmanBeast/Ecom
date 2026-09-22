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

  createWorkspace: (data: {
    title: string;
    type?: "DESK" | "POD" | "ROOM" | "STUDIO";
    description: string;
    location: string;
    city: string;
    dailyPrice: number;
    availableSpots?: number;
    images?: string[];
    amenities?: { name: string; icon: string; detail: string }[];
  }) => {
    const newWorkspace: WorkspaceItem = {
      id: `ws-${Date.now()}`,
      title: data.title,
      type: data.type || "DESK",
      description: data.description || "Modern agile coworking desk with high-speed fiber internet and ergonomic setup.",
      location: data.location,
      city: data.city || "Chandigarh",
      dailyPrice: Number(data.dailyPrice),
      rating: 5.0,
      reviewCount: 1,
      availableSpots: Number(data.availableSpots || 4),
      status: "ACTIVE",
      images: data.images && data.images.length > 0 ? data.images : [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80",
      ],
      amenities: data.amenities && data.amenities.length > 0 ? data.amenities : [
        { name: "High-Speed Wi-Fi", icon: "wifi", detail: "500 Mbps fiber" },
        { name: "Power Backup", icon: "bolt", detail: "100% uninterrupted" },
        { name: "Air Conditioning", icon: "ac_unit", detail: "Climate controlled" },
        { name: "Ergonomic Chair", icon: "chair", detail: "Lumbar supported" },
      ],
      host: {
        id: "host-alex",
        name: "Alex Rivera",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB",
        verified: true,
        joinedYear: "2024",
        responseRate: "100% (Instant)",
        badge: "Verified Host",
      },
    };
    workspacesStore = [newWorkspace, ...workspacesStore];
    return newWorkspace;
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

  createProduct: (data: {
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    condition?: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR";
    conditionScore?: string;
    conditionTier?: number;
    category: "laptops" | "phones" | "tablets" | "monitors" | "accessories" | "audio" | "gaming";
    location: string;
    images?: string[];
    specs?: { [key: string]: string };
    inTheBox?: string;
  }) => {
    const condition = data.condition || "LIKE_NEW";
    const conditionTier = data.conditionTier || (condition === "LIKE_NEW" ? 4 : condition === "GOOD" ? 3 : 2);
    const conditionScore = data.conditionScore || (condition === "LIKE_NEW" ? "Pristine Grade (9.4/10)" : condition === "GOOD" ? "Excellent Grade (8.8/10)" : "Good Grade (7.5/10)");

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      title: data.title,
      description: data.description || "Pre-owned electronics in clean inspected condition.",
      price: Number(data.price),
      originalPrice: Number(data.originalPrice || Math.round(Number(data.price) * 1.35)),
      condition,
      conditionScore,
      conditionTier,
      category: data.category || "laptops",
      status: "ACTIVE",
      location: data.location || "Sector 17, Chandigarh",
      dealTag: "NEW LISTING",
      images: data.images && data.images.length > 0 ? data.images : [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
      ],
      specs: data.specs || {
        "Condition Tier": conditionScore,
        "Warranty": "48h Nexus Escrow Inspection",
        "Acquisition": "Certified Clean Serial",
      },
      inTheBox: data.inTheBox || "Device + Original Charger & Cables",
      seller: {
        id: "seller-alex",
        name: "Alex Rivera",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB",
        verified: true,
        joinedYear: "2024",
        rating: 5.0,
        reviewCount: 1,
        salesCount: 1,
        responseTime: "Replies within 15m",
      },
    };
    productsStore = [newProd, ...productsStore];
    return newProd;
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
