import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Filter, Search, Clock, MapPin, Users, CalendarDays } from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [selectedDate, setSelectedDate] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      duration: '1 hour',
      color: 'bg-blue-500',
      date: new Date(2024, 5, 15),
      attendees: 8,
      location: 'Conference Room A'
    },
    {
      id: 2,
      title: 'Project Review',
      time: '2:00 PM',
      duration: '2 hours',
      color: 'bg-green-500',
      date: new Date(2024, 5, 15),
      attendees: 5,
      location: 'Meeting Room B'
    },
    {
      id: 3,
      title: 'Client Presentation',
      time: '9:00 AM',
      duration: '1.5 hours',
      color: 'bg-purple-500',
      date: new Date(2024, 5, 18),
      attendees: 12,
      location: 'Main Hall'
    },
    {
      id: 4,
      title: 'Design Workshop',
      time: '11:00 AM',
      duration: '3 hours',
      color: 'bg-orange-500',
      date: new Date(2024, 5, 20),
      attendees: 15,
      location: 'Creative Studio'
    },
    {
      id: 5,
      title: 'Product Launch',
      time: '3:00 PM',
      duration: '2 hours',
      color: 'bg-red-500',
      date: new Date(2024, 5, 22),
      attendees: 50,
      location: 'Auditorium'
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(event => isSameDay(event.date, date));
  };

  const todayEvents = getEventsForDate(new Date());
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen rounded-4xl bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 ml-38">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <CalendarDays className="w-8 h-8 text-white" />
              </div>
              Calendar
            </h1>
            <p className="text-gray-600 mt-2">Manage your schedule and events</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              {['month', 'week', 'day'].map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    view === viewType
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {viewType}
                </button>
              ))}
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center">
              <Plus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Calendar */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Calendar Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => navigateMonth(-1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => navigateMonth(1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700">Filter</span>
                  </button>
                </div>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 border-b border-gray-100">
                {daysOfWeek.map((day) => (
                  <div key={day} className="p-4 text-center">
                    <span className="text-sm font-semibold text-gray-600">{day}</span>
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7">
                {getDaysInMonth(currentDate).map((date, index) => {
                  const dayEvents = getEventsForDate(date);
                  const isSelectedDate = selectedDate && isSameDay(date, selectedDate);
                  
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`min-h-24 p-2 border-b border-r border-gray-100 cursor-pointer transition-all hover:bg-blue-50 ${
                        !date ? 'bg-gray-50' : ''
                      } ${
                        isToday(date) ? 'bg-blue-100 border-blue-300' : ''
                      } ${
                        isSelectedDate ? 'bg-blue-200 border-blue-400' : ''
                      }`}
                    >
                      {date && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday(date) ? 'text-blue-700' : 'text-gray-900'
                          }`}>
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayEvents.slice(0, 2).map((event) => (
                              <div
                                key={event.id}
                                className={`${event.color} text-white text-xs px-2 py-1 rounded-md truncate`}
                              >
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-500 px-2">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Today's Events
              </h3>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`w-3 h-3 ${event.color} rounded-full mt-1.5`}></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No events today</p>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time} • {event.duration}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees} attendees
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-3 text-left transition-all">
                  <div className="font-medium">Schedule Meeting</div>
                  <div className="text-sm opacity-90">Create a new meeting</div>
                </button>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-3 text-left transition-all">
                  <div className="font-medium">Set Reminder</div>
                  <div className="text-sm opacity-90">Add a quick reminder</div>
                </button>
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-3 text-left transition-all">
                  <div className="font-medium">View Analytics</div>
                  <div className="text-sm opacity-90">Check your schedule stats</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;