import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUnblockUser, fetchUsers } from "../Features/userSlice";

const ServiceProviders = () => {
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { users, loadingUsers, errorUsers } = useSelector(
    (state) => state.users
  );
  const providers = users.filter((user) => user.role === "Provider");

  const totalProviders = providers.length;
  const activeProviders = providers.filter((p) => !p.isBlocked).length;
  const blockedProviders = providers.filter((p) => p.isBlocked).length;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  console.log(users);

  const metrics = [
    { title: "Total Service Providers", value: totalProviders },
    { title: "Active Providers", value: activeProviders },
    { title: "Blocked Providers", value: blockedProviders },
  ];
  const getStatus = (user) => {
    if (user.isBlocked) return "Suspended";
    return "Active";
  };

  const filteredProviders = users
    .filter((u) => u.role === "Provider")
    .filter((u) =>
      filterStatus === "All Status" ? true : getStatus(u) === filterStatus
    )
    .filter((u) =>
      `${u.userName} ${u.userEmail}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Suspended: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4 md:p-8 rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
            Service Providers
          </h1>
          <p className="text-emerald-600 mt-2">
            Manage and track your service providers
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
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

            {/* 🔍 Search Bar */}
            <div className="mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search by name or email"
                className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
                          statusColors[getStatus(provider)]
                        }`}
                      >
                        {getStatus(provider)}
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

          {/* Pagination */}
          {/* ... (same as before) */}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
