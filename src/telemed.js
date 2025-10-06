import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Telemed() {
    const navigate = useNavigate();
    const videoRef = useRef(null);

    useEffect(() => {
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

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white">
            <div className="relative w-full h-screen">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>

                <div className="absolute top-4 right-4 w-32 h-48 bg-gray-800 border-2 border-gray-700 rounded-lg overflow-hidden">
                    <img src="/img/son.jpeg" alt="Doctor" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-1">
                        <p className="text-xs">Doctor</p>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <button onClick={() => navigate(-1)} className="bg-red-500 hover:bg-red-600 p-4 rounded-full">
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
