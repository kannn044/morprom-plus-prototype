import React from "react";
import { useNavigate, BrowserRouter, Routes, Route } from "react-router-dom";
import DocMeet from "./docmeet";
import ChatAI from "./chatai";
import Telemed from "./telemed";
import DocMeetDetail from "./docmeet_detail";
import BottomNavigation from "./components/buttom-navigation-bar/ButtomNavigationBar";
import TopNavigationBar from "./components/top-navigation-bar/TopNavigationBar";
import BlankPage from "./components/blank-page/BlankPage";
import HealthInfoCard from "./components/health-information/HealthInformation";
import EmergencyHelp from "./components/emergency-health/EmergencyHealth";
import NotificationPage from './notification';
import { user } from "./globals";

// Service item data
const miniApps = [
  {
    id: "epayment",
    label: "ePayment",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/epayment.png",
    route: "/app/external/blank",
  },
  {
    id: "moph-refer",
    label: "Moph Refer",
    badge: "Official",
    badgeColor: "green",
    image: "/img/mophrefer.jpeg",
    route: "/app/external/blank",
  },
  {
    id: "son-buddy",
    label: "สอน.บัดดี้",
    badge: "Official",
    badgeColor: "green",
    image: "/img/son.jpeg",
    route: "/app/external/blank",
  },
  {
    id: "mor-prom",
    label: "หมอพร้อม Station",
    badge: "Official",
    badgeColor: "green",
    image: "/img/morprom.png",
    route: "/app/external/blank",
  },
  {
    id: "pink-blue",
    label: "สมุดสีชมพู",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
    route: "/app/external/blank",
  },
  {
    id: "yellow-book",
    label: "สมุดสีเหลือง",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
    route: "/app/external/blank",
  },
  {
    id: "blue-book",
    label: "สมุดสีฟ้า",
    badge: "Public",
    badgeColor: "blue",
    image: "/img/book.png",
    route: "/app/external/blank",
  },
];

const officialServices = [
  {
    id: "ai-chatbot",
    label: "นัดพบแพทย์",
    gradient: "from-emerald-400  to-lime-100",
    image: "/img/icon-appointment.png",
    route: "/app/docmeet",
  },
  {
    id: "mental-health",
    label: "ตอบปัญหาสุขภาพด้วย Ai",
    gradient: "from-emerald-400  to-lime-100",
    image: "/img/icon-ai.png",
    route: "/app/chatai",
  },
  {
    id: "health-tips",
    label: "ปรึกษาแพทย์ทางไกล",
    gradient: "from-emerald-400  to-lime-100",
    image: "/img/icon-telemedicine.png",
    route: "/app/telemed",
  },
  {
    id: "health-emergency",
    label: "อุบัติเหตุ\nเจ็บป่วยฉุกเฉิน",
    gradient: "from-emerald-400  to-lime-100",
    image: "/img/icon-emergency.png",
    route: "/app/emergency",
  },
];

const appLinks = [
  {
    id: "covid-tracker",
    label: "สิทธิ 30 บาท (สปสช.)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/30.webp",
    route: "/app/external/blank",
  },
  {
    id: "emergency-ems",
    label: "สมุนไพรเฟิร์ส",
    badge: "Official",
    badgeColor: "green",
    image: "/img/sam.png",
    route: "/app/external/blank",
  },
  {
    id: "thai-health",
    label: "Thai Health (สร้างสุข/สสส.)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/sss.png",
    route: "/app/external/blank",
  },
  {
    id: "khunlook",
    label: "KhunLook (คุณลูก)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/khunlook.png",
    route: "/app/external/blank",
  },
  {
    id: "ya-and-you",
    label: "ยาและคุณ (Ya&You)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/ya.png",
    route: "/app/external/blank",
  },
  {
    id: "gis-health",
    label: "ค้นหาโรงพยาบาล (GIS Health)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/gis.png",
    route: "/app/external/blank",
  },
  {
    id: "phonphai",
    label: "PhonPhai (พ้นภัย)",
    badge: "Official",
    badgeColor: "green",
    image: "/img/phonphai.png",
    route: "/app/external/blank",
  },
  {
    id: "thai-first-aid",
    label: "Thai First Aid",
    badge: "Official",
    badgeColor: "green",
    image: "/img/thaif.png",
    route: "/app/external/blank",
  },
];



// Login Modal Component
const LoginModal = ({ onClose, onLogin }) => {
  const [showQR, setShowQR] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState(null);

  const handleMethodClick = (method) => {
    setSelectedMethod(method);
    setShowQR(true);
    // Auto login after 2 seconds (simulating QR scan)
    setTimeout(() => {
      onLogin(method);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
        {!showQR ? (
          <>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
              เข้าสู่ระบบ
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              เลือกวิธีการเข้าสู่ระบบ
            </p>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={() => handleMethodClick("ThaiD")}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition"
              >
                เข้าสู่ระบบด้วย ThaiD
              </button>
              <button
                onClick={() => handleMethodClick("HealthID")}
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
          </>
        ) : (
          <>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
              สแกน QR Code
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              กรุณาสแกน QR Code ด้วย {selectedMethod}
            </p>
            <div className="flex justify-center py-4">
              <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=fake-login-qr"
                  alt="QR Code"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
                <span className="text-sm text-gray-600">กำลังรอการสแกน...</span>
              </div>
            </div>
            <button
              onClick={() => {
                setShowQR(false);
                setSelectedMethod(null);
              }}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"
            >
              ยกเลิก
            </button>
          </>
        )}
      </div>
    </div>
  );
};

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
const UserMenu = ({ onLogout, onClose, user }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <div className="text-center">
        <img
          src={process.env.PUBLIC_URL + user.picture}
          alt={user.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 sm:mb-3 object-cover"
        />
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          {user.name}
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
  const [showAllServices, setShowAllServices] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleMiniAppClick = (service) => {
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
      username: user.name,
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
    console.log("User logged out");
    navigate("/app/");
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
          {/* Fixed Header */}
          <TopNavigationBar
            isLoggedIn={isLoggedIn}
            isScrolled={isScrolled}
            onUserClick={handleUserClick}
            onLogout={handleLogout}
            user={user}
          />

          {/* Top gradient section */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 pb-8 relative z-10">
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 via-black/10 to-transparent"></div>
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 relative z-10">
              <main className="space-y-4 sm:space-y-5">
                {/* Official Services - 4 cards */}
                <section className="-mx-3 sm:-mx-4 md:-mx-6 mt-24">
                  <div className="px-3 sm:px-4 md:px-6">
                    <div className="grid grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                      {officialServices.map((link) => (
                        <div
                          key={link.id}
                          onClick={() => handleOfficialServiceClick(link)}
                          className="cursor-pointer transition-transform hover:scale-105"
                        >
                          <div
                            className={`bg-gradient-to-br ${link.gradient} rounded-2xl p-2 sm:p-2.5 md:p-3 flex items-center justify-center shadow-lg aspect-square mb-2 backdrop-blur-sm`}
                          >
                            <div className="w-16 h-16 sm:w-16 sm:h-16 md:w-18 md:h-18 flex items-center justify-center">
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
                          <span className="font-bold text-xs sm:text-sm leading-tight text-center text-white block px-1 whitespace-pre-line">
                            {link.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Banner/Promotion Section */}
              </main>
            </div>
          </div>

          {/* Bottom white section */}
          <div className="bg-white rounded-t-3xl relative z-20 -mt-6">
            <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
              {/* Mini Apps - บริการแนะนำ */}
              <section>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-gray-800">
                    Mini Apps
                  </h2>
                  <button
                    onClick={() => setShowAllServices(!showAllServices)}
                    className="text-emerald-600 text-sm font-medium flex items-center hover:text-emerald-700 transition-colors"
                  >
                    {showAllServices ? "ย่อกลับ" : "ดูทั้งหมด"}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${
                        showAllServices ? "rotate-90" : ""
                      }`}
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

                <div
                  className={`${
                    showAllServices ? "overflow-visible" : "overflow-x-auto"
                  } pb-2 hide-scrollbar -mx-3 sm:-mx-4 md:-mx-6`}
                >
                  <div
                    className={`${
                      showAllServices
                        ? "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4"
                        : "flex gap-6 sm:gap-8"
                    } px-3 sm:px-4 md:px-6`}
                  >
                    {miniApps.map((app) => (
                      <div
                        onClick={() => handleMiniAppClick(app)}
                        key={app.id}
                        className="flex flex-col items-center cursor-pointer flex-shrink-0"
                        style={
                          showAllServices ? {} : { width: "calc(25% - 18px)" }
                        }
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden mb-2 hover:scale-105 transition-transform">
                          <img
                            src={process.env.PUBLIC_URL + app.image}
                            alt={app.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-800 text-center leading-tight w-full">
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
                    {showAllAppLinks ? "ย่อลง" : "ดูทั้งหมด"}
                    <svg
                      className={`w-4 h-4 ml-1 transition-transform ${
                        showAllAppLinks ? "rotate-90" : ""
                      }`}
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
                  <div className="overflow-x-auto pb-2 hide-scrollbar -mx-3 sm:-mx-4 md:-mx-6">
                    <div className="flex gap-6 sm:gap-8 px-3 sm:px-4 md:px-6">
                      {appLinks.slice(0, 4).map((service) => (
                        <div
                          onClick={() => handleMiniAppClick(service)}
                          key={service.id}
                          className="flex flex-col items-center cursor-pointer flex-shrink-0"
                          style={{ width: "calc(25% - 18px)" }}
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden mb-2 hover:scale-105 transition-transform">
                            <img
                              src={process.env.PUBLIC_URL + service.image}
                              alt={service.label}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                          <p className="text-xs font-medium text-gray-800 text-center leading-tight w-full">
                            {service.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-6 sm:gap-8">
                    {appLinks.map((service) => (
                      <div
                        onClick={() => handleMiniAppClick(service)}
                        key={service.id}
                        className="flex flex-col items-center cursor-pointer"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden mb-2 hover:scale-105 transition-transform">
                          <img
                            src={process.env.PUBLIC_URL + service.image}
                            alt={service.label}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-800 text-center leading-tight w-full">
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
          {isLoggedIn && <HealthInfoCard user={user} />}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />

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
          user={user}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/" element={<AppContent />} />
        <Route path="/app/docmeet" element={<DocMeet />} />
        <Route path="/app/hospital/:hospcode" element={<DocMeetDetail />} />
        <Route path="/app/chatai" element={<ChatAI />} />
        <Route path="/app/telemed" element={<Telemed />} />
        <Route path="/app/emergency" element={<EmergencyHelp />} />
        <Route path="/app/external/blank" element={<BlankPage />} />
        <Route path="/app/notification" element={<NotificationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
