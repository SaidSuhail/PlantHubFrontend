import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blockUnblockUser,
  fetchUsers,
  registerUser,
} from "../Features/userSlice";
import { toast } from "sonner";
import { changeUserRole } from "../Features/adminSlice";

const ServiceProviders = () => {
  const [filterStatus, setFilterStatus] = useState("All Status");

  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const providers = users.filter((user) => user.role === "Provider");

  const totalProviders = providers.length;
  const activeProviders = providers.filter((p) => !p.isBlocked).length;
  const blockedProviders = providers.filter((p) => p.isBlocked).length;

  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const [showAddProviderModal, setShowAddProviderModal] = useState(false);

  const [providerFormData, setProviderFormData] = useState({
    userName: "",
    userEmail: "",
    password: "",
    phone: "",
  });
  const handleProviderInputChange = (e) => {
    const { name, value } = e.target;
    setProviderFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProvider = (e) => {
    e.preventDefault();

    // Only send valid registration fields
    const { userName, userEmail, password, phone } = providerFormData;

    dispatch(registerUser({ userName, userEmail, password, phone })).then(
      (res) => {
        if (res.meta.requestStatus === "fulfilled") {
          const newUserId = res.payload?.id;

          if (newUserId) {
            // Now assign Provider role
            dispatch(
              changeUserRole({ userId: newUserId, newRole: "Provider" })
            ).then((roleRes) => {
              if (roleRes.meta.requestStatus === "fulfilled") {
                toast.success("Provider Created and Role Assigned");
                setShowAddProviderModal(false);
                setProviderFormData({
                  userName: "",
                  userEmail: "",
                  password: "",
                  phone: "",
                });
                dispatch(fetchUsers());
              } else {
                toast.error("User created, but role assignment failed");
              }
            });
          } else {
            toast.error("User created, but no ID returned");
          }
        } else {
          toast.error("Failed to register provider");
        }
      }
    );
  };

  const approvedToday = providers.filter(
    (p) => !p.isBlocked && isToday(p.updatedAt)
  ).length;
  const rejectedToday = providers.filter(
    (p) => p.isBlocked && isToday(p.updatedAt)
  ).length;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(users);

  // const metrics = [
  //   { title: "Total Service Providers", value: 248 },
  //   { title: "Active Providers", value: 186 },
  //   { title: "Pending Approval", value: 12 },
  //   { title: "Average Rating", value: "4.8/5" },
  // ];
  const metrics = [
    { title: "Total Service Providers", value: totalProviders },
    { title: "Active Providers", value: activeProviders },
    { title: "Blocked Providers", value: blockedProviders },
    { title: "Approved Today", value: approvedToday },
    { title: "Rejected Today", value: rejectedToday },
  ];
  const getStatus = (user) => {
    if (user.isBlocked) return "Suspended";
    return "Active";
  };

  // const filteredProviders = users
  //   .filter((u) => u.role === "Provider")
  //   .filter((u) =>
  //     filterStatus === "All Status" ? true : u.status === filterStatus
  //   );
  const filteredProviders = users
    .filter((u) => u.role === "Provider")
    .filter((u) =>
      filterStatus === "All Status" ? true : getStatus(u) === filterStatus
    );

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Suspended: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Service Providers
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and track your service providers
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <p className="text-gray-600 text-sm font-medium">
                {metric.title}
              </p>
              <p className="text-2xl font-bold text-gray-800 mt-2">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Filter</span>
              {/* <select
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select> */}
              <select
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Suspended</option>
              </select>
            </div>

            <div className="flex space-x-3 mt-4 md:mt-0">
              <button
                className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700"
                onClick={() => setShowAddProviderModal(true)}
              >
                {/* Add New Provider Icon */}
                Add New Provider
              </button>
            </div>
          </div>
        </div>

        {/* Providers Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-28 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated By
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProviders.map((provider) => (
                  <tr key={provider.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold">
                          {provider.userName?.[0]?.toUpperCase() || "-"}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {provider.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {provider.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          provider.isBlocked
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {provider.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.phone || "N/A"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(provider.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {provider.updatedBy || "—"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => dispatch(blockUnblockUser(provider.id))}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          provider.isBlocked
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } hover:opacity-90`}
                      >
                        {provider.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showAddProviderModal && (
            <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <h2 className="text-2xl font-bold text-white">
                    Create New Provider
                  </h2>
                  <p className="text-emerald-100 mt-1">
                    Register A Service Provider
                  </p>
                  <button
                    onClick={() => setShowAddProviderModal(false)}
                    className="absolute top-5 right-5 text-white hover:text-emerald-200"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddProvider} className="p-6 space-y-5">
                  {/* Input Fields */}
                  {["userName", "userEmail", "password", "phone"].map(
                    (field, i) => (
                      <input
                        key={i}
                        type={field === "password" ? "password" : "text"}
                        name={field}
                        value={providerFormData[field]}
                        onChange={handleProviderInputChange}
                        placeholder={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                        required={field !== "phone"}
                      />
                    )
                  )}

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProviderModal(false)}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Pagination */}
          {/* ... (same as before) */}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
