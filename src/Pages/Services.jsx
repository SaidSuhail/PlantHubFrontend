import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchServices,
  fetchUserAddresses,
  setUserFromToken,
  addAddress,
  deleteAddress,
  createRazorpayOrder,
  verifyRazorpayPayment,
  createServiceBooking,
} from "../Features/userSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
// import jwt_decode from "jwt-decode";
function Services() {
  const dispatch = useDispatch();
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState([]);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    customerName: "",
    customerPhone: "",
    homeAddress: "",
    streetName: "",
    city: "",
    postalCode: "",
  });
  const { services, loadingServices, servicesError, addresses, profile } =
    useSelector((state) => state.users);
  // const selectedService = services.find((s) => s.id === selectedServiceId);
  console.log(addresses);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    dispatch(setUserFromToken(token));
    const decoded = jwtDecode(token);
    const userId =
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    setUserId(userId);

    if (userId) {
      dispatch(fetchUserAddresses(userId)); // Your API call
    }
  }, [dispatch]);

  const payload = {
    addressId: selectedAddressId,
    serviceIds: selectedServiceId,
  };

  console.log("Booking Payload:", payload);
const totalPrice = services
  .filter((s) => selectedServiceId.includes(s.id))
  .reduce((sum, s) => sum + s.price, 0);

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log("🟢 Starting booking...");

    if (!selectedAddressId || selectedServiceId.length === 0) {
      toast.error("Please select address and at least one service.");
      return;
    }

    const selectedServices = services.filter((s) =>
      selectedServiceId.includes(s.id)
    );

    const totalAmount = Math.round(
      selectedServices.reduce((acc, s) => acc + s.price, 0) * 100
    );

    try {
      // Step 1: Create Razorpay Order
      const result = await dispatch(createRazorpayOrder(totalAmount));

      if (result.meta.requestStatus !== "fulfilled") {
        toast.error("Failed to create payment order");
        return;
      }

      const { orderId, razorpayKey } = result.payload;

      // Step 2: Launch Razorpay
      const options = {
        key: razorpayKey,
        amount: totalAmount,
        currency: "INR",
        name: "PlantHub Services",
        description: "Service Booking Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            // Step 3: Verify Payment
            await dispatch(
              verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              })
            ).unwrap();

            // Step 4: Create Service Booking
            await dispatch(
              createServiceBooking({
                userId: userId,
                addressId: selectedAddressId,
                serviceIds: selectedServiceId,
                transactionId: response.razorpay_payment_id,
              })
            ).unwrap();

            toast.success("Service booking successful!");
            setSelectedAddressId(null);
            setSelectedServiceId([]);
          } catch (error) {
            toast.error("Payment verification or booking failed");
          }
        },
        prefill: {
          name: profile?.fullName || "User",
          email: profile?.email || "",
          contact: profile?.phone || "",
        },
        theme: {
          color: "#22c55e",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Something went wrong with booking");
    }
  };

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
          {loadingServices ? (
            <p className="text-center col-span-full">Loading services...</p>
          ) : servicesError ? (
            <p className="text-center text-red-500 col-span-full">
              {servicesError}
            </p>
          ) : services.length === 0 ? (
            <p className="text-center col-span-full">No services available.</p>
          ) : (
            services.map((service) => (
              <div
                key={service.id}
                className="bg-green-50 p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-1">
                  {service.name}
                </h3>
                <p className="text-gray-700 text-sm mb-2">
                  {service.description}
                </p>
                <div className="text-sm text-gray-600">
                  ₹{service.price} • ⏱ {service.duration}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <form
        onSubmit={handleBooking}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Grid for two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            {/* <h3 className="text-lg font-semibold mb-3 text-green-800">
              Select Address
            </h3> */}
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
  Select Address
</h3>

            <div className="flex justify-between items-center mb-2">
              {/* <h3 className="text-lg font-semibold text-green-800">
                Select Address
              </h3> */}
              {/* <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-200 font-medium"
              >
                + Add Address
              </button> */}
              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition font-medium"
              >
                ＋ Add Address
              </button>
            </div>

            {/* <select
              value={selectedAddressId || ""}
              onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
              className="w-full border rounded px-3 py-2"
            >
              <option value="" disabled>
                Select your address
              </option>
              {addresses.map((addr) => (
                <option key={addr.id} value={addr.id}>
                  {addr.customerName}, {addr.streetName}, {addr.city}
                </option>
              ))}
            </select> */}
            <select
  value={selectedAddressId || ""}
  onChange={(e) => setSelectedAddressId(parseInt(e.target.value))}
  className="w-full px-4 py-2 border border-green-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 text-sm text-gray-700 transition"
>
  <option value="" disabled>
    🌱 Select your address
  </option>
  {addresses.map((addr) => (
    <option key={addr.id} value={addr.id}>
      {addr.customerName}, {addr.streetName}, {addr.city}
    </option>
  ))}
</select>

            {/* Selected Address Details */}
            {/* {selectedAddressId && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              Selected Address
            </h4>
            {addresses
              .filter((addr) => addr.id === selectedAddressId)
              .map((addr) => (
                <div
                  key={addr.id}
                  className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow relative"
                >
                  <p className="text-md font-semibold text-blue-800">
                    {addr.customerName}
                  </p>
                  <p className="text-sm text-gray-700">
                    {addr.streetName}, {addr.city}, {addr.homeAddress} -{" "}
                    {addr.postalCode}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Phone: {addr.customerPhone}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this address?"
                        )
                      ) {
                        dispatch(deleteAddress(addr.id)).then((res) => {
                          if (res.meta.requestStatus === "fulfilled") {
                            toast.success("Address Deleted Successfully");
                            if (addr.id === selectedAddressId) {
                              setSelectedAddressId(null); // unselect deleted address
                            }
                          }
                        });
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200 text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        )} */}
            {selectedAddressId && (
              <div className="mt-8">
                {/* <h4 className="text-2xl font-bold text-green-700 mb-6 text-center">
                  📦 Selected Delivery Address
                </h4> */}

                {addresses
                  .filter((addr) => addr.id === selectedAddressId)
                  .map((addr) => (
                    <div
                      key={addr.id}
                      className="relative bg-gradient-to-br from-green-50 to-white border border-green-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 max-w-2xl mx-auto"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="text-lg font-semibold text-green-900">
                          {addr.customerName}
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {addr.streetName}, {addr.city}, {addr.homeAddress} -{" "}
                          {addr.postalCode}
                        </p>
                        <p className="text-sm text-gray-600">
                          📞 {addr.customerPhone}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this address?"
                            )
                          ) {
                            dispatch(deleteAddress(addr.id)).then((res) => {
                              if (res.meta.requestStatus === "fulfilled") {
                                toast.success("Address Deleted Successfully");
                                if (addr.id === selectedAddressId) {
                                  setSelectedAddressId(null);
                                }
                              }
                            });
                          }
                        }}
                        className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full hover:bg-red-200 transition"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-3 text-green-800">
              Select Services
            </h3>
            <div className="space-y-2">
              {services.map((service) => (
                <label key={service.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={service.id}
                    checked={selectedServiceId.includes(service.id)}
                    onChange={(e) => {
                      const id = parseInt(e.target.value);
                      if (e.target.checked) {
                        setSelectedServiceId([...selectedServiceId, id]);
                      } else {
                        setSelectedServiceId(
                          selectedServiceId.filter((sid) => sid !== id)
                        );
                      }
                    }}
                  />
                  <span>{service.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div> */}
        <div className="mb-8">
  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-green-700 flex items-center gap-2">
    🛠️ Select Services
  </h3>

  <div className="space-y-3">
    {services.map((service) => (
      <label
        key={service.id}
        className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all"
      >
        <input
          type="checkbox"
          value={service.id}
          checked={selectedServiceId.includes(service.id)}
          onChange={(e) => {
            const id = parseInt(e.target.value);
            if (e.target.checked) {
              setSelectedServiceId([...selectedServiceId, id]);
            } else {
              setSelectedServiceId(selectedServiceId.filter((sid) => sid !== id));
            }
          }}
          className="mt-1 accent-green-600 w-4 h-4"
        />
        <div>
          <p className="text-sm font-medium text-green-800">{service.name}</p>
          {/* Optional: Add description or price if needed */}
          {/* <p className="text-xs text-gray-600">₹{service.price} • {service.duration}</p> */}
        </div>
      </label>
    ))}
  </div>
</div>
</div>

        {/* Selected Services Details */}
        {/* {selectedServiceId.length > 0 && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              Selected Service Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services
                .filter((s) => selectedServiceId.includes(s.id))
                .map((service) => (
                  <div
                    key={service.id}
                    className="bg-green-50 p-4 rounded-lg shadow"
                  >
                    <h5 className="text-md font-semibold text-green-700 mb-1">
                      {service.name}
                    </h5>
                    <p className="text-sm text-gray-700 mb-1">
                      {service.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{service.price} • ⏱ {service.duration}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )} */}
        {selectedServiceId.length > 0 && (
          <div className="mb-10">
            <h4 className="text-2xl font-bold text-emerald-700 mb-5 text-center">
              🌿 Selected Service Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter((s) => selectedServiceId.includes(s.id))
                .map((service) => (
                  <div
                    key={service.id}
                    className="bg-gradient-to-br from-emerald-100 to-emerald-50 p-6 rounded-2xl shadow-md border border-emerald-200 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    <h5 className="text-xl font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full"></span>
                      {service.name}
                    </h5>
                    <p className="text-sm text-gray-800 mb-3">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-700 font-medium">
                      <span className="bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full">
                        ₹{service.price}
                      </span>
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        ⏱ {service.duration}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Proceed to Confirmation
        </button> */}
        {/* <div className="flex justify-center mt-6">
  <button
    type="submit"
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200"
  >
    Proceed to Confirmation
  </button>
</div> */}
<div className="mt-8 flex flex-col items-end gap-3 px-4 sm:px-0">
  {/* Total Price Display */}
  <p className="text-teal-700 font-bold text-lg sm:text-xl bg-teal-50 px-4 py-2 rounded-lg shadow-sm">
    Total: ₹{totalPrice}
  </p>

  {/* Proceed Button */}
  <button
    type="submit"
    className="bg-gradient-to-r from-teal-500 to-green-600 hover:from-teal-600 hover:to-green-700 text-white px-6 py-3 rounded-xl text-base sm:text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 active:scale-95 flex items-center justify-center gap-2"
  >
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    Proceed to Confirmation
  </button>
</div>


      </form>
      {/* {showAddressModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Add New Address
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(addAddress({ addressData: newAddress, userId })).then(
                  (res) => {
                    if (res.meta.requestStatus === "fulfilled") {
                      toast.success("Address added successfully!");
                      setShowAddressModal(false);
                      setNewAddress({
                        customerName: "",
                        customerPhone: "",
                        homeAddress: "",
                        streetName: "",
                        city: "",
                        postalCode: "",
                      });
                      dispatch(fetchUserAddresses(userId));
                    } else if (
                      res.payload?.includes("maximum") ||
                      res.payload?.toLowerCase().includes("limit")
                    ) {
                      toast.error("You can only add up to 3 addresses.");
                    } else {
                      toast.error("You can only add up to 3 addresses.");
                    }
                  }
                );
              }}
              className="space-y-3"
            >
              <input
                type="text"
                placeholder="Full Name"
                value={newAddress.customerName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, customerName: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newAddress.customerPhone}
                onChange={(e) =>
                  setNewAddress({
                    ...newAddress,
                    customerPhone: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Home Address"
                value={newAddress.homeAddress}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, homeAddress: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Street"
                value={newAddress.streetName}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, streetName: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={newAddress.postalCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, postalCode: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      {showAddressModal && (
  <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative transform transition-all duration-300 scale-95 animate-scaleIn">
      {/* Close Button */}
      <button
        onClick={() => setShowAddressModal(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Add New Address
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addAddress({ addressData: newAddress, userId })).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
              toast.success("Address added successfully!");
              setShowAddressModal(false);
              setNewAddress({
                customerName: "",
                customerPhone: "",
                homeAddress: "",
                streetName: "",
                city: "",
                postalCode: "",
              });
              dispatch(fetchUserAddresses(userId));
            } else if (
              res.payload?.includes("maximum") ||
              res.payload?.toLowerCase().includes("limit")
            ) {
              toast.error("You can only add up to 3 addresses.");
            } else {
              toast.error("Failed to add address. Please try again.");
            }
          });
        }}
        className="p-6 space-y-5"
      >
        {[
          { 
            name: "customerName", 
            placeholder: "Full Name",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
          },
          { 
            name: "customerPhone", 
            placeholder: "Phone Number",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
          },
          { 
            name: "homeAddress", 
            placeholder: "House/Apartment Name",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
          },
          { 
            name: "streetName", 
            placeholder: "Street Name",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
          },
          { 
            name: "city", 
            placeholder: "City",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
          },
          { 
            name: "postalCode", 
            placeholder: "Postal Code",
            icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
          },
        ].map((field) => (
          <div key={field.name} className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {field.icon}
            </div>
            <input
              type="text"
              placeholder={field.placeholder}
              value={newAddress[field.name]}
              onChange={(e) =>
                setNewAddress({ ...newAddress, [field.name]: e.target.value })
              }
              className="w-full border border-gray-200 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-base transition-all duration-200 hover:border-green-300"
              required
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => setShowAddressModal(false)}
            className="px-5 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Save Address
          </button>
        </div>
      </form>
    </div>
  </div>
)}

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
