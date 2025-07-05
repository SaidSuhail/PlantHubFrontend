import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBookings, setUserFromToken } from "../Features/userSlice";
import { jwtDecode } from "jwt-decode";

const Bookings = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const { userBookings, loadingBookings, bookingsError, profile } = useSelector(
    (state) => state.users
  );

  // useEffect(() => {
  //   if (profile?.id) {
  //       console.log(fetchUserBookings)
  //     dispatch(fetchUserBookings(profile.id));
  //   }
  // }, [dispatch, profile]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(setUserFromToken(token));
    const decoded = jwtDecode(token);
    const userId =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    setUserId(userId);

    if (userId) {
      // dispatch(fetchUserAddresses(userId)); // Your API call
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch]);
  if (loadingBookings) {
    return (
      <div className="text-center text-lg font-medium py-10">
        Loading bookings...
      </div>
    );
  }

  if (bookingsError) {
    return (
      <div className="text-center text-red-500 py-10">{bookingsError}</div>
    );
  }

  if (!userBookings || userBookings.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">No bookings found.</div>
    );
  }

  // return (
  //   <div className="max-w-5xl mx-auto mt-12 p-6">
  //     <h1 className="text-3xl font-bold mb-6 ">My Bookings</h1>
  //     <div className="space-y-6">
  //       {userBookings.map((booking) => (
  //         <div
  //           key={booking.id}
  //           className="p-5 bg-white border shadow-md rounded-lg hover:shadow-lg transition duration-300"
  //         >
  //           <div className="flex flex-col md:flex-row justify-between mb-4">
  //             <div>
  //               <p className="text-lg font-semibold text-green-700">
  //                 Booking #{booking.id}
  //               </p>
  //               <p className="text-sm text-gray-600">
  //                 Date: {new Date(booking.bookingDate).toLocaleDateString()}
  //               </p>
  //               <p className="text-sm text-gray-600">
  //                 Status:{" "}
  //                 <span className="font-medium">{booking.bookingStatus}</span>
  //               </p>
  //               <p className="text-sm text-gray-600">
  //                 Provider:{" "}
  //                 <span className="font-medium">
  //                   {booking.providerName || "Unassigned"}
  //                 </span>
  //               </p>
  //             </div>
  //             <div className="text-right">
  //               <p className="text-sm text-gray-600">Total Price</p>
  //               <p className="text-xl font-bold text-gray-800">
  //                 ₹{booking.totalPrice}
  //               </p>
  //             </div>
  //           </div>

  //           <div className="border-t pt-4 mt-4">
  //             <h3 className="text-md font-semibold mb-2">Items:</h3>
  //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  //               {/* {booking.bookingItems.map((item) => (
  //                 <div key={item.id} className="flex items-center gap-4 border p-3 rounded">
  //                   <img
  //                     src={item.plantImage}
  //                     alt={item.plantName}
  //                     className="w-16 h-16 object-cover rounded"
  //                   />
  //                   <div>
  //                     <p className="font-semibold">{item.plantName}</p>
  //                     <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
  //                     <p className="text-sm text-gray-600">₹{item.totalPrice}</p>
  //                   </div>
  //                 </div>
  //               ))} */}
  //               {booking.bookingType === "PlantBooking" &&
  //                 booking.bookingItems?.map((item) => (
  //                   <div
  //                     key={item.id}
  //                     className="flex items-center gap-4 border p-3 rounded"
  //                   >
  //                     <img
  //                       src={item.plantImage}
  //                       alt={item.plantName}
  //                       className="w-16 h-16 object-cover rounded"
  //                     />
  //                     <div>
  //                       <p className="font-semibold">{item.plantName}</p>
  //                       <p className="text-sm text-gray-600">
  //                         Qty: {item.quantity}
  //                       </p>
  //                       <p className="text-sm text-gray-600">
  //                         ₹{item.totalPrice}
  //                       </p>
  //                     </div>
  //                   </div>
  //                 ))}

  //               {booking.bookingType === "ServiceBooking" &&
  //                 booking.serviceBookingItems?.map((item) => (
  //                   <div
  //                     key={item.id}
  //                     className="flex items-center gap-4 border p-3 rounded"
  //                   >
  //                     <div className="bg-green-100 text-green-800 font-bold w-12 h-12 rounded-full flex items-center justify-center text-lg">
  //                       🛠️
  //                     </div>
  //                     <div>
  //                       <p className="font-semibold">{item.serviceName}</p>
  //                       <p className="text-sm text-gray-600">
  //                         Duration: {item.duration}
  //                       </p>
  //                       <p className="text-sm text-gray-600">₹{item.totalPrice}</p>
  //                     </div>
  //                   </div>
  //                 ))}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  
  return (
  <div className="max-w-6xl mx-auto mt-8 p-4 sm:p-6">
    <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
      <div>
        <h1 className="text-3xl font-bold text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 1a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm4-4a1 1 0 100 2h.01a1 1 0 100-2H13zM9 9a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zM7 8a1 1 0 000 2h.01a1 1 0 000-2H7z" clipRule="evenodd" />
          </svg>
          My Bookings
        </h1>
        <p className="text-gray-500 mt-2">Your recent plant and service bookings</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-white border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
          Filter
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          New Booking
        </button>
      </div>
    </div>

    <div className="space-y-6">
      {userBookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          {/* Booking Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 border-b border-green-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <span className="text-2xl">
                    {booking.bookingType === "PlantBooking" ? "🌱" : "🛠️"}
                  </span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 flex items-center">
                    Booking #{booking.id}
                    <span className={`ml-3 text-xs px-2 py-1 rounded-full font-medium ${
                      booking.bookingStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.bookingStatus === "Success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {booking.bookingStatus}
                    </span>
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Provider: {booking.providerName || "Unassigned"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold text-gray-800">₹{booking.totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Booking Items */}
          <div className="p-5">
            <h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              Booking Items
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {booking.bookingType === "PlantBooking" &&
                booking.bookingItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-green-300 transition-colors group"
                  >
                    <div className="relative">
                      <img
                        src={item.plantImage}
                        alt={item.plantName}
                        className="w-16 h-16 object-cover rounded-lg border shadow-sm group-hover:shadow transition-all"
                        onError={(e) =>
                          (e.target.src = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400")
                        }
                      />
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-green-700 transition-colors">
                        {item.plantName}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500">Plant</span>
                        <span className="text-sm font-semibold text-gray-800">₹{item.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}

              {booking.bookingType === "ServiceBooking" &&
                booking.serviceBookingItems?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-blue-300 transition-colors group"
                  >
                    <div className="bg-blue-100 text-blue-800 font-bold w-14 h-14 rounded-lg flex items-center justify-center text-xl">
                      🛠️
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                        {item.serviceName}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {item.duration}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">₹{item.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Booking Footer */}
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
            <div className="flex gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Invoice
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Empty State */}
    {userBookings.length === 0 && (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
        <div className="mx-auto w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">No bookings yet</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          You haven't made any bookings yet. Start by exploring our plant collection or services.
        </p>
        <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
          Browse Plants
        </button>
      </div>
    )}
  </div>
);
};

export default Bookings;
