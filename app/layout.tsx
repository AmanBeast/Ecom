import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/context/AppContext";
import { TopHeader } from "@/components/navigation/TopHeader";
import { BottomNav } from "@/components/navigation/BottomNav";
import { ChatSellerDrawer } from "@/components/modals/ChatSellerDrawer";
import { MakeOfferModal } from "@/components/modals/MakeOfferModal";
import { EscrowCheckoutModal } from "@/components/modals/EscrowCheckoutModal";
import { BookingSheetModal } from "@/components/modals/BookingSheetModal";
import { BookingConfirmedModal } from "@/components/modals/BookingConfirmedModal";
import { LocationModal } from "@/components/modals/LocationModal";
import { BecomeSellerModal } from "@/components/modals/BecomeSellerModal";
import { AddProductModal } from "@/components/modals/AddProductModal";
import { AddWorkspaceModal } from "@/components/modals/AddWorkspaceModal";
import { ToastContainer } from "@/components/shared/ToastContainer";

export const metadata: Metadata = {
  title: "Nexus | Workspaces & Certified Electronics Exchange",
  description:
    "Find your perfect workspace or discover certified pre-owned tech. Book desks, acoustic pods, and trade hardware with escrow protection.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fbf8fc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface dark:bg-[#0f0e14] text-on-surface dark:text-[#f3f0f4] flex flex-col min-h-screen transition-colors duration-200">
        <AppProvider>
          <TopHeader />
          <main className="flex-1 w-full pt-16 pb-20 md:pb-12">
            {children}
          </main>
          <BottomNav />

          {/* Global Modals & Notifications */}
          <LocationModal />
          <BecomeSellerModal />
          <AddProductModal />
          <AddWorkspaceModal />
          <ChatSellerDrawer />
          <MakeOfferModal />
          <EscrowCheckoutModal />
          <BookingSheetModal />
          <BookingConfirmedModal />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
