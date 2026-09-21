"use client";

import React from "react";
import { useApp } from "@/lib/context/AppContext";

export function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200 pointer-events-auto flex items-center gap-2 ${
            t.type === "error"
              ? "bg-error text-on-error"
              : t.type === "info"
              ? "bg-surface-container-high text-on-surface border border-outline-variant/50"
              : "bg-inverse-surface text-inverse-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {t.type === "error" ? "error" : t.type === "info" ? "info" : "check_circle"}
          </span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
