import React from "react";
import { motion } from "framer-motion";
function Services() {
  return (
    <div className="bg-white min-h-screen mt-20 ">
      {/* Hero Section */}
      <div
        className="relative h-72 bg-cover bg-center flex items-center justify-center text-green-800 text-center rounded-3xl"
        style={{ backgroundImage: "url('bannerimg.jpg'" }}
      >
        <div className="bg-white bg-opacity-50 p-4 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
          >
            <h1 className="text-3xl md:text-5xl font-bold">
              Professional Plant Care Services
            </h1>
            <p className="mt-2 text-lg">
              Expert care for your green companions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Pot Change Service",
              desc: "Give your plants a new start with proper pots and fresh soil.",
              price: "From $19.99",
              duration: "45-60 minutes",
            },
            {
              title: "Soil Replacement",
              desc: "Fresh nutrients for root and optimal plant growth.",
              price: "From $14.99",
              duration: "30-45 minutes",
            },
            {
              title: "Pest Control Treatment",
              desc: "Safe and effective management for pest issues.",
              price: "From $34.99",
              duration: "1 hour",
            },
            {
              title: "Health Check-up",
              desc: "Comprehensive plant health assessment.",
              price: "From $9.99",
              duration: "30 minutes",
            },
            {
              title: "Pruning Service",
              desc: "Professional shaping for healthy growth.",
              price: "From $22.99",
              duration: "45 minutes",
            },
            {
              title: "Fertilization",
              desc: "Custom nutrient mix for your plants.",
              price: "From $9.99",
              duration: "30 minutes",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-green-50 p-4 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-green-800 mb-1">
                {service.title}
              </h3>
              <p className="text-gray-700 text-sm mb-2">{service.desc}</p>
              <div className="text-sm text-gray-600">
                {service.price} • ⏱ {service.duration}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Your Service */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-green-900 mb-6">
            Book Your Service
          </h2>
          <form className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Select Service</label>
                <select className="w-full border rounded px-3 py-2">
                  <option>Pot Change Service</option>
                  <option>Soil Replacement</option>
                  <option>Pest Control Treatment</option>
                  <option>Health Check-up</option>
                  <option>Pruning Service</option>
                  <option>Fertilization</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Select Date</label>
                <input
                  type="date"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Select Time</label>
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Number of Plants
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Special Instructions
              </label>
              <textarea
                rows="3"
                className="w-full border rounded px-3 py-2"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              Proceed to Confirmation
            </button>
          </form>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            {
              icon: "🌿",
              title: "Expert Specialists",
              desc: "Get care from true professionals.",
            },
            {
              icon: "♻️",
              title: "Eco-friendly",
              desc: "Solutions that respect nature.",
            },
            {
              icon: "🚚",
              title: "Same-day Service",
              desc: "Book and get it done same day.",
            },
            {
              icon: "✅",
              title: "100% Satisfaction",
              desc: "We ensure results that make you smile.",
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-green-50 p-6 rounded shadow">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-lg font-semibold text-green-800 mb-1">
                {item.title}
              </h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
