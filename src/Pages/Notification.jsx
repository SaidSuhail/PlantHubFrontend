// import React, { useEffect, useState } from 'react';
// import { fetchNotifications } from '../Features/userSlice';
// import { useDispatch, useSelector } from 'react-redux';

// function Notification() {
//   const dispatch = useDispatch();
// const { notifications, loadingNotifications } = useSelector((state) => state.user);
  
// useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);

//   // Mark notification as read
//   // const markAsRead = (id) => {
//   //   setNotifications(notification.map(notification => 
//   //     notification.id === id ? { ...notification, read: true } : notification
//   //   ));
//   // };

//   // // Mark all notifications as read
//   // const markAllAsRead = () => {
//   //   setNotifications(notifications.map(notification => ({
//   //     ...notification,
//   //     read: true
//   //   })));
//   // };

//   return (
//     <div className="min-h-screen bg-gray-50 rounded-3xl py-8 px-4 sm:px-6 lg:px-8 mt-20">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
//           <button 
//             onClick={markAllAsRead}
//             className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         {/* Notification List
//         <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
//           {notifications.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500">No notifications available</p>
//             </div>
//           ) : (
//             notifications.map((notification) => (
//               <div 
//                 key={notification.id} 
//                 className={`p-4 flex ${!notification.read ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}
//               >
//                 {/* Icon */}
//                 {/* <div className="flex-shrink-0 mr-4">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
//                     {notification.icon}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 {/* <div className="flex-1 min-w-0">
//                   <div className="flex items-baseline">
//                     <h2 className={`text-base font-medium ${!notification.read ? 'text-indigo-800' : 'text-gray-900'}`}>
//                       {notification.title}
//                     </h2>
//                     <span className="ml-2 text-xs text-gray-500">
//                       {notification.time}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-600 truncate">
//                     {notification.message}
//                   </p>
//                 </div> */}

//                 {/* Action */}
//                 {/* <div className="flex items-center ml-4">
//                   {!notification.read && (
//                     <button
//                       onClick={() => markAsRead(notification.id)}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-900 focus:outline-none"
//                     >
//                       Mark as read
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div> */} 

//               {/* Notification List */}
//         <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
//           {loadingNotifications ? (
//             <div className="text-center py-12 text-gray-500">Loading...</div>
//           ) : notifications.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">No notifications available</div>
//           ) : (
//             notifications.map((notification) => (
//               <div 
//                 key={notification.id} 
//                 className={`p-4 flex ${!notification.read ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50 transition-colors`}
//               >
//                 {/* Icon */}
//                 <div className="flex-shrink-0 mr-4">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
//                     {notification.icon || '🔔'}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-baseline">
//                     <h2 className={`text-base font-medium ${!notification.read ? 'text-indigo-800' : 'text-gray-900'}`}>
//                       {notification.title}
//                     </h2>
//                     <span className="ml-2 text-xs text-gray-500">{notification.time}</span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-600 truncate">
//                     {notification.message}
//                   </p>
//                 </div>

//                 {/* Action */}
//                 <div className="flex items-center ml-4">
//                   {!notification.read && (
//                     <button
//                       onClick={() => handleMarkRead(notification.id)}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
//                     >
//                       Mark as read
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Empty state */}
//         {notifications.length === 0 && (
//           <div className="mt-8 text-center">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               ></path>
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               You'll see important alerts here when they appear.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notification;

// import React, { useEffect } from 'react';
// import {
//   fetchNotifications,
//   markNotificationAsRead,
//   setUserFromToken,
// } from '../Features/userSlice';
// import { useDispatch, useSelector } from 'react-redux';

// function Notification() {
//   const dispatch = useDispatch();

//   const {
//     userId,
//     notifications = [],
//     loadingNotifications = false,
//     markingNotification = false,
//   } = useSelector((state) => state.user || {});

//   // useEffect(() => {
//   //   // ✅ Only fetch if userId is available
//   //   if (userId) {
//   //     dispatch(fetchNotifications(userId));
//   //   }
//   // }, [dispatch, userId]);
// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   dispatch(setUserFromToken(token)); // This sets userId in Redux
// }, [dispatch]);

// useEffect(() => {
//   console.log("📦 userId from Redux:", userId);
//   if (userId) {
//     dispatch(fetchNotifications(userId));
//   }
// }, [dispatch, userId]);

//   const handleMarkRead = (id) => {
//     dispatch(markNotificationAsRead(id));
//   };

//   const markAllAsRead = () => {
//     notifications.forEach((notification) => {
//       if (!notification.read) {
//         dispatch(markNotificationAsRead(notification.id));
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 rounded-3xl py-8 px-4 sm:px-6 lg:px-8 mt-20">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
//           <button
//             onClick={markAllAsRead}
//             className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         {/* Notification List */}
//         <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
//           {loadingNotifications ? (
//             <div className="text-center py-12 text-gray-500">Loading...</div>
//           ) : notifications.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">No notifications available</div>
//           ) : (
//             notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 flex ${
//                   !notification.read ? 'bg-blue-50' : 'bg-white'
//                 } hover:bg-gray-50 transition-colors`}
//               >
//                 {/* Icon */}
//                 <div className="flex-shrink-0 mr-4">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
//                     {notification.icon || '🔔'}
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-baseline">
//                     <h2
//                       className={`text-base font-medium ${
//                         !notification.read ? 'text-indigo-800' : 'text-gray-900'
//                       }`}
//                     >
//                       {notification.title}
//                     </h2>
//                     <span className="ml-2 text-xs text-gray-500">{notification.time}</span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-600 truncate">
//                     {notification.message}
//                   </p>
//                 </div>

//                 {/* Action */}
//                 <div className="flex items-center ml-4">
//                   {!notification.read && (
//                     <button
//                       onClick={() => handleMarkRead(notification.id)}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
//                       disabled={markingNotification}
//                     >
//                       {markingNotification ? 'Marking...' : 'Mark as read'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Empty State */}
//         {notifications.length === 0 && !loadingNotifications && (
//           <div className="mt-8 text-center">
//             <svg
//               className="mx-auto h-12 w-12 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               ></path>
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               You'll see important alerts here when they appear.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Notification;

// import React, { useEffect } from 'react';
// import {
//   fetchNotifications,
//   markNotificationAsRead,
//   setUserFromToken,
// } from '../Features/userSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';

// function Notification() {
//   const dispatch = useDispatch();
//   const {
//     userId,
//     notifications = [],
//     loadingNotifications = false,
//     markingNotification = false,
//   } = useSelector((state) => state.user || {});

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     console.log("🔐 Dispatching setUserFromToken");
//     dispatch(setUserFromToken(token)); // Update Redux state

//     // Decode token locally for immediate use
//     try {
//       const decoded = jwtDecode(token);
//       const userId =
//         decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
//       console.log("🎯 Decoded userId:", userId);
//       dispatch(fetchNotifications(userId)); // Fetch immediately
//     } catch (err) {
//       console.error("❌ Error decoding token:", err);
//     }
//   }, [dispatch,userId]);

//   const handleMarkRead = (id) => {
//     dispatch(markNotificationAsRead(id));
//   };

//   const markAllAsRead = () => {
//     notifications.forEach((notification) => {
//       if (!notification.read) {
//         dispatch(markNotificationAsRead(notification.id));
//       }
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 rounded-3xl py-8 px-4 sm:px-6 lg:px-8 mt-20">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
//           <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
//           <button
//             onClick={markAllAsRead}
//             className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
//           {loadingNotifications ? (
//             <div className="text-center py-12 text-gray-500">Loading...</div>
//           ) : notifications.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">No notifications available</div>
//           ) : (
//             notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 flex ${
//                   !notification.read ? 'bg-blue-50' : 'bg-white'
//                 } hover:bg-gray-50 transition-colors`}
//               >
//                 <div className="flex-shrink-0 mr-4">
//                   <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
//                     {notification.icon || '🔔'}
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-baseline">
//                     <h2
//                       className={`text-base font-medium ${
//                         !notification.read ? 'text-indigo-800' : 'text-gray-900'
//                       }`}
//                     >
//                       {notification.title}
//                     </h2>
//                     <span className="ml-2 text-xs text-gray-500">{notification.time}</span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-600 truncate">
//                     {notification.message}
//                   </p>
//                 </div>
//                 <div className="flex items-center ml-4">
//                   {!notification.read && (
//                     <button
//                       onClick={() => handleMarkRead(notification.id)}
//                       className="text-sm font-medium text-indigo-600 hover:text-indigo-900"
//                       disabled={markingNotification}
//                     >
//                       {markingNotification ? 'Marking...' : 'Mark as read'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notification;

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

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;

  //   console.log("🔐 Dispatching setUserFromToken");
  //   dispatch(setUserFromToken(token));

  //   try {
  //     const decoded = jwtDecode(token);
  //     const userId =
  //       decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  //     console.log("🎯 Decoded userId:", userId);
  //     dispatch(fetchNotifications(userId));
  //   } catch (err) {
  //     console.error("❌ Error decoding token:", err);
  //   }
  // }, [dispatch, userId]);
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
