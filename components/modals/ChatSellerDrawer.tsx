"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/context/AppContext";

export function ChatSellerDrawer() {
  const { activeChat, closeChat, sendChatMessage } = useApp();
  const [inputText, setInputText] = useState("");

  if (!activeChat) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText("");
  };

  const quickReplies = [
    "Is the price negotiable?",
    "Can you share battery health report?",
    "Is same-day pickup available?",
    "Does it include original bill & box?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-inverse-surface/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-outline-variant/30 flex items-center justify-between bg-surface/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChat.participantAvatar}
                alt={activeChat.participantName}
                className="w-10 h-10 rounded-full object-cover shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full ring-2 ring-surface-container-lowest" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-sm text-on-surface">
                  {activeChat.participantName}
                </h3>
                <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant line-clamp-1">
                {activeChat.productTitle || "Nexus Verified Seller"}
              </p>
            </div>
          </div>

          <button
            onClick={closeChat}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Safety Warning */}
        <div className="bg-primary/5 border-b border-primary/10 px-4 py-2 flex items-center gap-2 text-xs text-primary">
          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">shield</span>
          <span>Nexus Secure Chat: Phone numbers & outside links are blocked for your safety.</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface/50">
          {activeChat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.isSelf ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.isSelf
                    ? "bg-primary text-on-primary rounded-br-xs shadow-xs"
                    : "bg-surface-container text-on-surface rounded-bl-xs shadow-xs"
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-outline mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div className="px-3 pt-2 pb-1 flex gap-1.5 overflow-x-auto scrollbar-none border-t border-outline-variant/20 bg-surface-container-lowest">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendChatMessage(reply)}
              className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors border border-outline-variant/30"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-3 bg-surface-container-lowest border-t border-outline-variant/30 pb-safe">
          <div className="flex items-center gap-2 bg-surface-container-low rounded-xl px-3 py-1.5 border border-outline-variant/40 focus-within:border-primary">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Message seller securely..."
              className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
          <p className="text-[10px] text-center text-outline mt-1.5">
            Encrypted by Nexus Messenger • Zero phone numbers revealed
          </p>
        </form>
      </div>
    </div>
  );
}
