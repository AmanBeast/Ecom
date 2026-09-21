"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export default function OrdersPage() {
  const { bookings, orders, showToast, openChatWithSeller } = useApp();
  const [activeTab, setActiveTab] = useState<"bookings" | "orders">("bookings");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          My Passes &amp; Orders
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Manage your active workspace check-in passes and track escrow hardware purchases.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30">
        <button
          type="button"
          onClick={() => setActiveTab("bookings")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "bookings"
              ? "bg-surface-container-lowest text-on-surface shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">desk</span>
          <span>Desk Bookings ({bookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("orders")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === "orders"
              ? "bg-surface-container-lowest text-on-surface shadow-xs"
              : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          <span>Hardware Orders ({orders.length})</span>
        </button>
      </div>

      {/* Content: Desk Bookings Tab */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl p-12 text-center flex flex-col items-center gap-3 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[48px] text-outline">meeting_room</span>
              <h3 className="text-lg font-bold text-on-surface">No active bookings yet</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                Explore ergonomic window desks, soundproof focus pods, and high-speed team rooms ready today.
              </p>
              <Link
                href="/workspaces"
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold"
              >
                Find a Workspace
              </Link>
            </div>
          ) : (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={b.image}
                    alt={b.workspaceTitle}
                    className="w-20 h-20 rounded-2xl object-cover bg-surface-container shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                        {b.status}
                      </span>
                      <span className="text-xs text-on-surface-variant">{b.bookingDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-on-surface">{b.workspaceTitle}</h3>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-primary">location_on</span>
                      {b.location}
                    </p>
                    <p className="text-xs font-bold text-primary mt-1">
                      {formatINR(b.totalPrice)} • {b.durationDays} {b.durationDays === 1 ? "Day" : "Days"} Pass
                    </p>
                  </div>
                </div>

                {/* Digital Access PIN Pass */}
                <div className="w-full sm:w-auto bg-surface-container-low p-3.5 rounded-2xl flex flex-col items-center gap-1 border border-outline-variant/30 shrink-0">
                  <span className="text-[10px] font-semibold text-outline uppercase tracking-wider">
                    Check-in Access PIN
                  </span>
                  <span className="font-mono font-extrabold text-lg text-primary tracking-widest">
                    {b.checkInPin}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(b.checkInPin);
                        showToast(`PIN ${b.checkInPin} copied!`, "success");
                      }
                    }}
                    className="text-[11px] text-primary hover:underline font-semibold"
                  >
                    Copy PIN
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Content: Hardware Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-3xl p-12 text-center flex flex-col items-center gap-3 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[48px] text-outline">shopping_bag</span>
              <h3 className="text-lg font-bold text-on-surface">No hardware orders placed</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
                Browse refurbished MacBooks, 4K displays, mechanical keyboards, and mobile gear with escrow protection.
              </p>
              <Link
                href="/marketplace"
                className="mt-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/30 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-outline">Order #{ord.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                        ESCROW HELD
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant mt-0.5 block">
                      Tracking: <span className="font-mono text-on-surface font-semibold">{ord.trackingNumber}</span>
                    </span>
                  </div>

                  <span className="text-lg font-extrabold text-primary">
                    {formatINR(ord.amount)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={ord.image}
                    alt={ord.productTitle}
                    className="w-16 h-16 rounded-xl object-cover bg-surface-container shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-on-surface truncate">
                      {ord.productTitle}
                    </h3>
                    <p className="text-xs text-on-surface-variant">Seller: {ord.sellerName}</p>
                    <p className="text-xs text-secondary font-semibold mt-1 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">verified_user</span>
                      {ord.escrowStatus}
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-primary">timelapse</span>
                    <span>48h testing timer starts after courier delivery mark.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openChatWithSeller(ord.productId)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs"
                    >
                      Message Seller
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast("Escrow funds released to seller!", "success")}
                      className="px-3.5 py-1.5 rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-secondary/90"
                    >
                      Accept &amp; Release Funds
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
