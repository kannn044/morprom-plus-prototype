import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from './components/top-navigation-bar/TopNavigationBar';
import BottomNavigation from './components/buttom-navigation-bar/ButtomNavigationBar';

function Telemed() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isInCall, setIsInCall] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    // Mock doctor data
    const doctors = [
        {
            id: 1,
            name: "นพ. สมชาย เก่งมาก",
            picture: `${process.env.PUBLIC_URL}/img/mor1.webp`,
            specialist: "อายุรแพทย์",
            status: "online"
        },
        {
            id: 2,
            name: "พญ. สวยจริง เก่งจัง",
            picture: `${process.env.PUBLIC_URL}/img/mor2.jpeg`,
            specialist: "กุมารแพทย์",
            status: "online"
        },
        {
            id: 3,
            name: "นพ. หล่อ เท่ห์",
            picture: `${process.env.PUBLIC_URL}/img/mor3.jpeg`,
            specialist: "แพทย์ผิวหนัง",
            status: "offline"
        },
        {
            id: 4,
            name: "นพ. ใจดี มากมาย",
            picture: `${process.env.PUBLIC_URL}/img/mor4.webp`,
            specialist: "แพทย์ทั่วไป",
            status: "online"
        }
    ];

    useEffect(() => {
        const loggedInStatus = sessionStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedInStatus);

        if (!isInCall) return;

        const getCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera: ", err);
            }
        };

        getCamera();

        const video = videoRef.current;
        return () => {
            if (video && video.srcObject) {
                video.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [isInCall]);

    const handleCall = (doctor) => {
        if (doctor.status === "online") {
            setSelectedDoctor(doctor);
            setIsInCall(true);
        }
    };

    const handleEndCall = () => {
        setIsInCall(false);
        setSelectedDoctor(null);
    };

    if (!isInCall) {
        return (
            <div className="bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                <div className="max-w-md mx-auto shadow-2xl backdrop-blur-sm bg-white/10 flex flex-col" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
                    <header className="flex items-center justify-between p-3 sm:p-4 md:p-6 text-white flex-shrink-0 sticky top-0 z-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-gray-400">
                        <button onClick={() => navigate(-1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h1 className="text-lg sm:text-xl font-bold">ปรึกษาแพทย์ทางไกล</h1>
                        <div className="w-6"></div>
                    </header>
                    <div className="min-h-screen bg-white">
                        <div className="space-y-4">
                            {doctors.map(doctor => (
                                <div key={doctor.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-4 flex items-center space-x-4">
                                        <img
                                            src={doctor.picture}
                                            alt={doctor.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-lg font-semibold text-gray-800">{doctor.name}</h2>
                                            <p className="text-gray-600">{doctor.specialist}</p>
                                            <div className="flex items-center mt-2">
                                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                                    }`}></span>
                                                <span className="text-sm capitalize">{doctor.status}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleCall(doctor)}
                                            disabled={doctor.status === 'offline'}
                                            className={`px-4 py-2 rounded-lg font-semibold text-white ${doctor.status === 'online'
                                                ? 'bg-emerald-500 hover:bg-emerald-600'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Call
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-gray-900 text-white">
            <div className="relative w-full h-screen">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>

                {/* Doctor's video (draggable) */}
                <div className="absolute top-4 right-4 w-32 h-48 bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden shadow-lg">
                    <img src={selectedDoctor?.picture} alt={selectedDoctor?.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-1 w-full">
                        <p className="text-xs text-center">{selectedDoctor?.name}</p>
                    </div>
                </div>

                {/* Call controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-30 p-4">
                    <div className="max-w-md mx-auto flex justify-around items-center">
                        <button className="flex flex-col items-center space-y-1 text-white">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <span>Mute</span>
                        </button>
                        <button onClick={handleEndCall} className="flex flex-col items-center space-y-1 text-white">
                            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <span>End Call</span>
                        </button>
                        <div className="text-center">
                            <p className="text-lg font-semibold">01:23</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Telemed;
