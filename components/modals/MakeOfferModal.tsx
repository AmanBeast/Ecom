"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function MakeOfferModal() {
  const { activeOfferProduct, closeOfferModal, showToast, openChatWithSeller } = useApp();
  const [customOffer, setCustomOffer] = useState("");

  if (!activeOfferProduct) return null;

  const currentPrice = activeOfferProduct.price;
  const offerSuggestions = [
    { label: "5% Off", amount: Math.round(currentPrice * 0.95) },
    { label: "10% Off", amount: Math.round(currentPrice * 0.9) },
    { label: "15% Off", amount: Math.round(currentPrice * 0.85) },
  ];

  const handleSubmit = (offeredPrice: number) => {
    closeOfferModal();
    showToast(`Offer of ${formatINR(offeredPrice)} submitted to ${activeOfferProduct.seller.name}!`, "success");
    openChatWithSeller(
      activeOfferProduct.id,
      `Hello ${activeOfferProduct.seller.name}, I would like to make an offer of ${formatINR(offeredPrice)} for ${activeOfferProduct.title}. Please let me know if you can accept!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest dark:bg-[#181720] text-on-surface dark:text-[#f3f0f4] rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 dark:border-[#2e2b3d] flex flex-col gap-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeOfferProduct.images[0]}
              alt={activeOfferProduct.title}
              className="w-12 h-12 rounded-xl object-cover bg-surface-container dark:bg-[#252330]"
            />
            <div>
              <span className="text-[11px] text-secondary font-semibold uppercase tracking-wider">
                Counter-Offer
              </span>
              <h3 className="font-semibold text-sm text-on-surface dark:text-white line-clamp-1">
                {activeOfferProduct.title}
              </h3>
              <p className="text-xs text-outline">
                Listed at <span className="font-semibold text-on-surface dark:text-white">{formatINR(currentPrice)}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeOfferModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Quick Offer Chips */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-on-surface-variant dark:text-[#9e9aa8]">Recommended offers:</span>
          <div className="grid grid-cols-3 gap-2">
            {offerSuggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSubmit(s.amount)}
                className="p-2.5 rounded-xl border border-outline-variant/40 dark:border-[#353245] bg-surface-container-low dark:bg-[#22202c] hover:border-primary hover:bg-primary/5 transition-all text-center group active:scale-95"
              >
                <span className="block text-[11px] font-semibold text-secondary">{s.label}</span>
                <span className="block text-xs font-bold text-on-surface dark:text-white group-hover:text-primary">
                  {formatINR(s.amount)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom offer input */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="text-xs font-medium text-on-surface-variant dark:text-[#9e9aa8]">Or propose custom amount:</span>
          <div className="flex items-center gap-2 bg-surface-container-low dark:bg-[#22202c] rounded-xl px-3 py-2 border border-outline-variant/40 dark:border-[#353245] focus-within:border-primary">
            <span className="font-semibold text-on-surface dark:text-white text-sm">₹</span>
            <input
              type="number"
              value={customOffer}
              onChange={(e) => setCustomOffer(e.target.value)}
              placeholder="e.g. 39000"
              className="flex-1 bg-transparent text-sm font-semibold text-on-surface dark:text-white focus:outline-none"
            />
            <button
              type="button"
              disabled={!customOffer || Number(customOffer) <= 0}
              onClick={() => handleSubmit(Number(customOffer))}
              className="px-3.5 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold disabled:opacity-40"
            >
              Send Offer
            </button>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-[#22202c] text-[11px] text-on-surface-variant dark:text-[#9e9aa8] flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-secondary shrink-0">verified_user</span>
          <span>Seller has 24h to accept. If accepted, payment goes to Nexus Escrow.</span>
        </div>
      </div>
    </div>
  );
}
