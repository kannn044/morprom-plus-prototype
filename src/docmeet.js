import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "./components/buttom-navigation-bar/ButtomNavigationBar";

export const hospitalData = [
  { hospcode: "41124", hospital_name: "โรงพยาบาลพระมงกุฎ" },
  { hospcode: "41125", hospital_name: "โรงพยาบาลศูนย์เทค" },
];

const SearchIcon = () => (
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function DocMeet() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(hospitalData);
  const [activeTab, setActiveTab] = React.useState("");
  const [isLoggedIn] = React.useState(() => {
    return sessionStorage.getItem("isLoggedIn") === "true";
  });
  const [, setShowLoginModal] = React.useState(false);

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return setSearchResults(hospitalData);
    setSearchResults(
      hospitalData.filter(
        (h) =>
          (h.hospital_name || "").toLowerCase().includes(term) ||
          (h.hospcode || "").toLowerCase().includes(term)
      )
    );
  }, [searchTerm]);

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

  const handleHospitalClick = (hospital) => {
    setTimeout(() => {
      navigate(`/app/hospital/${hospital.hospcode}`, {
        state: { hospital },
      });
    }, 300);
  };

  return (
    <div className="bg-gradient-to-br from-white-500 via-teal-500 to-gray-400" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <div className="max-w-md mx-auto shadow-2xl backdrop-blur-sm bg-white/10 flex flex-col" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
        <header className="flex items-center justify-between p-3 sm:p-4 md:p-6 text-white flex-shrink-0 sticky top-0 z-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400">
          <button onClick={() => navigate(-1)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold">นัดหมายแพทย์</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-4 space-y-4 sm:space-y-6 md:space-y-8 overflow-y-auto">
          <div className="flex items-center space-x-2">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="ค้นหาโรงพยาบาลหรือรหัส..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 sm:py-3 pl-10 pr-3 text-sm sm:text-base text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          <div className="space-y-3">
            {searchResults.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-600 text-sm text-center">
                  ไม่พบโรงพยาบาลที่ตรงกับคำค้น
                </p>
              </div>
            ) : (
              searchResults.map((hospital) => (
                <div
                  key={hospital.hospcode}
                  className="bg-white p-4 rounded-lg border hover:bg-gray-50 transition cursor-pointer shadow-sm"
                  onClick={() => handleHospitalClick(hospital)}
                >
                  <p className="text-gray-800 font-bold text-lg">
                    {hospital.hospital_name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    รหัส: {hospital.hospcode}
                  </p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
