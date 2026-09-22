"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/context/AppContext";
import { formatINR } from "@/lib/utils";

export function EscrowCheckoutModal() {
  const router = useRouter();
  const { activeCheckoutProduct, closeCheckoutModal, showToast, refreshOrders } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!activeCheckoutProduct) return null;

  const product = activeCheckoutProduct;
  const deliveryFee = 0; // Free delivery
  const escrowFee = 0; // Waived
  const totalAmount = product.price + deliveryFee + escrowFee;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshOrders();
        closeCheckoutModal();
        showToast("Payment placed in Nexus Escrow! Tracking generated.", "success");
        router.push("/orders");
      } else {
        showToast(data.error || "Order failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Order failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest dark:bg-[#181720] text-on-surface dark:text-[#f3f0f4] rounded-3xl p-5 sm:p-6 shadow-2xl border border-outline-variant/30 dark:border-[#2e2b3d] flex flex-col gap-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/30 dark:border-[#2e2b3d] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">lock</span>
            </div>
            <div>
              <h3 className="font-semibold text-base text-on-surface dark:text-white">Nexus Escrow Checkout</h3>
              <p className="text-xs text-secondary font-medium">100% Protected Transaction</p>
            </div>
          </div>
          <button
            onClick={closeCheckoutModal}
            className="w-8 h-8 rounded-full bg-surface-container dark:bg-[#252330] flex items-center justify-center text-on-surface-variant dark:text-[#9e9aa8] hover:text-on-surface dark:hover:text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Product Snapshot */}
        <div className="p-3 bg-surface-container-low dark:bg-[#22202c] rounded-2xl flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-16 h-16 rounded-xl object-cover bg-surface-container shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-on-surface dark:text-white truncate">{product.title}</h4>
            <p className="text-xs text-on-surface-variant dark:text-[#9e9aa8]">{product.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-bold text-sm text-primary">{formatINR(product.price)}</span>
              <span className="text-[11px] text-secondary font-semibold">
                {product.conditionScore}
              </span>
            </div>
          </div>
        </div>

        {/* Escrow Guarantee Box */}
        <div className="p-3.5 bg-gradient-to-br from-secondary/10 to-surface-container-low dark:to-[#22202c] rounded-2xl border border-secondary/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
            <span>How Escrow Protects You</span>
          </div>
          <p className="text-xs text-on-surface-variant dark:text-[#9e9aa8] leading-relaxed">
            Your money stays locked in the official Nexus vault. The seller only receives payment after you inspect and accept the device during your 48-hour testing window.
          </p>
        </div>

        {/* Payment Method Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-on-surface dark:text-white">Select Mock Payment Method</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("upi")}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                paymentMethod === "upi"
                  ? "border-primary bg-primary/10 text-primary dark:text-[#818cf8] font-semibold"
                  : "border-outline-variant/40 dark:border-[#353245] bg-surface-container-low dark:bg-[#22202c] hover:bg-surface-container text-on-surface-variant dark:text-[#9e9aa8]"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
              <span className="text-xs">UPI / GPay</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                paymentMethod === "card"
                  ? "border-primary bg-primary/10 text-primary dark:text-[#818cf8] font-semibold"
                  : "border-outline-variant/40 dark:border-[#353245] bg-surface-container-low dark:bg-[#22202c] hover:bg-surface-container text-on-surface-variant dark:text-[#9e9aa8]"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">credit_card</span>
              <span className="text-xs">Debit / Card</span>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod("netbanking")}
              className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                paymentMethod === "netbanking"
                  ? "border-primary bg-primary/10 text-primary dark:text-[#818cf8] font-semibold"
                  : "border-outline-variant/40 dark:border-[#353245] bg-surface-container-low dark:bg-[#22202c] hover:bg-surface-container text-on-surface-variant dark:text-[#9e9aa8]"
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
              <span className="text-xs">Net Banking</span>
            </button>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="bg-surface-container-low dark:bg-[#22202c] p-3.5 rounded-2xl space-y-2 text-xs border border-outline-variant/30 dark:border-[#353245]">
          <div className="flex justify-between text-on-surface-variant dark:text-[#9e9aa8]">
            <span>Device price</span>
            <span className="font-semibold text-on-surface dark:text-white">{formatINR(product.price)}</span>
          </div>
          <div className="flex justify-between text-on-surface-variant dark:text-[#9e9aa8]">
            <span>Insured shipping</span>
            <span className="text-secondary font-semibold">FREE (Nexus Promo)</span>
          </div>
          <div className="flex justify-between text-on-surface-variant dark:text-[#9e9aa8]">
            <span>Escrow protection fee</span>
            <span className="text-secondary font-semibold">₹0 (Waived)</span>
          </div>
          <div className="h-px bg-outline-variant/30 dark:bg-[#353245] my-1" />
          <div className="flex justify-between items-center text-sm font-bold text-on-surface dark:text-white">
            <span>Total Escrow Deposit</span>
            <span className="text-primary font-extrabold text-base">{formatINR(totalAmount)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          type="button"
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-semibold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <span>Securing Escrow Funds...</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Deposit {formatINR(totalAmount)} &amp; Place Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
