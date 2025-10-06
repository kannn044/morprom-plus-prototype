import React from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import DocMeet from "./docmeet";
import ChatAI from "./chatai";
import Telemed from "./telemed";
import DocMeetDetail from "./docmeet_detail";

// Service item data
const miniApps = [
  {
    id: "epayment",
    label: "ePayment",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/epayment.png",
  },
  {
    id: "moph-refer",
    label: "Moph Refer",
    badge: "Official",
    badgeColor: "green",
    image: "/img/mophrefer.jpeg",
  },
  {
    id: "son-buddy",
    label: "สอน.บัดดี้",
    badge: "Official",
    badgeColor: "green",
    image: "/img/son.jpeg",
  },
  {
    id: "mor-prom",
    label: "หมอพร้อม Station",
    badge: "Official",
    badgeColor: "green",
    image: "/img/morprom.png",
  },
  {
    id: "pink-blue",
    label: "สมุดสีชมพู",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
  },
  {
    id: "yellow-book",
    label: "สมุดสีเหลือง",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
  },
  {
    id: "blue-book",
    label: "สมุดสีฟ้า",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
  },
];

const officialServices = [
  {
    id: "ai-chatbot",
    label: "นัดพบแพทย์",
    gradient: "from-emerald-400 via-teal-300 to-white",
    image: "/img/appointment.png",
    route: "/docmeet",
  },
  {
    id: "mental-health",
    label: "ตอบปัญหาสุขภาพด้วย Ai",
    gradient: "from-emerald-400 via-teal-300 to-white",
    image: "/img/gpt.png",
    route: "/chatai",
  },
  {
    id: "health-tips",
    label: "ปรึกษาแพทย์ทางไกล",
    gradient: "from-emerald-400 via-teal-300 to-white",
    image: "/img/telemed.png",
    route: "/telemed",
  },
];

const appLinks = [
  {
    id: "covid-tracker",
    label: "สิทธิ 30 บาท (สปสช.)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/30.webp",
  },
  {
    id: "emergency-ems",
    label: "ระบบแจ้งเหตุฉุกเฉิน EMS 1669",
    badge: "Official",
    badgeColor: "green",
    image: "/img/ems.png",
  },
  {
    id: "thai-health",
    label: "Thai Health (สร้างสุข/สสส.)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/sss.png",
  },
  {
    id: "khunlook",
    label: "KhunLook (คุณลูก)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/khunlook.png",
  },
  {
    id: "ya-and-you",
    label: "ยาและคุณ (Ya&You)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/ya.png",
  },
  {
    id: "gis-health",
    label: "ค้นหาโรงพยาบาล (GIS Health)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/gis.png",
  },
  {
    id: "phonphai",
    label: "PhonPhai (พ้นภัย)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/phonphai.png",
  },
  {
    id: "thai-first-aid",
    label: "Thai First Aid",
    badge: "Official",
    badgeColor: "green",
    image: "/img/thaif.png",
  },
];

// Icon components
const SearchIcon = () => (
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Login Modal Component
const LoginModal = ({ onClose, onLogin }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
        เข้าสู่ระบบ
      </h3>
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        เลือกวิธีการเข้าสู่ระบบ
      </p>
      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={() => onLogin("ThaiD")}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition"
        >
          เข้าสู่ระบบด้วย ThaiD
        </button>
        <button
          onClick={() => onLogin("HealthID")}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-emerald-600 hover:to-emerald-700 transition"
        >
          เข้าสู่ระบบด้วย HealthID
        </button>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"
      >
        ยกเลิก
      </button>
    </div>
  </div>
);

// Success Modal Component
const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <div className="text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          เข้าสู่ระบบเสร็จสิ้น
        </h3>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-emerald-500 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-emerald-600 transition"
      >
        ตกลง
      </button>
    </div>
  </div>
);

// User Menu Component
const UserMenu = ({ onLogout, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <div className="text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
          ส
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          สมหมาย ทองสุก
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">บัญชีผู้ใช้</p>
      </div>
      <div className="space-y-2">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-red-600 transition"
        >
          ออกจากระบบ
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"
        >
          ปิด
        </button>
      </div>
    </div>
  </div>
);

function AppContent() {
  const navigate = useNavigate();
  const [showAllAppLinks, setShowAllAppLinks] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("home");

  const handleOfficialServiceClick = (service) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      if (service.route) {
        navigate(service.route);
      } else {
        console.log("Accessing service:", service.label);
      }
    }
  };

  const handleLogin = (method) => {
    console.log("Logging in with:", method);
    const userData = {
      method: method,
      username: "สมหมาย ทองสุก",
      loginTime: new Date().toISOString(),
    };

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userData", JSON.stringify(userData));

    setShowLoginModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setShowSuccessModal(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");
  };

  const handleUserClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(true);
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="min-h-screen bg-white">
        <div className="max-w-md mx-auto min-h-screen shadow-2xl">
          {/* Top gradient section */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 pb-8 relative">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 relative z-10">
              {/* Header */}
              <header className="flex items-center justify-between">
                {/* Left side - Profile */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div
                    onClick={handleUserClick}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 text-lg sm:text-xl font-bold cursor-pointer shadow-md"
                  >
                    {isLoggedIn ? "ส" : "?"}
                  </div>
                  <div onClick={handleUserClick} className="cursor-pointer">
                    <p className="text-white text-xs sm:text-sm font-medium">
                      {isLoggedIn ? "สวัสดี" : "ยินดีต้อนรับ"}
                    </p>
                    {isLoggedIn ? (
                      <p className="text-white text-sm sm:text-base font-bold">
                        สมหมาย ทองสุก
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
                  {/* Bell Icon */}
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
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      ></path>
                    </svg>
                  </button>

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

              <main className="space-y-4 sm:space-y-5">
                {/* Official Services - 3 cards */}
                <section className="-mx-3 sm:-mx-4 md:-mx-6">
                  <div className="flex px-3 sm:px-4 md:px-6">
                    {officialServices.map((link, index) => (
                      <div
                        key={link.id}
                        onClick={() => handleOfficialServiceClick(link)}
                        className={`flex-1 cursor-pointer transition-transform hover:scale-105 ${
                          index === 0 ? "" : "ml-2 sm:ml-3"
                        }`}
                      >
                        <div
                          className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-3 sm:p-4 flex items-center justify-center shadow-lg aspect-square mb-2`}
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                            <img
                              src={process.env.PUBLIC_URL + link.image}
                              alt={link.label}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                        <span className="font-bold text-xs sm:text-sm leading-tight text-center text-white block px-1">
                          {link.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Banner/Promotion Section */}
              </main>
            </div>
          </div>

          {/* Bottom white section */}
          <div className="bg-white">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
              {/* Mini Apps - บริการแนะนำ */}
              <section>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">
                    บริการแนะนำ
                  </h2>
                  <button className="text-emerald-600 text-sm font-medium flex items-center">
                    ดูทั้งหมด
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="-mx-3 sm:-mx-4 md:-mx-6">
                  <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 hide-scrollbar pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
                    {miniApps.map((app) => (
                      <div
                        key={app.id}
                        className="flex-shrink-0 bg-white rounded-2xl shadow-md p-4 w-32 cursor-pointer hover:shadow-lg transition"
                      >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center aspect-square mb-2 overflow-hidden">
                          <img
                            src={process.env.PUBLIC_URL + app.image}
                            alt={app.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-800 text-center leading-tight">
                          {app.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* App Links - แนะนำสำหรับคุณ */}
              <section>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">
                    แนะนำสำหรับคุณ
                  </h2>
                  <button
                    onClick={() => setShowAllAppLinks(!showAllAppLinks)}
                    className="text-emerald-600 text-sm font-medium flex items-center"
                  >
                    ดูทั้งหมด
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                </div>
                {!showAllAppLinks ? (
                  <div className="-mx-3 sm:-mx-4 md:-mx-6">
                    <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 hide-scrollbar pl-3 sm:pl-4 md:pl-6 pr-3 sm:pr-4 md:pr-6">
                      {appLinks.slice(0, 4).map((service) => (
                        <div
                          key={service.id}
                          className="flex-shrink-0 bg-white rounded-2xl shadow-md p-4 w-32 cursor-pointer hover:shadow-lg transition"
                        >
                          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center aspect-square mb-2 overflow-hidden">
                            <img
                              src={process.env.PUBLIC_URL + service.image}
                              alt={service.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                          <p className="text-xs font-medium text-gray-800 text-center leading-tight">
                            {service.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {appLinks.map((service) => (
                      <div
                        key={service.id}
                        className="bg-white rounded-2xl shadow-md p-3 cursor-pointer hover:shadow-lg transition"
                      >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center aspect-square mb-2 overflow-hidden">
                          <img
                            src={process.env.PUBLIC_URL + service.image}
                            alt={service.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <p className="text-[10px] font-medium text-gray-800 text-center leading-tight">
                          {service.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>

          {/* Health Information Card */}
          {isLoggedIn && (
            <section className="px-3 sm:px-4 md:px-6 pb-20">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h2 className="text-base sm:text-lg font-bold text-gray-800">
                  ข้อมูลสุขภาพของคุณ
                </h2>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-5 shadow-md border border-emerald-100">
                <div className="flex items-center mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md">
                    ส
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-bold text-gray-800">
                      สมหมาย ทองสุก
                    </h3>
                    <p className="text-sm text-gray-600">อายุ 35 ปี</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-blue-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                        ></path>
                      </svg>
                      <p className="text-xs text-gray-500">ส่วนสูง</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      170 <span className="text-sm font-normal">cm</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-orange-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        ></path>
                      </svg>
                      <p className="text-xs text-gray-500">น้ำหนัก</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      68 <span className="text-sm font-normal">kg</span>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-emerald-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                      </svg>
                      <p className="text-xs text-gray-500">BMI</p>
                    </div>
                    <p className="text-lg font-bold text-emerald-600">
                      23.5{" "}
                      <span className="text-xs font-normal text-gray-600">
                        ปกติ
                      </span>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-red-500 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        ></path>
                      </svg>
                      <p className="text-xs text-gray-500">ความดันโลหิต</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      120<span className="text-sm font-normal">/80</span>
                    </p>
                  </div>
                </div>

                {/* Blood Pressure Chart */}
                <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-red-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        ></path>
                      </svg>
                      <h4 className="text-sm font-bold text-gray-800">
                        กราฟความดันโลหิต
                      </h4>
                    </div>
                    <span className="text-xs text-gray-500">7 วันล่าสุด</span>
                  </div>

                  <div className="flex items-end justify-between h-32 gap-2">
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "65%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "55%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">จ</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "70%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "58%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">อ</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "62%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "52%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">พ</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "68%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "56%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">พฤ</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "64%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "54%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">ศ</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-400 to-red-300 rounded-t-lg mb-1"
                        style={{ height: "66%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg mb-1"
                        style={{ height: "55%" }}
                      ></div>
                      <span className="text-[10px] text-gray-500 mt-1">ส</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-end">
                      <div
                        className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg mb-1 shadow-md"
                        style={{ height: "72%" }}
                      ></div>
                      <div
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg mb-1 shadow-md"
                        style={{ height: "60%" }}
                      ></div>
                      <span className="text-[10px] text-gray-700 font-medium mt-1">
                        อา
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-500 rounded mr-1"></div>
                      <span className="text-xs text-gray-600">
                        Systolic (บน)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-500 rounded mr-1"></div>
                      <span className="text-xs text-gray-600">
                        Diastolic (ล่าง)
                      </span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-2.5 rounded-xl text-sm font-medium hover:from-emerald-600 hover:to-teal-700 transition shadow-md">
                  ดูข้อมูลสุขภาพทั้งหมด
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none z-40">
        <div className="max-w-md w-full flex items-stretch justify-between gap-3 pointer-events-auto mx-8 px-4">
          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 flex items-center justify-around shadow-2xl flex-1">
            <button
              onClick={() => setActiveTab("home")}
              className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
            >
              <div
                className={`absolute inset-0 -mx-4 -my-2 rounded-full transition-all ${
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

            <button
              onClick={() => setActiveTab("service")}
              className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
            >
              <div
                className={`absolute inset-0 -mx-4 -my-2 rounded-full transition-all ${
                  activeTab === "service" ? "bg-white/30 backdrop-blur-md" : ""
                }`}
              ></div>
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  className={`w-6 h-6 ${
                    activeTab === "service"
                      ? "text-emerald-600"
                      : "text-gray-600"
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

            <button
              onClick={() => setActiveTab("qr")}
              className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
            >
              <div
                className={`absolute inset-0 -mx-4 -my-2 rounded-full transition-all ${
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

            <button
              onClick={() => setActiveTab("news")}
              className="relative flex flex-col items-center justify-center transition-all min-w-[60px]"
            >
              <div
                className={`absolute inset-0 -mx-4 -my-2 rounded-full transition-all ${
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

          <button className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-full px-4 shadow-2xl hover:bg-white/30 transition-all flex-shrink-0 flex items-center justify-center">
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

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          onClose={() => {
            setShowSuccessModal(false);
            setIsLoggedIn(true);
          }}
        />
      )}

      {showUserMenu && (
        <UserMenu
          onLogout={handleLogout}
          onClose={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/docmeet" element={<DocMeet />} />
        <Route path="/hospital/:hospcode" element={<DocMeetDetail />} />
        <Route path="/chatai" element={<ChatAI />} />
        <Route path="/telemed" element={<Telemed />} />
      </Routes>
    </BrowserRouter>
  );
}
