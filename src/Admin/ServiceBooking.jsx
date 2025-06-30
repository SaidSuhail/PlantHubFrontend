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

const ServiceBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [assignProvider, setAssignProvider] = useState({});
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  const dispatch = useDispatch();

  useEffect(() => {
dispatch(fetchAllProviders());
    dispatch(fetchPendingBookings());
  }, [dispatch]);

  const { pendingBookings, loadingPendingBookings } = useSelector(
    (state) => state.admin
  );
  // const allUsers = useSelector((state) => state.users.users); // 👈 fix here

  // const providers = allUsers.filter((u) => u.role === "Provider");
  const { providers, loadingProviders } = useSelector((state) => state.admin);

  console.log("ededededed", providers);
  const fullState = useSelector((state) => state);
  console.log(
    "🧠 Full Redux state from Notification.jsx in Bokiiiiiiiiiiiiingsss:",
    fullState
  );
  // const confirmAssignProvider = (bookingId) => {
  //   const providerId = assignProvider[bookingId];
  //   if (providerId) {
  //     dispatch(assignProviderToBooking({ bookingId, providerId }))
  //       .unwrap()
  //       .then(() => setAssignProvider((prev) => ({ ...prev, [bookingId]: "" })))
  //       .catch((err) => alert(err));
  //   }
  // };
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

  // const provider = providers.find(p => p.id === parseInt(providerId));
  // if (!provider) {
  //   alert("Invalid provider selected.");
  //   return;
  // }
// const provider = providers.find((p) =>{
//       console.log("Checking provider:", p); // ✅ Log each provider

//    p.id === providerId});
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
    .then(() => setAssignProvider(prev => ({ ...prev, [bookingId]: '' })))
    .catch((err) => alert("Failed to assign provider: " + err));
};


  useEffect(() => {
    setBookings(pendingBookings); // Optional local control
  }, [pendingBookings]);

  // const providers = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve'];
  const statusOptions = [
    "All",
    "Pending",
    "In Progress",
    "Completed",
    "Accepted",
    "Rejected",
    "Assigned",
  ];

  useEffect(() => {
    setBookings(pendingBookings);
    // setFilteredBookings(sampleData);
  }, [pendingBookings]);

  useEffect(() => {
    let results = bookings;

    if (statusFilter !== "All") {
      results = results.filter((b) => b.status === statusFilter);
    }

    if (serviceFilter !== "All") {
      results = results.filter((b) => b.service === serviceFilter);
    }

    if (searchTerm) {
      results = results.filter(
        (b) =>
          b.id.toString().includes(searchTerm) ||
          b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          b.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(results);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, serviceFilter, bookings]);

  const handleSelectProvider = (id, value) => {
    setAssignProvider((prev) => ({ ...prev, [id]: value }));
  };

  // const confirmAssignProvider = (id) => {
  //   const selectedProvider = assignProvider[id];
  //   if (selectedProvider) {
  //     const updated = bookings.map(b =>
  //       b.id === id ? { ...b, provider: selectedProvider, status: 'Assigned' } : b
  //     );
  //     setBookings(updated);
  //     setAssignProvider(prev => ({ ...prev, [id]: '' }));
  //   }
  // };

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

  const serviceOptions = ["All", ...new Set(bookings.map((b) => b.service))];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Service Bookings</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="text"
          placeholder="Search by ID, customer, or service"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md px-4 py-2 w-full sm:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          {statusOptions.map((status, idx) => (
            <option key={idx} value={status}>
              {status}
            </option>
          ))}
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          {serviceOptions.map((service, idx) => (
            <option key={idx} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left font-medium text-gray-700">
            <tr>
              <th className="px-4 py-3">Booking ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Assign Provider</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentBookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                {/* <td className="px-4 py-3 font-semibold">{b.user.id}</td> */}
            {/* <td className="px-4 py-3">{b.user.name}</td>
                <td className="px-4 py-3">{b.serviceName}</td> */}
            {/* <td className="px-4 py-3">{b.datetime}</td>
                <td className="px-4 py-3"> */}
            {/* <div className="flex items-center space-x-2">
                    <select
                      value={assignProvider[b.id] || ''}
                      onChange={(e) => handleSelectProvider(b.id, e.target.value)}
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="">-- Select --</option>
                      {providers.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => confirmAssignProvider(b.id)}
                      className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                  </div> */}
            {/* {b.provider && <div className="text-xs text-gray-500 mt-1">Assigned to {b.provider}</div>} */}
            {/* {b.providerId && (
  <div className="text-xs text-gray-500 mt-1">
    Assigned to {providers.find(p => p.id === b.providerId)?.name || 'Unknown'}
  </div>
)} */}

            {/* </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${statusStyles[b.status]}`}>
                    {statusIcons[b.status]} {b.status}
                  </span>
                </td> */}
            {/* <td className="px-4 py-3 font-medium">{b.amount}</td>
              </tr>
            ))} */}
            {currentBookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{b.id}</td>
                <td className="px-4 py-3">{b.userName}</td>
                <td className="px-4 py-3">
                  {b.serviceBookingItems
                    ?.map((item) => item.serviceName)
                    .join(", ") || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {new Date(b.bookingDate).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <select
                      value={assignProvider[b.id] || ""}
                      onChange={(e) =>
                        handleSelectProvider(b.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded-md"
                    >
                      <option value="">-- Select --</option>
                      {/* {providers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))} */}
                      {/* {providers.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.userName}
                        </option>
                      ))} */}
                      {providers.map((p) => (
  <option key={p.id} value={p.id}>
    {p.providerName || p.userName}
  </option>
))}

                    </select>
                    <button
                      onClick={() => confirmAssignProvider(b.id)}
                      className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                  </div>
                  {/* {b.providerId && (
                    <div className="text-xs text-gray-500 mt-1">
                      Assigned to{" "}
                      {providers.find((p) => p.id === b.providerId)?.name ||
                        "Unknown"}
                    </div>
                  )} */}
                  {b.providerId && (
  <div className="text-xs text-gray-500 mt-1">
    Assigned to{" "}
    {providers.find((p) => p.id === b.providerId)?.providerName ||
      providers.find((p) => p.id === b.providerId)?.userName ||
      "Unknown"}
  </div>
)}

                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full font-medium ${
                      statusStyles[b.bookingStatus]
                    }`}
                  >
                    {statusIcons[b.bookingStatus]} {b.bookingStatus}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">₹{b.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
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
              currentPage === idx + 1 ? "bg-blue-500 text-white" : ""
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
