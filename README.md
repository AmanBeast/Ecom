# Nexus — Dual Workspace & Certified Electronics Exchange

A production-quality, mobile-first and desktop-responsive web application combining a **coworking workspace booking concierge** with a **certified peer-to-peer used tech exchange** backed by platform-controlled escrow and diagnostic grading.

Built faithfully according to the Stitch design specifications in `stitch_dual_workspace_marketplace_app` and technical architecture in `Agent.md`.

---

## Key Features

### 🏢 Workspace Marketplace (Module A)
- **Browse & Filter**: Find window desks, acoustic focus pods, team suites, and creative studios across cities (Chandigarh, Bangalore, Mumbai, Delhi, Gurugram, Pune, Hyderabad).
- **Amenities**: Verified high-speed Wi-Fi (500 Mbps fiber), uninterrupted power backup, ergonomic Herman Miller / Steelcase seating, climate control, and artisanal coffee.
- **Booking Engine**: Dynamic duration picker (1 Day, 3 Days, 1 Week, 1 Month) with automatic GST calculation and instant digital PIN check-in pass.
- **Double-Booking Prevention**: Validated server-side availability schedules.
- **🔒 Mandatory Privacy Guarantee**: Host personal phone numbers are **NEVER** exposed across listings, detail pages, JSON payloads, or metadata. Handled strictly via platform pass generation.

### 💻 Certified Electronics Exchange (Module B)
- **Multi-Point Diagnostics**: Hardware condition meter (Fair, Good, Excellent, Pristine) with battery health and cycle count inspection.
- **Nexus Escrow Protection**: Buyer funds are securely held in platform escrow during a 48-hour post-delivery testing window.
- **Platform-Controlled Messaging**: Built-in encrypted messenger with quick inquiry chips without exposing phone numbers.
- **Make an Offer**: Interactive counter-offer negotiation engine with suggested percentage discount tiers.
- **Escrow Checkout**: Mock payment flow supporting UPI, Credit/Debit Cards, and Net Banking.

### 📊 Management Dashboards
- **Workspace Host Dashboard**: Monitor booking occupancy, revenue, active desk inventory, and incoming check-in reservations.
- **Seller Dashboard**: Track active listings, escrow payout settlements, order dispatches, and incoming buyer counter-offers.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS configured with custom Stitch design tokens (`Geist` headings, `Inter` body, Indigo `#4f46e5`, Emerald `#10b981`, and neutral surface palettes)
- **Icons**: Material Symbols Outlined & Lucide React
- **Animations**: Framer Motion
- **ORM & Database**: [Prisma ORM](https://www.prisma.io/) targeting PostgreSQL (`prisma/schema.prisma`) with built-in zero-config memory/REST data service for local prototype testing.

---

## Project Structure

```text
├── app/
│   ├── api/
│   │   ├── workspaces/        # GET, POST, [id] GET (no phone numbers)
│   │   ├── products/          # GET, POST, [id] GET
│   │   ├── bookings/          # GET, POST (reservation engine)
│   │   ├── orders/            # GET, POST (escrow orders)
│   │   ├── conversations/     # GET, POST (in-app chat threads)
│   │   └── messages/          # POST (encrypted message dispatch)
│   ├── workspaces/
│   │   ├── page.tsx           # Directory & filtering
│   │   └── [id]/page.tsx      # Workspace detail & reservation
│   ├── marketplace/
│   │   ├── page.tsx           # Hardware catalogue & search
│   │   └── [id]/page.tsx      # Device detail, specs & escrow buy
│   ├── orders/page.tsx        # My Bookings & Hardware Orders
│   ├── dashboard/page.tsx     # Dual Host & Seller Dashboards
│   ├── layout.tsx             # Root layout with navigation & drawers
│   ├── page.tsx               # Home screen (Hero, Deals, Pillars)
│   └── globals.css            # Design tokens & base styling
├── components/
│   ├── navigation/            # TopHeader & BottomNav
│   ├── modals/                # ChatSeller, MakeOffer, EscrowCheckout, BookingSheet
│   └── shared/                # NexusLogo, ToastContainer
├── lib/
│   ├── context/AppContext.tsx # Global reactive state & notifications
│   ├── data/mockData.ts       # Realistic seed data (workspaces & tech)
│   ├── services/dataService.ts# Business logic & data access
│   └── utils.ts               # Formatting and class utilities
└── prisma/
    └── schema.prisma          # Relational PostgreSQL schema
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+ (Tested on v22.17)
- npm 9+

### 1. Installation
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
