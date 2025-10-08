import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Telemed() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [isInCall, setIsInCall] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // Mock doctor data
    const doctors = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            picture: `${process.env.PUBLIC_URL}/img/mor.png`,
            specialist: "Cardiologist",
            status: "online"
        },
        {
            id: 2,
            name: "Dr. Michael Chen",
            picture: `${process.env.PUBLIC_URL}/img/mor.png`,
            specialist: "Pediatrician",
            status: "online"
        },
        {
            id: 3,
            name: "Dr. Emily Brown",
            picture: `${process.env.PUBLIC_URL}/img/mor.png`,
            specialist: "Dermatologist",
            status: "offline"
        },
        {
            id: 4,
            name: "Dr. James Wilson",
            picture: `${process.env.PUBLIC_URL}/img/mor.png`,
            specialist: "General Practitioner",
            status: "online"
        }
    ];

    useEffect(() => {
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
            <div className="bg-gray-900 min-h-screen p-8 text-white">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Available Doctors</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {doctors.map(doctor => (
                            <div key={doctor.id} className="bg-gray-800 rounded-lg p-6 flex items-center space-x-4">
                                <img 
                                    src={doctor.picture} 
                                    alt={doctor.name} 
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold">{doctor.name}</h2>
                                    <p className="text-gray-400">{doctor.specialist}</p>
                                    <div className="flex items-center mt-2">
                                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                                            doctor.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                                        }`}></span>
                                        <span className="text-sm capitalize">{doctor.status}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => handleCall(doctor)}
                                    disabled={doctor.status === 'offline'}
                                    className={`px-6 py-2 rounded-lg font-semibold ${
                                        doctor.status === 'online' 
                                            ? 'bg-blue-500 hover:bg-blue-600' 
                                            : 'bg-gray-600 cursor-not-allowed'
                                    }`}
                                >
                                    Call
                                </button>
                            </div>
                        ))}
                    </div>
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mt-8 bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="relative w-full h-screen">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>

                <div className="absolute top-4 right-4 w-32 h-48 bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden">
                    <img src={selectedDoctor?.picture} alt={selectedDoctor?.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-1 w-full">
                        <p className="text-xs">{selectedDoctor?.name}</p>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button onClick={handleEndCall} className="bg-red-500 hover:bg-red-600 p-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Telemed;
