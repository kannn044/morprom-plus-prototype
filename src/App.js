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
  { id: 'mental-health', label: 'ตอบปัญหาสุขภาพด้วย Ai', gradient: 'from-green-500 to-emerald-600', image: '/img/gpt.png' },
  { id: 'health-tips', label: 'ปรึกษาแพทย์ทางไกล (Telemedicine)', gradient: 'from-teal-500 to-cyan-600', image: '/img/telemed.png' }
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
  <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Reusable components
const ServiceButton = ({ children, className = "" }) => (
  <div className={`flex flex-col items-center space-y-2 cursor-pointer rounded-lg hover:bg-white/20 p-2 transition ${className}`}>
    {children}
  </div>
);

const IconCircle = ({ children, className = "bg-white/30" }) => (
  <div className={`${className} rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm`}>
    {children}
  </div>
);

const Badge = ({ color, children }) => {
  const colors = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-emerald-100 text-emerald-800'
  };
  return (
    <span className={`inline-block ${colors[color]} text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
      {children}
    </span>
  );
};


export default function App() {
  const [showAllAppLinks, setShowAllAppLinks] = React.useState(false);

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
        <div className="max-w-sm mx-auto min-h-screen shadow-2xl backdrop-blur-sm bg-white/10">
          <div className="p-6 space-y-8">
            {/* Header */}
            <header className="flex items-center justify-between space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหาบริการที่คุณต้องการ"
                    className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <span className="text-sm font-medium text-white">เข้าสู่ระบบ</span>
              </div>
            </header>

            <main className="space-y-8">
              <section>
                <h2 className="text-lg font-bold text-white mb-4">บริการของรัฐบาล</h2>
                <div className="flex space-x-3 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
                  {officialServices.map(link => (
                    <div key={link.id} className={`flex-shrink-0 w-32 h-40 bg-gradient-to-br ${link.gradient} rounded-xl p-3 text-white flex flex-col justify-between cursor-pointer transition-transform hover:scale-105 shadow-lg`}>
                      <div className="w-full h-20 flex items-center justify-center mb-2">
                        <img src={process.env.PUBLIC_URL + link.image} alt={link.label} className="w-16 h-16 object-contain" onError={(e) => { e.target.style.display = 'none' }} />
                      </div>
                      <span className="font-bold text-sm">{link.label}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold text-white mb-4">Mini Apps</h2>
                <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
                  {miniApps.map(app => (
                    <div key={app.id} className="flex-shrink-0 w-20 p-1 space-y-2 cursor-pointer rounded-lg hover:bg-white/20 transition backdrop-blur-sm">
                      <div className="bg-white/30 rounded-full flex items-center justify-center aspect-square backdrop-blur-sm overflow-hidden">
                        <img src={process.env.PUBLIC_URL + app.image} alt={app.label} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                      </div>
                      <p className="text-xs font-medium text-white leading-tight">{app.label}</p>
                      <Badge color={app.badgeColor}>{app.badge}</Badge>
                    </div>
                  ))}
                </div>
              </section>

              {/* App Links */}
              <section>
                <h2 className="text-lg font-bold text-white mb-4">แอปพลิเคชันภายนอก</h2>
                {!showAllAppLinks ? (
                  <>
                    <div className="flex space-x-4 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar">
                      {appLinks.slice(0, 6).map(service => (
                        <div key={service.id} className="flex-shrink-0 w-20">
                          <ServiceButton>
                            <IconCircle>
                              <img src={process.env.PUBLIC_URL + service.image} alt={service.label} className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                            </IconCircle>
                            <span className="text-xs font-medium text-white leading-tight text-center">
                              {service.label}
                            </span>
                          </ServiceButton>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setShowAllAppLinks(true)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 px-6 text-xs text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                      >
                        ดูเพิ่มเติม
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-4 gap-4">
                      {appLinks.map(service => (
                        <div key={service.id}>
                          <ServiceButton>
                            <IconCircle>
                              <img src={process.env.PUBLIC_URL + service.image} alt={service.label} className="w-full h-full object-cover rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                            </IconCircle>
                            <span className="text-xs font-medium text-white leading-tight text-center">
                              {service.label}
                            </span>
                          </ServiceButton>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-4">
                      <button
                        onClick={() => setShowAllAppLinks(false)}
                        className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-1.5 px-6 text-xs text-white font-medium hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
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
    </>
  );
}
