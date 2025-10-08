import React from 'react';
import { ChevronLeft } from 'lucide-react';

export default function TopNavigationBarBasic({ title = 'หน้าหลัก', onBack, showBack = true }) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-green-600 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Back Button - iOS Style */}
        {showBack && (
          <button
            onClick={handleBack}
            className="text-white hover:opacity-70 transition-opacity duration-200 flex items-center gap-1 -ml-2"
            aria-label="Go back"
          >
            <ChevronLeft size={28} strokeWidth={2.5} />
            <span className="text-base font-normal">Back</span>
          </button>
        )}

        {/* Title */}
        <h1 className="flex-1 text-white text-lg font-semibold text-center">
          {title}
        </h1>
        
        {/* Spacer for balance */}
        {showBack && <div className="w-20"></div>}
      </div>
    </nav>
  );
}