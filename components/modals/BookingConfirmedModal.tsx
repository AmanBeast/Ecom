"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function BookingConfirmedModal() {
  const router = useRouter();
  const { confirmedBooking, setConfirmedBooking } = useApp();

  if (!confirmedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-3xl p-6 shadow-2xl border border-outline-variant/30 flex flex-col items-center text-center gap-3 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-[34px]">task_alt</span>
        </div>

        <h3 className="font-semibold text-xl text-on-surface">Desk Reserved!</h3>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          Your booking for{" "}
          <span className="font-semibold text-on-surface">{confirmedBooking.workspaceTitle}</span> in{" "}
          {confirmedBooking.location} is confirmed.
        </p>

        {/* Digital Access PIN Pass Card */}
        <div className="w-full bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2 border border-outline-variant/30 mt-1">
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Date &amp; Duration</span>
            <span className="font-semibold text-on-surface">
              {confirmedBooking.bookingDate} ({confirmedBooking.durationDays}d)
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-on-surface-variant">
            <span>Amount Paid</span>
            <span className="font-bold text-primary">{formatINR(confirmedBooking.totalPrice)}</span>
          </div>
          <div className="h-px bg-outline-variant/30 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-on-surface">Check-in Access PIN</span>
            <span className="px-3 py-1 rounded-xl bg-primary text-on-primary font-mono font-bold tracking-widest text-sm shadow-xs">
              {confirmedBooking.checkInPin}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 mt-2">
          <button
            type="button"
            onClick={() => {
              setConfirmedBooking(null);
              router.push("/orders");
            }}
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold hover:bg-primary-container transition-colors"
          >
            View in My Bookings
          </button>
          <button
            type="button"
            onClick={() => setConfirmedBooking(null)}
            className="w-full py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-on-surface"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
