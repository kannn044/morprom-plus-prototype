import React, { useState, useEffect } from "react";
import { AlertCircle, MapPin, Send, Phone } from "lucide-react";
import BottomNavigation from "../buttom-navigation-bar/ButtomNavigationBar";
import { useNavigate } from "react-router-dom";
import TopNavigationBar from "../top-navigation-bar/TopNavigationBar";

export default function EmergencyHelp() {
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTab, setActiveTab] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  // eslint-disable-next-line no-unused-vars
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case "home":
        navigate("/app/");
        break;
      case "service":
        navigate("/app/service");
        break;
      case "chat":
        navigate("/app/chatai");
        break;
      case "profile":
        if (isLoggedIn) {
          navigate("/app/profile");
        } else {
          setShowLoginModal(true);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // ขอตำแหน่งปัจจุบันจาก Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          // ใช้ตำแหน่งเริ่มต้น (กรุงเทพฯ)
          setLocation({
            lat: 13.7563,
            lng: 100.5018,
          });
          setLoading(false);
        }
      );
    } else {
      // ใช้ตำแหน่งเริ่มต้น
      setLocation({
        lat: 13.7563,
        lng: 100.5018,
      });
      setLoading(false);
    }
  }, []);

  const handleSendHelp = () => {
    if (!message.trim()) {
      alert("กรุณากรอกข้อความขอความช่วยเหลือ");
      return;
    }

    setSending(true);

    // จำลองการส่งข้อความ
    setTimeout(() => {
      setSending(false);
      setSent(true);

      // รีเซ็ตสถานะหลังจาก 3 วินาที
      setTimeout(() => {
        setSent(false);
        setMessage("");
      }, 3000);
    }, 1500);
  };

  const emergencyNumbers = [
    { name: "ตำรวจ", number: "191" },
    { name: "ดับเพลิง", number: "199" },
    { name: "การแพทย์ฉุกเฉิน", number: "1669" },
  ];

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
      <TopNavigationBar
        isLoggedIn={isLoggedIn}
        isScrolled={isScrolled}
        onUserClick={handleUserClick}
        onLogout={handleLogout}
      />
      <div className="bg-white p-4 mt-14 mb-20">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-red-600" />
          อุบัติเหตุ/เจ็บป่วยฉุกเฉิน
        </h1>
        {/* Emergency Numbers */}
        <div className="grid grid-cols-3 gap-3">
          {emergencyNumbers.map((item) => (
            <a
              key={item.number}
              href={`tel:${item.number}`}
              className="bg-red-100 hover:bg-red-200 text-red-700 rounded-xl p-4 text-center transition-colors"
            >
              <Phone className="w-6 h-6 mx-auto mb-2" />
              <div className="font-bold text-lg">{item.number}</div>
              <div className="text-xs mt-1">{item.name}</div>
            </a>
          ))}
        </div>

        {/* Map Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <MapPin className="w-5 h-5 text-red-600" />
            <span>ตำแหน่งปัจจุบันของคุณ</span>
          </div>

          <div
            className="relative bg-gray-100 rounded-xl overflow-hidden"
            style={{ height: "300px" }}
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500">กำลังโหลดแผนที่...</div>
              </div>
            ) : (
              <>
                <iframe
                  title="Current Location Map"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    location.lng - 0.01
                  },${location.lat - 0.01},${location.lng + 0.01},${
                    location.lat + 0.01
                  }&marker=${location.lat},${location.lng}`}
                  allowFullScreen
                />
                <div className="absolute bottom-3 left-3 bg-white px-3 py-2 rounded-lg shadow-md text-sm">
                  <div className="text-gray-600">พิกัด:</div>
                  <div className="font-mono text-xs">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold">
            ข้อความขอความช่วยเหลือ
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="กรุณาระบุสถานการณ์และความช่วยเหลือที่ต้องการ..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none"
            rows="4"
            disabled={sending}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendHelp}
          disabled={sending || sent}
          className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all flex items-center justify-center gap-2 ${
            sent
              ? "bg-green-600"
              : sending
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:scale-98"
          }`}
        >
          {sent ? (
            <>
              <span>✓</span>
              <span>ส่งคำขอความช่วยเหลือแล้ว</span>
            </>
          ) : sending ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
              <span>กำลังส่ง...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>ส่งคำขอความช่วยเหลือ</span>
            </>
          )}
        </button>

        {/* Warning */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-sm text-yellow-800">
            <strong>หมายเหตุ:</strong> ในกรณีฉุกเฉินร้ายแรง
            กรุณาโทรติดต่อหน่วยงานฉุกเฉินโดยตรงทันที
          </p>
        </div>
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}
