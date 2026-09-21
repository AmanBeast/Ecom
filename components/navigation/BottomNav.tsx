"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: "home" },
    { label: "Workspaces", href: "/workspaces", icon: "desk" },
    { label: "Market", href: "/marketplace", icon: "storefront" },
    { label: "Orders", href: "/orders", icon: "receipt_long" },
    { label: "Profile", href: "/dashboard", icon: "person" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-outline-variant/40 shadow-[0_-1px_12px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-3 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-primary-container font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <span className="text-[11px] leading-none tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
