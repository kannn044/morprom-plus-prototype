import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { hospitalData } from "./docmeet";

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
  
  const DELAY = 300;

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
      setConfirmItem(null);
    }, DELAY);
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

        <main className="p-4 overflow-y-auto">
          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <p className="text-xl font-bold text-gray-800 text-center">{hospital.hospital_name}</p>
          </div>

          <h2 className="text-gray-800 text-lg font-semibold mb-3">ตารางนัดที่ว่าง</h2>

          <div className="space-y-3">
            {schedules.map((item) => {
              const isBooked = booked.has(item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg border flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p className="text-gray-800 font-semibold">{item.date}</p>
                    <p className="text-gray-600 text-sm">{item.clinic}</p>
                  </div>
                  <button
                    onClick={() => handleOpenConfirm(item)}
                    disabled={isBooked}
                    className={`px-4 py-2 rounded-full font-medium transition text-sm ${isBooked
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                  >
                    {isBooked ? "จองแล้ว" : "จองนัด"}
                  </button>
                </div>
              );
            })}
          </div>
        </main>
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