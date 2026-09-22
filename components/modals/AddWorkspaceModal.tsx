"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function AddWorkspaceModal() {
  const router = useRouter();
  const {
    isAddWorkspaceModalOpen,
    closeAddWorkspaceModal,
    currentLocation,
    showToast,
    refreshWorkspaces,
  } = useApp();

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"DESK" | "POD" | "ROOM" | "STUDIO">("DESK");
  const [dailyPrice, setDailyPrice] = useState("");
  const [location, setLocation] = useState(currentLocation || "Sector 17, Chandigarh");
  const [city, setCity] = useState("Chandigarh");
  const [availableSpots, setAvailableSpots] = useState("3");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "High-Speed Wi-Fi",
    "Power Backup",
    "Air Conditioning",
    "Ergonomic Chair",
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAddWorkspaceModalOpen) return null;

  const amenityCatalog = [
    { name: "High-Speed Wi-Fi", icon: "wifi", detail: "500 Mbps fiber" },
    { name: "Power Backup", icon: "bolt", detail: "100% uninterrupted generator" },
    { name: "Air Conditioning", icon: "ac_unit", detail: "Climate controlled HVAC" },
    { name: "Gourmet Coffee", icon: "coffee", detail: "Unlimited fresh brew" },
    { name: "Meeting Access", icon: "groups", detail: "1 hr/day included" },
    { name: "Ergonomic Chair", icon: "chair", detail: "Lumbar supported Herman Miller" },
    { name: "24/7 Access", icon: "schedule", detail: "Smart RFID card entry" },
    { name: "Free Parking", icon: "local_parking", detail: "Dedicated basement slot" },
  ];

  const workspaceImagePresets = [
    { label: "Scandinavian Desk", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" },
    { label: "Focus Pod Capsule", url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" },
    { label: "Loft Hot Desk", url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80" },
    { label: "Glass Meeting Suite", url: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80" },
    { label: "Garden Studio", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" },
  ];

  const toggleAmenity = (name: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dailyPrice || !location.trim()) {
      showToast("Please provide title, daily price, and location", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const activeImg = customImageUrl.trim() || selectedImage;
      const formattedAmenities = selectedAmenities.map((name) => {
        const item = amenityCatalog.find((a) => a.name === name);
        return item || { name, icon: "verified", detail: "Included" };
      });

      const res = await fetch("/api/workspaces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          type,
          dailyPrice: Number(dailyPrice),
          location,
          city,
          availableSpots: Number(availableSpots),
          description: description || "Modern agile coworking desk with high-speed fiber internet, ergonomic setup, and warm natural lighting.",
          images: [activeImg],
          amenities: formattedAmenities,
        }),
      });

      const json = await res.json();
      if (json.success) {
        await refreshWorkspaces();
        closeAddWorkspaceModal();
        showToast("Workspace listed successfully!", "success");
        router.push("/workspaces");
      } else {
        showToast(json.error || "Failed to list workspace", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error adding workspace", "error");
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
              <span className="material-symbols-outlined text-[20px]">desk</span>
            </div>
            <div>
              <h3 className="font-bold text-base text-on-surface dark:text-white">List Your Workspace</h3>
              <p className="text-xs text-on-surface-variant dark:text-[#9e9aa8]">
                Host remote professionals, coders &amp; teams with instant digital pass check-in
              </p>
            </div>
          </div>
          <button
            onClick={closeAddWorkspaceModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="sm:col-span-2">
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Workspace Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Minimalist Sunlit Window Desk"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Space Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-2.5 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="DESK">Hot Desk</option>
                <option value="POD">Focus Pod</option>
                <option value="ROOM">Meeting Room</option>
                <option value="STUDIO">Studio</option>
              </select>
            </div>
          </div>

          {/* Pricing, City & Spots */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Daily Price (₹) *
              </label>
              <input
                type="number"
                required
                value={dailyPrice}
                onChange={(e) => setDailyPrice(e.target.value)}
                placeholder="e.g. 499"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white font-bold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Metro City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-2.5 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="Chandigarh">Chandigarh</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurugram">Gurugram</option>
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Noida">Noida</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-on-surface dark:text-white block mb-1">
                Available Desks / Capacity
              </label>
              <input
                type="number"
                value={availableSpots}
                onChange={(e) => setAvailableSpots(e.target.value)}
                placeholder="e.g. 4"
                className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Full Location Address */}
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Address &amp; Landmark *
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Sector 17, Heritage Plaza, Chandigarh"
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          {/* Amenities Multi-Select */}
          <div className="bg-surface-container-low dark:bg-[#22202c] p-3 rounded-2xl border border-outline-variant/30 dark:border-[#353245] space-y-2">
            <span className="font-bold text-on-surface dark:text-white block">Included Amenities ({selectedAmenities.length})</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {amenityCatalog.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity.name);
                return (
                  <button
                    key={amenity.name}
                    type="button"
                    onClick={() => toggleAmenity(amenity.name)}
                    className={`p-2 rounded-xl border flex items-center gap-1.5 text-left transition-all ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-xs font-bold"
                        : "bg-surface-container-lowest dark:bg-[#181720] text-on-surface-variant dark:text-[#9e9aa8] border-outline-variant/30 dark:border-[#353245] hover:border-primary/50"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{amenity.icon}</span>
                    <span className="text-[11px] truncate">{amenity.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Select Preset Workspace Photo or Enter Image URL
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2">
              {workspaceImagePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedImage(preset.url);
                    setCustomImageUrl("");
                  }}
                  className={`h-16 rounded-xl overflow-hidden border transition-all ${
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
              placeholder="Or paste custom workspace photo URL (https://...)"
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-bold text-on-surface dark:text-white block mb-1">
              Workspace Atmosphere &amp; Guidelines
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mention desk dimensions, noise level, lighting, parking specifics..."
              className="w-full bg-surface-container-low dark:bg-[#22202c] border border-outline-variant/40 dark:border-[#353245] rounded-xl px-3 py-2 text-on-surface dark:text-white focus:outline-none focus:border-primary resize-none"
            />
          </div>

          {/* Privacy Note */}
          <div className="p-2.5 rounded-xl bg-surface-container-low dark:bg-[#22202c] flex items-center justify-between text-[11px] text-on-surface-variant dark:text-[#9e9aa8]">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
              Automated Check-in Pass System
            </span>
            <span className="font-bold text-primary">Zero phone number exposure</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Listing Workspace...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">publish</span>
                <span>Publish Workspace ({dailyPrice ? `${formatINR(Number(dailyPrice))}/day` : "Enter Price"})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
