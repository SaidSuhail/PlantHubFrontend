import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchPlants } from "../Features/adminSlice";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { TypeAnimation } from "react-type-animation";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plants } = useSelector((state) => state.admin);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const stats = [
    { end: 10000, label: "Plant Lovers" },
    { end: 5000, label: "Plant Care Guides" },
    { end: 1000, label: "Expert Solutions" },
  ];
  useEffect(() => {
    dispatch(fetchPlants());
  }, [dispatch]);
  const steps = [
    {
      title: "Subscribe to a Plan",
      desc: "Choose a plan that fits your lifestyle – Basic, Standard, or Premium.",
      icon: "📦",
      delay: 0.1,
    },
    {
      title: "Add Your Plants",
      desc: "Browse and book plants as per your plan allowance.",
      icon: "🪴",
      delay: 0.3,
    },
    {
      title: "Enjoy Monthly Swaps",
      desc: "Swap your plants monthly and keep your space fresh.",
      icon: "🔄",
      delay: 0.5,
    },
    {
      title: "Get Free Services",
      desc: "Enjoy free services like health checkups and maintenance.",
      icon: "🛠️",
      delay: 0.7,
    },
  ];
  const [selectedPlant, setSelectedPlant] = useState(null);
  const populatPlants = Array.isArray(plants) ? plants.slice(0, 4) : [];
  return (
    <div className="font-sans text-gray-800 ">
      {/* Hero Section */}
      <div className="bg-white px-6 py-12 flex flex-col md:flex-row items-center gap-6 pt-24 pb-36 mr-12">
        <div className="flex-1">
          {/* <h1 className="text-4xl font-bold mb-4">
            Your Personal Plant Care Assistant
          </h1> */}
          
<TypeAnimation
  sequence={[
    'Your Personal Plant Care Assistant', // Types this
    2000, // Waits 2s
    '', // Deletes
    1000, // Waits 1s
    'Helping You Grow Better', // Second phrase
    2000,
    '', // Deletes again
    1000,
  ]}
  wrapper="h1"
  className="text-4xl font-bold mb-4"
  cursor={true}
  repeat={Infinity}
/>

          <p className="mb-6 text-lg">Expert care for your green companions</p>
          <p className="mb-6 text-gray-600">
            Discover personalized plant care services, expert advice, and a
            thriving community of plant lovers.
          </p>
          <div className="flex gap-4 ml-18">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-md"
              onClick={() => navigate("/services")}
            >
              Book a Service
            </button>
            <button
              className="border border-green-600 text-green-600 px-6 py-2 rounded-md"
              onClick={() => navigate("/library")}
            >
              Explore Plant Library
            </button>
          </div>
        </div>
        <div className="flex-1 ml-14">
          <img src="/Regsiterimg.jpg" alt="Plant Care" className="rounded-lg" />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-50 py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          🌿 Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {[
            {
              title: "Plant Health Check-up",
              desc: "Expert assessments and diagnostic care for your plants.",
              icon: "🩺",
            },
            {
              title: "Regular Maintenance",
              desc: "Keep your plants thriving with routine maintenance.",
              icon: "🧰",
            },
            {
              title: "Plant Emergency Care",
              desc: "24/7 rapid response for plant emergencies.",
              icon: "🚑",
            },
            {
              title: "Garden Design Consultation",
              desc: "Get professional garden layout and design advice.",
              icon: "🌼",
            },
          ].map((service, idx) => (
            <motion.div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-500"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <Link to="/services">
                <button className="inline-block px-4 py-2 text-sm font-medium text-green-700 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition">
                  Learn More
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popular Plants */}
      <div className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Popular Plants</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {populatPlants.map((plant, index) => (
            <motion.div
              key={plant.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => setSelectedPlant(plant)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <img
                src={plant.imageUrl}
                alt={plant.name}
                className="rounded mb-4 w-full h-48 object-cover"
              />
              <h4 className="text-lg font-semibold">{plant.name}</h4>
              <p className="text-sm text-gray-600">{plant.careLevel}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={() => navigate("/library")}
            className="text-green-600 font-semibold flex items-center gap-1"
          >
            More <span className="text-xl">&#8594;</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedPlant && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setSelectedPlant(null)}
            >
              ✕
            </button>
            <img
              src={selectedPlant.imageUrl}
              alt={selectedPlant.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-bold text-green-800">
              {selectedPlant.name}
            </h3>
            <p className="text-sm text-gray-600 mt-1 italic">
              {selectedPlant.latinName || "—"}
            </p>
            <p className="mt-2 text-green-700 font-semibold">
              ${selectedPlant.price}
            </p>
            <p className="mt-3 text-sm text-gray-700">
              {selectedPlant.description || "No description"}
            </p>
            <div className="mt-4 text-sm text-gray-600">
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    navigate(`/plant/${selectedPlant.id}`);
                    setSelectedPlant(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experts Section
      <div className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">
          Connect with Plant Experts
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            [
              "Dr. Sarah Johnson",
              "120 Reviews",
              "https://randomuser.me/api/portraits/women/1.jpg",
            ],
            [
              "Michael Chen",
              "105 Reviews",
              "https://randomuser.me/api/portraits/men/2.jpg",
            ],
            [
              "Emma Wilson",
              "98 Reviews",
              "https://randomuser.me/api/portraits/women/3.jpg",
            ],
          ].map(([name, reviews, img], idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow flex flex-col items-center text-center"
            >
              <img
                src={img}
                alt={name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-sm text-gray-500 mb-2">{reviews}</p>
              <div className="text-yellow-500 mb-4">★★★★★</div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md">
                Book Consultation
              </button>
            </div>
          ))}
        </div>
      </div> */}

      <div className="bg-gradient-to-br from-emerald-5 rounded-3xl to-teal-50 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How <span className="text-emerald-600">PlantHub</span> Works
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process makes plant care effortless and
              enjoyable
            </p>
          </motion.div>

          {/* Flowchart container */}
          <div className="relative">
            {/* Vertical timeline */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 to-teal-300 hidden md:block"></div>

            {/* Animated dots on timeline */}
            {steps.map((_, index) => (
              <div
                key={`dot-${index}`}
                className="absolute left-1/2 transform -translate-x-1/2 hidden md:block"
                style={{ top: `${25 + index * 25}%` }}
              >
                <motion.div
                  className="w-6 h-6 rounded-full bg-white border-4 border-emerald-500 shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.2 + 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                />
              </div>
            ))}

            {/* Steps with animated connectors */}
            <div className="space-y-16 md:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col md:flex-row items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: step.delay,
                  }}
                >
                  {/* Step card - alternates sides on desktop */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8 md:order-2"
                    }`}
                  >
                    <motion.div
                      className="bg-white p-6 rounded-2xl shadow-lg border border-emerald-100 hover:border-emerald-300 transition-all h-full"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(5, 150, 105, 0.1)",
                      }}
                    >
                      <div className="flex items-start">
                        <div className="text-4xl mr-4">{step.icon}</div>
                        <div>
                          <div className="flex items-center">
                            <span className="text-emerald-600 font-bold mr-2">
                              Step {index + 1}
                            </span>
                            <div className="w-8 h-0.5 bg-emerald-200"></div>
                          </div>
                          <h3 className="text-xl font-semibold text-gray-800 mt-2 mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{step.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Center alignment for mobile */}
                  <div className="flex justify-center my-6 md:hidden">
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Arrow connector for desktop */}
                  <div className="hidden md:flex flex-col items-center justify-center w-2/12">
                    {index < steps.length - 1 && (
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: step.delay + 0.2 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{
                              pathLength: [0, 1, 0],
                              pathOffset: [0, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="text-emerald-400"
                          >
                            <svg width="50" height="100" viewBox="0 0 50 100">
                              <path
                                d="M25 0 Q25 30, 25 50 T25 100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeDasharray="5,5"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="relative z-10"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-emerald-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:block" : "md:order-1"
                    }`}
                  ></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA at bottom */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/plans")}
            >
              Get Started Today
            </motion.button>
            <p className="mt-4 text-gray-600 text-sm">
              Join thousands of happy plant parents
            </p>
          </motion.div>
        </div>
      </div>
      {/* Community Stats */}
      <div className="py-16 px-6 text-center bg-white" ref={ref}>
        <h2 className="text-3xl font-bold text-gray-800 mb-12">
          🌱 Join Our Community
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-green-50 rounded-xl shadow-md py-6 px-4"
            >
              <h3 className="text-4xl font-bold text-green-600 mb-2">
                {isInView && (
                  <CountUp end={stat.end} duration={2} separator="," />
                )}
                +
              </h3>
              <p className="text-gray-600 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
