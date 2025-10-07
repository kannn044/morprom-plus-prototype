import React from "react";
import BottomNavigation from "../buttom-navigation-bar/ButtomNavigationBar";
import TopNavigationBar from "../top-navigation-bar/TopNavigationBar";
import { useNavigate } from "react-router-dom";

const BlankPage = (props) => {
  const navigate = useNavigate();
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
      {/* Fixed Header */}
      <TopNavigationBar
        isLoggedIn={isLoggedIn}
        isScrolled={isScrolled}
        onUserClick={handleUserClick}
        onLogout={handleLogout}
      />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
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
          </div>

          {/* Text */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            บริการนี้ยังไม่เปิดให้ใช้งาน
          </h2>
          <p className="text-gray-500">กรุณารอการอัพเดตในเร็วๆ นี้</p>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
};

export default BlankPage;
