import React from 'react';
import GoogleAd from './GoogleAd';
export default function AdsOverlay({ adTimer, onDone }) {
  // Overlay that blocks interaction and simulates ad watching
  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-md  flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-xs w-full">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Sponsored Ad</h2>
        <p className="mb-4 text-gray-700 text-center">Please watch this ad to unlock SQL query generation.</p>
        <div className="w-34 h-34 flex items-center justify-center mb-4">
          <GoogleAd slot={import.meta.env.VITE_ADSENSE_AdsOverlay} style={{ display: "block" }}/>
        </div>
        <p className="text-lg font-semibold text-indigo-600">Ad ends in {adTimer} second{adTimer !== 1 ? 's' : ''}...</p>
      </div>
    </div>
  );
}