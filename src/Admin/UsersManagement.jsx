import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  User,
  Activity,
  UserPlus,
  Clock,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUnblockUser,
  fetchUsers,
  registerUser,
} from "../Features/userSlice";
import { toast, Toaster } from "sonner";

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("User Created Successfull");
        setShowAddUserModal(false);
        setFormData({ userName: "", userEmail: "", password: "", phone: "" });
        dispatch(fetchUsers());
      } else {
        toast.error("Failed To Create User");
      }
    });
  };

  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const handleBlockUnblock = (userId) => {
    dispatch(blockUnblockUser(userId));
  };

  const allUsers = users.filter((user) => user.role === "User");
  const totalUsers = allUsers.length;
  const activeUsers = allUsers.filter((user) => !user.isBlocked).length;
  const blockedUsers = allUsers.filter((user) => user.isBlocked).length;
  const newUsers = allUsers.filter((user) => {
    const createdDate = new Date(user.createdAt);
    const daysDiff = (new Date() - createdDate) / (1000 * 60 * 60 * 24);
    return daysDiff <= 7;
  }).length;

  const stats = [
    {
      title: "Total Users",
      value: totalUsers,
      change: "+0%", // You can add logic for change if needed
      icon: <User className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Active Users",
      value: activeUsers,
      change: "+0%",
      icon: <Activity className="h-5 w-5 text-green-500" />,
    },
    {
      title: "New Users (7 days)",
      value: newUsers,
      change: "+0%",
      icon: <UserPlus className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Blocked Users",
      value: blockedUsers,
      change: "+0%",
      icon: <X className="h-5 w-5 text-red-500" />,
    },
  ];

  const filteredUsers = users
    .filter((user) => user.role === "User")
    .filter(
      (user) =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((user) => {
      if (statusFilter === "Active") return !user.isBlocked;
      if (statusFilter === "Blocked") return user.isBlocked;
      return true; // "All"
    });

  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const getStatusBadge = (isBlocked) => {
    const status = isBlocked ? "Blocked" : "Active";

    switch (status) {
      case "Active":
        return (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
            Active
          </span>
        );
      case "Blocked":
        return (
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
            Blocked
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
            Unknown
          </span>
        );
    }
  };

  if (loadingUsers) return <p className="p-4 text-center">Loading users...</p>;
  if (errorUsers)
    return <p className="p-4 text-center text-red-600">Error: {errorUsers}</p>;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-emerald-50 to-white  min-h-screen rounded-3xl">
      {/* Header */}
      <Toaster position="top-right" richColors />
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
          User Management
        </h1>
        <p className="text-emerald-500 mt-1">
          Manage and monitor user accounts
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {stat.value}
                </h2>
                <p
                  className={`text-xs mt-2 ${
                    stat.change.startsWith("+")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showFilterDropdown && (
                <div className="absolute mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {["All", "Active", "Blocked"].map((status) => (
                    <button
                      key={status}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                        statusFilter === status
                          ? "bg-gray-100 font-semibold"
                          : ""
                      }`}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowFilterDropdown(false);
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => setShowAddUserModal(true)}
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4 font-medium">USERID</th>
                <th className="py-3 px-4 font-medium">NAME</th>
                <th className="py-3 px-4 font-medium">EMAIL</th>
                <th className="py-3 px-4 font-medium">JOIN DATE</th>
                <th className="py-3 px-4 font-medium">STATUS</th>
                <th className="py-3 px-4 font-medium">LAST ACTIVITY</th>
                <th className="py-3 px-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.isArray(paginatedUsers) &&
                paginatedUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-800">
                      {startIndex + index + 1}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.userName}
                            className="w-8 h-8 rounded-full object-cover border"
                          />
                        ) : (
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" />
                        )}
                        <span>{user.userName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {user.userEmail}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.isBlocked)}
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      {formatDate(user.updatedAt)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleBlockUnblock(user.id)}
                          className={`px-3 py-1 rounded text-sm font-medium ${
                            user.isBlocked
                              ? "bg-green-500 hover:bg-green-600"
                              : "bg-red-500 hover:bg-red-600"
                          } text-white`}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + usersPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} results
          </p>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 5}
              onClick={() => setCurrentPage((prev) => Math.min(5, prev + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {showAddUserModal && (
              <div className="fixed inset-0  backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300 ease-out">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-[0.98] hover:scale-100">
                  <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                    <h2 className="text-2xl font-bold text-white">
                      Create New User
                    </h2>
                    <p className="text-emerald-100 mt-1">Register A New User</p>
                    <button
                      onClick={() => setShowAddUserModal(false)}
                      className="absolute top-5 right-5 text-white hover:text-emerald-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleAddUser} className="p-6 space-y-5">
                    <div className="space-y-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="userName"
                          placeholder="Username"
                          value={formData.userName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          name="userEmail"
                          placeholder="Email Address"
                          value={formData.userEmail}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="password"
                          name="password"
                          placeholder="Create Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                          required
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <input
                          type="text"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 pl-11 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                      <button
                        type="button"
                        className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200"
                        onClick={() => setShowAddUserModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        <span className="flex items-center justify-center">
                          Save
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
