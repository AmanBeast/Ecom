"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";

export function BecomeSellerModal() {
  const {
    isBecomeSellerModalOpen,
    closeBecomeSellerModal,
    becomeSeller,
    openAddProductModal,
  } = useApp();

  const [storeName, setStoreName] = useState("Alex Rivera Tech Exchange");
  const [category, setCategory] = useState("laptops");
  const [city, setCity] = useState("Chandigarh");
  const [bio, setBio] = useState("Certified pre-owned Apple & designer tech accessories with clean diagnostics.");

  if (!isBecomeSellerModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim()) return;
    becomeSeller({ storeName, category, city });
    // After becoming seller, immediately offer to list hardware
    openAddProductModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-[#181720] rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 dark:border-[#2e2b3d] flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-on-surface dark:text-[#f3f0f4]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 dark:border-[#2e2b3d] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">storefront</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">Become a Gear Seller</h3>
              <p className="text-xs text-secondary font-medium">Nexus Certified Peer Exchange</p>
            </div>
          </div>
          <button
            onClick={closeBecomeSellerModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-3 rounded-2xl bg-secondary/10 border border-secondary/20 text-xs text-secondary flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px] shrink-0 mt-0.5">verified_user</span>
          <div>
            <span className="font-bold block">100% Escrow Protection</span>
            <span className="text-on-surface-variant dark:text-[#a09bb0] text-[11px]">
              Sell hardware safely without chargebacks or cash haggling. Payouts release automatically after 48h buyer verification.
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Store / Seller Display Name
            </label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. Alex Tech Vault"
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2.5 text-on-surface dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Primary Specialty
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-2.5 py-2.5 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="laptops">Laptops &amp; MacBooks</option>
                <option value="phones">Smartphones</option>
                <option value="tablets">Tablets &amp; iPads</option>
                <option value="monitors">4K Displays</option>
                <option value="accessories">Keyboards &amp; Gear</option>
                <option value="audio">Headphones</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Dispatch City
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Chandigarh"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2.5 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Seller Bio &amp; Inspection Commitment
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Describe your device handling or testing process..."
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Privacy Guarantee Note */}
          <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-[#22202c] flex items-center gap-2 text-[11px] text-on-surface-variant dark:text-[#9e9aa8]">
            <span className="material-symbols-outlined text-[16px] text-primary shrink-0">lock</span>
            <span>Your personal phone number is never shown. All chats remain within protected in-app messenger.</span>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>Activate Seller Account &amp; List First Item</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
