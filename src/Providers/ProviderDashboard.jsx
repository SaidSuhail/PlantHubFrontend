import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, CartesianGrid 
} from 'recharts';
import { 
  CheckCircle, Clock, AlertCircle, Search, Bell, 
  ShoppingBag, DollarSign, Calendar, Leaf, ChevronRight 
} from 'lucide-react';

const serviceData = [
  { name: 'Jan 1', Planting: 400, Maintenance: 240, Consultation: 240 },
  { name: 'Jan 2', Planting: 300, Maintenance: 139, Consultation: 221 },
  { name: 'Jan 3', Planting: 1000, Maintenance: 980, Consultation: 229 },
  { name: 'Jan 4', Planting: 500, Maintenance: 390, Consultation: 200 },
  { name: 'Jan 5', Planting: 200, Maintenance: 480, Consultation: 218 },
  { name: 'Jan 6', Planting: 278, Maintenance: 390, Consultation: 250 },
  { name: 'Jan 7', Planting: 400, Maintenance: 450, Consultation: 210 },
];

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
];

const ProviderDashboard = () => {
  return (
    <div className="p-6 rounded-4xl space-y-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen lg:ml-48">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-emerald-900">Welcome back, <span className="text-emerald-600">Green Gardens</span></h1>
          <p className="text-sm text-emerald-700">Here's what's happening with your business today</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 border border-emerald-200 rounded-full text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-emerald-500" size={18} />
          </div>
          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all border border-emerald-100">
            <Bell className="text-emerald-600" size={20} />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            title: 'Total Orders', 
            value: '124 orders', 
            icon: <ShoppingBag className="text-emerald-600" size={20} />,
            change: '+12% from last month',
            bg: 'bg-gradient-to-r from-emerald-50 to-white'
          },
          { 
            title: 'Monthly Revenue', 
            value: '$8,450 USD', 
            icon: <DollarSign className="text-emerald-600" size={20} />,
            change: '+24% from last month',
            bg: 'bg-gradient-to-r from-emerald-50 to-white'
          },
          { 
            title: 'Active Bookings', 
            value: '18 bookings', 
            icon: <Calendar className="text-emerald-600" size={20} />,
            change: '+3 this week',
            bg: 'bg-gradient-to-r from-emerald-50 to-white'
          },
          { 
            title: 'Plant Stock', 
            value: '456 items', 
            icon: <Leaf className="text-emerald-600" size={20} />,
            change: '12 items low stock',
            bg: 'bg-gradient-to-r from-emerald-50 to-white'
          },
        ].map((item, index) => (
          <div 
            key={index} 
            className={`${item.bg} border border-emerald-100 rounded-2xl shadow-sm p-5 transition-all hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-emerald-700 mb-1">{item.title}</p>
                <p className="text-2xl font-bold text-emerald-900">{item.value}</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                {item.icon}
              </div>
            </div>
            <p className="text-xs text-emerald-600 mt-3">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Performance */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-emerald-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-emerald-900">Service Performance</h2>
            <button className="text-xs text-emerald-600 hover:underline flex items-center">
              View report <ChevronRight size={16} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={serviceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1fae5', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Bar dataKey="Planting" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Maintenance" fill="#34d399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Consultation" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-emerald-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-emerald-900">Revenue Trend</h2>
            <button className="text-xs text-emerald-600 hover:underline flex items-center">
              View report <ChevronRight size={16} />
            </button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #d1fae5', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#d1fae5" fillOpacity={1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-emerald-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-emerald-900">Recent Orders</h2>
            <button className="text-sm text-emerald-600 hover:underline flex items-center">
              View All <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-emerald-700">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Service</th>
                  <th className="pb-4 font-medium">Date</th>
                  <th className="pb-4 font-medium">Status</th>
                  <th className="pb-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['#ORD-001', 'John Smith', 'Plant Consultation', 'Jan 15, 2024', 'Completed', '$120'],
                  ['#ORD-002', 'Sarah Johnson', 'Garden Maintenance', 'Jan 14, 2024', 'In Progress', '$250'],
                  ['#ORD-003', 'Mike Wilson', 'Plant Delivery', 'Jan 14, 2024', 'Pending', '$85'],
                  ['#ORD-004', 'Emma Davis', 'Landscaping', 'Jan 13, 2024', 'Completed', '$320'],
                  ['#ORD-005', 'James Brown', 'Tree Pruning', 'Jan 12, 2024', 'Completed', '$180'],
                ].map(([id, name, service, date, status, amount], index) => (
                  <tr key={index} className="border-t border-emerald-100 hover:bg-emerald-50">
                    <td className="py-3 text-emerald-900 font-medium">{id}</td>
                    <td className="py-3">{name}</td>
                    <td className="py-3 text-emerald-700">{service}</td>
                    <td className="py-3 text-emerald-700">{date}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center w-fit gap-1 ${status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {status === 'Completed' ? <CheckCircle size={14} /> : status === 'Pending' ? <Clock size={14} /> : <AlertCircle size={14} />}
                        {status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-emerald-900">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column (Upcoming Bookings & Alerts) */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border border-emerald-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-emerald-900">Upcoming Service Bookings</h2>
              <button className="text-sm text-emerald-600 hover:underline flex items-center">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { 
                  name: 'Emma Davis', 
                  service: 'Plant Care Consultation', 
                  time: 'Today, 2:00 PM', 
                  status: 'Confirmed',
                  color: 'bg-emerald-100 text-emerald-700'
                }, 
                { 
                  name: 'James Wilson', 
                  service: 'Indoor Plant Maintenance', 
                  time: 'Tomorrow, 10:00 AM', 
                  status: 'Pending',
                  color: 'bg-amber-100 text-amber-700'
                }, 
                { 
                  name: 'Sophie Brown', 
                  service: 'Garden Design Consultation', 
                  time: 'Jan 25, 3:30 PM', 
                  status: 'Confirmed',
                  color: 'bg-emerald-100 text-emerald-700'
                },
                { 
                  name: 'Michael Taylor', 
                  service: 'Lawn Care Service', 
                  time: 'Jan 26, 9:00 AM', 
                  status: 'Confirmed',
                  color: 'bg-emerald-100 text-emerald-700'
                }
              ].map((b, i) => (
                <div 
                  key={i} 
                  className="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-white p-4 rounded-xl border border-emerald-100 hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-semibold text-emerald-900">{b.name}</p>
                    <p className="text-sm text-emerald-700">{b.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-emerald-900">{b.time}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-1 flex items-center gap-1 ${b.color}`}>
                      {b.status === 'Confirmed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alerts */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl shadow-sm p-5 border border-red-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-red-900 flex items-center gap-2">
                <AlertCircle className="text-red-600" size={20} />
                Low Stock Alerts
              </h2>
              <button className="text-sm text-red-600 hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Snake Plant', stock: 5, level: 'Critical' },
                { name: 'Monstera Deliciosa', stock: 8, level: 'Warning' },
                { name: 'Fiddle Leaf Fig', stock: 12, level: 'Warning' },
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-white p-3 rounded-lg border border-red-100 hover:shadow-sm transition-all"
                >
                  <div>
                    <p className="font-semibold text-red-800">{item.name}</p>
                    <p className={`text-xs ${item.level === 'Critical' ? 'text-red-600' : 'text-amber-600'}`}>
                      Current stock: {item.stock} items • {item.level}
                    </p>
                  </div>
                  <button className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all">
                    Order Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;