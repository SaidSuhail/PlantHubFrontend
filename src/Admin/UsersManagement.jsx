import React, { useState } from 'react';
import { Search, Filter, ChevronDown, MoreVertical, User, Activity, UserPlus, Clock, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample user data
  const users = [
    {
      id: "USRO01",
      name: "John Smith",
      email: "john.smith@email.com",
      joinDate: "2024-01-15",
      status: "Active",
      lastActivity: "2 hours ago"
    },
    {
      id: "USRO02",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      joinDate: "2024-01-14",
      status: "Active",
      lastActivity: "5 hours ago"
    },
    {
      id: "USRO03",
      name: "Michael Brown",
      email: "m.brown@email.com",
      joinDate: "2024-01-13",
      status: "Inactive",
      lastActivity: "3 days ago"
    },
    {
      id: "USRO04",
      name: "Sarah Davis",
      email: "sarah.d@email.com",
      joinDate: "2024-01-12",
      status: "Pending",
      lastActivity: "1 hour ago"
    },
    {
      id: "USRO05",
      name: "James Wilson",
      email: "j.wilson@email.com",
      joinDate: "2024-01-11",
      status: "Active",
      lastActivity: "1 day ago"
    }
  ];

  const stats = [
    { title: "Total Users", value: "2,456", change: "+12%", icon: <User className="h-5 w-5 text-blue-500" /> },
    { title: "Active Users", value: "1,892", change: "+8.2%", icon: <Activity className="h-5 w-5 text-green-500" /> },
    { title: "New Users", value: "124", change: "-24%", icon: <UserPlus className="h-5 w-5 text-purple-500" /> },
    { title: "Pending Verifications", value: "23", change: "-5%", icon: <Clock className="h-5 w-5 text-amber-500" /> }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case "Active":
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Active</span>;
      case "Inactive":
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">Inactive</span>;
      case "Pending":
        return <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">Pending</span>;
      default:
        return <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">{status}</span>;
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500 mt-1">Manage and monitor user accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
                <p className={`text-xs mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-lg">
                {stat.icon}
              </div>
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
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="py-3 px-4 font-medium">USER ID</th>
                <th className="py-3 px-4 font-medium">NAME</th>
                <th className="py-3 px-4 font-medium">EMAIL</th>
                <th className="py-3 px-4 font-medium">JOIN DATE</th>
                <th className="py-3 px-4 font-medium">STATUS</th>
                <th className="py-3 px-4 font-medium">LAST ACTIVITY</th>
                <th className="py-3 px-4 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-800">{user.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{user.email}</td>
                  <td className="py-4 px-4 text-gray-600">{user.joinDate}</td>
                  <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                  <td className="py-4 px-4 text-gray-600">{user.lastActivity}</td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-4 sm:mb-0">
            Showing 1 to 5 of 2,456 results
          </p>
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            {[1, 2, 3, 4, 5].map(page => (
              <button
                key={page}
                className={`w-8 h-8 rounded-lg ${
                  currentPage === page 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            
            <button 
              className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
              disabled={currentPage === 5}
              onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;