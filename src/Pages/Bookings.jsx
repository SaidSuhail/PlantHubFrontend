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

  return (
    <div className="max-w-5xl mx-auto mt-12 p-6">
      <h1 className="text-3xl font-bold mb-6 ">My Bookings</h1>
      <div className="space-y-6">
        {userBookings.map((booking) => (
          <div
            key={booking.id}
            className="p-5 bg-white border shadow-md rounded-lg hover:shadow-lg transition duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-green-700">
                  Booking #{booking.id}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium">{booking.bookingStatus}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Provider:{" "}
                  <span className="font-medium">
                    {booking.providerName || "Unassigned"}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-xl font-bold text-gray-800">
                  ₹{booking.totalPrice}
                </p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-md font-semibold mb-2">Items:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* {booking.bookingItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 border p-3 rounded">
                    <img
                      src={item.plantImage}
                      alt={item.plantName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.plantName}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">₹{item.totalPrice}</p>
                    </div>
                  </div>
                ))} */}
                {booking.bookingType === "PlantBooking" &&
                  booking.bookingItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border p-3 rounded"
                    >
                      <img
                        src={item.plantImage}
                        alt={item.plantName}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.plantName}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.totalPrice}
                        </p>
                      </div>
                    </div>
                  ))}

                {booking.bookingType === "ServiceBooking" &&
                  booking.serviceBookingItems?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border p-3 rounded"
                    >
                      <div className="bg-green-100 text-green-800 font-bold w-12 h-12 rounded-full flex items-center justify-center text-lg">
                        🛠️
                      </div>
                      <div>
                        <p className="font-semibold">{item.serviceName}</p>
                        <p className="text-sm text-gray-600">
                          Duration: {item.duration}
                        </p>
                        <p className="text-sm text-gray-600">₹{item.totalPrice}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
