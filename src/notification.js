
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = sessionStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link to="/app/" className="text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-xl font-bold text-gray-800">การแจ้งเตือน</h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4">
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notification, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="font-bold text-gray-800">{notification.header}</h2>
                  <p className="text-gray-600">{notification.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">ไม่มีการแจ้งเตือน</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
