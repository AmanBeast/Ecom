"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export default function HomePage() {
  const {
    toggleFavorite,
    isFavorite,
    openCheckoutModal,
    openBookingModal,
    currentLocation,
    openLocationModal,
    openAddProductModal,
    openAddWorkspaceModal,
    isSeller,
    openBecomeSellerModal,
  } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Countdown timer simulation for Super Saver Deals
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimerNumber = (num: number) => String(num).padStart(2, "0");

  const categories = [
    { id: "laptops", label: "Laptops", icon: "laptop_mac" },
    { id: "phones", label: "Phones", icon: "smartphone" },
    { id: "tablets", label: "Tablets", icon: "tablet_mac" },
    { id: "monitors", label: "Monitors", icon: "desktop_windows" },
    { id: "accessories", label: "Accessories", icon: "headphones" },
    { id: "workspaces", label: "Desk Spaces", icon: "chair" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 flex flex-col gap-6">
      {/* Interactive Greeting Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              alt="Alex's profile"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover shadow-xs ring-2 ring-primary/20 ring-offset-2"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD62MvtnZ6XK-zSmCgwgOop8QI4K6ZiEhblxYxS0anORhZJe8DrUxqxrmf_BiHM_ei-9TZuwCW7oS_NqljWb9PPp1yZ-gjD2TJoiAD40UKHsdYn7JsZXRfhxTKdmskCYB4O06uMk3LE2Wypq0PXXC09Mf3su2p8JyB0GyER4NwPM19-T2gp1TwRoXMADpsJwv-SYSOchhu2ubuEC1qcusKXO0cKsOBwFgdr9ZAdYnQMm6GiAwDXyDaB"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant flex items-center gap-1 font-medium">
              Good morning <span className="inline-block animate-bounce">👋</span>
            </span>
            <span className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
              Alex Rivera
            </span>
          </div>
        </div>

        {/* Location chip (Interactive) */}
        <button
          type="button"
          onClick={openLocationModal}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/40 text-xs shadow-xs hover:border-primary transition-all active:scale-95"
          title="Click to change your delivery location"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
          <span className="text-on-surface font-semibold max-w-[140px] truncate">{currentLocation}</span>
          <span className="text-secondary font-medium text-[11px] ml-1">● Express Area</span>
          <span className="material-symbols-outlined text-[14px] text-on-surface-variant">arrow_drop_down</span>
        </button>
      </div>

      {/* Hero Headline & Quick Seller / Host CTA */}
      <div className="pt-1 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight mb-1.5">
            Work better. <br className="sm:hidden" />
            <span className="text-primary-container bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent">
              Shop smarter.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
            Find your next high-focus workspace desk or discover certified pre-owned tech backed by escrow protection.
          </p>
        </div>

        {/* Seller & Host Direct Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (isSeller) {
                openAddProductModal();
              } else {
                openBecomeSellerModal();
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">sell</span>
            <span>Sell Tech</span>
          </button>
          <button
            type="button"
            onClick={openAddWorkspaceModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-surface-container-high text-on-surface text-xs font-bold hover:bg-surface-container-highest border border-outline-variant/30 shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">chair</span>
            <span>+ Host Desk</span>
          </button>
        </div>
      </div>

      {/* Quick Search / Discover Bar */}
      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              window.location.href = `/marketplace?query=${encodeURIComponent(searchQuery)}`;
            }
          }}
          className="w-full bg-surface-container-lowest shadow-sm rounded-2xl px-4 py-3 sm:py-3.5 flex items-center gap-3 border border-outline-variant/30 hover:border-primary/50 transition-all"
        >
          <span className="material-symbols-outlined text-outline text-[22px]">search</span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full text-sm sm:text-base text-on-surface placeholder:text-outline focus:outline-none"
            placeholder="Search desks, laptops, 4K monitors, accessories..."
            type="text"
          />
          <Link
            href="/marketplace"
            className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </Link>
        </form>

        {/* Location bar on mobile */}
        <button
          type="button"
          onClick={openLocationModal}
          className="sm:hidden mt-2 w-full flex items-center justify-between text-on-surface-variant text-xs px-1 text-left"
        >
          <div className="flex items-center gap-1 truncate">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span className="text-on-surface font-medium truncate">Deliver to Alex - {currentLocation}</span>
          </div>
          <span className="text-primary font-semibold shrink-0 ml-2">Change</span>
        </button>
      </div>

      {/* Super Saver Deals Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-surface-container-low to-secondary/10 border border-primary/20 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[22px]">bolt</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface leading-tight">
                Super Saver Deals
              </h3>
              <p className="text-xs text-secondary font-semibold">
                Up to 55% Off Workspaces &amp; Gear
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-xs text-error text-xs font-bold border border-error/20">
            <span className="material-symbols-outlined text-[16px]">timer</span>
            <span>
              {formatTimerNumber(timeLeft.hours)}h : {formatTimerNumber(timeLeft.minutes)}m : {formatTimerNumber(timeLeft.seconds)}s
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Flash Deal 1 */}
          <Link
            href="/marketplace/prod-1"
            className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group border border-outline-variant/30"
          >
            <div className="relative h-20 w-24 sm:h-24 sm:w-28 rounded-xl overflow-hidden bg-surface-container shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADHnf_JrKKbLQGPta7_mIH-s21K_XA3NP7CoE3siqEYxaKQ_lc7SMAIjVnfiFCKc2PN9JlOSdvPOcYXmz68U0Ud2JMoOaLhnwBS8HS0AWuOf-vuY5Ba8ptydJtS0k4mbWnHfYiRgQQc6ZuGDM2OrykLUCTuM5I1c1TfMR5D-_qbjSFbk5bIgva3RCt92wzpYI8oiKfDAp_RHCJVPUt-liZj-J1ZrATygQeKms31csApuPoqrx8Cew1"
                alt="MacBook M1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-1 left-1 bg-secondary text-on-secondary text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                44% OFF
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-on-surface truncate block">
                Refurbished MacBook Air M1
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-primary font-bold text-sm sm:text-base">₹42,000</span>
                <span className="text-outline text-xs line-through">₹74,900</span>
              </div>
              <span className="text-[11px] text-secondary font-medium block mt-1">
                ✓ Pristine 9.4/10 • Escrow Safe
              </span>
            </div>
          </Link>

          {/* Flash Deal 2 */}
          <Link
            href="/workspaces/ws-1"
            className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-xs hover:shadow-md transition-all flex items-center gap-3 group border border-outline-variant/30"
          >
            <div className="relative h-20 w-24 sm:h-24 sm:w-28 rounded-xl overflow-hidden bg-surface-container shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsvAd62SB2LfpVWJ--VvRTxjbO4RteIGqeAP_qsW5_Nr36frnTOAxzMbbjIlvGdU0QFsQYPa9TgSHja042bNKXh8ZaVl1MUrqEUWZDdu0PfDD89hkeU6mX0BeJ9YNHMimd2hUk7DLSC_gmOYwdOawwc37O5_I54ViwoyDZuMpq8OA50_99ipxHUfGN0bZIjJCehnCtrQ8q7vNcwwhd1zwxrEHS8ALztRW0FcgsEamskDqJMJQgwqj"
                alt="Workspace pass"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-1 left-1 bg-secondary text-on-secondary text-[10px] px-1.5 py-0.5 rounded-md font-bold">
                MIN 30% OFF
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-on-surface truncate block">
                Premium Window Desk Pass
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-primary font-bold text-sm sm:text-base">₹499/day</span>
                <span className="text-outline text-xs line-through">₹799/day</span>
              </div>
              <span className="text-[11px] text-primary font-medium block mt-1">
                ✓ Superhost • 500Mbps Fiber
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Dual Pillar Master Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Service 1: Workspaces */}
        <div className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNa0f-nziraBF9V-rZEhuqSWOQq6FT-Fw-onu_7Mas6CX1aSOffbUt9DjpgNEk7RxHJKNu62up2Cui7Z87r4UOtT1MUCIW3Qn6ZMP5ri8-CctH1qHX14w5mnhNDqYTztR7aYKYhiwYhjVmz2HL0WK5Kq7aqXKgpI8qqR04ebpPcgVK449tN_uk4z__gMqeVf5mmAX3N57e5eDn3PcxDBavx0eqNOhC-x-kB2FRfgMke0cpFTrCUEzZ"
              alt="Scandinavian coworking office"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/25 to-transparent" />

            {/* Live Availability Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              <span className="text-xs text-secondary font-bold">Available Today</span>
            </div>

            <div className="absolute top-3.5 right-3.5 bg-on-background/70 backdrop-blur-md px-3 py-1 rounded-full text-on-primary text-xs font-semibold">
              From ₹299/day
            </div>

            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 text-on-primary text-xs font-medium">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">near_me</span>
              <span>42 Spaces in Chandigarh &amp; Metros</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mb-1.5">
                Find a Workspace
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mb-5">
                Private ergonomic desks, soundproof focus pods, and high-speed boardrooms ready on demand. Zero setup overhead.
              </p>
            </div>

            <Link
              href="/workspaces"
              className="inline-flex items-center justify-between w-full py-3 px-5 rounded-2xl bg-primary text-on-primary text-sm font-semibold transition-all group-hover:bg-primary-container shadow-sm active:scale-[0.99]"
            >
              <span>Explore Workspaces</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Service 2: Electronics Marketplace */}
        <div className="group relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-outline-variant/30 flex flex-col justify-between">
          <div className="relative h-48 sm:h-56 w-full overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsiHh_vS9LR6kN4yVCsN6PI7g-kc8uyFAnBAzjxNtrT2-1oAK6tEpni_m3DvEkXW5TtxKNhQIrTyLpa3l708Xl0IyjbVPR_PmuRyWm9WZStHZVAYbjLNjyclalAoBpXsE5p5cuo0SFMdVOV8i6KzJdDbiNQGT6dI35ijAeCfq0CmaK1ZoOWbMgHkkUP2VZrCxpAJ2vFg5uYhrp6TfRTss0iOfiMZwSIGBJB_SD1X9Jxy7h5g0ld8f4"
              alt="Hardware gear on desk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/25 to-transparent" />

            {/* Verified Sellers Badge */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full shadow-xs">
              <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-xs text-primary font-bold">Verified Sellers</span>
            </div>

            <div className="absolute top-3.5 right-3.5 bg-on-background/70 backdrop-blur-md px-3 py-1 rounded-full text-on-primary text-xs font-semibold">
              1,200+ Listings
            </div>

            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1 text-on-primary text-xs font-medium">
              <span className="material-symbols-outlined text-[18px] text-secondary-fixed">inventory_2</span>
              <span>48-Hour Hardware Escrow Protection</span>
            </div>
          </div>

          <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mb-1.5">
                Buy &amp; Sell Electronics
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mb-5">
                Curated MacBooks, 4K displays, mechanical keyboards, and phones with certified multi-point diagnostics.
              </p>
            </div>

            <Link
              href="/marketplace"
              className="inline-flex items-center justify-between w-full py-3 px-5 rounded-2xl bg-surface-container-high text-on-surface text-sm font-semibold transition-all group-hover:bg-surface-container-highest shadow-xs active:scale-[0.99]"
            >
              <span>Explore Marketplace</span>
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Categories Filter Pills */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
            Quick Categories
          </h3>
          <Link href="/marketplace" className="text-xs text-primary font-semibold hover:underline">
            View All
          </Link>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          <Link
            href="/marketplace"
            className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold shadow-xs transition-all active:scale-95 ${
              selectedCategory === "all"
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">apps</span>
            <span>All Categories</span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.id === "workspaces" ? "/workspaces" : `/marketplace?category=${cat.id}`}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface border border-outline-variant/30 text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured / Trending Near You */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-xl font-bold text-on-surface tracking-tight">
              Trending Near You
            </h3>
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <Link
            href="/marketplace"
            className="text-xs text-primary font-semibold hover:underline flex items-center"
          >
            See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>

        {/* Carousel / Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Card 1: MacBook Air M1 */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group border border-outline-variant/30">
            <div className="relative h-44 w-full overflow-hidden bg-surface-container">
              <Link href="/marketplace/prod-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADHnf_JrKKbLQGPta7_mIH-s21K_XA3NP7CoE3siqEYxaKQ_lc7SMAIjVnfiFCKc2PN9JlOSdvPOcYXmz68U0Ud2JMoOaLhnwBS8HS0AWuOf-vuY5Ba8ptydJtS0k4mbWnHfYiRgQQc6ZuGDM2OrykLUCTuM5I1c1TfMR5D-_qbjSFbk5bIgva3RCt92wzpYI8oiKfDAp_RHCJVPUt-liZj-J1ZrATygQeKms31csApuPoqrx8Cew1"
                  alt="MacBook Air M1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-primary text-on-primary px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-xs">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>Nexus Assured</span>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite("prod-1", "MacBook Air M1")}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={isFavorite("prod-1") ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-on-surface shadow-xs">
                <span>★ 4.8</span>
                <span className="text-on-surface-variant font-normal">(342)</span>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-extrabold text-on-surface">₹42,000</span>
                  <span className="text-xs text-outline line-through">₹74,900</span>
                  <span className="text-xs font-semibold text-secondary">44% off</span>
                </div>
                <Link href="/marketplace/prod-1">
                  <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    Apple MacBook Air M1 (8GB / 256GB)
                  </h4>
                </Link>
                <div className="inline-block bg-surface-container px-2 py-0.5 rounded text-[11px] text-on-surface-variant font-medium mt-1 mb-3">
                  No Cost EMI from ₹3,500/mo
                </div>
              </div>

              <div className="border-t border-outline-variant/30 pt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                    Free Delivery by Tomorrow
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Sector 17, Chandigarh</span>
                </div>
                <Link
                  href="/marketplace/prod-1"
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Dell UltraSharp 27 4K */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group border border-outline-variant/30">
            <div className="relative h-44 w-full overflow-hidden bg-surface-container">
              <Link href="/marketplace/prod-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaafXPNXmYdW7EQK3svXsd3z5PNmiT4m8WxxtpN4Jv-tELvWgOEHWuQ1f95hh1UdUyQR88LyfXH_EuRu0UwEVpN72dvPQVy5sJvQ-Rs7C7qLeycssbg5hc8oFuQ0c5o_rq7gRZkyW3hluERgmJXulqVuHnDn9ZYKNe6TOhpR-sb0Xc6LtHvHCAa72i_cSCqUp6klCl5NrmdqTB7frmj2X3p73bFrD-Koio3lzbkanZSW1BUCCADx83"
                  alt="Dell UltraSharp monitor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-xs">
                <span className="material-symbols-outlined text-[13px]">thumb_up</span>
                <span>Top Choice</span>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite("prod-2", "Dell UltraSharp 27")}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={isFavorite("prod-2") ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-on-surface shadow-xs">
                <span>★ 4.7</span>
                <span className="text-on-surface-variant font-normal">(189)</span>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-extrabold text-on-surface">₹24,500</span>
                  <span className="text-xs text-outline line-through">₹38,000</span>
                  <span className="text-xs font-semibold text-secondary">35% off</span>
                </div>
                <Link href="/marketplace/prod-2">
                  <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    Dell UltraSharp 27" 4K USB-C Hub
                  </h4>
                </Link>
                <div className="inline-block bg-surface-container px-2 py-0.5 rounded text-[11px] text-on-surface-variant font-medium mt-1 mb-3">
                  Standard EMI from ₹2,040/mo
                </div>
              </div>

              <div className="border-t border-outline-variant/30 pt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-secondary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Same-day Express Delivery
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Indiranagar, Bangalore</span>
                </div>
                <Link
                  href="/marketplace/prod-2"
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Sector 17 Premium Desk */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group border border-outline-variant/30 sm:col-span-2 lg:col-span-1">
            <div className="relative h-44 w-full overflow-hidden bg-surface-container">
              <Link href="/workspaces/ws-1">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBsvAd62SB2LfpVWJ--VvRTxjbO4RteIGqeAP_qsW5_Nr36frnTOAxzMbbjIlvGdU0QFsQYPa9TgSHja042bNKXh8ZaVl1MUrqEUWZDdu0PfDD89hkeU6mX0BeJ9YNHMimd2hUk7DLSC_gmOYwdOawwc37O5_I54ViwoyDZuMpq8OA50_99ipxHUfGN0bZIjJCehnCtrQ8q7vNcwwhd1zwxrEHS8ALztRW0FcgsEamskDqJMJQgwqj"
                  alt="Premium Window Desk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-primary-container text-on-primary-container px-2.5 py-0.5 rounded-full text-[11px] font-semibold shadow-xs">
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                <span>Instant Confirmation</span>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite("ws-1", "Premium Window Desk")}
                className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={isFavorite("ws-1") ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
              </button>
              <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-on-surface shadow-xs">
                <span>★ 4.8</span>
                <span className="text-on-surface-variant font-normal">(24)</span>
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-extrabold text-on-surface">₹499</span>
                  <span className="text-xs text-on-surface-variant">/ day</span>
                  <span className="text-xs font-semibold text-secondary">Save 15% weekly</span>
                </div>
                <Link href="/workspaces/ws-1">
                  <h4 className="text-sm font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    Premium Window Desk (Sector 17)
                  </h4>
                </Link>
                <div className="inline-block bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[11px] font-medium mt-1 mb-3">
                  Free Cancellation up to 1hr before
                </div>
              </div>

              <div className="border-t border-outline-variant/30 pt-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-primary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">event_available</span>
                    3 spots open today
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Sector 17, Chandigarh</span>
                </div>
                <Link
                  href="/workspaces/ws-1"
                  className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                >
                  Book Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nexus Assured Guarantee Banner */}
      <div className="bg-surface-container-low rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col gap-4 border border-outline-variant/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <span className="text-sm sm:text-base font-bold text-on-surface">
                Nexus Assured Guarantee
              </span>
              <p className="text-xs text-on-surface-variant">
                Certified 40-point hardware diagnostics &amp; verified host workspaces.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            Learn more <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 border-t border-outline-variant/30 pt-4 text-center">
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[22px] text-secondary">
              assignment_return
            </span>
            <span className="text-xs font-semibold text-on-surface">7-Day Easy Return</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[22px] text-primary">
              local_shipping
            </span>
            <span className="text-xs font-semibold text-on-surface">Free Delivery</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="material-symbols-outlined text-[22px] text-secondary">lock</span>
            <span className="text-xs font-semibold text-on-surface">Escrow Safe Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
