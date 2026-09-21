"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NexusLogo } from "../shared/NexusLogo";
import { useApp } from "@/lib/context/AppContext";

export function TopHeader() {
  const pathname = usePathname();
  const { showToast, bookings, orders } = useApp();
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Workspaces", href: "/workspaces" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "My Orders & Bookings", href: "/orders" },
    { label: "Dashboards", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30 pt-safe">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Logo & Desktop Nav */}
        <div className="flex items-center gap-8">
          <NexusLogo size="md" />

          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 rounded-lg font-label-md text-sm font-medium transition-all ${
                    active
                      ? "bg-primary-container text-on-primary shadow-xs"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side tools */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Search trigger on desktop */}
          <Link
            href="/marketplace"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs border border-outline-variant/40 hover:border-primary/50 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-outline">search</span>
            <span>Search gear or desks...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-surface-container font-mono text-[10px] text-outline">
              ⌘K
            </kbd>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotificationMenu(!showNotificationMenu);
              }}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface-variant shadow-xs hover:text-primary transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface-container-lowest animate-pulse" />
            </button>

            {showNotificationMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl p-4 shadow-xl border border-outline-variant/30 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant/30">
                  <h4 className="font-semibold text-sm text-on-surface">Notifications</h4>
                  <span className="text-[11px] text-primary font-medium">Mark all read</span>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary shrink-0 mt-0.5">
                      verified
                    </span>
                    <div>
                      <p className="font-semibold text-on-surface">Escrow Protection Active</p>
                      <p className="text-on-surface-variant text-[11px]">
                        Your hardware purchase is held securely in 48-hour inspection escrow.
                      </p>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-surface-container-low flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-primary shrink-0 mt-0.5">
                      meeting_room
                    </span>
                    <div>
                      <p className="font-semibold text-on-surface">Desk Check-in Ready</p>
                      <p className="text-on-surface-variant text-[11px]">
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
            className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-surface-container-lowest border border-outline-variant/40 hover:border-primary/40 transition-all shadow-xs"
            title="Profile & Dashboard"
          >
            <div className="relative">
              <img
                alt="Alex Rivera"
                className="w-7 h-7 rounded-full object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
            </div>
            <span className="hidden sm:inline font-label-md text-xs font-semibold text-on-surface">
              Alex R.
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
