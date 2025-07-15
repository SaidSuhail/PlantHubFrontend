import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi"; 
import UserProfileModal from "./UserProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import {
  Home,
  Wrench,
  BookOpen,
  Leaf,
  CalendarDays,
  ClipboardList,
  Icon,
} from "lucide-react";
import {
  fetchCartItems,
  fetchNotifications,
  setUserFromToken,
  fetchProfile,
} from "../Features/userSlice";

const Navbar = () => {
  const { notifications = [] } = useSelector((state) => state.users || {});
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const cartItems = useSelector((state) => state.users.cartItems || []);
  const cartCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const currentUser = useSelector((state) => state.users?.profile);
  console.log("mmmmmmmmmmmkeeeeeeeee", currentUser);
  const token = useSelector((state) => state.users.token);
  console.log("hhhhhhh", token);
  const userId = useSelector((state) => state.users?.userId);
  const { profile, loadingProfile } = useSelector((state) => state.users);
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz", profile);
  console.log("9999999999", userId);
  const fullState = useSelector((state) => state);
  console.log(
    "🧠 Full Redux state from Notification.jsx in navbaaaaaar:",
    fullState
  );
  const tokenChecked = useRef(false);
  console.log("+++++++++++++", notifications);
  console.log("****************", unreadCount);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(setUserFromToken(token));
    tokenChecked.current = true;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      if (userId) {
        console.log("👤 userId from Redux:", userId);

        console.log("🧾 Decoded userId before fetching notifications:", userId);
        console.log("🪙 Raw Token:", token);

        dispatch(fetchNotifications(userId));
        dispatch(fetchCartItems(userId)); // ✅ Fetch cart immediately
      }
    } catch (err) {
      console.error("❌ Token decode error in Navbar:", err);
    }
  }, [dispatch]);

  // console.log(".............",currentUser)

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-green-800 mr-2">🌿</span>
        <span className="text-xl font-bold text-green-700">PlantCareHub</span>
      </div>

      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li className="relative group">
          <Link to="/" className="group-hover:text-green-600 transition">
            Home
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/services"
            className="group-hover:text-green-600 transition"
          >
            Services
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link to="/library" className="group-hover:text-green-600 transition">
            Plant Library
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/myplants"
            className="group-hover:text-green-600 transition"
          >
            My Plants
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link to="/plans" className="group-hover:text-green-600 transition">
            Plans
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
        <li className="relative group">
          <Link to="/orders" className="group-hover:text-green-600 transition">
            Bookings
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </li>
      </ul>

      {/* Right Icons (hidden on small screens) */}
      <div className="flex items-center gap-3 ml-18">
        <Link to="/cart" className="relative">
          <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-green-600" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        <div className="relative cursor-pointer">
          <Link to="/notifications" className="relative">
            <FiBell className="w-5 h-5 text-gray-700 hover:text-green-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>

        {token && !userId && (
          <Link to="/login" className="text-gray-600">
            Sign In
          </Link>
        )}

        <FiUser
          className="w-5 h-5 text-gray-600 cursor-pointer hidden md:block"
          onClick={() => setShowProfileModal(true)}
        />

        <UserProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      </div>

      {/* Hamburger button (visible on small screens) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-green-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isOpen ? (
            // X icon when open
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            // Hamburger icon when closed
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay with backdrop blur */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Sidebar Container */}
          <div className="relative flex flex-col h-full bg-white shadow-xl z-50 w-72 md:w-64 animate-slide-in-left">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Logo Section */}
            <div className="flex items-center gap-3 pt-5 pb-3 px-6 border-b border-gray-100">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50">
                <span className="text-2xl text-green-700">🌿</span>
              </div>
              <h1 className="text-xl font-bold text-green-800">PlantCareHub</h1>
            </div>

            {/* Profile Section */}
            <div className="px-6 py-4 border-b border-gray-100">
              {!showProfileModal ? (
                <div className="flex items-center gap-4">
                  {profile?.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-12 h-12 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {profile?.userName || "Guest"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {profile?.userEmail || "guest@example.com"}
                    </p>
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="mt-1 text-xs font-medium text-green-600 hover:text-green-700 transition-colors"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ) : (
                <UserProfileModal
                  isOpen={showProfileModal}
                  onClose={() => setShowProfileModal(false)}
                  isMobile
                />
              )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto">
              <ul className="space-y-1">
                {[
                  { path: "/", label: "Home", icon: Home },
                  { path: "/services", label: "Services", icon: Wrench },
                  { path: "/library", label: "Plant Library", icon: BookOpen },
                  { path: "/myplants", label: "My Plants", icon: Leaf },
                  { path: "/plans", label: "Plans", icon: CalendarDays },
                  { path: "/orders", label: "Bookings", icon: ClipboardList },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                      >
                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        {/* <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span> */}
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}

                {!userId && (
                  <li className="mt-4 pt-2 border-t border-gray-100">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Sign In</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500">
                <span className="block font-medium text-green-700">
                  PlantCareHub
                </span>
                Bringing nature to your home since 2025
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
