import React from "react";
import {
  Bell,
  Search,
  ChevronDown,
  MoreVertical,
  Activity,
  BarChart2,
  TrendingUp,
  User,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-emerald-50 to-white  min-h-screen rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-emerald-700">
            Welcome back, Admin
          </h1>
          <p className="text-sm text-emerald-500 mt-1">
            Here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-transparent shadow-sm"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Notification and User Profile */}
          <div className="flex items-center gap-3">
            <div className="relative p-1.5 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 cursor-pointer">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white pl-1 pr-3 py-1 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:bg-gray-50">
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-8 h-8" />
              <div className="flex items-center">
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown className="h-4 w-4 text-gray-500 ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Total Active Users",
            value: "2,456",
            change: "+12%",
            icon: <User className="h-5 w-5 text-green-600" />,
            bg: "bg-green-50",
          },
          {
            title: "Today's Bookings",
            value: "48",
            change: "+5%",
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
            bg: "bg-blue-50",
          },
          {
            title: "Active Service Providers",
            value: "126",
            change: "+8%",
            icon: <Activity className="h-5 w-5 text-amber-600" />,
            bg: "bg-amber-50",
          },
          {
            title: "Revenue This Month",
            value: "$12,480",
            change: "+15%",
            icon: <TrendingUp className="h-5 w-5 text-purple-600" />,
            bg: "bg-purple-50",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`${item.bg} p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{item.title}</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {item.value}
                </h2>
                <p className="text-sm text-green-500 font-medium mt-1.5 flex items-center">
                  <span>{item.change}</span>
                  <span className="ml-1">from last month</span>
                </p>
              </div>
              <div className="p-2 bg-white rounded-lg shadow">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Bookings
            </h3>
            <a
              href="#"
              className="text-green-600 text-sm font-medium flex items-center hover:text-green-800"
            >
              View All <ChevronDown className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 px-2">Booking ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Service</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#12345",
                    name: "Sarah Johnson",
                    service: "Plant Care",
                    status: "Completed",
                    color: "bg-green-100 text-green-800",
                  },
                  {
                    id: "#12346",
                    name: "Mike Wilson",
                    service: "Garden Design",
                    status: "Pending",
                    color: "bg-yellow-100 text-yellow-800",
                  },
                  {
                    id: "#12347",
                    name: "Emma Davis",
                    service: "Pest Control",
                    status: "In Progress",
                    color: "bg-blue-100 text-blue-800",
                  },
                  {
                    id: "#12348",
                    name: "John Brown",
                    service: "Consultation",
                    status: "Scheduled",
                    color: "bg-gray-100 text-gray-800",
                  },
                ].map((b, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{b.id}</td>
                    <td className="py-3 px-2">{b.name}</td>
                    <td className="py-3 px-2">{b.service}</td>
                    {/* <td className="py-3 px-2 text-right">
                      <span className={`text-xs font-medium px-2.5 py-2 rounded-full ${b.color}`}>
                        {b.status}
                      </span>
                    </td> */}
                    <td>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${b.color}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Services */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Popular Services
            </h3>
            <button className="text-sm text-gray-500 flex items-center hover:text-gray-700">
              Export <MoreVertical className="h-4 w-4 ml-1" />
            </button>
          </div>

          <div className="h-64 flex flex-col">
            <div className="flex items-end justify-between h-48 px-4 pb-2">
              {[120, 80, 60, 35, 25].map((val, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <div
                    style={{ height: `${val}px` }}
                    className="w-4/5 bg-gradient-to-t from-green-500 to-green-400 rounded-t-md transition-all duration-300 hover:opacity-90"
                  ></div>
                  <p className="text-xs mt-2 text-center font-medium text-gray-600">
                    {
                      [
                        "Garden Design",
                        "Consultation",
                        "Delivery",
                        "Plant Care",
                        "Pest Control",
                      ][i]
                    }
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 px-2 border-t pt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">Current Month</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                <span className="text-xs text-gray-600">Previous Month</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              User Activity
            </h3>
            <div className="flex gap-1 ">
              {["Week", "Month", "Year"].map((label, idx) => (
                <button
                  key={idx}
                  className={`text-xs px-3 py-1.5 rounded-lg ${
                    label === "Week"
                      ? "bg-green-600 text-white shadow-md"
                      : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="h-48 flex items-end justify-between px-4 pb-4 mt-40">
            {[150, 230, 200, 300, 180, 140, 90].map((val, i) => (
              <div key={i} className="flex flex-col items-center w-full">
                <div
                  style={{ height: `${val}px` }}
                  className="w-3/4 bg-gradient-to-t from-green-400 to-green-300 rounded-t-md transition-all duration-300 hover:opacity-90"
                ></div>
                <p className="text-xs mt-2 font-medium text-gray-600">
                  {["M", "T", "W", "T", "F", "S", "S"][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks & Alerts */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Tasks & Alerts
            </h3>
            <button className="text-green-600 text-sm font-medium hover:text-green-800">
              View All
            </button>
          </div>

          <ul className="space-y-4">
            {[
              {
                label: "New Service Provider Application",
                time: "2 hours ago",
                icon: <User className="h-4 w-4 text-blue-500" />,
                status: "new",
              },
              {
                label: "System Maintenance Required",
                time: "5 hours ago",
                icon: <AlertCircle className="h-4 w-4 text-red-500" />,
                status: "urgent",
              },
              {
                label: "Monthly Report Ready",
                time: "1 day ago",
                icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                status: "completed",
              },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      item.status === "new"
                        ? "bg-blue-50"
                        : item.status === "urgent"
                        ? "bg-red-50"
                        : "bg-green-50"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {item.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {item.time}
                    </p>
                  </div>
                </div>
                <button className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        © 2023 PlantCareHub Admin Dashboard. All rights reserved.
      </div>
    </div>
  );
};

export default AdminDashboard;
