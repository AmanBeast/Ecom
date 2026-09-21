"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { ProductItem } from "@/lib/data/mockData";
import { formatINR } from "@/lib/utils";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    toggleFavorite,
    isFavorite,
    openChatWithSeller,
    openOfferModal,
    openCheckoutModal,
    showToast,
  } = useApp();

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/products/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setProduct(data.data);
          }
        })
        .catch(console.error);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-on-surface-variant">Loading device specifications...</p>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Listing link copied to clipboard", "info");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 flex flex-col gap-6 pb-28">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link href="/marketplace" className="hover:text-primary">Marketplace</Link>
        <span>/</span>
        <span className="text-on-surface font-medium truncate">{product.title}</span>
      </div>

      {/* Visual Hero / Gallery Module */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md border border-outline-variant/30">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Floating Top Controls */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go Back"
            className="w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md flex items-center justify-center text-on-surface shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-xs text-secondary text-xs font-bold">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
              Verified Device
            </span>

            <button
              type="button"
              onClick={handleShare}
              aria-label="Share"
              className="w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-xs flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id, product.title)}
              aria-label="Wishlist"
              className="w-10 h-10 rounded-full bg-surface-container-lowest/85 backdrop-blur-md shadow-xs flex items-center justify-center text-on-surface hover:text-error active:scale-95 transition-all"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={isFavorite(product.id) ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Gallery Indicators & Thumbnails (Bottom) */}
        <div className="absolute bottom-3 inset-x-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-inverse-surface/65 backdrop-blur-md px-3 py-1.5 rounded-full">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeImageIndex === idx
                    ? "w-4 bg-on-primary"
                    : "w-2 bg-on-primary/40"
                }`}
              />
            ))}
          </div>

          <span className="px-3 py-1 rounded-full bg-inverse-surface/65 backdrop-blur-md text-on-primary text-xs font-semibold">
            {activeImageIndex + 1} / {product.images.length}
          </span>
        </div>
      </div>

      {/* Main Grid: Details + Purchase Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Title, Badges & Price Header Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-3">
            {/* Tag Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                {product.condition === "LIKE_NEW" ? "Like New" : product.condition}
              </span>
              {product.dealTag && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold">
                  <span>🔥</span>
                  {product.dealTag}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold">
                <span className="material-symbols-outlined text-[15px]">bolt</span>
                Fast Shipper
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              {product.title}
            </h1>

            {/* Pricing Stack */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm sm:text-base line-through text-outline">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.dealTag && (
                <span className="px-2.5 py-0.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-extrabold">
                  {product.dealTag}
                </span>
              )}
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-1.5 text-on-surface-variant text-xs sm:text-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
              <span>{product.location} • Local Handover or Insured Express</span>
            </div>

            {/* Hardware Condition Meter */}
            <div className="mt-2 bg-surface-container-low rounded-2xl p-4 flex flex-col gap-2.5 border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface">
                <span className="text-xs font-bold">Hardware Diagnostic Tier</span>
                <span className="text-xs font-extrabold text-secondary">
                  {product.conditionScore}
                </span>
              </div>

              {/* 4-tier meter bar */}
              <div className="grid grid-cols-4 gap-2 h-2.5 w-full">
                <div className={`rounded-full ${product.conditionTier >= 1 ? "bg-secondary" : "bg-outline-variant"}`} />
                <div className={`rounded-full ${product.conditionTier >= 2 ? "bg-secondary" : "bg-outline-variant"}`} />
                <div className={`rounded-full ${product.conditionTier >= 3 ? "bg-secondary" : "bg-outline-variant"}`} />
                <div className={`rounded-full ${product.conditionTier >= 4 ? "bg-secondary" : "bg-outline-variant"}`} />
              </div>

              <div className="flex justify-between text-outline text-[11px] font-semibold uppercase tracking-wider">
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
                <span className="text-secondary font-bold">Pristine</span>
              </div>
            </div>
          </div>

          {/* Nexus Certified Escrow Protection Card */}
          <div className="bg-gradient-to-br from-primary-fixed/30 via-surface-container-lowest to-surface-container-low rounded-3xl p-5 sm:p-6 shadow-xs border border-primary/20 flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-[22px]">security</span>
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-on-surface">
                  Nexus Certified Escrow Guarantee
                </h3>
                <p className="text-xs text-on-surface-variant">
                  Zero-risk peer exchange backed by platform-held funds.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="bg-surface-container-lowest/90 backdrop-blur-xs rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-[22px]">timelapse</span>
                <span className="text-xs font-bold text-on-surface">48h Testing Window</span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-xs rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-[22px]">lock</span>
                <span className="text-xs font-bold text-on-surface">Escrow Holding</span>
              </div>
              <div className="bg-surface-container-lowest/90 backdrop-blur-xs rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <span className="material-symbols-outlined text-primary text-[22px]">assignment_return</span>
                <span className="text-xs font-bold text-on-surface">100% Refundable</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-on-surface">
                Device Specifications
              </h3>
              <span className="text-xs text-primary px-2.5 py-0.5 rounded-full bg-primary-fixed font-bold">
                Serial Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-0.5">
                  <span className="text-[11px] text-outline font-semibold uppercase tracking-wider">
                    {key}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-on-surface">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* In the box pill */}
            <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-surface-container-highest/60 text-on-surface mt-1">
              <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
              <div className="text-xs sm:text-sm">
                <span className="font-bold">In the Box:</span> {product.inTheBox}
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-3">
            <h3 className="text-base sm:text-lg font-bold text-on-surface">About this item</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-on-surface-variant text-xs font-medium border-t border-outline-variant/20">
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[16px]">task_alt</span>
                No iCloud / Activation lock
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[16px]">task_alt</span>
                Clean Diagnostics
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-secondary text-[16px]">task_alt</span>
                Clean Serial
              </span>
            </div>
          </div>

          {/* Seller Card - STRICT PRIVACY: NEVER EXPOSE PHONE NUMBER */}
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-12 h-12 rounded-full object-cover bg-surface-container shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-fixed ring-2 ring-surface-container-lowest" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-base text-on-surface">
                      {product.seller.name}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <span className="text-xs text-outline">
                    Member since {product.seller.joinedYear}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-secondary font-bold text-sm">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <span>{product.seller.rating}</span>
                </div>
                <span className="text-xs text-outline">
                  ({product.seller.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Seller trust stats */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-surface-container-low rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {product.seller.salesCount} successful sales
                </span>
              </div>
              <div className="bg-surface-container-low rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                <span className="text-xs text-on-surface-variant font-medium">
                  {product.seller.responseTime}
                </span>
              </div>
            </div>

            {/* In-app Messenger CTA */}
            <button
              type="button"
              onClick={() => openChatWithSeller(product.id)}
              className="w-full py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">
                chat_bubble_outline
              </span>
              <span>Chat with Seller (Aman)</span>
            </button>
            <p className="text-center text-[11px] text-outline">
              Protected in-app messenger • Phone numbers are masked for your security
            </p>
          </div>
        </div>

        {/* Right Column: Sticky Action Box (Desktop) */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 shadow-md border border-outline-variant/30 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="flex flex-col">
              <span className="text-xs text-outline font-semibold uppercase tracking-wider">
                Certified Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-outline line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
              <span className="text-xs text-secondary font-semibold flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[15px]">shield</span>
                Escrow funds held safely for 48 hours
              </span>
            </div>

            <div className="space-y-2 border-y border-outline-variant/30 py-3 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Inspection window:</span>
                <span className="font-bold text-on-surface">48 Hours post-delivery</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Hardware grading:</span>
                <span className="font-bold text-secondary">{product.conditionScore}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Insured shipping:</span>
                <span className="font-bold text-primary">FREE Next Day</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => openCheckoutModal(product)}
                className="w-full py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Buy Now with Escrow</span>
              </button>

              <button
                type="button"
                onClick={() => openOfferModal(product)}
                className="w-full py-3 rounded-2xl bg-surface-container text-on-surface hover:bg-surface-container-high font-semibold text-xs sm:text-sm active:scale-[0.99] transition-all"
              >
                Make an Offer
              </button>

              <button
                type="button"
                onClick={() => openChatWithSeller(product.id)}
                className="w-full py-2.5 rounded-2xl border border-outline-variant/40 hover:bg-surface-container text-on-surface text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                <span>Ask Seller a Question</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Purchase & Offer Drawer (Mobile only) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-surface-container-lowest/95 backdrop-blur-xl shadow-lg border-t border-outline-variant/40 p-4 flex items-center justify-between gap-3 pb-safe">
        <div className="flex flex-col min-w-0">
          <span className="text-xl font-extrabold text-on-surface truncate">
            {formatINR(product.price)}
          </span>
          <span className="text-[11px] text-secondary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">shield</span>
            Escrow covered
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => openOfferModal(product)}
            className="px-3.5 py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high active:scale-95 transition-all"
          >
            Make Offer
          </button>
          <button
            type="button"
            onClick={() => openCheckoutModal(product)}
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-95 shadow-md shadow-primary/20 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">lock</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
