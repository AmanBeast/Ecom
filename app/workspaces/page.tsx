"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useApp } from "@/lib/context/AppContext";
import { WorkspaceItem } from "@/lib/data/mockData";
import { formatINR } from "@/lib/utils";

export default function WorkspacesPage() {
  const { toggleFavorite, isFavorite, openBookingModal } = useApp();
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("ALL");
  const [maxPrice, setMaxPrice] = useState(2500);

  useEffect(() => {
    fetchWorkspaces();
  }, [selectedCity, selectedType, maxPrice]);

  const fetchWorkspaces = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("query", searchQuery);
      if (selectedCity !== "All") params.set("city", selectedCity);
      if (selectedType !== "ALL") params.set("type", selectedType);
      if (maxPrice < 2500) params.set("maxPrice", String(maxPrice));

      const res = await fetch(`/api/workspaces?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setWorkspaces(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const cities = ["All", "Chandigarh", "Bangalore", "Mumbai", "Gurugram", "Hyderabad", "Pune", "New Delhi"];
  const spaceTypes = [
    { id: "ALL", label: "All Spaces" },
    { id: "DESK", label: "Hot Desks" },
    { id: "POD", label: "Focus Pods" },
    { id: "ROOM", label: "Meeting Rooms" },
    { id: "STUDIO", label: "Studios" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <span className="text-on-surface font-semibold">Workspaces</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
          Find Workspaces &amp; Desks
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
          Instant booking, verified fiber Wi-Fi, ergonomic chairs, and transparent daily pricing.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWorkspaces();
          }}
          className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/40 focus-within:border-primary"
        >
          <span className="material-symbols-outlined text-[20px] text-outline">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by neighborhood, building or landmark..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container"
          >
            Search
          </button>
        </form>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-outline shrink-0">City:</span>
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCity === city
                  ? "bg-primary text-on-primary shadow-xs"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Space Type Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-t border-outline-variant/20 pt-2.5">
          <span className="text-xs font-semibold text-outline shrink-0">Type:</span>
          {spaceTypes.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedType(t.id)}
              className={`shrink-0 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                selectedType === t.id
                  ? "bg-secondary-container text-on-secondary-container font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-on-surface">
          Showing {workspaces.length} spaces available
        </span>
        <span className="text-xs text-secondary font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          Verified hosts • Instant check-in pass
        </span>
      </div>

      {/* Grid of Workspaces */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="bg-surface-container-lowest rounded-2xl p-4 h-72 animate-pulse border border-outline-variant/30 flex flex-col gap-3"
            >
              <div className="h-40 bg-surface-container rounded-xl w-full" />
              <div className="h-4 bg-surface-container rounded w-3/4" />
              <div className="h-3 bg-surface-container rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : workspaces.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-3xl p-12 text-center flex flex-col items-center gap-3 border border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-outline">desk</span>
          <h3 className="text-lg font-bold text-on-surface">No workspaces found</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
            Try adjusting your search filters or select "All" cities to view workspaces across Chandigarh, Bangalore, Mumbai, and Delhi.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCity("All");
              setSelectedType("ALL");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {workspaces.map((ws) => (
            <div
              key={ws.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group border border-outline-variant/30"
            >
              {/* Image & Badges */}
              <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                <Link href={`/workspaces/${ws.id}`}>
                  <img
                    src={ws.images[0]}
                    alt={ws.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold text-on-surface shadow-xs">
                  <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                  <span>{ws.type}</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(ws.id, ws.title)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={isFavorite(ws.id) ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>

                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[11px] font-bold text-on-surface shadow-xs">
                  <span className="text-secondary">★ {ws.rating}</span>
                  <span className="text-on-surface-variant font-normal">({ws.reviewCount})</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-lg font-extrabold text-on-surface">
                      {formatINR(ws.dailyPrice)}
                    </span>
                    <span className="text-xs text-on-surface-variant">/ day</span>
                  </div>

                  <Link href={`/workspaces/${ws.id}`}>
                    <h3 className="text-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {ws.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5 mb-3">
                    <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
                    <span className="truncate">{ws.location}</span>
                  </p>

                  {/* Amenities snapshot */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {ws.amenities.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-medium"
                      >
                        <span className="material-symbols-outlined text-[12px] text-primary">{a.icon}</span>
                        <span>{a.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-3 flex items-center justify-between">
                  <span className="text-[11px] text-secondary font-semibold">
                    {ws.availableSpots} spots left
                  </span>
                  <Link
                    href={`/workspaces/${ws.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    View &amp; Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
