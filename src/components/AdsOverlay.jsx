import React from 'react';
export default function AdsOverlay({ adTimer, onDone }) {
  // Overlay that blocks interaction and simulates ad watching
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center max-w-xs w-full">
        <h2 className="text-xl font-bold mb-2 text-indigo-700">Sponsored Ad</h2>
        <p className="mb-4 text-gray-700 text-center">Please watch this ad to unlock SQL query generation.</p>
        <div className="w-24 h-24 flex items-center justify-center mb-4">
          <svg className="animate-spin h-12 w-12 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
        </div>
        <p className="text-lg font-semibold text-indigo-600">Ad ends in {adTimer} second{adTimer !== 1 ? 's' : ''}...</p>
      </div>
    </div>
  );
}