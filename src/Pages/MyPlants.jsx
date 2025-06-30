// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserBookings, setUserFromToken } from "../Features/userSlice";
// import { jwtDecode } from "jwt-decode";

// function MyPlants() {
//   const dispatch = useDispatch();
//     const [userId, setUserId] = useState(null);
//   const { userBookings, loadingBookings, bookingsError, profile } = useSelector(
//     (state) => state.users
//   );

  
//     useEffect(() => {
//       const token = localStorage.getItem("token");
//       if (!token) return;
//       dispatch(setUserFromToken(token));
//       const decoded = jwtDecode(token);
//       const userId =
//         decoded[
//           "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
//         ];
//       setUserId(userId);
  
//       if (userId) {
//         // dispatch(fetchUserAddresses(userId)); // Your API call
//               dispatch(fetchUserBookings(userId));
//       }
//     }, [dispatch]);
  

//   const allBookingItems = Array.isArray(userBookings)
//     ? userBookings
//         .filter((booking) => booking.bookingStatus === "Confirmed")
//         .flatMap((booking) => booking.bookingItems || [])
//     : [];

//   return (
//     <div className="bg-gray-50 font-sans">
//       {/* Hero Section */}
//       <div className="relative mt-19 h-48 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center flex items-center justify-center text-center overflow-hidden">
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1616627980237-dbd9a5be0f7e')",
//           }}
//         ></div>
//         <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-green-900/40"></div>
//         <div className="relative z-10 px-4 sm:px-6 md:px-8 animate-fadeIn">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg mb-2 sm:mb-3">
//             Manage Your Plants with Ease
//           </h1>
//           <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 drop-shadow-md max-w-md mx-auto">
//             Keep track of your plants’ care needs with PlantHub
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-8 sm:space-y-10 pb-8 sm:pb-12">
//         <div className="flex justify-between items-center mb-3 sm:mb-4">
//           <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
//             Your Plants
//           </h2>
//         </div>

//         {/* Loading/Error/Empty states */}
//         {loadingBookings ? (
//           <p className="text-center text-gray-600 text-lg">
//             Loading your plants...
//           </p>
//         ) : bookingsError ? (
//           <p className="text-center text-red-500 text-lg">{bookingsError}</p>
//         ) : allBookingItems.length === 0 ? (
//           <p className="text-gray-500">No plants found in your bookings.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
//             {allBookingItems.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="border rounded-xl p-3 sm:p-4 bg-white shadow hover:shadow-lg transition-all duration-200"
//               >
//                 <img
//                   src={item.plantImage}
//                   alt={item.plantName}
//                   className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md mb-2 sm:mb-3"
//                 />
//                 <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-1">
//                   {item.plantName}
//                 </h3>
//                 <p className="text-xs sm:text-sm text-green-600 mb-1 flex items-center gap-1">
//                   <span>💧</span> Quantity: {item.quantity}
//                 </p>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   Total Price: ₹{item.totalPrice}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Animation Keyframes (via Tailwind custom class)
// const styles = `
//   @keyframes fadeIn {
//     0% { opacity: 0; transform: translateY(20px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fadeIn {
//     animation: fadeIn 1s ease-out forwards;
//   }
// `;
// const styleSheet = document.createElement("style");
// styleSheet.innerText = styles;
// document.head.appendChild(styleSheet);

// export default MyPlants;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { fetchUserBookings, setUserFromToken } from "../Features/userSlice";
import { useNavigate } from "react-router-dom";

function MyPlants() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleItems, setVisibleItems] = useState([]);
  const [userId, setUserId] = useState(null);

  const { userBookings, loadingBookings, bookingsError } = useSelector(
    (state) => state.users
  );
const navigate = useNavigate();
  // On mount: decode userId from token and fetch bookings
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(setUserFromToken(token));
    const decoded = jwtDecode(token);
    const uid =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    setUserId(uid);

    if (uid) dispatch(fetchUserBookings(uid));
  }, [dispatch]);

  // Extract confirmed plant bookings
  const plantItems = Array.isArray(userBookings)
    ? userBookings
        .filter((b) => b.bookingStatus === "Confirmed" && b.bookingItems?.length)
        .flatMap((b) => b.bookingItems)
    : [];

  const filteredItems = plantItems.filter((item) =>
    item.plantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loading = loadingBookings;

  // Animate visible items on search or data change
  useEffect(() => {
    if (!loading && filteredItems.length > 0) {
      setVisibleItems([]);
      filteredItems.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, index]);
        }, index * 150);
      });
    }
  }, [loading, filteredItems.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-white-50">
      {/* Hero Section */}
      <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl mt-18"
          style={{
            backgroundImage:
              "url('https://ca-times.brightspotcdn.com/dims4/default/a270b39/2147483647/strip/true/crop/3637x2425+0+0/resize/2400x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F91%2F9a%2F748826294495bebf8b77fc8c51c9%2Foutdoorplants.jpg')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-teal-900/80 rounded-3xl mt-18"></div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full animate-pulse"></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              My Plant Collection
            </h1>
            <p className="text-base sm:text-lg text-green-100 drop-shadow-md max-w-2xl mx-auto">
              Your personal garden sanctuary - track and nurture your plants
            </p>
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{plantItems.length}</div>
                <div className="text-green-200 text-sm">Plants</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-green-200 text-sm">Healthy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 space-y-8">
        {/* Search */}
        <div className="bg-white/90 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-bold text-green-800">
              Your Plants ({filteredItems.length})
            </h2>
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search your plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500">
                🔍
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <p className="text-green-700 text-lg">Loading your plants...</p>
          </div>
        ) : bookingsError ? (
          <p className="text-red-500 text-center">{bookingsError}</p>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <span className="text-6xl mb-6 block">🌿</span>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No Plants Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? "No plants match your search." : "Start your plant journey today!"}
            </p>
            <button
              onClick={() => {
                if(searchTerm){
                setSearchTerm("");
                }else{
                  navigate("/library")
                }
              }}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors duration-200"
            >
              {searchTerm ? "Clear Search" : "Browse Plants"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-green-200 transform ${
                  visibleItems.includes(idx)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transition: `all 0.6s ease-out ${idx * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.plantImage}
                    alt={item.plantName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400";
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full px-3 py-1 text-xs font-semibold text-green-700 shadow-lg">
                    ✨ Yours
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-green-700 transition-colors duration-300">
                    {item.plantName}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Qty: {item.quantity}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total Price</p>
                      <p className="text-lg font-bold text-gray-800">₹{item.totalPrice}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                    <span>🌱</span>
                    <span className="text-xs text-green-700 font-medium">Healthy & Growing</span>
                  </div>

                  <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => alert(`Care tips for ${item.plantName}`)}
                      className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                      Care Tips
                    </button>
                    <button
                      onClick={() => alert(`Details for ${item.plantName}`)}
                      className="flex-1 border border-green-600 text-green-600 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-50"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Plant Care Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-3xl">💧</span>
              <h4 className="font-semibold text-green-700">Watering</h4>
              <p className="text-sm text-green-600">Keep soil moist but not waterlogged</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl">☀️</span>
              <h4 className="font-semibold text-green-700">Light</h4>
              <p className="text-sm text-green-600">Most plants need bright, indirect light</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl">🌡️</span>
              <h4 className="font-semibold text-green-700">Temperature</h4>
              <p className="text-sm text-green-600">Maintain 65-75°F for optimal growth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPlants;
