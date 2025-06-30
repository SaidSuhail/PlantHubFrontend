// // import React from 'react'

// // function AssignedBookings() {
// //   return (
// //     <div>
      
// //     </div>
// //   )
// // }

// // export default AssignedBookings
// import React, { useEffect } from "react";
// import { Download, Plus } from "lucide-react";
// import { fetchProviderBookings, providerUpdateBookingStatus } from "../Features/providerSlice";
// import { useDispatch, useSelector } from "react-redux";

// function AssignedBookings() {
//    const dispatch = useDispatch();
//   const providerId = 1; // replace with actual logged-in provider ID
//   const { bookings, loadingBookings, updatingStatus } = useSelector((state) => state.provider);

//   useEffect(() => {
//     dispatch(fetchProviderBookings(providerId));
//   }, [dispatch, providerId]);

//   const handleStatusChange = (bookingId, currentStatus) => {
//     const nextStatus = currentStatus === "Pending" ? "InProgress"
//                       : currentStatus === "InProgress" ? "Success"
//                       : "Success"; // Already completed

//     dispatch(providerUpdateBookingStatus({ bookingId, status: nextStatus }));
//   };
//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen ml-36 rounded-4xl">
//       {/* Header */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
//         <h1 className="text-xl md:text-2xl font-bold text-gray-800">Orders</h1>
//         <div className="flex gap-2">
//           <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
//             <Download size={16} /> Export Data
//           </button>
//           <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
//             <Plus size={16} /> Create New Order
//           </button>
//         </div>
//       </div>

//       {/* Search & Filters */}
//       <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search orders..."
//           className="w-full md:w-1/2 px-4 py-2 border rounded-md"
//         />
//         <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
//           Filters
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         {[
//           { label: "Total Orders", value: 124, color: "bg-yellow-50", text: "text-yellow-600" },
//           { label: "Pending Orders", value: 28, color: "bg-orange-50", text: "text-orange-600" },
//           { label: "In Progress", value: 45, color: "bg-blue-50", text: "text-blue-600" },
//           { label: "Completed", value: 51, color: "bg-green-50", text: "text-green-600" },
//         ].map(({ label, value, color, text }) => (
//           <div key={label} className={`p-4 rounded-lg ${color}`}>
//             <p className="text-sm text-gray-500">{label}</p>
//             <p className={`text-xl font-bold ${text}`}>{value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Orders Table */}
//       <div className="overflow-auto bg-white rounded-lg shadow">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="px-6 py-3">Order ID</th>
//               <th className="px-6 py-3">Customer</th>
//               <th className="px-6 py-3">Service Type</th>
//               <th className="px-6 py-3">Date</th>
//               <th className="px-6 py-3">Amount</th>
//               <th className="px-6 py-3">Status</th>
//               <th className="px-6 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {[
//               {
//                 id: "ORD-2023-001",
//                 customer: "Emma Thompson",
//                 service: "Plant Health Check",
//                 date: "Oct 15, 2023",
//                 amount: "$75.00",
//                 status: "Pending",
//               },
//               {
//                 id: "ORD-2023-002",
//                 customer: "John Miller",
//                 service: "Monthly Maintenance",
//                 date: "Oct 14, 2023",
//                 amount: "$120.00",
//                 status: "In Progress",
//               },
//               {
//                 id: "ORD-2023-003",
//                 customer: "Sarah Wilson",
//                 service: "Emergency Care",
//                 date: "Oct 14, 2023",
//                 amount: "$95.00",
//                 status: "Completed",
//               },
//               {
//                 id: "ORD-2023-004",
//                 customer: "Michael Brown",
//                 service: "Plant Installation",
//                 date: "Oct 13, 2023",
//                 amount: "$150.00",
//                 status: "Completed",
//               },
//               {
//                 id: "ORD-2023-005",
//                 customer: "Lisa Anderson",
//                 service: "Pest Control",
//                 date: "Oct 13, 2023",
//                 amount: "$85.00",
//                 status: "Pending",
//               },
//             ].map((order) => (
//               <tr key={order.id} className="border-b hover:bg-gray-50">
//                 <td className="px-6 py-4 text-green-600 font-medium">{order.id}</td>
//                 <td className="px-6 py-4">{order.customer}</td>
//                 <td className="px-6 py-4">{order.service}</td>
//                 <td className="px-6 py-4">{order.date}</td>
//                 <td className="px-6 py-4 font-medium">{order.amount}</td>
//                 <td className="px-6 py-4">
//                   <span
//                     className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                       order.status === "Completed"
//                         ? "bg-green-100 text-green-700"
//                         : order.status === "In Progress"
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-orange-100 text-orange-700"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4">
//                   <button className="text-gray-500 hover:text-gray-700">⋮</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
//         <p>Showing 1 to 5 of 124 entries</p>
//         <div className="flex gap-1">
//           {[1, 2, 3, 4, 5].map((n) => (
//             <button
//               key={n}
//               className={`px-3 py-1 rounded-md ${
//                 n === 1
//                   ? "bg-green-600 text-white"
//                   : "bg-white text-gray-600 border hover:bg-gray-100"
//               }`}
//             >
//               {n}
//             </button>
//           ))}
//           <button className="px-3 py-1 rounded-md bg-white text-gray-600 border hover:bg-gray-100">
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AssignedBookings;
import React, { useEffect } from "react";
import { Download } from "lucide-react";
import { fetchProviderBookings, providerUpdateBookingStatus } from "../Features/providerSlice";
import { useDispatch, useSelector } from "react-redux";

function AssignedBookings() {
  const dispatch = useDispatch();
  const providerId = 1; // Replace with actual logged-in provider ID from token/store
const fullState = useSelector((state) => state);
console.log("🧠 Full Redux state from Notification providerrrrrrrrrr:", fullState);
  const { bookings, loadingBookings, updatingStatus } = useSelector((state) => state.provider);

  useEffect(() => {
  console.log("📦 Bookings in Redux:", bookings);
}, [bookings]);
const bookingStatusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Cancelled", value: "Cancelled" },
];

  useEffect(() => {
    dispatch(fetchProviderBookings(providerId));
  }, [dispatch, providerId]);

  // const handleStatusChange = (bookingId, currentStatus) => {
  //   const nextStatus =
  //     currentStatus === "Pending"
  //       ? "InProgress"
  //       : currentStatus === "InProgress"
  //       ? "Success"
  //       : "Success"; // Already completed

  //   dispatch(providerUpdateBookingStatus({ bookingId, status: nextStatus }));
  // };
const handleStatusChange = (bookingId, status) => {
  dispatch(providerUpdateBookingStatus({ bookingId, status }));
};

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen ml-36 rounded-4xl">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assigned Orders</h1>
        <button className="flex items-center gap-2 border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100">
          <Download size={16} /> Export
        </button>
      </div>

      {/* Orders Table */}
      <div className="overflow-auto bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loadingBookings ? (
              <tr>
                <td className="px-6 py-4" colSpan={7}>
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td className="px-6 py-4" colSpan={7}>
                  No orders assigned
                </td>
              </tr>
            ) : (
              bookings.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-green-600 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
                  <td className="px-6 py-4">{order.bookingType}</td>
                  <td className="px-6 py-4">{new Date(order.bookingDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">₹{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.bookingStatus === "Success"
                          ? "bg-green-100 text-green-700"
                          : order.bookingStatus === "InProgress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {order.bookingStatus}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4">
                    {order.bookingStatus !== "Success" && (
                      <button
                        onClick={() => handleStatusChange(order.id, order.bookingStatus)}
                        disabled={updatingStatus}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                      >
                        Mark as{" "}
                        {order.bookingStatus === "Pending" ? "In Progress" : "Completed"}
                      </button>
                    )}
                  </td> */}
                  {/* <td className="px-6 py-4">
  <select
    value={order.bookingStatus}
    onChange={(e) =>
      handleStatusChange(order.id, parseInt(e.target.value))
    }
    disabled={updatingStatus}
    className="px-2 py-1 border rounded-md text-sm"
  >
    <option value={1}>Pending</option>
    <option value={2}>Confirmed</option>
    <option value={3}>Cancelled</option>
  </select>
</td> */}
<td className="px-6 py-4">
  <select
    value={order.bookingStatus}
    onChange={(e) =>
      handleStatusChange(order.id, e.target.value)
    }
    className="border px-2 py-1 rounded text-sm"
    disabled={updatingStatus}
  >
    {bookingStatusOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</td>


                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssignedBookings;
