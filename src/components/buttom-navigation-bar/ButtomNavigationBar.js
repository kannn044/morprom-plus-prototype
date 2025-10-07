import React from "react";

const BottomNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none z-40">
      <div className="max-w-md w-full flex items-center justify-between gap-3 pointer-events-auto mx-8 px-4">
        <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 flex items-center justify-around shadow-2xl flex-1 h-16">
          {/* ปุ่ม หน้าแรก */}
          <button
            onClick={() => onTabChange("home")}
            className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
          >
            <div
              className={`absolute inset-0 -mx-4 -my-1 rounded-full transition-all ${
                activeTab === "home" ? "bg-white/30 backdrop-blur-md" : ""
              }`}
            ></div>
            <div className="relative z-10 flex flex-col items-center">
              <svg
                className={`w-6 h-6 ${
                  activeTab === "home" ? "text-emerald-600" : "text-gray-600"
                }`}
                fill={activeTab === "home" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={activeTab === "home" ? "0" : "2"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              <span
                className={`text-xs mt-1 block ${
                  activeTab === "home"
                    ? "text-emerald-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                หน้าแรก
              </span>
            </div>
          </button>

          {/* ปุ่ม บริการ */}
          <button
            onClick={() => onTabChange("service")}
            className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
          >
            <div
              className={`absolute inset-0 -mx-4 -my-1 rounded-full transition-all ${
                activeTab === "service" ? "bg-white/30 backdrop-blur-md" : ""
              }`}
            ></div>
            <div className="relative z-10 flex flex-col items-center">
              <svg
                className={`w-6 h-6 ${
                  activeTab === "service" ? "text-emerald-600" : "text-gray-600"
                }`}
                fill={activeTab === "service" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={activeTab === "service" ? "0" : "2"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              <span
                className={`text-xs mt-1 block ${
                  activeTab === "service"
                    ? "text-emerald-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                บริการ
              </span>
            </div>
          </button>

          {/* ปุ่ม สแกน */}
          <button
            onClick={() => onTabChange("qr")}
            className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
          >
            <div
              className={`absolute inset-0 -mx-4 -my-1 rounded-full transition-all ${
                activeTab === "qr" ? "bg-white/30 backdrop-blur-md" : ""
              }`}
            ></div>
            <div className="relative z-10 flex flex-col items-center">
              <svg
                className={`w-6 h-6 ${
                  activeTab === "qr" ? "text-emerald-600" : "text-gray-600"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                ></path>
              </svg>
              <span
                className={`text-xs mt-1 block ${
                  activeTab === "qr"
                    ? "text-emerald-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                สแกน
              </span>
            </div>
          </button>

          {/* ปุ่ม ข่าว */}
          <button
            onClick={() => onTabChange("news")}
            className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
          >
            <div
              className={`absolute inset-0 -mx-4 -my-1 rounded-full transition-all ${
                activeTab === "news" ? "bg-white/30 backdrop-blur-md" : ""
              }`}
            ></div>
            <div className="relative z-10 flex flex-col items-center">
              <svg
                className={`w-6 h-6 ${
                  activeTab === "news" ? "text-emerald-600" : "text-gray-600"
                }`}
                fill={activeTab === "news" ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={activeTab === "news" ? "0" : "2"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                ></path>
              </svg>
              <span
                className={`text-xs mt-1 block ${
                  activeTab === "news"
                    ? "text-emerald-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                ข่าว
              </span>
            </div>
          </button>
        </div>

        {/* ปุ่มค้นหา */}
        <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full w-16 h-16 shadow-2xl hover:bg-white/30 transition-all flex-shrink-0 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
