"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function BookingSheetModal() {
  const { activeBookingWorkspace, closeBookingModal, setConfirmedBooking, showToast, refreshBookings } = useApp();
  const [selectedDate, setSelectedDate] = useState("Today, Oct 24");
  const [durationDays, setDurationDays] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!activeBookingWorkspace) return null;

  const ws = activeBookingWorkspace;
  const dailyPrice = ws.dailyPrice;
  const baseCost = dailyPrice * durationDays;
  const gst = Math.round(baseCost * 0.18);
  const totalCost = baseCost + gst;

  const durationOptions = [
    { label: "1 Day", days: 1 },
    { label: "3 Days", days: 3 },
    { label: "1 Week", days: 7 },
    { label: "1 Month", days: 30 },
  ];

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: ws.id,
          bookingDate: selectedDate,
          durationDays,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshBookings();
        closeBookingModal();
        setConfirmedBooking(data.data);
        showToast("Desk reserved successfully!", "success");
      } else {
        showToast(data.error || "Failed to book desk", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Booking failed. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-inverse-surface/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center gap-3">
            <img
              src={ws.images[0]}
              alt={ws.title}
              className="w-14 h-14 rounded-xl object-cover bg-surface-container shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-semibold text-xs">Available Today</span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-on-surface line-clamp-1">
                {ws.title}
              </h3>
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                {ws.location}
              </p>
            </div>
          </div>
          <button
            onClick={closeBookingModal}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-on-surface">Select Date</span>
          <div className="grid grid-cols-3 gap-2">
            {["Today, Oct 24", "Tomorrow, Oct 25", "Custom Date"].map((dateLabel, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDate(dateLabel)}
                className={`py-2 px-2.5 rounded-xl text-center flex flex-col items-center gap-0.5 transition-all ${
                  selectedDate === dateLabel
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className="text-xs font-semibold">
                  {idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : "Pick Date"}
                </span>
                <span className="text-[10px] opacity-80">
                  {idx === 0 ? "Oct 24" : idx === 1 ? "Oct 25" : "Custom"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-on-surface">Select Duration</span>
            <span className="text-[11px] text-secondary font-medium">Save up to 20% on weekly</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {durationOptions.map((opt) => (
              <button
                key={opt.days}
                type="button"
                onClick={() => setDurationDays(opt.days)}
                className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${
                  durationDays === opt.days
                    ? "bg-primary text-on-primary shadow-xs"
                    : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-surface-container-low p-3.5 rounded-2xl flex flex-col gap-2 text-xs">
          <div className="flex justify-between text-on-surface-variant">
            <span>
              {formatINR(dailyPrice)} × {durationDays} {durationDays === 1 ? "day" : "days"}
            </span>
            <span className="font-semibold text-on-surface">{formatINR(baseCost)}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>Workspace concierge fee</span>
            <span className="text-secondary font-semibold">₹0 (Waived)</span>
          </div>
          <div className="flex justify-between text-on-surface-variant">
            <span>GST / Local taxes (18%)</span>
            <span className="font-semibold text-on-surface">{formatINR(gst)}</span>
          </div>
          <div className="h-px bg-outline-variant/30 my-0.5" />
          <div className="flex justify-between items-center pt-0.5">
            <div>
              <span className="text-sm font-bold text-on-surface block">Total Payable</span>
              <span className="text-[10px] text-outline">Instant check-in PIN generated</span>
            </div>
            <span className="text-primary font-extrabold text-base">{formatINR(totalCost)}</span>
          </div>
        </div>

        {/* Host Verified notice - NEVER show phone number! */}
        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
            <span className="text-on-surface font-medium">Hosted by Rahul</span>
          </div>
          <span className="text-[11px] text-on-surface-variant">Instant Confirmation</span>
        </div>

        {/* Confirm Button */}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Confirming Reservation...</span>
          ) : (
            <>
              <span>Reserve &amp; Generate Key ({formatINR(totalCost)})</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
