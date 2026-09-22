"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NexusLogo } from "../shared/NexusLogo";
import { useApp } from "@/lib/context/AppContext";

export function TopHeader() {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    currentLocation,
    openLocationModal,
    isSeller,
    openBecomeSellerModal,
    openAddProductModal,
    openAddWorkspaceModal,
  } = useApp();

  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Workspaces", href: "/workspaces" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Orders", href: "/orders" },
    { label: "Dashboards", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 dark:bg-[#121118]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30 dark:border-[#2e2b3d] pt-safe transition-colors duration-200">
      <div className="max-w-7xl mx-auto h-16 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-4 lg:gap-8">
          <NexusLogo size="md" />

          {/* Location Chip Button */}
          <button
            type="button"
            onClick={openLocationModal}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-full bg-surface-container-low dark:bg-[#1e1c28] border border-outline-variant/40 dark:border-[#353245] hover:border-primary/60 text-xs font-semibold text-on-surface dark:text-[#f3f0f4] transition-all max-w-[150px] sm:max-w-[210px] truncate"
            title="Click to change location"
          >
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">location_on</span>
            <span className="truncate">{currentLocation}</span>
            <span className="material-symbols-outlined text-[15px] text-outline shrink-0">expand_more</span>
          </button>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-primary text-on-primary shadow-xs"
                      : "text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-[#1e1c28]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Add Product / Sell button */}
          <button
            type="button"
            onClick={() => {
              if (isSeller) {
                openAddProductModal();
              } else {
                openBecomeSellerModal();
              }
            }}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-secondary-container text-on-secondary-container dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-800/50 text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Sell Gear</span>
          </button>

          {/* Quick Add Workspace button */}
          <button
            type="button"
            onClick={openAddWorkspaceModal}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 text-primary dark:bg-indigo-950/60 dark:text-indigo-300 dark:border dark:border-indigo-800/50 text-xs font-bold hover:bg-primary hover:text-on-primary transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">desk</span>
            <span>+ Host Desk</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full bg-surface-container-low dark:bg-[#1e1c28] border border-outline-variant/40 dark:border-[#353245] flex items-center justify-center text-on-surface-variant dark:text-yellow-400 hover:text-primary transition-colors shadow-xs active:scale-90"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="material-symbols-outlined text-[20px]">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationMenu(!showNotificationMenu)}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full bg-surface-container-low dark:bg-[#1e1c28] border border-outline-variant/40 dark:border-[#353245] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] shadow-xs hover:text-primary transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface-container-lowest dark:ring-[#121118] animate-pulse" />
            </button>

            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest dark:bg-[#181720] rounded-2xl p-4 shadow-xl border border-outline-variant/30 dark:border-[#2e2b3d] z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-on-surface dark:text-[#f3f0f4]">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/30 dark:border-[#2e2b3d]">
                  <h4 className="font-semibold text-sm">Notifications</h4>
                  <span className="text-[11px] text-primary font-medium cursor-pointer">Mark all read</span>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-[#22202c] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                      verified
                    </span>
                    <div>
                      <p className="font-semibold">Escrow Protection Active</p>
                      <p className="text-on-surface-variant dark:text-[#9e9aa8] text-[11px]">
                        Your hardware purchase is held securely in 48-hour inspection escrow.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-[#22202c] flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                      meeting_room
                    </span>
                    <div>
                      <p className="font-semibold">Desk Check-in Ready</p>
                      <p className="text-on-surface-variant dark:text-[#9e9aa8] text-[11px]">
                        Pass PIN active for Sector 17 Premium Desk.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User profile avatar / pill */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 p-1 pl-1.5 pr-2.5 rounded-full bg-surface-container-lowest dark:bg-[#181720] border border-outline-variant/40 dark:border-[#353245] hover:border-primary/40 transition-all shadow-xs"
            title="Profile & Dashboard"
          >
            <div className="relative">
              <img
                alt="Alex Rivera"
                className="w-7 h-7 rounded-full object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface-container-lowest dark:ring-[#181720]" />
            </div>
            <span className="hidden sm:inline text-xs font-bold text-on-surface dark:text-white">
              Alex R.
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
