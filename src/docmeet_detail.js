import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { hospitalData } from "./docmeet";

// ──────────────────────
// Modals (UI ตามตัวอย่าง LoginModal)
// ──────────────────────
const ConfirmModal = ({ item, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">ยืนยันการจองนัด</h3>
      <p className="text-xs sm:text-sm text-gray-600 text-center">
        คุณต้องการจองนัดในวันที่<br />
        <span className="font-semibold text-gray-800">{item?.date}</span><br />
        <span className="text-gray-700">{item?.clinic}</span>
      </p>

      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-emerald-600 hover:to-emerald-700 transition"
        >
          ยืนยันการจอง
        </button>
        <button
          onClick={onCancel}
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-300 transition"
        >
          ยกเลิก
        </button>
      </div>
    </div>
  </div>
);

const SuccessModal = ({ info, onClose }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">จองนัดสำเร็จ</h3>
      <div className="text-xs sm:text-sm text-gray-700 text-center space-y-1">
        <p className="font-semibold text-gray-900">{info?.hospital_name}</p>
        <p>{info?.date}</p>
        <p className="text-gray-600">{info?.clinic}</p>
      </div>
      <button
        onClick={onClose}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition"
      >
        ปิด
      </button>
    </div>
  </div>
);

export default function DocMeetDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hospcode } = useParams();

  const hospital =
    location.state?.hospital ||
    hospitalData.find((h) => h.hospcode === hospcode) ||
    { hospital_name: "ไม่พบข้อมูล", hospcode: "-" };

  const schedules = [
    { id: 1, date: "วันพุธ ที่ 18 ต.ค. 2568", clinic: "คลินิกอายุรกรรม" },
    { id: 2, date: "วันพฤหัสบดี ที่ 20 ต.ค. 2568", clinic: "คลินิกกระดูกและข้อ" },
    { id: 3, date: "วันอังคาร ที่ 22 ต.ค. 2568", clinic: "คลินิกศัลยกรรม" },
  ];

  const [booked, setBooked] = useState(new Set());
  const [confirmItem, setConfirmItem] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);
  
  // -- ฟังก์ชันจัดการการคลิกพร้อมหน่วงเวลา --
  const DELAY = 300; // ตั้งค่าเวลาหน่วง (ms) ไว้ที่เดียวเพื่อแก้ไขง่าย

  const handleNavigateBack = () => setTimeout(() => navigate(-1), DELAY);

  const handleOpenConfirm = (item) => setTimeout(() => setConfirmItem(item), DELAY);

  const handleCloseConfirm = () => setTimeout(() => setConfirmItem(null), DELAY);
  
  const handleCloseSuccess = () => setTimeout(() => setSuccessInfo(null), DELAY);

  const handleConfirmBooking = () => {
    setTimeout(() => {
      if (!confirmItem) return;
      const next = new Set(booked);
      next.add(confirmItem.id);
      setBooked(next);
      setSuccessInfo({
        hospital_name: hospital.hospital_name,
        date: confirmItem.date,
        clinic: confirmItem.clinic,
      });
      setConfirmItem(null); // ปิด modal ยืนยัน
    }, DELAY);
  };
  
  return (
    <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400 min-h-screen">
      <div className="max-w-md mx-auto min-h-screen shadow-2xl backdrop-blur-sm bg-white/10 text-white">
        <div className="relative flex items-center p-4 border-b border-white/30">
          <button onClick={handleNavigateBack} className="absolute left-4 text-white" aria-label="ย้อนกลับ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-bold mx-auto">นัดหมายพบแพทย์</h1>
        </div>

        <div className="p-4">
          <p className="text-lg font-semibold text-white/90 mt-2">{hospital.hospital_name}</p>
          <h2 className="mt-6 mb-2 font-semibold">ตารางนัดที่ว่าง</h2>

          <div className="bg-white/20 border border-white/30 rounded-lg overflow-hidden">
            {schedules.map((item) => {
              const isBooked = booked.has(item.id);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border-b border-white/20 last:border-none"
                >
                  <div>
                    <p className="text-white">{item.date}</p>
                    <p className="text-white/80 text-sm">{item.clinic}</p>
                  </div>
                  <button
                    onClick={() => handleOpenConfirm(item)}
                    disabled={isBooked}
                    className={[
                      "px-4 py-1 rounded-full font-medium transition",
                      isBooked
                        ? "bg-white/30 text-white/80 cursor-not-allowed border border-white/40"
                        : "bg-cyan-300 text-gray-700 hover:brightness-110"
                    ].join(" ")}
                  >
                    {isBooked ? "จองแล้ว" : "จองนัด"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {confirmItem && (
        <ConfirmModal
          item={confirmItem}
          onConfirm={handleConfirmBooking}
          onCancel={handleCloseConfirm}
        />
      )}

      {successInfo && (
        <SuccessModal
          info={successInfo}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
}