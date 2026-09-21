import React from "react";
import Link from "next/link";

interface NexusLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function NexusLogo({ className = "", size = "md" }: NexusLogoProps) {
  const height = size === "sm" ? 32 : size === "lg" ? 44 : 38;

  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <svg
        viewBox="0 0 160 44"
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto"
      >
        <rect width="40" height="40" y="2" rx="10" fill="#4F46E5" />
        <path
          d="M14 28V16L26 28V16"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="14" r="3" fill="#10B981" />
        <text
          x="48"
          y="26"
          fill="#18181B"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="19"
          fontWeight="700"
          letterSpacing="-0.03em"
        >
          Nexus
        </text>
        <text
          x="48"
          y="37"
          fill="#71717A"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="9.5"
          fontWeight="600"
          letterSpacing="0.08em"
        >
          WORK &amp; GEAR
        </text>
      </svg>
    </Link>
  );
}
