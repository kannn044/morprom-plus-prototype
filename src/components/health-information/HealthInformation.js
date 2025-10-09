import React from "react";

const HealthInfoCard = ({ user }) => {
  // ข้อมูลความดันโลหิต 7 วันย้อนหลัง
  const bloodPressureData = [
    { day: "จ", systolic: 118, diastolic: 78 },
    { day: "อ", systolic: 125, diastolic: 82 },
    { day: "พ", systolic: 115, diastolic: 75 },
    { day: "พฤ", systolic: 122, diastolic: 80 },
    { day: "ศ", systolic: 117, diastolic: 77 },
    { day: "ส", systolic: 120, diastolic: 79 },
    { day: "อา", systolic: 128, diastolic: 85 },
  ];

  // หาค่าสูงสุดและต่ำสุดเพื่อปรับ scale ให้เหมาะสม
  const allValues = bloodPressureData.flatMap(d => [d.systolic, d.diastolic]);
  const minValue = Math.min(...allValues) - 10; // ลดลง 10 เพื่อให้มีพื้นที่ด้านล่าง
  const maxValue = Math.max(...allValues) + 10; // เพิ่ม 10 เพื่อให้มีพื้นที่ด้านบน

  // คำนวณความสูงของแท่งกราฟเป็นเปอร์เซ็นต์

  return (
    <section className="px-3 sm:px-4 md:px-6 pb-20">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          ข้อมูลสุขภาพของคุณ
        </h2>
      </div>
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 sm:p-5 shadow-md border border-emerald-100">
        <div className="flex items-center mb-4">
          <img
            src={process.env.PUBLIC_URL + user.picture}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover shadow-md"
          />
          <div className="ml-3">
            <h3 className="text-lg font-bold text-gray-800">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600">อายุ 40 ปี</p>
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

          {/* Line Chart */}
          <div className="relative h-40 mb-2">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-100"></div>
              ))}
            </div>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-gray-400 pr-2">
              <span>{Math.round(maxValue)}</span>
              <span>{Math.round(maxValue - (maxValue - minValue) * 0.25)}</span>
              <span>{Math.round(maxValue - (maxValue - minValue) * 0.5)}</span>
              <span>{Math.round(maxValue - (maxValue - minValue) * 0.75)}</span>
              <span>{Math.round(minValue)}</span>
            </div>

            {/* Chart area */}
            <svg className="w-full h-full pl-8" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Systolic line (red) */}
              <polyline
                points={bloodPressureData.map((data, i) => {
                  const x = (i / (bloodPressureData.length - 1)) * 100;
                  const y = 100 - ((data.systolic - minValue) / (maxValue - minValue)) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="rgb(248, 113, 113)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-md"
              />
              
              {/* Systolic points */}
              {bloodPressureData.map((data, i) => {
                const x = (i / (bloodPressureData.length - 1)) * 100;
                const y = 100 - ((data.systolic - minValue) / (maxValue - minValue)) * 100;
                return (
                  <g key={`sys-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="white"
                      stroke="rgb(239, 68, 68)"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-3 transition-all"
                    />
                  </g>
                );
              })}

              {/* Diastolic line (blue) */}
              <polyline
                points={bloodPressureData.map((data, i) => {
                  const x = (i / (bloodPressureData.length - 1)) * 100;
                  const y = 100 - ((data.diastolic - minValue) / (maxValue - minValue)) * 100;
                  return `${x},${y}`;
                }).join(' ')}
                fill="none"
                stroke="rgb(96, 165, 250)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-md"
              />

              {/* Diastolic points */}
              {bloodPressureData.map((data, i) => {
                const x = (i / (bloodPressureData.length - 1)) * 100;
                const y = 100 - ((data.diastolic - minValue) / (maxValue - minValue)) * 100;
                return (
                  <g key={`dia-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="2.5"
                      fill="white"
                      stroke="rgb(59, 130, 246)"
                      strokeWidth="2"
                      className="cursor-pointer hover:r-3 transition-all"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between px-8 mt-2">
            {bloodPressureData.map((data) => (
              <div key={data.day} className="text-[10px] text-gray-500 text-center flex-1">
                {data.day}
              </div>
            ))}
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
  );
};

export default HealthInfoCard;