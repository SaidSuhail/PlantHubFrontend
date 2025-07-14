import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaHourglassHalf } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { fetchUsers } from "../Features/userSlice";
import {
  assignProviderToBooking,
  fetchAllProviders,
  fetchPendingBookings,
} from "../Features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [assignProvider, setAssignProvider] = useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;
  const [bookingTypeFilter, setBookingTypeFilter] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProviders());
    dispatch(fetchPendingBookings());
  }, [dispatch]);

  const { pendingBookings, loadingPendingBookings } = useSelector(
    (state) => state.admin
  );

  const { providers, loadingProviders } = useSelector((state) => state.admin);

  console.log("ededededed", providers);
  const fullState = useSelector((state) => state);
  console.log(
    "🧠 Full Redux state from Notification.jsx in Bokiiiiiiiiiiiiingsss:",
    fullState
  );

  const confirmAssignProvider = (bookingId) => {
    // const providerId = assignProvider[bookingId];
    const providerId = parseInt(assignProvider[bookingId]);
    console.log("Parsed provider ID:", providerId);

    if (isNaN(providerId)) {
      alert("Invalid provider ID selected.");
      return;
    }

    if (!providerId) {
      alert("Please select a provider before confirming.");
      return;
    }

    const provider = providers.find((p) => {
      console.log("Checking provider:", p);
      return p.id === providerId; // <-- ✅ RETURN statement added
    });

    if (!provider) {
      alert("Selected provider not found in list.");
      return;
    }
    console.log("Dispatching with:", { bookingId, providerId });

    dispatch(assignProviderToBooking({ bookingId, providerId }))
      .unwrap()
      .then(() => setAssignProvider((prev) => ({ ...prev, [bookingId]: "" })))
      .catch((err) => alert("Failed to assign provider: " + err));
  };

  useEffect(() => {
    setBookings(pendingBookings);
  }, [pendingBookings]);

  const statusOptions = ["All", "Pending", "Assigned"];

  useEffect(() => {
    setBookings(pendingBookings);
  }, [pendingBookings]);

  useEffect(() => {
    let results = bookings;

    if (statusFilter === "All") {
      // no need to filter
    } else if (statusFilter === "Assigned") {
      results = results.filter((b) => b.providerId !== null);
    } else if (statusFilter === "Pending") {
      results = results.filter((b) => b.providerId === null);
    }

    if (bookingTypeFilter !== "All") {
      results = results.filter((b) => b.bookingType === bookingTypeFilter);
    }
    if (startDate) {
      results = results.filter((b) => new Date(b.bookingDate) >= startDate);
    }
    if (endDate) {
      results = results.filter((b) => new Date(b.bookingDate) <= endDate);
    }

    if (searchTerm) {
      results = results.filter((b) => {
        const serviceNames = b.serviceBookingItems
          ?.map((item) => item.serviceName)
          .join(", ")
          .toLowerCase();

        return (
          b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          serviceNames.includes(searchTerm.toLowerCase()) ||
          (b.providerName?.toLowerCase() || "").includes(
            searchTerm.toLowerCase()
          )
        );
      });
    }

    results = [...results].sort(
      (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
    );

    setFilteredBookings(results);
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    serviceFilter,
    bookings,
    bookingTypeFilter,
    startDate,
    endDate,
  ]);

  const handleSelectProvider = (id, value) => {
    setAssignProvider((prev) => ({ ...prev, [id]: value }));
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Accepted: "bg-green-200 text-green-800",
    Rejected: "bg-red-200 text-red-800",
    Assigned: "bg-purple-100 text-purple-800",
  };

  const statusIcons = {
    Pending: <FaClock className="mr-1" />,
    "In Progress": <FaHourglassHalf className="mr-1" />,
    Completed: <FaCheckCircle className="mr-1" />,
    Accepted: <FaCheckCircle className="mr-1" />,
    Rejected: <FaHourglassHalf className="mr-1" />,
    Assigned: <GiConfirmed className="mr-1" />,
  };

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-3xl">
      <h2 className="text-2xl  md:text-3xl font-bold mb-6 text-emerald-700">
        {bookingTypeFilter === "All"
          ? "All Booking"
          : bookingTypeFilter === "ServiceBooking"
          ? "Service Bookings"
          : "Plant Bookings"}
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/3 px-4 py-2 text-sm border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-gray-400"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-gray-700"
        >
          {statusOptions.map((status, idx) => (
            <option key={idx} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Date filter section */}

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              From:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start date"
              className="border bg-white border-gray-300 px-3 py-2 rounded-md text-sm w-[140px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 whitespace-nowrap">
              To:
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="End date"
              className="border bg-white border-gray-300 px-3 py-2 rounded-md text-sm w-[140px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
              dateFormat="yyyy-MM-dd"
              isClearable
            />
          </div>
        </div>

        <select
          value={bookingTypeFilter}
          onChange={(e) => setBookingTypeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-150"
        >
          <option value="All">All Types</option>
          <option value="ServiceBooking">Service Booking</option>
          <option value="PlantBooking">Plant Booking</option>
        </select>

        <button
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("All");
            setServiceFilter("All");
            setStartDate(null);
            setEndDate(null);
          }}
          className="ml-auto bg-gray-100 hover:bg-gray-200 text-sm px-4 py-2 rounded-md text-gray-700 border border-gray-300 transition-colors duration-150"
        >
          Clear Filters
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-4">
        Showing {indexOfFirstBooking + 1} to{" "}
        {Math.min(indexOfLastBooking, filteredBookings.length)} of{" "}
        {filteredBookings.length} results
      </p>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left font-medium text-gray-700">
            <tr>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Booking Type</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Assign Provider</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((b, index) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">
                  {indexOfFirstBooking + index + 1}
                </td>
                <td className="px-4 py-3">{b.userName}</td>
                <td className="px-4 py-3">{b.bookingType}</td>

                <td className="px-4 py-3">
                  {new Date(b.bookingDate).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    {b.providerId ? (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded font-medium">
                        {providers.find((p) => p.id === b.providerId)
                          ?.providerName ||
                          providers.find((p) => p.id === b.providerId)
                            ?.userName ||
                          "Assigned"}
                      </span>
                    ) : (
                      <>
                        <select
                          value={assignProvider[b.id] || ""}
                          onChange={(e) =>
                            handleSelectProvider(b.id, e.target.value)
                          }
                          className="border px-2 py-1 rounded-md"
                        >
                          <option value="">-- Select --</option>
                          {providers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.providerName || p.userName}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => confirmAssignProvider(b.id)}
                          className="bg-emerald-500 text-white text-xs px-2 py-1 rounded hover:bg-emerald-600"
                        >
                          Confirm
                        </button>
                      </>
                    )}
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${
                      b.providerId
                        ? statusStyles["Assigned"]
                        : statusStyles[b.bookingStatus]
                    }`}
                  >
                    {b.providerId
                      ? statusIcons["Assigned"]
                      : statusIcons[b.bookingStatus]}{" "}
                    {b.providerId ? "Assigned" : b.bookingStatus}
                  </span>
                </td>

                <td className="px-4 py-3 font-medium">₹{b.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2 ">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === idx + 1 ? "bg-emerald-500 text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceBooking;
