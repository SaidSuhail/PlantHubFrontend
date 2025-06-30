import React from "react";

function Customers() {
  // Customer data
  const customers = [
    {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      plan: "Premium",
      lastService: "2024-01-15",
      plants: 8,
      status: "Active",
    },
    {
      name: "Michael Chen",
      email: "m.chen@example.com",
      plan: "Basic",
      lastService: "2024-01-10",
      plants: 3,
      status: "Active",
    },
    {
      name: "Emma Wilson",
      email: "emma.wt@example.com",
      plan: "Premium",
      lastService: "2024-01-05",
      plants: 12,
      status: "Inactive",
    },
    {
      name: "David Kim",
      email: "d.kim@example.com",
      plan: "Standard",
      lastService: "2024-01-18",
      plants: 5,
      status: "Active",
    },
    {
      name: "Lisa Martinez",
      email: "lisa.m@example.com",
      plan: "Premium",
      lastService: "2024-01-12",
      plants: 15,
      status: "Active",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-4xl ml-34">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-2">
          Manage your customer base and their subscriptions
        </p>
      </div>
      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Total Customers
            </h2>
            <div className="flex items-center mt-1">
              <span className="text-green-500 font-medium">+12.5%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-6">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Active Subscriptions
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">2,543</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Customers</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">1,876</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium">
          All Status
        </div>
        <div className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium">
          All Plans
        </div>
        <div className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center">
          More Filters
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Service
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Plants
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      customer.plan === "Premium"
                        ? "bg-purple-100 text-purple-800"
                        : customer.plan === "Basic"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {customer.plan}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.lastService}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.plants}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;
