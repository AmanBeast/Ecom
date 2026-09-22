"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { ProductItem } from "@/lib/data/mockData";
import { formatINR } from "@/lib/utils";

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const {
    toggleFavorite,
    isFavorite,
    openCheckoutModal,
    openAddProductModal,
    isSeller,
    openBecomeSellerModal,
    openLocationModal,
    currentLocation,
  } = useApp();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [selectedCondition, setSelectedCondition] = useState("ALL");
  const [sortOrder, setSortOrder] = useState<string>("latest");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedCondition, sortOrder]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("query", searchQuery);
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (selectedCondition !== "ALL") params.set("condition", selectedCondition);
      if (sortOrder !== "latest") params.set("sort", sortOrder);

      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: "all", label: "All Gear", icon: "devices" },
    { id: "laptops", label: "Laptops", icon: "laptop_mac" },
    { id: "phones", label: "Phones", icon: "smartphone" },
    { id: "tablets", label: "Tablets", icon: "tablet_mac" },
    { id: "monitors", label: "Monitors", icon: "desktop_windows" },
    { id: "accessories", label: "Accessories", icon: "keyboard" },
    { id: "audio", label: "Audio", icon: "headphones" },
    { id: "gaming", label: "Gaming", icon: "sports_esports" },
  ];

  const conditions = [
    { id: "ALL", label: "Any Condition" },
    { id: "LIKE_NEW", label: "Like New (Pristine)" },
    { id: "GOOD", label: "Good" },
    { id: "FAIR", label: "Fair" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-on-surface font-semibold">Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
            Certified Tech Exchange
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Peer-to-peer used tech verified by Nexus diagnostics and safeguarded by 48h escrow protection.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={openLocationModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-xs font-semibold text-on-surface shadow-xs hover:border-primary transition-all"
            title="Change Location"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
            <span className="max-w-[120px] truncate">{currentLocation}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (isSeller) {
                openAddProductModal();
              } else {
                openBecomeSellerModal();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">sell</span>
            <span>+ Sell Your Tech</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchProducts();
          }}
          className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-2 border border-outline-variant/40 focus-within:border-primary"
        >
          <span className="material-symbols-outlined text-[20px] text-outline">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Apple M1, ThinkPad, 4K monitors, mechanical keyboards..."
            className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container"
          >
            Search
          </button>
        </form>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-on-primary shadow-xs"
                  : "bg-surface-container text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Condition Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant/20 pt-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-xs font-semibold text-outline mr-1">Condition:</span>
            {conditions.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCondition(c.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  selectedCondition === c.id
                    ? "bg-secondary-container text-on-secondary-container font-bold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs font-semibold text-outline">Sort:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-surface-container text-on-surface text-xs font-semibold rounded-lg px-2.5 py-1 border border-outline-variant/30 focus:outline-none"
            >
              <option value="latest">Latest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated Seller</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product count */}
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-semibold text-on-surface">
          Showing {products.length} verified listings
        </span>
        <span className="text-xs text-secondary font-semibold flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          Escrow payment protected
        </span>
      </div>

      {/* Products Grid */}
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
      ) : products.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-3xl p-12 text-center flex flex-col items-center gap-3 border border-outline-variant/30">
          <span className="material-symbols-outlined text-[48px] text-outline">devices</span>
          <h3 className="text-lg font-bold text-on-surface">No electronics found</h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-sm">
            Try adjusting your search keywords or select "All Gear" to view all certified electronics.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("all");
              setSelectedCondition("ALL");
              setSearchQuery("");
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group border border-outline-variant/30"
            >
              {/* Product Image */}
              <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                <Link href={`/marketplace/${prod.id}`}>
                  <img
                    src={prod.images[0]}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {prod.dealTag && (
                  <div className="absolute top-2.5 left-2.5 bg-secondary text-on-secondary px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                    {prod.dealTag}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => toggleFavorite(prod.id, prod.title)}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-on-surface-variant hover:text-error transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={isFavorite(prod.id) ? { color: "#ba1a1a", fontVariationSettings: "'FILL' 1" } : {}}
                  >
                    favorite
                  </span>
                </button>

                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-on-surface shadow-xs">
                  <span className="material-symbols-outlined text-[13px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span>{prod.conditionScore}</span>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-lg font-extrabold text-on-surface">
                      {formatINR(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-outline line-through">
                        {formatINR(prod.originalPrice)}
                      </span>
                    )}
                  </div>

                  <Link href={`/marketplace/${prod.id}`}>
                    <h3 className="text-sm font-bold text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
                      {prod.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5 mb-2">
                    {prod.location}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] text-secondary font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                      Free Insured Ship
                    </span>
                  </div>
                </div>

                <div className="border-t border-outline-variant/30 pt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                    <span>Seller:</span>
                    <span className="font-semibold text-on-surface">{prod.seller.name}</span>
                    <span className="text-secondary font-bold">★ {prod.seller.rating}</span>
                  </div>

                  <Link
                    href={`/marketplace/${prod.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors"
                  >
                    Details
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

export default function MarketplacePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-on-surface-variant">Loading marketplace catalogue...</p>
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}
