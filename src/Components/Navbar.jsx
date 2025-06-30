import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi"; // Real user icon import
import UserProfileModal from "./UserProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { fetchCartItems, fetchNotifications, setUserFromToken } from "../Features/userSlice";

const Navbar = () => {

const { notifications = [] } = useSelector((state) => state.users || {});
const unreadCount = notifications.filter((n) => !n.isRead).length;
const cartItems = useSelector((state) => state.users.cartItems || []);
// const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
const cartCount = Array.isArray(cartItems)
  ? cartItems.reduce((total, item) => total + item.quantity, 0)
  : 0;

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const currentUser = useSelector((state) => state.auth?.currentUser);
  const token = useSelector((state) => state.users.token);
  console.log("hhhhhhh",token)
const userId = useSelector((state) => state.users?.userId);

  // const userId = useSelector((state) => state.auth?.userId);
  console.log("9999999999",userId)
  const fullState = useSelector((state) => state);
  console.log("🧠 Full Redux state from Notification.jsx in navbaaaaaar:", fullState);
const tokenChecked = useRef(false);
console.log("+++++++++++++",notifications)
console.log("****************",unreadCount);
const dispatch = useDispatch();
  
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  dispatch(setUserFromToken(token));
  tokenChecked.current = true;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
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

      {/* Desktop Menu
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/services">Services</Link>
        </li>
        <li>
          <Link to="/library">Plant Library</Link>
        </li>
        <li>
          <Link to="/myplants">My Plants</Link>
        </li>
        <li>
          <Link to="/plans">Plans</Link>
        </li>
        <Link to="/orders" className="text-green-600 font-medium hover">
          Bookings
        </Link>
      </ul> */}
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
      <div className="hidden md:flex items-center gap-4">
        {/* <Link to="/cart" className="relative">
          <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-green-600" />
        </Link> */}
        <Link to="/cart" className="relative">
  <FiShoppingCart className="w-5 h-5 text-gray-700 hover:text-green-600" />
  {cartCount > 0 && (
    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {cartCount}
    </span>
  )}
</Link>

        {/* <div className="relative cursor-pointer">
          <Link to="/notifications" className="relative">
            <FiBell className="w-5 h-5 text-gray-700 hover:text-green-600" />
          </Link>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </div> */}
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

        {/* <Link to="/login" className="text-gray-600">
          Sign In
        </Link> */}
       {/* {!userId && (
  <Link to="/login" className="text-gray-600">
    Sign In
  </Link>
)} */}

{token && !userId && (
  <Link to="/login" className="text-gray-600">Sign In</Link>
)}


        {/*        


       
        {/* <FiUser className="w-5 h-5 text-gray-600" /> */}
        <FiUser
          className="w-5 h-5 text-gray-600 cursor-pointer"
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

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col gap-4 px-6 py-4 md:hidden z-50">
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/library" onClick={() => setIsOpen(false)}>
              Plant Library
            </Link>
          </li>
          <li>
            <Link to="/myplants" onClick={() => setIsOpen(false)}>
              My Plants
            </Link>
          </li>
          <li>
            <Link to="/plans" onClick={() => setIsOpen(false)}>
              Plans
            </Link>
          </li>

          <li>
            <Link
              to="/orders"
              className="text-green-600 font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              🧾 Bookings
            </Link>
          </li>
          {/* <li>
            <Link
              to="/login"
              className="text-gray-600 hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </li> */}
         {/* {!userId && (
  <li>
    <Link
      to="/login"
      className="text-gray-600 hover:underline"
      onClick={() => setIsOpen(false)}
    >
      Sign In
    </Link>
  </li>
)} */}
{!userId && (
  <li>
    <Link
      to="/login"
      className="text-gray-600 hover:underline"
      onClick={() => setIsOpen(false)}
    >
      Sign In
    </Link>
  </li>
)}


          <li>
            <FiUser
              className="w-5 h-5 text-gray-600 cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            />

            <UserProfileModal
              isOpen={showProfileModal}
              onClose={() => setShowProfileModal(false)}
            />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
