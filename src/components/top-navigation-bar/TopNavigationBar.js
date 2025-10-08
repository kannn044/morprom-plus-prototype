import React from "react";
import { Link } from "react-router-dom";
import { user } from "../../globals";

const TopNavigationBar = ({ 
  isLoggedIn, 
  isScrolled, 
  onUserClick, 
  onLogout 
}) => {

  const handleBellClick = () => {
    const dummyNotifications = [
      { header: 'นัดหมายใหม่', content: 'คุณมีนัดหมายกับ นพ. สมชาย เวลา 10:00 น.' },
      { header: 'ผลตรวจสุขภาพ', content: 'ผลตรวจสุขภาพของคุณพร้อมให้ดูแล้ว' },
    ];
    sessionStorage.setItem('notifications', JSON.stringify(dummyNotifications));
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-gradient-to-r from-teal-600 to-green-600 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="p-3 sm:p-4 md:p-6 relative">
        <header className="flex items-center justify-between">
          {/* Left side - Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div
              onClick={onUserClick}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 text-lg sm:text-xl font-bold cursor-pointer shadow-md overflow-hidden"
            >
              {isLoggedIn ? (
                <img
                  src={process.env.PUBLIC_URL + user.picture}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              )}
            </div>
            <div onClick={onUserClick} className="cursor-pointer">
              <p className="text-white text-xs sm:text-sm font-medium">
                {isLoggedIn ? "สวัสดี" : "ยินดีต้อนรับ"}
              </p>
              {isLoggedIn ? (
                <p className="text-white text-sm sm:text-base font-bold">
                  {user.name}
                </p>
              ) : (
                <button className="text-white text-sm sm:text-base font-bold hover:text-white/80 transition">
                  เข้าสู่ระบบ
                </button>
              )}
            </div>
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isLoggedIn && (
              <button
                onClick={onLogout}
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>
            )}

            {/* Bell Icon */}
            <Link to="/app/notification" onClick={handleBellClick} className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
            </Link>

            {/* Settings Icon */}
            <button className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center hover:bg-white/30 transition">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
};

export default TopNavigationBar;