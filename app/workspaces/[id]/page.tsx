"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { WorkspaceItem } from "@/lib/data/mockData";
import { formatINR } from "@/lib/utils";

export default function WorkspaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite, setConfirmedBooking, showToast, refreshBookings } = useApp();

  const [workspace, setWorkspace] = useState<WorkspaceItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("Today, Oct 24");
  const [durationDays, setDurationDays] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/workspaces/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setWorkspace(data.data);
          }
        })
        .catch(console.error);
    }
  }, [params.id]);

  if (!workspace) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-on-surface-variant">Loading workspace details...</p>
      </div>
    );
  }

  const dailyPrice = workspace.dailyPrice;
  const baseCost = dailyPrice * durationDays;
  const gst = Math.round(baseCost * 0.18);
  const totalCost = baseCost + gst;

  const durationButtons = [
    { label: "1 Day", days: 1 },
    { label: "3 Days", days: 3 },
    { label: "1 Week", days: 7 },
    { label: "1 Month", days: 30 },
  ];

  const handleBookDesk = async () => {
    setIsBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: workspace.id,
          bookingDate: selectedDate,
          durationDays,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshBookings();
        setConfirmedBooking(data.data);
        showToast("Reservation confirmed! Check-in pass generated.", "success");
      } else {
        showToast(data.error || "Booking failed", "error");
      }
    } catch (e) {
      console.error(e);
      showToast("Booking failed. Please try again.", "error");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 flex flex-col gap-6 pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/workspaces" className="hover:text-primary">Workspaces</Link>
        <span>/</span>
        <span className="text-on-surface font-medium truncate">{workspace.title}</span>
      </div>

      {/* Gallery Section */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-md bg-surface-container-high border border-outline-variant/30">
        <img
          src={workspace.images[activeImageIndex] || workspace.images[0]}
          alt={workspace.title}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Floating Top Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-secondary-container/90 text-on-secondary-container backdrop-blur-md text-xs shadow-xs flex items-center gap-1 font-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Verified Space ✦
            </span>
            <button
              type="button"
              onClick={() => toggleFavorite(workspace.id, workspace.title)}
              aria-label="Save to favorites"
              className="w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xs active:scale-90 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isFavorite(workspace.id) ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Image Thumbnails & Counter */}
        <div className="absolute bottom-4 inset-x-4 flex items-center justify-between">
          <div className="flex gap-1.5 bg-inverse-surface/60 backdrop-blur-md p-1.5 rounded-2xl">
            {workspace.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveImageIndex(i)}
                className={`w-9 h-7 rounded-lg overflow-hidden border transition-all ${
                  activeImageIndex === i ? "border-on-primary scale-105" : "border-transparent opacity-60"
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="px-3 py-1 rounded-full bg-inverse-surface/75 text-inverse-on-surface backdrop-blur-md text-xs tracking-wider flex items-center gap-1 shadow-xs">
            <span className="material-symbols-outlined text-[13px]">photo_camera</span>
            <span>
              {activeImageIndex + 1} / {workspace.images.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Booking Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Info & Amenities (2 cols on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Header info */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-secondary text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                Available Today
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-xs text-on-surface-variant font-medium">
                {workspace.type} • {workspace.availableSpots} Spots Open
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              {workspace.title}
            </h1>

            <div className="flex items-center text-on-surface-variant text-xs sm:text-sm gap-1">
              <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
              <span>{workspace.location}</span>
            </div>

            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-outline-variant/20">
              <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full text-xs font-bold text-on-surface">
                <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{workspace.rating}</span>
                <span className="text-on-surface-variant font-normal">({workspace.reviewCount} reviews)</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1 text-xs text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[16px] text-tertiary">workspace_premium</span>
                <span className="text-on-surface">{workspace.host.badge}</span>
              </div>
            </div>
          </div>

          {/* Pricing Highlight Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-xs border border-outline-variant/30 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                  {formatINR(workspace.dailyPrice)}
                </span>
                <span className="text-xs text-on-surface-variant">/ day</span>
              </div>
              <p className="text-xs text-secondary font-medium mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                High-speed 500Mbps fiber Wi-Fi included
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
              Save 15% on weekly
            </span>
          </div>

          {/* Amenities Grid (8 Included) */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-on-surface">Space Features &amp; Amenities</h3>
              <span className="text-xs text-on-surface-variant">{workspace.amenities.length} Included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {workspace.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low p-3 rounded-2xl flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">{amenity.icon}</span>
                  </div>
                  <div className="min-w-0 flex flex-col">
                    <span className="text-xs font-bold text-on-surface truncate">{amenity.name}</span>
                    <span className="text-[11px] text-on-surface-variant truncate">{amenity.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-2.5">
            <h3 className="text-base sm:text-lg font-bold text-on-surface">About this workspace</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {workspace.description}
            </p>
          </div>

          {/* Host Card - STRICT PRIVACY: NEVER EXPOSE PHONE NUMBER */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={workspace.host.avatar}
                    alt={workspace.host.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-xs">
                    <span className="material-symbols-outlined text-[11px] font-bold">check</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-on-surface">
                      Listed by {workspace.host.name}
                    </span>
                    <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    Host • Joined {workspace.host.joinedYear}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-3 rounded-2xl text-xs">
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px]">Response rate</span>
                <span className="font-bold text-on-surface">{workspace.host.responseRate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-on-surface-variant text-[11px]">Booking guarantee</span>
                <span className="font-bold text-secondary">Instant confirmation</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-on-surface-variant text-xs">
              <span className="material-symbols-outlined text-[16px] text-outline">lock</span>
              <span>Secure transaction &amp; digital key generated post-booking. Host phone masked.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Booking Configuration Block (Desktop) */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-md border border-outline-variant/30 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-on-surface">Reserve Your Spot</h3>
              <span className="text-secondary text-xs font-semibold">
                {workspace.availableSpots} spots left
              </span>
            </div>

            {/* Date Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">Select Date</span>
              <div className="grid grid-cols-3 gap-2">
                {["Today, Oct 24", "Tomorrow, Oct 25", "Custom Date"].map((dateLabel, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(dateLabel)}
                    className={`py-2 px-2 rounded-xl text-center flex flex-col items-center gap-0.5 transition-all ${
                      selectedDate === dateLabel
                        ? "bg-primary text-on-primary shadow-xs"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="text-xs font-semibold">
                      {idx === 0 ? "Today" : idx === 1 ? "Tomorrow" : "Custom"}
                    </span>
                    <span className="text-[10px] opacity-80">
                      {idx === 0 ? "Oct 24" : idx === 1 ? "Oct 25" : "Pick"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">Select Duration</span>
              <div className="grid grid-cols-4 gap-1.5">
                {durationButtons.map((btn) => (
                  <button
                    key={btn.days}
                    type="button"
                    onClick={() => setDurationDays(btn.days)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
                      durationDays === btn.days
                        ? "bg-primary text-on-primary shadow-xs"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    {btn.label}
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
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-on-surface">Total payable</span>
                  <span className="text-[10px] text-outline">Instant digital receipt</span>
                </div>
                <span className="text-primary font-extrabold text-lg">{formatINR(totalCost)}</span>
              </div>
            </div>

            {/* Book Desk CTA */}
            <button
              type="button"
              onClick={handleBookDesk}
              disabled={isBooking}
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isBooking ? (
                <span>Confirming...</span>
              ) : (
                <>
                  <span>Book Desk ({formatINR(totalCost)})</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Booking Bar (Mobile only) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg border-t border-outline-variant/40 p-4 flex items-center justify-between z-30 pb-safe">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-extrabold text-on-surface">{formatINR(dailyPrice)}</span>
            <span className="text-xs text-on-surface-variant">/ day</span>
          </div>
          <span className="text-[11px] text-secondary font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Includes high-speed Wi-Fi
          </span>
        </div>
        <button
          type="button"
          onClick={handleBookDesk}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
        >
          <span>Book Desk</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
