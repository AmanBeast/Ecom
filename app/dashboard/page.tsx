"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export default function DashboardPage() {
  const { showToast } = useApp();
  const [roleMode, setRoleMode] = useState<"host" | "seller">("host");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col gap-6">
      {/* Top Banner / Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB"
            alt="Alex Rivera"
            className="w-14 h-14 rounded-full object-cover shadow-xs ring-2 ring-primary/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-on-surface">Alex Rivera</h1>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                Verified Host &amp; Seller
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Sector 17, Chandigarh • Member since 2024
            </p>
          </div>
        </div>

        {/* Perspective toggle */}
        <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/30 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setRoleMode("host")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              roleMode === "host"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Workspace Host
          </button>
          <button
            type="button"
            onClick={() => setRoleMode("seller")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              roleMode === "seller"
                ? "bg-primary text-on-primary shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Gear Seller
          </button>
        </div>
      </div>

      {/* Host Perspective */}
      {roleMode === "host" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Total Bookings
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">24</span>
              <span className="text-xs text-secondary font-semibold">+18% this month</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Total Revenue
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-primary">₹38,400</span>
              <span className="text-xs text-secondary font-semibold">100% Payout cleared</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Active Workspaces
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">3</span>
              <span className="text-xs text-on-surface-variant font-medium">92% Occupancy rate</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Upcoming Check-ins
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-secondary">5</span>
              <span className="text-xs text-on-surface-variant font-medium">Next: Today 10:00 AM</span>
            </div>
          </div>

          {/* Host Listings & Controls */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface">My Workspace Listings</h3>
                <p className="text-xs text-on-surface-variant">
                  Phone numbers are strictly protected and never displayed to guests.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("New workspace listing modal opened", "info")}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Add Workspace</span>
              </button>
            </div>

            <div className="divide-y divide-outline-variant/30">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsvAd62SB2LfpVWJ--VvRTxjbO4RteIGqeAP_qsW5_Nr36frnTOAxzMbbjIlvGdU0QFsQYPa9TgSHja042bNKXh8ZaVl1MUrqEUWZDdu0PfDD89hkeU6mX0BeJ9YNHMimd2hUk7DLSC_gmOYwdOawwc37O5_I54ViwoyDZuMpq8OA50_99ipxHUfGN0bZIjJCehnCtrQ8q7vNcwwhd1zwxrEHS8ALztRW0FcgsEamskDqJMJQgwqj"
                    alt="desk"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Premium Window Desk</h4>
                    <p className="text-xs text-on-surface-variant">Sector 17, Chandigarh • ₹499/day</p>
                    <span className="text-[10px] text-secondary font-bold">● Active • 3 spots available</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/workspaces/ws-1"
                    className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold hover:bg-surface-container"
                  >
                    Preview
                  </Link>
                  <button
                    type="button"
                    onClick={() => showToast("Availability schedule updated", "success")}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high"
                  >
                    Manage Slots
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seller Perspective */}
      {roleMode === "seller" && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Active Listings
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">2</span>
              <span className="text-xs text-secondary font-semibold">Diagnostics verified</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Sold Items
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-on-surface">12</span>
              <span className="text-xs text-secondary font-semibold">100% 5-Star Reviews</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Total Sales
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-primary">₹3,42,000</span>
              <span className="text-xs text-on-surface-variant font-medium">Via Nexus Escrow</span>
            </div>
            <div className="bg-surface-container-lowest p-5 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-1">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Pending Offers
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-secondary">3</span>
              <span className="text-xs text-primary font-semibold">Awaiting your response</span>
            </div>
          </div>

          {/* Seller Listings */}
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-3xl border border-outline-variant/30 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-on-surface">My Tech Listings</h3>
                <p className="text-xs text-on-surface-variant">
                  Transactions are escrow-guaranteed. Buyer communication remains within Nexus messenger.
                </p>
              </div>
              <button
                type="button"
                onClick={() => showToast("New hardware listing creator opened", "info")}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>List Hardware</span>
              </button>
            </div>

            <div className="divide-y divide-outline-variant/30">
              <div className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADHnf_JrKKbLQGPta7_mIH-s21K_XA3NP7CoE3siqEYxaKQ_lc7SMAIjVnfiFCKc2PN9JlOSdvPOcYXmz68U0Ud2JMoOaLhnwBS8HS0AWuOf-vuY5Ba8ptydJtS0k4mbWnHfYiRgQQc6ZuGDM2OrykLUCTuM5I1c1TfMR5D-_qbjSFbk5bIgva3RCt92wzpYI8oiKfDAp_RHCJVPUt-liZj-J1ZrATygQeKms31csApuPoqrx8Cew1"
                    alt="MacBook"
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">MacBook Air M1 (Late 2020)</h4>
                    <p className="text-xs text-on-surface-variant">₹42,000 • Pristine Grade (9.4/10)</p>
                    <span className="text-[10px] text-secondary font-bold">● Active • 2 Offers Pending</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/marketplace/prod-1"
                    className="px-3 py-1.5 rounded-lg border border-outline-variant/40 text-xs font-semibold hover:bg-surface-container"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => showToast("Marked as reserved", "info")}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-xs font-semibold hover:bg-surface-container-high"
                  >
                    Mark Reserved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
