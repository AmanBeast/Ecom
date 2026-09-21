export interface WorkspaceItem {
  id: string;
  title: string;
  type: "DESK" | "POD" | "ROOM" | "STUDIO";
  description: string;
  location: string;
  city: string;
  dailyPrice: number;
  rating: number;
  reviewCount: number;
  availableSpots: number;
  status: "ACTIVE" | "OCCUPIED";
  images: string[];
  amenities: { name: string; icon: string; detail: string }[];
  host: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    joinedYear: string;
    responseRate: string;
    badge: string;
    // CRITICAL: NEVER store or expose phoneNumber!
  };
}

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR";
  conditionScore: string; // e.g. "Pristine Grade (9.4/10)"
  conditionTier: number; // 1 to 4
  category: "laptops" | "phones" | "tablets" | "monitors" | "accessories" | "audio" | "gaming";
  status: "ACTIVE" | "SOLD" | "RESERVED";
  location: string;
  featured?: boolean;
  dealTag?: string;
  images: string[];
  specs: { [key: string]: string };
  inTheBox: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    joinedYear: string;
    rating: number;
    reviewCount: number;
    salesCount: number;
    responseTime: string;
    // CRITICAL: NEVER store or expose phoneNumber!
  };
}

export interface BookingRecord {
  id: string;
  workspaceId: string;
  workspaceTitle: string;
  location: string;
  bookingDate: string;
  durationDays: number;
  totalPrice: number;
  status: "CONFIRMED" | "COMPLETED" | "CANCELLED";
  checkInPin: string;
  createdAt: string;
  image: string;
}

export interface OrderRecord {
  id: string;
  productId: string;
  productTitle: string;
  amount: number;
  status: "PAID_ESCROW" | "IN_TRANSIT" | "COMPLETED" | "REFUNDED";
  escrowStatus: string;
  createdAt: string;
  image: string;
  sellerName: string;
  trackingNumber: string;
}

export interface MessageRecord {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ConversationRecord {
  id: string;
  productId?: string;
  productTitle?: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  updatedAt: string;
  messages: MessageRecord[];
}

export const initialWorkspaces: WorkspaceItem[] = [
  {
    id: "ws-1",
    title: "Premium Window Desk",
    type: "DESK",
    description:
      "A bright and comfortable workspace designed for focused work. Enjoy high-speed Wi-Fi, a comfortable ergonomic setup, natural lighting and access to shared amenities. Perfect for remote engineers, freelancers, and creative teams.",
    location: "Sector 17, Chandigarh",
    city: "Chandigarh",
    dailyPrice: 499,
    rating: 4.8,
    reviewCount: 24,
    availableSpots: 3,
    status: "ACTIVE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBsvAd62SB2LfpVWJ--VvRTxjbO4RteIGqeAP_qsW5_Nr36frnTOAxzMbbjIlvGdU0QFsQYPa9TgSHja042bNKXh8ZaVl1MUrqEUWZDdu0PfDD89hkeU6mX0BeJ9YNHMimd2hUk7DLSC_gmOYwdOawwc37O5_I54ViwoyDZuMpq8OA50_99ipxHUfGN0bZIjJCehnCtrQ8q7vNcwwhd1zwxrEHS8ALztRW0FcgsEamskDqJMJQgwqj",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNa0f-nziraBF9V-rZEhuqSWOQq6FT-Fw-onu_7Mas6CX1aSOffbUt9DjpgNEk7RxHJKNu62up2Cui7Z87r4UOtT1MUCIW3Qn6ZMP5ri8-CctH1qHX14w5mnhNDqYTztR7aYKYhiwYhjVmz2HL0WK5Kq7aqXKgpI8qqR04ebpPcgVK449tN_uk4z__gMqeVf5mmAX3N57e5eDn3PcxDBavx0eqNOhC-x-kB2FRfgMke0cpFTrCUEzZ",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "High-Speed Wi-Fi", icon: "wifi", detail: "500 Mbps fiber" },
      { name: "Power Backup", icon: "bolt", detail: "100% uninterrupted" },
      { name: "Air Conditioning", icon: "ac_unit", detail: "Climate controlled" },
      { name: "Gourmet Coffee", icon: "coffee", detail: "Unlimited artisanal" },
      { name: "Meeting Access", icon: "groups", detail: "1 hr/day included" },
      { name: "Ergonomic Chair", icon: "chair", detail: "Lumbar supported Herman Miller" },
      { name: "24/7 Access", icon: "schedule", detail: "Smart keycard entry" },
      { name: "Free Parking", icon: "local_parking", detail: "Dedicated basement slot" },
    ],
    host: {
      id: "host-1",
      name: "Rahul Sharma",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB",
      verified: true,
      joinedYear: "2024",
      responseRate: "99% (Under 10 mins)",
      badge: "Superhost Location",
    },
  },
  {
    id: "ws-2",
    title: "Private Acoustic Focus Pod",
    type: "POD",
    description:
      "Soundproof single-occupant capsule with active air exchange, dimmable biophilic ring light, USB-C 100W PD hub, and noise-damping wall paneling.",
    location: "Cyber Hub, DLF Phase 2, Gurugram",
    city: "Gurugram",
    dailyPrice: 599,
    rating: 4.9,
    reviewCount: 95,
    availableSpots: 2,
    status: "ACTIVE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfO2_gJ0a2RnDoNt1e7L9Wrnx4TiNSvPvIfH1ftec2jtAsZfDKZnD0lm5FEJIXmIMQvcXGsqrbWCWb1s9Hs7bx2YxsNZlU6s52DFNNJxutECHlU2t2ie18ZDsh610FM1nRPGSZ2WtbI5b4WZnYWRGGMt3pdsFEaSt9o51OKcLk7kAeDey0L5pL1DP5p7fkbZMWa-jCtGcpqlQexjL9bBZkrmX_VAWYf_HsWlzeguUv7s6slTZqiNRo",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Soundproof -32dB", icon: "volume_off", detail: "Acoustic certified" },
      { name: "Ultra Wi-Fi", icon: "wifi", detail: "1 Gbps dedicated lane" },
      { name: "Air Filtration", icon: "air", detail: "HEPA 13 circulation" },
      { name: "Ring Lighting", icon: "lightbulb", detail: "Dimmable CRI 95+" },
    ],
    host: {
      id: "host-2",
      name: "Meera Kapoor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "100% (Instant)",
      badge: "Top Workspace Partner",
    },
  },
  {
    id: "ws-3",
    title: "Executive Loft Hot Desk",
    type: "DESK",
    description:
      "Double-height ceiling creative hub with natural northern daylight, artisan bean-to-cup espresso bar, standing desks, and collaborative lounge.",
    location: "Indiranagar, 100ft Road, Bangalore",
    city: "Bangalore",
    dailyPrice: 449,
    rating: 4.85,
    reviewCount: 112,
    availableSpots: 5,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Standing Desk", icon: "desk", detail: "Electric dual motor" },
      { name: "Fast Wi-Fi", icon: "wifi", detail: "600 Mbps low latency" },
      { name: "Coffee Bar", icon: "coffee", detail: "Fresh Blue Tokai roast" },
      { name: "Metro Proximity", icon: "train", detail: "300m from CMH Metro" },
    ],
    host: {
      id: "host-3",
      name: "Siddharth Rao",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "98%",
      badge: "Tech Community Hub",
    },
  },
  {
    id: "ws-4",
    title: "BKC Glass Suite Meeting Room",
    type: "ROOM",
    description:
      "High-spec 8-person boardroom equipped with 75-inch 4K HDR conference screen, Owl 360 camera, whiteboard wall, and high-security encrypted connection.",
    location: "Bandra Kurla Complex (BKC), Mumbai",
    city: "Mumbai",
    dailyPrice: 1899,
    rating: 4.95,
    reviewCount: 41,
    availableSpots: 1,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "75-inch 4K Display", icon: "tv", detail: "AirPlay + HDMI" },
      { name: "Owl 360 Video", icon: "videocam", detail: "AI Speaker tracking" },
      { name: "Whiteboard", icon: "draw", detail: "Floor-to-ceiling glass" },
      { name: "Catering Support", icon: "restaurant", detail: "On-demand pantry" },
    ],
    host: {
      id: "host-4",
      name: "Ananya Deshmukh",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2022",
      responseRate: "99%",
      badge: "Enterprise Host",
    },
  },
  {
    id: "ws-5",
    title: "Hi-Tech City Developer Pod",
    type: "DESK",
    description:
      "Tailored for coders with dual 27-inch monitors, mechanical keyboard friendly environment, gigabit Ethernet tap, and chill gaming arcade lounge.",
    location: "Madhapur, HITEC City, Hyderabad",
    city: "Hyderabad",
    dailyPrice: 399,
    rating: 4.78,
    reviewCount: 68,
    availableSpots: 6,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Dual Displays", icon: "monitor", detail: "Dell 27-inch 2K dual" },
      { name: "Gigabit LAN", icon: "lan", detail: "Low ping CAT6 wired" },
      { name: "Nap Pods", icon: "bed", detail: "Recharge rooms available" },
      { name: "Cafeteria", icon: "local_cafe", detail: "Subsidy meals & snacks" },
    ],
    host: {
      id: "host-5",
      name: "Karthik Reddy",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "97%",
      badge: "Verified Cowork Operator",
    },
  },
  {
    id: "ws-6",
    title: "Koregaon Park Garden Studio Desk",
    type: "DESK",
    description:
      "Green biophilic workspace surrounded by indoor plants and open-air balcony workstations. Peaceful, breezy, and conducive to deep creative work.",
    location: "Lane 6, Koregaon Park, Pune",
    city: "Pune",
    dailyPrice: 375,
    rating: 4.82,
    reviewCount: 37,
    availableSpots: 4,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Garden Balcony", icon: "yard", detail: "Outdoor breezy seating" },
      { name: "Fiber Optic", icon: "wifi", detail: "350 Mbps mesh" },
      { name: "Pet Friendly", icon: "pets", detail: "Well behaved pets allowed" },
      { name: "Artisanal Tea", icon: "emoji_food_beverage", detail: "Organic blends" },
    ],
    host: {
      id: "host-6",
      name: "Pooja Joshi",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2024",
      responseRate: "100%",
      badge: "Creative Haven",
    },
  },
  {
    id: "ws-7",
    title: "Connaught Place Business Desk",
    type: "DESK",
    description:
      "Prestigious central Delhi address in colonial arcade setting. High ceilings, heritage brass finishings, private lockers, and metro station direct access.",
    location: "Barakhamba Road, Connaught Place, New Delhi",
    city: "New Delhi",
    dailyPrice: 549,
    rating: 4.75,
    reviewCount: 84,
    availableSpots: 3,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Metro Direct", icon: "subway", detail: "Yellow/Blue Interchange" },
      { name: "Secure Lockers", icon: "lock", detail: "Personal RFID locker" },
      { name: "Print & Scan", icon: "print", detail: "50 pages complimentary" },
      { name: "Postal Service", icon: "mail", detail: "Courier handling" },
    ],
    host: {
      id: "host-7",
      name: "Vikram Malhotra",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "96%",
      badge: "Capital Workspaces",
    },
  },
  {
    id: "ws-8",
    title: "Whitefield Tech Park Flex Desk",
    type: "DESK",
    description:
      "Modern agile floor inside Grade-A software campus. Ergonomic Steelcase chairs, sound dampening privacy baffles, and 24-hour cafeteria access.",
    location: "ITPL Main Road, Whitefield, Bangalore",
    city: "Bangalore",
    dailyPrice: 429,
    rating: 4.88,
    reviewCount: 53,
    availableSpots: 8,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Steelcase V2", icon: "chair", detail: "Ergonomic seating" },
      { name: "1Gbps Redundant", icon: "wifi", detail: "Dual ISP failover" },
      { name: "EV Charging", icon: "ev_station", detail: "Fast chargers in basement" },
      { name: "Gym Access", icon: "fitness_center", detail: "Campus fitness suite" },
    ],
    host: {
      id: "host-8",
      name: "Sunil Shenoy",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2024",
      responseRate: "99%",
      badge: "Grade A Facility",
    },
  },
  {
    id: "ws-9",
    title: "Quiet Attic Writer's Studio",
    type: "STUDIO",
    description:
      "Intimate timber-lined studio designed for deep focus writers, researchers, and book authors. Silent zone with analog tea bar and natural skylight.",
    location: "Bandra West, Pali Hill, Mumbai",
    city: "Mumbai",
    dailyPrice: 650,
    rating: 4.92,
    reviewCount: 19,
    availableSpots: 2,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Silent Zone", icon: "volume_mute", detail: "Strict no-call policy" },
      { name: "Skylight", icon: "wb_sunny", detail: "Diffused overhead sun" },
      { name: "Reference Library", icon: "menu_book", detail: "Art & design books" },
      { name: "Loose Leaf Tea", icon: "local_cafe", detail: "Darjeeling first flush" },
    ],
    host: {
      id: "host-9",
      name: "Rhea Fernandez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "100%",
      badge: "Artisanal Studio Host",
    },
  },
  {
    id: "ws-10",
    title: "Sector 62 Noida Co-Lab Suite",
    type: "DESK",
    description:
      "Spacious open-plan work area with direct highway connectivity, high ceiling acoustic treatment, and tech founder networking evenings.",
    location: "Sector 62, Institutional Area, Noida",
    city: "Noida",
    dailyPrice: 320,
    rating: 4.69,
    reviewCount: 47,
    availableSpots: 7,
    status: "ACTIVE",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Fast Wi-Fi", icon: "wifi", detail: "300 Mbps symmetrical" },
      { name: "Cafeteria", icon: "restaurant", detail: "Warm lunches" },
      { name: "Free Parking", icon: "local_parking", detail: "Open ground parking" },
      { name: "Podcast Studio", icon: "mic", detail: "Available for booking" },
    ],
    host: {
      id: "host-10",
      name: "Nitin Agarwal",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      responseRate: "95%",
      badge: "Noida Startup Node",
    },
  },
];

export const initialProducts: ProductItem[] = [
  {
    id: "prod-1",
    title: "MacBook Air M1 (Late 2020)",
    description:
      "Well-maintained MacBook Air M1 in excellent condition. Used primarily for office work and light design tasks. Screen, keyboard, and trackpad are completely flawless. No major scratches, dents, or defects. Battery health remains exceptionally strong.",
    price: 42000,
    originalPrice: 74900,
    condition: "LIKE_NEW",
    conditionScore: "Pristine Grade (9.4/10)",
    conditionTier: 4,
    category: "laptops",
    status: "ACTIVE",
    location: "Sector 17, Chandigarh",
    featured: true,
    dealTag: "44% OFF",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADHnf_JrKKbLQGPta7_mIH-s21K_XA3NP7CoE3siqEYxaKQ_lc7SMAIjVnfiFCKc2PN9JlOSdvPOcYXmz68U0Ud2JMoOaLhnwBS8HS0AWuOf-vuY5Ba8ptydJtS0k4mbWnHfYiRgQQc6ZuGDM2OrykLUCTuM5I1c1TfMR5D-_qbjSFbk5bIgva3RCt92wzpYI8oiKfDAp_RHCJVPUt-liZj-J1ZrATygQeKms31csApuPoqrx8Cew1",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbjbDLZR1K1-epJd6qNC3dWwY6o6loEAcqgo6TAa9WgtzDokrhkilxkIOtskzbvj03PRmUUdmoryb6FrWYfM2qCZdZAHzqxN77AmXvXPPn3Ng-1fBK-Bf9kQxA-4x9uKE8lQfZXXFuKkiw4evpL9lNPE3bNbARMEP8g-EfDcBk677AepHoq7BnZtt64XXvsMeUYXdHBsN3UjEizY6GICMjpeyOrPwuNZC3--8UmgFOWVY3WOETudz9",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZRUH0gJBVv1OXgEUeSE083PPZL3vK4WGVlDL7LKGDVj74fd3mTZY48mHsIMLemw7uDPkwA6ZVIqmE16_nawM_qG8V466Q5Dvg0z-grcA5eHY64y2KrjOBcDmUUzoZto1oKKkAlskTsj-qaHL06u4HbL2_OP7ApJk0YdK-UwjufYjMIQpBX1qf6CZaoyXIOFYWg4EhWIbxPy0eminKWDyrL4UNfKbylH_rKZiNaHuqaZyhwfLH8gZ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCV0GcSwoeZw3QuUwLkQaVM-WXk68pNe0TsG8V6-isgoSGwNLgVT4FaiLpeThNoEz2QAgxGPSV1Jnjik46TjtL3kRJmyrVsLBXmEvCvIXbnfWIr0qS_R1gHwGBGuaWKPcKbvRMq1dGJRoka6Q-1fZN-S-Ypj0KeN7ncNAmB91naR9yppS3snKTD8M-4VAo4tqHrH_NCRRdzZKJGIQFAQc9kqf-qkh5pvk1dRNrJ2zeZGqTF-RH2eeVw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAex2d9GymoIS2_Nx0LnVbUCR9I1UQ5fPyuz2GEv2cwgs8wXxbcgjVdqe2hHLkkG3lneIHfVs7Gr4HioLyR9Dn2z8vvQSxu3o_1jPi6l5Zc5s3VPmnwYfKHqXpTQnBn1msadl9NkTfLdbFCxUzw7a-KyYNhk2LIGLRLqReJlyOht7aTp2wDWiaYQuxvU9U9CuBXB4381xu_3l1xrQms5Tc5ObwV4_ru7voZ-L8hybfOyADVvujjFgtk",
    ],
    specs: {
      Processor: "Apple M1 (8-core CPU / 7-core GPU)",
      "Unified Memory": "8 GB High-bandwidth RAM",
      Storage: "256 GB NVMe SSD (~2600 MB/s)",
      Display: '13.3" Retina (True Tone, 2560x1600)',
      "Battery Health": "89% Health (142 Cycle Count)",
      Acquisition: "Purchased 2022 • Space Gray finish",
    },
    inTheBox: "Original 30W USB-C Charger & braided cable + Box",
    seller: {
      id: "seller-1",
      name: "Aman",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoqOd4cSJXc4ss--gn_1LNpn5s979nuFzN-O9FmCC309uOtloIQyIf_LL7qh_FfE3mKWYlMh_8VNFMZu3hUo20IYvqluLEGW5J5WbTJmSt3PkP5NfHwFkC15_fy8xBMn-zd_QsYJ3mIaKBqYJ5U_N8OwytN5V1IpBCFuIdzIa5bVgcynI0hy_S2lnN5YzWd4hHhqWOodE2Or38f0ObPzVZlxUmOxCAI3jaEn4Ht7KfstPNRmdUu-lo",
      verified: true,
      joinedYear: "2023",
      rating: 4.9,
      reviewCount: 38,
      salesCount: 12,
      responseTime: "Replies within 15m",
    },
  },
  {
    id: "prod-2",
    title: 'Dell UltraSharp 27" 4K USB-C Hub (U2723QE)',
    description:
      "IPS Black technology monitor with 2000:1 contrast ratio, 90W USB-C power delivery, built-in KVM switch, RJ45 LAN port. Pristine panel without single dead pixel.",
    price: 24500,
    originalPrice: 38000,
    condition: "LIKE_NEW",
    conditionScore: "Excellent Grade (9.1/10)",
    conditionTier: 3,
    category: "monitors",
    status: "ACTIVE",
    location: "Indiranagar, Bangalore",
    featured: true,
    dealTag: "35% OFF",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaafXPNXmYdW7EQK3svXsd3z5PNmiT4m8WxxtpN4Jv-tELvWgOEHWuQ1f95hh1UdUyQR88LyfXH_EuRu0UwEVpN72dvPQVy5sJvQ-Rs7C7qLeycssbg5hc8oFuQ0c5o_rq7gRZkyW3hluERgmJXulqVuHnDn9ZYKNe6TOhpR-sb0Xc6LtHvHCAa72i_cSCqUp6klCl5NrmdqTB7frmj2X3p73bFrD-Koio3lzbkanZSW1BUCCADx83",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Resolution: "3840 x 2160 @ 60Hz 4K UHD",
      Panel: "IPS Black (100% sRGB, 98% DCI-P3)",
      Connectivity: "USB-C 90W PD, DisplayPort 1.4, HDMI 2.0, LAN",
      Ergonomics: "Height, Tilt, Swivel, 90° Pivot",
    },
    inTheBox: "Dell Factory Stand, 1.8m USB-C Cable, Power Cord",
    seller: {
      id: "seller-2",
      name: "Tanmay B.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      rating: 4.85,
      reviewCount: 22,
      salesCount: 8,
      responseTime: "Replies within 30m",
    },
  },
  {
    id: "prod-3",
    title: "MacBook Pro 14 M2 Pro (16GB / 512GB)",
    description:
      "Apple Silicon powerhouse in Space Gray. Liquid Retina XDR 120Hz ProMotion display. Zero keyboard shine. Includes original box, MagSafe cable, and 67W adapter.",
    price: 118000,
    originalPrice: 199900,
    condition: "LIKE_NEW",
    conditionScore: "Pristine Grade (9.7/10)",
    conditionTier: 4,
    category: "laptops",
    status: "ACTIVE",
    location: "Bandra Kurla Complex, Mumbai",
    featured: true,
    dealTag: "41% OFF",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Processor: "Apple M2 Pro (10-core CPU / 16-core GPU)",
      RAM: "16 GB Unified Memory",
      Storage: "512 GB High Speed SSD",
      Display: '14.2" Liquid Retina XDR (120Hz ProMotion)',
      Battery: "94% Battery Health (68 cycles)",
    },
    inTheBox: "Original Box, 67W USB-C Adapter, Braided MagSafe 3 Cable",
    seller: {
      id: "seller-3",
      name: "Rohan D.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2022",
      rating: 4.95,
      reviewCount: 46,
      salesCount: 19,
      responseTime: "Replies within 10m",
    },
  },
  {
    id: "prod-4",
    title: "Sony WH-1000XM5 Wireless ANC Headphones",
    description:
      "Industry-leading noise cancelling with Auto NC Optimizer, 30h battery life, crystal clear hands-free calling with 8 microphones. Silver finish with immaculate ear cushions.",
    price: 18900,
    originalPrice: 34990,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.5/10)",
    conditionTier: 4,
    category: "audio",
    status: "ACTIVE",
    location: "Gurugram, Cyber Hub",
    featured: true,
    dealTag: "46% OFF",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Driver: "30mm precision engineered unit",
      Battery: "Up to 30 hours with ANC enabled",
      Bluetooth: "Multipoint LDAC / AAC / SBC",
      Microphones: "8 mics with beamforming voice pickup",
    },
    inTheBox: "Hard Carrying Case, 3.5mm Audio Cable, USB-C Charging Cable",
    seller: {
      id: "seller-4",
      name: "Sneha V.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2024",
      rating: 4.9,
      reviewCount: 15,
      salesCount: 6,
      responseTime: "Replies within 20m",
    },
  },
  {
    id: "prod-5",
    title: "Apple iPhone 14 Pro 128GB Deep Purple",
    description:
      "Flawless display with Dynamic Island, 48MP camera system, ceramic shield front, and stainless steel band. Applied Spigen EZ Fit tempered glass on day one.",
    price: 64000,
    originalPrice: 129900,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.3/10)",
    conditionTier: 4,
    category: "phones",
    status: "ACTIVE",
    location: "Sector 17, Chandigarh",
    featured: true,
    dealTag: "50% OFF",
    images: [
      "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Chip: "A16 Bionic (6-core CPU, 5-core GPU)",
      Screen: '6.1" Super Retina XDR Always-On 120Hz',
      Battery: "88% Original Apple Battery Health",
      Cameras: "48MP Main + 12MP Ultra-wide + 12MP 3x Telephoto",
    },
    inTheBox: "Original Box, Apple Braided USB-C to Lightning Cable",
    seller: {
      id: "seller-1",
      name: "Aman",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoqOd4cSJXc4ss--gn_1LNpn5s979nuFzN-O9FmCC309uOtloIQyIf_LL7qh_FfE3mKWYlMh_8VNFMZu3hUo20IYvqluLEGW5J5WbTJmSt3PkP5NfHwFkC15_fy8xBMn-zd_QsYJ3mIaKBqYJ5U_N8OwytN5V1IpBCFuIdzIa5bVgcynI0hy_S2lnN5YzWd4hHhqWOodE2Or38f0ObPzVZlxUmOxCAI3jaEn4Ht7KfstPNRmdUu-lo",
      verified: true,
      joinedYear: "2023",
      rating: 4.9,
      reviewCount: 38,
      salesCount: 12,
      responseTime: "Replies within 15m",
    },
  },
  {
    id: "prod-6",
    title: "ThinkPad X1 Carbon Gen 10 (i7 / 32GB / 1TB)",
    description:
      "Enterprise flagship ultrabook with carbon fiber chassis. 14-inch 2.8K OLED display, 32GB LPDDR5, LTE sim slot, spill-resistant legendary keyboard.",
    price: 68500,
    originalPrice: 165000,
    condition: "GOOD",
    conditionScore: "Excellent (8.9/10)",
    conditionTier: 3,
    category: "laptops",
    status: "ACTIVE",
    location: "HITEC City, Hyderabad",
    dealTag: "58% OFF",
    images: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      CPU: "Intel Core i7-1260P (12 cores, up to 4.7GHz)",
      RAM: "32 GB LPDDR5 5200MHz",
      Storage: "1 TB PCIe Gen 4 SSD",
      Display: '14" 2.8K (2880x1800) OLED 400 nits HDR500',
    },
    inTheBox: "ThinkPad 65W GaN USB-C Rapid Charger",
    seller: {
      id: "seller-5",
      name: "Vivek Nair",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      rating: 4.8,
      reviewCount: 17,
      salesCount: 9,
      responseTime: "Replies within 1hr",
    },
  },
  {
    id: "prod-7",
    title: "Apple iPad Air 5th Gen M1 (64GB Wi-Fi) + Pencil 2",
    description:
      "Space Gray iPad Air powered by M1 desktop class chip. Includes genuine Apple Pencil 2nd Generation and magnetic folding smart folio case.",
    price: 36000,
    originalPrice: 66900,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.6/10)",
    conditionTier: 4,
    category: "tablets",
    status: "ACTIVE",
    location: "Koregaon Park, Pune",
    dealTag: "46% OFF",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Chip: "Apple M1 with 8-core CPU / 8-core GPU",
      Display: '10.9" Liquid Retina with True Tone',
      Accessories: "Apple Pencil 2 magnetically paired",
      Battery: "96% Health with 42 cycles",
    },
    inTheBox: "iPad Air, Apple Pencil 2, Smart Folio, Original 20W Charger",
    seller: {
      id: "seller-6",
      name: "Priya Menon",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2024",
      rating: 4.95,
      reviewCount: 14,
      salesCount: 5,
      responseTime: "Replies within 15m",
    },
  },
  {
    id: "prod-8",
    title: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
    description:
      "Fully assembled CNC aluminum 75% mechanical keyboard with Banana tactile switches, hot-swappable PCB, double-gasket design, Bluetooth 5.1 & Type-C wired.",
    price: 11500,
    originalPrice: 19500,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.8/10)",
    conditionTier: 4,
    category: "accessories",
    status: "ACTIVE",
    location: "Indiranagar, Bangalore",
    dealTag: "41% OFF",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Body: "Full CNC Machined Aluminum (Anodized Silver)",
      Switches: "Keychron K Pro Banana Tactile (Lubed)",
      Keycaps: "OSA Profile Double-shot PBT (Mac & Windows keys)",
      Battery: "4000mAh up to 300h typing",
    },
    inTheBox: "Keychron Q1 Pro, Coiled Aviator Cable, Switch & Keycap Puller",
    seller: {
      id: "seller-2",
      name: "Tanmay B.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      rating: 4.85,
      reviewCount: 22,
      salesCount: 8,
      responseTime: "Replies within 30m",
    },
  },
  {
    id: "prod-9",
    title: "Logitech MX Master 3S Ergonomic Wireless Mouse",
    description:
      "Quiet Clicks, 8K DPI any-surface glass tracking sensor, electromagnetic MagSpeed scrolling wheel, ergonomic thumb cradle. Graphite colorway.",
    price: 5400,
    originalPrice: 9995,
    condition: "LIKE_NEW",
    conditionScore: "Excellent (9.2/10)",
    conditionTier: 3,
    category: "accessories",
    status: "ACTIVE",
    location: "Sector 62, Noida",
    dealTag: "45% OFF",
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Sensor: "Darkfield high precision (200 to 8000 DPI)",
      Battery: "Up to 70 days per full charge via USB-C",
      Connectivity: "Logi Bolt USB Receiver + Bluetooth 3-device switch",
    },
    inTheBox: "MX Master 3S Mouse, Logi Bolt Dongle, USB-C Cable",
    seller: {
      id: "seller-5",
      name: "Vivek Nair",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2023",
      rating: 4.8,
      reviewCount: 17,
      salesCount: 9,
      responseTime: "Replies within 1hr",
    },
  },
  {
    id: "prod-10",
    title: "Samsung Galaxy S23 Ultra 256GB Phantom Black",
    description:
      "Snapdragon 8 Gen 2 for Galaxy, 200MP camera with 100x Space Zoom, integrated S-Pen stylus, Quad HD+ Dynamic AMOLED 2X 120Hz display.",
    price: 59000,
    originalPrice: 124999,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.4/10)",
    conditionTier: 4,
    category: "phones",
    status: "ACTIVE",
    location: "Connaught Place, New Delhi",
    dealTag: "52% OFF",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Chipset: "Qualcomm Snapdragon 8 Gen 2 Mobile Platform",
      RAM: "12 GB LPDDR5X",
      Storage: "256 GB UFS 4.0",
      Camera: "200MP + 12MP + 10MP (3x) + 10MP (10x periscope)",
    },
    inTheBox: "Handset, Integrated S-Pen, USB-C to USB-C Data Cable",
    seller: {
      id: "seller-7",
      name: "Harish Gupta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2022",
      rating: 4.7,
      reviewCount: 29,
      salesCount: 11,
      responseTime: "Replies within 45m",
    },
  },
  {
    id: "prod-11",
    title: 'LG 34" UltraWide QHD Curved Nano IPS (34WN80C-B)',
    description:
      "21:9 WQHD curved panoramic canvas. Ideal for coding and timelines. USB-C with 60W power delivery, HDR10 support, 99% sRGB color accuracy.",
    price: 29500,
    originalPrice: 52000,
    condition: "GOOD",
    conditionScore: "Excellent (8.8/10)",
    conditionTier: 3,
    category: "monitors",
    status: "ACTIVE",
    location: "Pali Hill, Mumbai",
    dealTag: "43% OFF",
    images: [
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Resolution: "3440 x 1440 WQHD Curved 1900R",
      Aspect: "21:9 Cinema Screen with ultra-thin bezel",
      Ports: "USB-C, 2x HDMI 2.0, DisplayPort 1.4, 2x USB 3.0",
    },
    inTheBox: "ArcLine Ergonomic Stand, High-Speed HDMI & USB-C Cable",
    seller: {
      id: "seller-3",
      name: "Rohan D.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      verified: true,
      joinedYear: "2022",
      rating: 4.95,
      reviewCount: 46,
      salesCount: 19,
      responseTime: "Replies within 10m",
    },
  },
  {
    id: "prod-12",
    title: "Sony PlayStation 5 Disc Edition + DualSense Extra Controller",
    description:
      "Original Japanese model PS5 with ultra-high speed 825GB SSD and Ray Tracing. Includes two DualSense wireless controllers (White & Midnight Black).",
    price: 37500,
    originalPrice: 54990,
    condition: "LIKE_NEW",
    conditionScore: "Pristine (9.5/10)",
    conditionTier: 4,
    category: "gaming",
    status: "ACTIVE",
    location: "Sector 17, Chandigarh",
    dealTag: "31% OFF",
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80",
    ],
    specs: {
      Storage: "825 GB Custom NVMe SSD",
      GPU: "AMD RDNA 2 based graphics engine (10.28 TFLOPs)",
      Media: "Ultra HD Blu-ray disc optical drive",
    },
    inTheBox: "PS5 Console, 2x DualSense Controllers, HDMI 2.1 Cable, Stand",
    seller: {
      id: "seller-1",
      name: "Aman",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoqOd4cSJXc4ss--gn_1LNpn5s979nuFzN-O9FmCC309uOtloIQyIf_LL7qh_FfE3mKWYlMh_8VNFMZu3hUo20IYvqluLEGW5J5WbTJmSt3PkP5NfHwFkC15_fy8xBMn-zd_QsYJ3mIaKBqYJ5U_N8OwytN5V1IpBCFuIdzIa5bVgcynI0hy_S2lnN5YzWd4hHhqWOodE2Or38f0ObPzVZlxUmOxCAI3jaEn4Ht7KfstPNRmdUu-lo",
      verified: true,
      joinedYear: "2023",
      rating: 4.9,
      reviewCount: 38,
      salesCount: 12,
      responseTime: "Replies within 15m",
    },
  },
];

export const initialBookings: BookingRecord[] = [
  {
    id: "bk-101",
    workspaceId: "ws-1",
    workspaceTitle: "Premium Window Desk",
    location: "Sector 17, Chandigarh",
    bookingDate: "Today, Oct 24",
    durationDays: 2,
    totalPrice: 998,
    status: "CONFIRMED",
    checkInPin: "NX-8429",
    createdAt: "2026-10-24T08:30:00Z",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDBsvAd62SB2LfpVWJ--VvRTxjbO4RteIGqeAP_qsW5_Nr36frnTOAxzMbbjIlvGdU0QFsQYPa9TgSHja042bNKXh8ZaVl1MUrqEUWZDdu0PfDD89hkeU6mX0BeJ9YNHMimd2hUk7DLSC_gmOYwdOawwc37O5_I54ViwoyDZuMpq8OA50_99ipxHUfGN0bZIjJCehnCtrQ8q7vNcwwhd1zwxrEHS8ALztRW0FcgsEamskDqJMJQgwqj",
  },
];

export const initialOrders: OrderRecord[] = [
  {
    id: "ord-8812",
    productId: "prod-1",
    productTitle: "MacBook Air M1 (Late 2020)",
    amount: 42000,
    status: "PAID_ESCROW",
    escrowStatus: "Protected in Nexus Escrow (48h Inspection Window)",
    createdAt: "2026-10-23T14:20:00Z",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADHnf_JrKKbLQGPta7_mIH-s21K_XA3NP7CoE3siqEYxaKQ_lc7SMAIjVnfiFCKc2PN9JlOSdvPOcYXmz68U0Ud2JMoOaLhnwBS8HS0AWuOf-vuY5Ba8ptydJtS0k4mbWnHfYiRgQQc6ZuGDM2OrykLUCTuM5I1c1TfMR5D-_qbjSFbk5bIgva3RCt92wzpYI8oiKfDAp_RHCJVPUt-liZj-J1ZrATygQeKms31csApuPoqrx8Cew1",
    sellerName: "Aman",
    trackingNumber: "NX-DEL-91823-EXP",
  },
];

export const initialConversations: ConversationRecord[] = [
  {
    id: "conv-1",
    productId: "prod-1",
    productTitle: "MacBook Air M1 (Late 2020)",
    participantName: "Aman",
    participantAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoqOd4cSJXc4ss--gn_1LNpn5s979nuFzN-O9FmCC309uOtloIQyIf_LL7qh_FfE3mKWYlMh_8VNFMZu3hUo20IYvqluLEGW5J5WbTJmSt3PkP5NfHwFkC15_fy8xBMn-zd_QsYJ3mIaKBqYJ5U_N8OwytN5V1IpBCFuIdzIa5bVgcynI0hy_S2lnN5YzWd4hHhqWOodE2Or38f0ObPzVZlxUmOxCAI3jaEn4Ht7KfstPNRmdUu-lo",
    lastMessage: "Hello Alex! Yes, the battery cycle is exactly 142 and it comes with original packaging.",
    updatedAt: "10 mins ago",
    messages: [
      {
        id: "m-1",
        conversationId: "conv-1",
        senderId: "user-alex",
        senderName: "Alex Rivera",
        content: "Hi Aman, is the MacBook Air M1 still available? Can you confirm battery health?",
        timestamp: "10:15 AM",
        isSelf: true,
      },
      {
        id: "m-2",
        conversationId: "conv-1",
        senderId: "seller-1",
        senderName: "Aman",
        content: "Hello Alex! Yes, the battery cycle is exactly 142 and it comes with original packaging. It's ready for escrow dispatch.",
        timestamp: "10:18 AM",
        isSelf: false,
      },
    ],
  },
];
