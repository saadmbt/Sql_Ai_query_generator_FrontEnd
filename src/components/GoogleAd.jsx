import React, { useEffect } from "react";
export default function GoogleAd({ slot, style, format = "auto", responsive = "true" }) {
  useEffect(() => {
    if (window.adsbygoogle && process.env.NODE_ENV === "production") {
      try {
        window.adsbygoogle.push({});
      } catch (e) {}
    }
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    ></ins>
  );
}