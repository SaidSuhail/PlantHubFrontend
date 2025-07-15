import React, { useEffect } from 'react';
import {
  fetchNotifications,
  markNotificationAsRead,
  setUserFromToken,
} from '../Features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function Notification() {
  const dispatch = useDispatch();
  const {
    userId,
    notifications = [],
    loadingNotifications = false,
    markingNotification = false,
  } = useSelector((state) => state.users || {});
console.log("📥 Notifications from Redux:", notifications);
const fullState = useSelector((state) => state);
console.log("🧠 Full Redux state from Notification.jsx:", fullState);


useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  console.log("🔐 Dispatching setUserFromToken");
  dispatch(setUserFromToken(token));

  try {
    const decoded = jwtDecode(token);
    const id =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    console.log("🎯 Decoded userId:", id);

    // Delay fetch until Redux is updated
    dispatch(fetchNotifications(id));
  } catch (err) {
    console.error("❌ Error decoding token:", err);
  }
}, [dispatch]); // ✅ Remove userId from dependency

  const handleMarkRead = (id) => {
    dispatch(markNotificationAsRead(id));
  };

  const markAllAsRead = () => {
    notifications.forEach((notification) => {
      if (!notification.isRead) {
        dispatch(markNotificationAsRead(notification.id));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-3xl py-8 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
          <button
            onClick={markAllAsRead}
            className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Mark All as Read
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
          {loadingNotifications ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No notifications available</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 flex ${
                  !notification.isRead ? 'bg-blue-50' : 'bg-white'
                } hover:bg-gray-50 transition-colors`}
              >
                <div className="flex-shrink-0 mr-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
                    {notification.icon || '🔔'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline">
                    <h2
                      className={`text-base font-medium ${
                        !notification.isRead ? 'text-indigo-800' : 'text-gray-900'
                      }`}
                    >
                      {notification.title || 'Notification'}
                    </h2>
                    <span className="ml-2 text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 truncate">
                    {notification.message}
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkRead(notification.id)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
                      disabled={markingNotification}
                    >
                      {markingNotification ? 'Marking...' : 'Mark as read'}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
