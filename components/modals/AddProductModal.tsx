"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function AddProductModal() {
  const router = useRouter();
  const {
    isAddProductModalOpen,
    closeAddProductModal,
    currentLocation,
    showToast,
    refreshProducts,
  } = useApp();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"laptops" | "phones" | "tablets" | "monitors" | "accessories" | "audio" | "gaming">("laptops");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [condition, setCondition] = useState<"NEW" | "LIKE_NEW" | "GOOD" | "FAIR">("LIKE_NEW");
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [batteryHealth, setBatteryHealth] = useState("92% Health (88 Cycles)");
  const [inTheBox, setInTheBox] = useState("Original Power Adapter, Braided Cable & Retail Box");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAddProductModalOpen) return null;

  const imagePresets = [
    { label: "MacBook / Ultrabook", url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80" },
    { label: "Phone / iPhone", url: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=1200&q=80" },
    { label: "Monitor / 4K", url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80" },
    { label: "Mechanical Keyboard", url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80" },
    { label: "ANC Headphones", url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" },
    { label: "Tablet / iPad", url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=80" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) {
      showToast("Please provide product title and price", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const activeImg = customImageUrl.trim() || selectedImage;
      const specs: { [key: string]: string } = {};
      if (processor) specs["Processor"] = processor;
      if (ram) specs["RAM / Memory"] = ram;
      if (storage) specs["Storage"] = storage;
      if (batteryHealth) specs["Battery Health"] = batteryHealth;
      specs["Inspection"] = "Clean Serial & Diagnostics Verified";

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          price: Number(price),
          originalPrice: originalPrice ? Number(originalPrice) : Math.round(Number(price) * 1.3),
          condition,
          location: currentLocation,
          description: description || "Inspected used electronics in clean working order.",
          images: [activeImg],
          specs,
          inTheBox,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await refreshProducts();
        closeAddProductModal();
        showToast("Product listed successfully on Marketplace!", "success");
        router.push("/marketplace");
      } else {
        showToast(json.error || "Failed to list product", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error listing product", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-surface-container-lowest dark:bg-[#181720] rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 dark:border-[#2e2b3d] flex flex-col gap-4 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-200 text-on-surface dark:text-[#f3f0f4]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 dark:border-[#2e2b3d] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">List Electronics for Sale</h3>
              <p className="text-xs text-on-surface-variant dark:text-[#9e9aa8]">
                Dispatched from: <span className="text-primary font-semibold">{currentLocation}</span>
              </p>
            </div>
          </div>
          <button
            onClick={closeAddProductModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="sm:col-span-2">
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Item Title &amp; Model *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dell XPS 15 9520 (OLED 3.5K, i7 32GB)"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-2.5 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="laptops">Laptops</option>
                <option value="phones">Phones</option>
                <option value="tablets">Tablets</option>
                <option value="monitors">Monitors</option>
                <option value="accessories">Accessories</option>
                <option value="audio">Audio</option>
                <option value="gaming">Gaming</option>
              </select>
            </div>
          </div>

          {/* Pricing & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 45000"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white font-bold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Original Retail (₹)
              </label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 79900"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-2.5 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="LIKE_NEW">Like New (Pristine 9.4/10)</option>
                <option value="GOOD">Good (Minor normal wear)</option>
                <option value="FAIR">Fair (Visible scuffs, fully functional)</option>
                <option value="NEW">Brand New Sealed</option>
              </select>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="bg-surface-container-low dark:bg-[#22202c] p-3 rounded-2xl border border-outline-variant/30 dark:border-[#353245] space-y-2">
            <span className="font-bold text-on-surface dark:text-white block">Key Hardware Specs</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={processor}
                onChange={(e) => setProcessor(e.target.value)}
                placeholder="CPU / Chip (e.g. M1, i7)"
                className="bg-surface-container-lowest dark:bg-[#181720] border border-outline-variant/30 dark:border-[#353245] rounded-lg px-2.5 py-1.5 text-on-surface dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="RAM (e.g. 16GB)"
                className="bg-surface-container-lowest dark:bg-[#181720] border border-outline-variant/30 dark:border-[#353245] rounded-lg px-2.5 py-1.5 text-on-surface dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                placeholder="SSD (e.g. 512GB)"
                className="bg-surface-container-lowest dark:bg-[#181720] border border-outline-variant/30 dark:border-[#353245] rounded-lg px-2.5 py-1.5 text-on-surface dark:text-white focus:outline-none"
              />
              <input
                type="text"
                value={batteryHealth}
                onChange={(e) => setBatteryHealth(e.target.value)}
                placeholder="Battery (e.g. 91% Health)"
                className="bg-surface-container-lowest dark:bg-[#181720] border border-outline-variant/30 dark:border-[#353245] rounded-lg px-2.5 py-1.5 text-on-surface dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Select Preset Photo or Enter Image URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
              {imagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setCustomImageUrl("");
                  }}
                  className={`h-14 rounded-xl overflow-hidden border transition-all ${
                    selectedImage === preset.url && !customImageUrl
                      ? "border-primary ring-2 ring-primary/40 scale-105"
                      : "border-outline-variant/30 dark:border-[#353245] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <input
              type="url"
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="Or paste custom image URL (https://...)"
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          {/* In the Box & Description */}
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              In the Box
            </label>
            <input
              type="text"
              value={inTheBox}
              onChange={(e) => setInTheBox(e.target.value)}
              placeholder="Included cables, adapter, warranty card..."
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Item Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention cosmetic state, usage duration, and care..."
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Escrow Guarantee Pill */}
          <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-between text-[11px] text-secondary">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Protected by Nexus 48h Escrow
            </span>
            <span>Zero phone exposure</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Publishing Listing...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>Publish to Marketplace ({price ? formatINR(Number(price)) : "Free"})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
