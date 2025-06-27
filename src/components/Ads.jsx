import React, { useState, useEffect } from "react";
import GoogleAd from "./GoogleAd";
export default function Ads({ position }) {
  // Real ad integration for each position
  const adSlots = {
    top: import.meta.env.VITE_ADSENSE_SLOT_TOP,
    bottom: import.meta.env.VITE_ADSENSE_SLOT_BOTTOM,
    left: import.meta.env.VITE_ADSENSE_SLOT_LEFT,
    right: import.meta.env.VITE_ADSENSE_SLOT_RIGHT,
  };
  const baseClasses = "fixed bg-gray-200 text-center p-2 text-sm text-gray-700 z-40 flex items-center justify-center";
  const positionClasses = {
    top: "top-0 left-0 right-0 h-12",
    bottom: "bottom-0 left-0 right-0 h-12",
    left: "top-0 bottom-0 left-0 w-12 flex flex-col justify-center items-center",
    right: "top-0 bottom-0 right-0 w-12 flex flex-col justify-center items-center",
  };
  // Ad style for horizontal/vertical
  const adStyle =
    position === "top" || position === "bottom"
      ? { display: "block", width: "100%", height: 48 }
      : { display: "block", width: 48, height: "100%" };
  return (
    <aside className={`${baseClasses} ${positionClasses[position]}`} aria-label="Advertisement">
      <GoogleAd slot={adSlots[position]} style={adStyle} />
    </aside>
  );
}