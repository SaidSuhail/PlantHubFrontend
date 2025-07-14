import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function Analyticss() {
  const [activeTab, setActiveTab] = useState("services");

  // Metric cards data
  const metrics = [
    { title: "Total Users", value: "8,547", change: "+12%", icon: "👥" },
    { title: "Active Orders", value: "342", change: "+8%", icon: "📦" },
    { title: "Revenue", value: "$24,856", change: "+18%", icon: "💰" },
    { title: "Plant Services", value: "1,247", change: "+5%", icon: "🌿" },
  ];

  // Revenue chart data
  const revenueData = [
    { month: "Jan", services: 4000, products: 3000, consultations: 2000 },
    { month: "Feb", services: 6000, products: 4000, consultations: 3000 },
    { month: "Mar", services: 8000, products: 5000, consultations: 4000 },
    { month: "Apr", services: 10000, products: 6000, consultations: 5000 },
    { month: "May", services: 12000, products: 7000, consultations: 6000 },
    { month: "Jun", services: 18000, products: 8000, consultations: 7000 },
  ];

  // Service distribution data
  const serviceDistribution = [
    { name: "Plant Care", percentage: 45, color: "bg-blue-500" },
    { name: "Consultation", percentage: 25, color: "bg-green-500" },
    { name: "Delivery", percentage: 15, color: "bg-yellow-500" },
    { name: "Maintenance", percentage: 15, color: "bg-purple-500" },
  ];

  // User activity data
  const userActivity = [
    { day: "Mon", value: 50 },
    { day: "Tue", value: 75 },
    { day: "Wed", value: 120 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 150 },
    { day: "Sat", value: 180 },
    { day: "Sun", value: 200 },
  ];

  // Top cities data
  const topCities = [
    { name: "New York", orders: 245 },
    { name: "Los Angeles", orders: 189 },
    { name: "Chicago", orders: 156 },
    { name: "Houston", orders: 134 },
    { name: "Phoenix", orders: 98 },
  ];

  // Recent transactions data
  const transactions = [
    {
      id: "#12345",
      customer: "John Coe",
      service: "Plant Care",
      date: "2024-01-15",
      amount: 120.0,
      status: "Completed",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      service: "Consultation",
      date: "2024-01-15",
      amount: 80.0,
      status: "Positive",
    },
    {
      id: "#12347",
      customer: "Mike Johnson",
      service: "Delivery",
      date: "2024-01-14",
      amount: 45.0,
      status: "Processing",
    },
    {
      id: "#12348",
      customer: "Sarah Williams",
      service: "Maintenance",
      date: "2024-01-14",
      amount: 150.0,
      status: "Completed",
    },
    {
      id: "#12349",
      customer: "Tom Brown",
      service: "Plant Care",
      date: "2024-01-13",
      amount: 85.0,
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-4 md:p-6 rounded-3xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
          Analytics Dashboard
        </h1>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm md:text-base font-medium text-gray-500">
                  {metric.title}
                </p>
                <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {metric.value}
                </p>
              </div>
              <span className="text-2xl">{metric.icon}</span>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-emerald-500 font-medium text-sm">
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
        {/* Revenue Overview Chart */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Revenue Overview
            </h2>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "services"
                    ? "bg-blue-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("services")}
              >
                Services
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "products"
                    ? "bg-blue-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("products")}
              >
                Products
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  activeTab === "consultations"
                    ? "bg-blue-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("consultations")}
              >
                Consultations
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between">
            {revenueData.map((data, index) => (
              <div
                key={index}
                className="flex flex-col items-center flex-1 px-1"
              >
                <div className="flex items-end justify-center w-full h-48">
                  <div
                    className={`w-4/5 mx-auto ${
                      activeTab === "services" || activeTab === "all"
                        ? "bg-blue-500"
                        : "bg-blue-200"
                    } rounded-t-md hover:opacity-90 transition-opacity duration-200`}
                    style={{ height: `${(data.services / 18000) * 100}%` }}
                  ></div>
                  <div
                    className={`w-4/5 mx-auto ${
                      activeTab === "products" || activeTab === "all"
                        ? "bg-green-500"
                        : "bg-green-200"
                    } rounded-t-md hover:opacity-90 transition-opacity duration-200`}
                    style={{ height: `${(data.products / 18000) * 100}%` }}
                  ></div>
                  <div
                    className={`w-4/5 mx-auto ${
                      activeTab === "consultations" || activeTab === "all"
                        ? "bg-yellow-500"
                        : "bg-yellow-200"
                    } rounded-t-md hover:opacity-90 transition-opacity duration-200`}
                    style={{ height: `${(data.consultations / 18000) * 100}%` }}
                  ></div>
                </div>
                <span className="mt-2 text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Services</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Products</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Consultations</span>
            </div>
          </div>
        </div>

        {/* Services Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            Services Distribution
          </h2>

          <div className="flex flex-col md:flex-row items-center">
            {/* Pie Chart */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-4 md:mb-0 md:mr-6">
              <div className="absolute w-40 h-40 rounded-full border-8 border-blue-500"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-green-500 clip-pie-25"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-yellow-500 clip-pie-40"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-purple-500 clip-pie-60"></div>
              <div className="absolute w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute text-center">
                <p className="text-xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {serviceDistribution.map((service, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-4 h-4 ${service.color} rounded-sm mr-2`}
                  ></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {service.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Activity and Top Cities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
        {/* User Activity */}

        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            User Activity
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Cities */}
        <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            Top Cities
          </h2>

          <div className="space-y-4">
            {topCities.map((city, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {city.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {city.orders} orders
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      index === 0
                        ? "bg-blue-100 text-blue-800"
                        : index === 1
                        ? "bg-green-100 text-green-800"
                        : index === 2
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Recent Transactions
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              View All Transactions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                      {transaction.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {transaction.customer}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {transaction.service}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          transaction.status === "Completed" ||
                          transaction.status === "Positive"
                            ? "bg-green-100 text-green-800"
                            : transaction.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom CSS for pie chart segments */}
      <style jsx>{`
        .clip-pie-25 {
          clip-path: polygon(
            50% 50%,
            50% 0%,
            100% 0%,
            100% 100%,
            0% 100%,
            0% 50%
          );
        }
        .clip-pie-40 {
          clip-path: polygon(50% 50%, 100% 0%, 100% 100%, 0% 100%, 0% 50%);
        }
        .clip-pie-60 {
          clip-path: polygon(50% 50%, 100% 0%, 100% 50%);
        }
      `}</style>
    </div>
  );
}

export default Analyticss;
