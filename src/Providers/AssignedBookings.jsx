import React, { useEffect } from "react";
import { Download } from "lucide-react";
import {
  fetchProviderBookings,
  providerUpdateBookingStatus,
} from "../Features/providerSlice";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import Papa from "papaparse";

function AssignedBookings() {
  const dispatch = useDispatch();
  const providerId = 1; 
  const fullState = useSelector((state) => state);
  console.log(
    "🧠 Full Redux state from Notification providerrrrrrrrrr:",
    fullState
  );
  const { bookings, loadingBookings, updatingStatus } = useSelector(
    (state) => state.provider
  );
  const [statusFilter, setStatusFilter] = React.useState("All");

  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const filteredBookings =
    statusFilter === "All"
      ? bookings
      : bookings.filter((b) => b.bookingStatus === statusFilter);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

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

  const handleStatusChange = (bookingId, status) => {
    dispatch(providerUpdateBookingStatus({ bookingId, status }));
  };
  const handleExport = () => {
    if (bookings.length === 0) return;

    const exportData = bookings.map((order, index) => ({
      "Order #": index + 1,
      Customer: order.userName || "N/A",
      Type: order.bookingType,
      Date: new Date(order.bookingDate).toLocaleDateString(),
      Amount: order.totalPrice,
      Status: order.bookingStatus,
    }));

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Assigned_Bookings.csv");
  };

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-emerald-50 to-white min-h-screen lg:ml-48 rounded-4xl">
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-emerald-700">Assigned Orders</h1>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-2 rounded-lg text-sm text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
            onClick={handleExport}
          >
            <Download size={16} /> Export
          </button>
        </div>
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
              paginatedBookings.map((order, index) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-green-600 font-medium">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-6 py-4">{order.userName || "N/A"}</td>
                  <td className="px-6 py-4">{order.bookingType}</td>
                  <td className="px-6 py-4">
                    {new Date(order.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-medium">₹{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.bookingStatus === "Confirmed"
                          ? "bg-green-700 text-white"
                          : order.bookingStatus === "Cancelled"
                          ? "bg-red-700 text-white"
                          : "bg-blue-700 text-white"
                      }`}
                    >
                      {order.bookingStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={order.bookingStatus}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm"
                      // disabled={updatingStatus}
                      disabled={
                        updatingStatus || order.bookingStatus !== "Pending"
                      }
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
        <div className="flex justify-end mt-8 mb-8 space-x-2 mr-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default AssignedBookings;
