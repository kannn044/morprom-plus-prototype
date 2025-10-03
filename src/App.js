import React from 'react';

// Service item data
const miniApps = [
  { id: 'epayment', label: 'ePayment', badge: 'Public', badgeColor: 'blue', image: '/img/epayment.png' },
  { id: 'moph-refer', label: 'Moph Refer', badge: 'Official', badgeColor: 'green', image: '/img/mophrefer.jpeg' },
  { id: 'son-buddy', label: 'สอน.บัดดี้', badge: 'Official', badgeColor: 'green', image: '/img/son.jpeg' },
  { id: 'mor-prom', label: 'หมอพร้อม Station', badge: 'Official', badgeColor: 'green', image: '/img/morprom.png' },
  { id: 'pink-blue', label: 'สมุดสีชมพู', badge: 'Public', badgeColor: 'blue', image: '/img/book.png' },
  { id: 'yellow-book', label: 'สมุดสีเหลือง', badge: 'Public', badgeColor: 'blue', image: '/img/book.png' },
  { id: 'blue-book', label: 'สมุดสีฟ้า', badge: 'Public', badgeColor: 'blue', image: '/img/book.png' },
];

const officialServices = [
  { id: 'ai-chatbot', label: 'นัดพบแพทย์', gradient: 'from-emerald-500 to-teal-600', image: '/img/appointment.png' },
  { id: 'mental-health', label: 'ตอบปัญหาสุขภาพด้วย Ai', gradient: 'from-teal-500 to-emerald-600', image: '/img/gpt.png' },
  { id: 'health-tips', label: 'ปรึกษาแพทย์ทางไกล (Telemedicine)', gradient: 'from-teal-500 to-cyan-900', image: '/img/telemed.png' }
];

const appLinks = [
  { id: 'covid-tracker', label: 'สิทธิ 30 บาท (สปสช.)', badge: 'Official', badgeColor: 'green', image: '/img/30.webp' },
  { id: 'emergency-ems', label: 'ระบบแจ้งเหตุฉุกเฉิน EMS 1669', badge: 'Official', badgeColor: 'green', image: '/img/ems.png' },
  { id: 'thai-health', label: 'Thai Health (สร้างสุข/สสส.)', badge: 'Official', badgeColor: 'green', image: '/img/sss.png' },
  { id: 'khunlook', label: 'KhunLook (คุณลูก)', badge: 'Official', badgeColor: 'green', image: '/img/khunlook.png' },
  { id: 'ya-and-you', label: 'ยาและคุณ (Ya&You)', badge: 'Official', badgeColor: 'green', image: '/img/ya.png' },
  { id: 'gis-health', label: 'ค้นหาโรงพยาบาล (GIS Health)', badge: 'Official', badgeColor: 'green', image: '/img/gis.png' },
  { id: 'phonphai', label: 'PhonPhai (พ้นภัย)', badge: 'Official', badgeColor: 'green', image: '/img/phonphai.png' },
  { id: 'thai-first-aid', label: 'Thai First Aid', badge: 'Official', badgeColor: 'green', image: '/img/thaif.png' }
];

// Icon components
const SearchIcon = () => (
  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Reusable components
const ServiceButton = ({ children, className = "", onClick }) => (
  <div onClick={onClick} className={`flex flex-col items-center space-y-1 sm:space-y-2 cursor-pointer rounded-lg hover:bg-white/20 p-1 sm:p-2 transition ${className}`}>
    {children}
  </div>
);

const IconCircle = ({ children, className = "bg-white/30" }) => (
  <div className={`${className} rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center backdrop-blur-sm`}>
    {children}
  </div>
);

const Badge = ({ color, children }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-emerald-100 text-emerald-800'
  };
  return (
    <span className={`inline-block ${colors[color]} text-[9px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full`}>
      {children}
    </span>
  );
};

// Login Modal Component
const LoginModal = ({ onClose, onLogin }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center">เข้าสู่ระบบ</h3>
      <p className="text-xs sm:text-sm text-gray-600 text-center">เลือกวิธีการเข้าสู่ระบบ</p>
      <div className="space-y-2 sm:space-y-3">
        <button
          onClick={() => onLogin('ThaiD')}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium hover:from-blue-600 hover:to-blue-700 transition"
        >
          เข้าสู่ระบบด้วย ThaiD
        </button>
        <button
          onClick={() => onLogin('HealthID')}
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
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">เข้าสู่ระบบเสร็จสิ้น</h3>
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
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">สมหมาย ทองสุก</h3>
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

export default function App() {
  const [showAllAppLinks, setShowAllAppLinks] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleOfficialServiceClick = (service) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      console.log('Accessing service:', service.label);
    }
  };

  const handleLogin = (method) => {
    console.log('Logging in with:', method);
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
    sessionStorage.clear();
    localStorage.clear();
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
      <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400 min-h-screen">
        <div className="max-w-md mx-auto min-h-screen shadow-2xl backdrop-blur-sm bg-white/10">
          <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between space-x-2 sm:space-x-4">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหาบริการที่คุณต้องการ"
                    className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 sm:py-2 pl-8 sm:pl-10 pr-3 sm:pr-4 text-xs sm:text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  />
                </div>
              </div>
              <div className="flex items-center flex-shrink-0">
                <button
                  onClick={handleUserClick}
                  className="text-xs sm:text-sm font-medium text-white hover:text-white/80 transition cursor-pointer whitespace-nowrap"
                >
                  {isLoggedIn ? 'สมหมาย ทองสุก' : 'เข้าสู่ระบบ'}
                </button>
              </div>
            </header>

            <main className="space-y-4 sm:space-y-6 md:space-y-8">
              <section>
                <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">บริการของรัฐบาล</h2>
                <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 -mx-3 px-3 sm:-mx-6 sm:px-6 hide-scrollbar">
                  {officialServices.map(link => (
                    <div
                      key={link.id}
                      onClick={() => handleOfficialServiceClick(link)}
                      className={`flex-shrink-0 w-28 h-36 sm:w-32 sm:h-40 bg-gradient-to-br ${link.gradient} rounded-xl p-2 sm:p-3 text-white flex flex-col justify-between cursor-pointer transition-transform hover:scale-105 shadow-lg`}
                    >
                      <div className="w-full h-16 sm:h-20 flex items-center justify-center mb-1 sm:mb-2">
                        <img src={process.env.PUBLIC_URL + link.image} alt={link.label} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                      </div>
                      <span className="font-bold text-xs sm:text-sm leading-tight">{link.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Mini Apps</h2>
                <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mx-3 px-3 sm:-mx-6 sm:px-6 hide-scrollbar">
                  {miniApps.map(app => (
                    <div key={app.id} className="flex-shrink-0 w-16 sm:w-20 p-1 space-y-1 sm:space-y-2 cursor-pointer rounded-lg hover:bg-white/20 transition backdrop-blur-sm">
                      <div className="bg-white/30 rounded-full flex items-center justify-center aspect-square backdrop-blur-sm overflow-hidden">
                        <img src={process.env.PUBLIC_URL + app.image} alt={app.label} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                      </div>
                      <p className="text-[10px] sm:text-xs font-medium text-white leading-tight">{app.label}</p>
                      <Badge color={app.badgeColor}>{app.badge}</Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* App Links */}
              <section>
                <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">แอปพลิเคชันภายนอก</h2>
                {!showAllAppLinks ? (
                  <>
                    <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mx-3 px-3 sm:-mx-6 sm:px-6 hide-scrollbar">
                      {appLinks.slice(0, 6).map(service => (
                        <div key={service.id} className="flex-shrink-0 w-16 sm:w-20">
                          <ServiceButton>
                            <IconCircle>
                              <img src={process.env.PUBLIC_URL + service.image} alt={service.label} className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                            </IconCircle>
                            <span className="text-[10px] sm:text-xs font-medium text-white leading-tight text-center">
                              {service.label}
                            </span>
                          </ServiceButton>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-3 sm:mt-4">
                      <button
                        onClick={() => setShowAllAppLinks(true)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 px-4 sm:px-6 text-xs text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                      >
                        ดูเพิ่มเติม
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                      {appLinks.map(service => (
                        <div key={service.id}>
                          <ServiceButton>
                            <IconCircle>
                              <img src={process.env.PUBLIC_URL + service.image} alt={service.label} className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                            </IconCircle>
                            <span className="text-[10px] sm:text-xs font-medium text-white leading-tight text-center">
                              {service.label}
                            </span>
                          </ServiceButton>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-3 sm:mt-4">
                      <button
                        onClick={() => setShowAllAppLinks(false)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 px-4 sm:px-6 text-xs text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                      >
                        ย่อลง
                      </button>
                    </div>
                  </>
                )}
              </section>
            </main>
          </div>
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
