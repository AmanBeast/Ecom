"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";

export function LocationModal() {
  const { isLocationModalOpen, closeLocationModal, currentLocation, setCurrentLocation } = useApp();
  const [customInput, setCustomInput] = useState("");

  if (!isLocationModalOpen) return null;

  const popularCities = [
    { name: "Chandigarh 160017", label: "Chandigarh", tag: "Express Desk Delivery" },
    { name: "Bangalore 560038", label: "Bangalore (Indiranagar)", tag: "Tech Hub" },
    { name: "Mumbai 400051", label: "Mumbai (BKC)", tag: "Financial District" },
    { name: "Gurugram 122002", label: "Gurugram (Cyber Hub)", tag: "Direct Escrow" },
    { name: "New Delhi 110001", label: "New Delhi (CP)", tag: "Metro Connected" },
    { name: "Hyderabad 500081", label: "Hyderabad (HITEC City)", tag: "Flex Hub" },
    { name: "Pune 411001", label: "Pune (Koregaon Park)", tag: "Creative Studio" },
    { name: "Noida 201301", label: "Noida (Sector 62)", tag: "Startup Park" },
  ];

  const handleSelect = (loc: string) => {
    setCurrentLocation(loc);
    closeLocationModal();
  };

  const handleSubmitCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      handleSelect(customInput.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest dark:bg-[#181720] rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 dark:border-[#2e2b3d] flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-on-surface dark:text-[#f3f0f4]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 dark:border-[#2e2b3d] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">location_on</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">Choose Your Location</h3>
              <p className="text-xs text-on-surface-variant dark:text-[#9e9aa8]">
                Currently: <span className="font-semibold text-primary">{currentLocation}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeLocationModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Custom Location Search */}
        <form onSubmit={handleSubmitCustom} className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-surface-container-low dark:bg-[#22202c] rounded-xl px-3 py-2 border border-outline-variant/40 dark:border-[#353245] focus-within:border-primary">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter neighborhood, city, or pincode..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-on-surface dark:text-white placeholder:text-outline focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!customInput.trim()}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-semibold disabled:opacity-40 transition-opacity"
          >
            Set
          </button>
        </form>

        {/* Auto Detect Button */}
        <button
          type="button"
          onClick={() => handleSelect("Chandigarh 160017 (Detected)")}
          className="w-full py-2.5 px-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary dark:text-[#818cf8] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">my_location</span>
          <span>Detect My Current Location (GPS)</span>
        </button>

        {/* Popular Cities */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-bold text-on-surface-variant dark:text-[#9e9aa8]">Popular Metros &amp; Tech Hubs</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularCities.map((city, idx) => {
              const isCurrent = currentLocation.includes(city.label);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelect(city.name)}
                  className={`p-3 rounded-xl text-left border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? "border-primary bg-primary/10 dark:bg-primary/20 text-primary dark:text-[#818cf8] font-bold"
                      : "border-outline-variant/30 dark:border-[#2e2b3d] bg-surface-container-low/50 dark:bg-[#1f1d28] hover:border-primary/50 text-on-surface dark:text-[#f3f0f4]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{city.label}</span>
                    {isCurrent && (
                      <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>
                    )}
                  </div>
                  <span className="text-[10px] text-on-surface-variant dark:text-[#9e9aa8] mt-0.5">
                    {city.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
