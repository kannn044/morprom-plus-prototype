import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const hospitalData = [
  { hospcode: "41124", hospital_name: "โรงพยาบาลพระมงกุฎ" },
  { hospcode: "41125", hospital_name: "โรงพยาบาลศูนย์เทค" },
];

const SearchIcon = () => (
  <svg
    className="h-4 w-4 sm:h-5 sm:w-5 text-white"
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

  return (
    <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400 min-h-screen">
      <div className="max-w-md mx-auto min-h-screen shadow-2xl backdrop-blur-sm bg-white/10">
        <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
          <header className="flex items-center justify-between space-x-2 sm:space-x-4">
            {/* ลูกศรย้อนกลับไปหน้า App */}
            <button onClick={() => navigate("/")} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <h1 className="text-lg sm:text-xl font-bold text-white">
              ค้นหาโรงพยาบาล
            </h1>

            {/* กล่องว่างเพื่อบาลานซ์ layout */}
            <div className="w-6" />
          </header>

          <main className="space-y-4 sm:space-y-6 md:space-y-8">
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
                  className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 sm:py-2 pl-10 pr-3 text-xs sm:text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                />
              </div>
            </div>

            <div className="space-y-3">
              {searchResults.length === 0 ? (
                <div className="bg-white/10 p-4 rounded-lg border border-white/20">
                  <p className="text-white/90 text-sm">
                    ไม่พบโรงพยาบาลที่ตรงกับคำค้น
                  </p>
                </div>
              ) : (
                searchResults.map((hospital) => (
                  <div
                    key={hospital.hospcode}
                    className="bg-white/20 p-4 rounded-lg border border-white/30 hover:bg-white/25 transition cursor-pointer"
                    onClick={() =>
                      // ใช้ path ตรงกับที่ประกาศใน App.jsx
                      navigate(`/hospital/${hospital.hospcode}`, {
                        state: { hospital },
                      })
                    }
                  >
                    <p className="text-white font-bold">
                      {hospital.hospital_name}
                    </p>
                    <p className="text-white/90 text-sm">
                      รหัส: {hospital.hospcode}
                    </p>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
