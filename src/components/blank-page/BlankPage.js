import React from "react";
import BottomNavigation from "../buttom-navigation-bar/ButtomNavigationBar";
import { useNavigate, useLocation } from "react-router-dom";
import TopNavigationBarBasic from "../top-navigation-bar/TopNavigationBarBasic";

const BlankPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // รับ label และ image จาก state
  const pageLabel = location.state?.label || "บริการ";
  const pageImage = location.state?.image || null;

  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("");

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userData");
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
      {/* แสดง label ที่ได้รับใน TopNavigationBarBasic */}
      <TopNavigationBarBasic
        title={pageLabel}
        onBack={() => navigate("/app/")}
      />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          {/* แสดงรูปภาพเป็นวงกลม */}
          <div className="mb-6 flex justify-center">
            {pageImage ? (
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img
                  src={process.env.PUBLIC_URL + pageImage}
                  alt={pageLabel}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // ถ้าโหลดรูปไม่ได้ ให้ซ่อนรูปและแสดง parent div ที่มี background
                    e.target.style.display = "none";
                  }}
                />
              </div>
            ) : (
              // Icon default ถ้าไม่มีรูปภาพ
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Text - แสดง label */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {pageLabel}
          </h2>
          <p className="text-gray-500 mb-4">บริการนี้ยังไม่เปิดให้ใช้งาน</p>
          <p className="text-gray-500">กรุณารอการอัพเดตในเร็วๆ นี้</p>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
};

export default BlankPage;
