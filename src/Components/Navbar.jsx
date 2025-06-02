// import React from 'react'

// function Navbar() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Navbar
// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingCart, User } from "lucide-react";

// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//             <span className="text-2xl font-bold text-green-800 mr-2">🌿</span>
//         <span className="text-xl font-bold text-green-700">PlantCareHub</span>
//       </div>

//       {/* Navigation Links */}
//       <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/services">Services</Link></li>
//         <li><Link to="/library">Plant Library</Link></li>
//         <li><Link to="/myplants">My Plants</Link></li>
//         <li><Link to="/plans">Plans</Link></li>
//       </ul>

//       {/* Right Icons */}
//       <div className="flex items-center gap-4">
//         <Link to="/orders" className="text-green-600 font-medium hover:underline">
//           🧾 Orders
//         </Link>
//         <User className="w-5 h-5 text-gray-600" />
//         <Link to="/signin" className="text-gray-600 hover:underline">Sign In</Link>
//         <Link
//           to="/get-started"
//           className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
//         >
//           Get Started
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; // Real user icon import

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between relative">
    <nav className="bg-white shadow-sm px-6 py-4 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-green-800 mr-2">🌿</span>
        <span className="text-xl font-bold text-green-700">PlantCareHub</span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/library">Plant Library</Link></li>
        <li><Link to="/myplants">My Plants</Link></li>
        <li><Link to="/plans">Plans</Link></li>
      </ul>

      {/* Right Icons (hidden on small screens) */}
      <div className="hidden md:flex items-center gap-4">
        <Link to="/orders" className="text-green-600 font-medium hover">
          🧾 Bookings
        </Link>
        <Link to="/register" className="text-gray-600">Sign In</Link>
        <Link
          to="/get-started"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Get Started
        </Link>
        <FiUser className="w-5 h-5 text-gray-600" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            // Hamburger icon when closed
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white shadow-md flex flex-col gap-4 px-6 py-4 md:hidden z-50">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/services" onClick={() => setIsOpen(false)}>Services</Link></li>
          <li><Link to="/library" onClick={() => setIsOpen(false)}>Plant Library</Link></li>
          <li><Link to="/myplants" onClick={() => setIsOpen(false)}>My Plants</Link></li>
          <li><Link to="/plans" onClick={() => setIsOpen(false)}>Plans</Link></li>

          <li>
            <Link
              to="/orders"
              className="text-green-600 font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              🧾 Bookings
            </Link>
          </li>
          <li>
            <Link to="/register" className="text-gray-600 hover:underline" onClick={() => setIsOpen(false)}>
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/get-started"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
