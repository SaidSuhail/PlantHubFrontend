// import React from 'react'

// function Sidebar() {
//   return (
//     <div>
//       <h1>Sidebar</h1>
//     </div>
//   )
// }

// export default Sidebar
import React, { useState, useEffect } from "react";
import {
  Home,
  ShoppingCart,
  Leaf,
  Users,
  Calendar,
  BarChart,
  Settings,
  Menu,
  X,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const navItems = [
  {
    label: "Dashboard",
    icon: <Home size={20} />,
    path: "/providers/dashboard",
  },
  {
    label: "Orders",
    icon: <ShoppingCart size={20} />,
    path: "/providers/AssignedBookings",
  },
  {
    label: "Plants",
    icon: <Leaf size={20} />,
    path: "/providers/ManagePlants",
  },
  {
    label: "Customers",
    icon: <Users size={20} />,
    path: "/providers/Customers",
  },
  {
    label: "Calendar",
    icon: <Calendar size={20} />,
    path: "/providers/Calendar",
  },
  {
    label: "Analytics",
    icon: <BarChart size={20} />,
    path: "/providers/Analytics",
  },
  { label: "Settings", icon: <Settings size={20} /> },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".sidebar-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      toast.success("Provider Logout Successfully");
      navigate("/login");
    }, 200);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div
        className={`lg:hidden fixed top-4 left-4 z-30 transition-all duration-300 ${
          isScrolled ? "bg-white rounded-full p-2 shadow-md" : ""
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-emerald-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={24} className="text-emerald-700" />
          ) : (
            <Menu size={24} className="text-emerald-700" />
          )}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-emerald-50 to-white shadow-xl z-30 p-6 transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:sticky lg:top-0 lg:left-0 lg:flex lg:flex-col lg:h-screen`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-emerald-500 p-2 rounded-xl">
            <Leaf className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-bold text-emerald-700">PlantCareHub</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-grow">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActive(item.label);
                navigate(item.path);
                setIsOpen(false); // Close sidebar on mobile after selection
              }}
              className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left transition-all duration-200 group
              ${
                active === item.label
                  ? "bg-emerald-500 text-white font-medium shadow-md"
                  : "text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <span
                className={`transition-transform ${
                  active === item.label
                    ? "text-white"
                    : "text-emerald-600 group-hover:text-emerald-700"
                }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
              {active === item.label && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Additional Links */}
        <div className="mt-6 pt-6 border-t border-emerald-100">
          <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-left text-emerald-700 hover:bg-emerald-50 transition-colors">
            <HelpCircle size={20} className="text-emerald-600" />
            <span>Help & Support</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="mt-8 pt-6 border-t border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User"
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-300"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-800">
                David Wilson
              </p>
              <p className="text-xs text-emerald-600">Plant Specialist</p>
            </div>
            {/* <button
              onClick={handleLogout}
              className="p-2 text-emerald-700 hover:bg-emerald-100 rounded-full"
            >
              <LogOut size={18} />
            </button> */}
            <button
              onClick={() => setShowConfirmLogout(true)}
              className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {showConfirmLogout && (
  <div className="fixed inset-0  bg-opacity-50 z-[9999] flex items-center justify-center pl-20">
    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Confirm Logout
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Are you sure you want to logout?
      </p>
      <div className="flex justify-end gap-4">
        <button
          onClick={() => setShowConfirmLogout(false)}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            toast.success("Provider Logout Successfully");
            navigate("/login");
          }}
          className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default Sidebar;
