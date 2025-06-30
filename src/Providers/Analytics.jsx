import React from 'react';

function Analytics() {
  // Service data for the Popular Services table
  const popularServices = [
    { name: "Plant Consultation", bookings: 145, revenue: 2890, growth: 12 },
    { name: "Indoor Plant Care", bookings: 128, revenue: 3120, growth: 8 },
    { name: "Garden Maintenance", bookings: 96, revenue: 2450, growth: 15 },
    { name: "Plant Delivery", bookings: 84, revenue: 1680, growth: 5 }
  ];

  // Recent bookings data
  const recentBookings = [
    { customer: "Sarah Johnson", service: "Plant Consultation", date: "Today", status: "Completed", amount: 85 },
    { customer: "Mike Wilson", service: "Garden Maintenance", date: "Today", status: "In Progress", amount: 150 },
    { customer: "Emma Davis", service: "Plant Delivery", date: "Yesterday", status: "Completed", amount: 45 },
    { customer: "James Brown", service: "Indoor Plant Care", date: "Yesterday", status: "Pending", amount: 95 }
  ];

  // Service type distribution data
  const serviceDistribution = [
    { name: "Plant Care", percentage: 45, color: "bg-blue-500" },
    { name: "Consultation", percentage: 25, color: "bg-green-500" },
    { name: "Delivery", percentage: 15, color: "bg-yellow-500" },
    { name: "Maintenance", percentage: 15, color: "bg-purple-500" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen ml-34 rounded-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Total Active Plants</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">2,456</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Monthly Bookings</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">1,243</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Customer Satisfaction</p>
          <div className="flex items-end mt-2">
            <p className="text-3xl font-bold text-gray-900">94%</p>
            <span className="ml-2 text-green-500 font-medium">↑+3%</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-sm font-medium text-gray-500">Revenue</p>
          <div className="flex items-end mt-2">
            <p className="text-3xl font-bold text-gray-900">$24,580</p>
            <span className="ml-2 text-green-500 font-medium">↑+12%</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Service Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Plant Care Services Trend</h2>
            <div className="flex items-center text-sm text-blue-600 font-medium">
              <span>services</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div className="flex items-end justify-between h-48">
            {/* Chart bars */}
            {[65, 80, 75, 90, 110, 140].map((height, index) => (
              <div key={index} className="flex flex-col items-center flex-1 px-1">
                <div 
                  className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors duration-200"
                  style={{ height: `${height}px` }}
                ></div>
                <span className="mt-2 text-xs text-gray-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Service Type Distribution</h2>
          
          <div className="flex flex-col md:flex-row items-center">
            {/* Pie Chart */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-4 md:mb-0 md:mr-8">
              <div className="absolute w-40 h-40 rounded-full border-8 border-blue-500"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-green-500 clip-pie-25"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-yellow-500 clip-pie-40"></div>
              <div className="absolute w-40 h-40 rounded-full border-8 border-purple-500 clip-pie-60"></div>
              <div className="absolute w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute text-center">
                <p className="text-2xl font-bold text-gray-900">100%</p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {serviceDistribution.map((service, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 ${service.color} rounded-sm mr-2`}></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-500">{service.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Services */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Popular Services</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Name</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {popularServices.map((service, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 text-sm font-medium text-gray-900">{service.name}</td>
                      <td className="py-4 text-sm text-gray-900">{service.bookings}</td>
                      <td className="py-4 text-sm font-medium text-gray-900">${service.revenue}</td>
                      <td className="py-4">
                        <div className="flex items-center text-green-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">+{service.growth}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Bookings</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="pb-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-4 text-sm font-medium text-gray-900">{booking.customer}</td>
                      <td className="py-4 text-sm text-gray-900">{booking.service}</td>
                      <td className="py-4 text-sm text-gray-500">{booking.date}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-medium text-gray-900">${booking.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for pie chart segments */}
      <style jsx>{`
        .clip-pie-25 {
          clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%);
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

export default Analytics;