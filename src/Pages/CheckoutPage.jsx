import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addAddress,
  deleteAddress,
  fetchUserAddresses,
  setUserFromToken,
  fetchCartItems,
  createRazorpayOrder,
  createPlantBooking,
  verifyRazorpayPayment,
  fetchUserBookings,
} from "../Features/userSlice";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

function CheckoutPage() {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const {
    cartItems,
    cartTotal,
    addresses,
    loadingCartItems,
    cartError,
    profile,
    userBookings
  } = useSelector((state) => state.users);
  console.log(userBookings);

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    customerName: "",
    customerPhone: "",
    homeAddress: "",
    streetName: "",
    city: "",
    postalCode: "",
  });

  useEffect(() => {
    dispatch(fetchCartItems());
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
      dispatch(fetchUserAddresses(userId));
     dispatch(fetchUserBookings(userId));

    }
  }, [dispatch]);

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log("🪴 Starting plant booking...");
// if (hasExistingPlantBooking) {
//   toast.error("⚠️ You already have a booking. Cannot proceed.");
//   return;
// }

    if (!selectedAddressId || cartItems.length === 0) {
      toast.error("Please select address and make sure cart is not empty.");
      return;
    }
 // ✅ Use Redux state directly
  const plantBookingExists = userBookings?.some(
    (b) =>
      b.bookingType === "PlantBooking" &&
      b.bookingStatus !== "Rejected"
  );

  if (plantBookingExists) {
    toast.error("⚠️ You already have a booking during this plan period.");
    return; // ✅ stop here
  }
 
    const totalAmount = Math.round(cartTotal * 100); // Razorpay expects paise

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
        name: "PlantHub Booking",
        description: "Plant Booking Payment",
        order_id: orderId,
        handler: async function (response) {
          console.log("🧾 Razorpay response received:", response); // ✅ Add this

          try {
            const verificationresult =
              // Step 3: Verify Payment
              await dispatch(
                verifyRazorpayPayment({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                })
              ).unwrap();
            console.log("✅ Payment verified", verificationresult);

       
            const bookingPayload = {
              userId: userId,
              addressId: selectedAddressId,
              transactionId: response.razorpay_payment_id,
              bookingType: 0,
            };

            console.log("📦 Booking Payload:", bookingPayload);

            // await dispatch(createPlantBooking(bookingPayload)).unwrap();
try {
  const result = await dispatch(createPlantBooking(bookingPayload)).unwrap();

  // ✅ Booking success toast
  toast.success("Plant booking successful!");
  dispatch(fetchCartItems());
  setSelectedAddressId(null);
} catch (error) {
  if (
    typeof error === "string" &&
    error.toLowerCase().includes("already have a booking")
  ) {
    toast.error("⚠️ You already have a booking during this plan period.");
  } else {
    toast.error("Booking failed. Please try again.");
  }
}

            dispatch(fetchCartItems());

            toast.success("Plant booking successful!");
            setSelectedAddressId(null);
            // optionally clear cart
          } catch (error) {
            console.error("❌ Booking Error:", error);
            console.log(
              "🌐 Full error object:",
              JSON.stringify(error, null, 2)
            );
            if (error?.message) {
              toast.error(`Error: ${error.message}`);
            } else if (typeof error === "string") {
              toast.error(error);
            } else {
              toast.error("Unknown error occurred during booking.");
            }
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
        Checkout
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Left: Address Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Select Delivery Address
          </h3>

          {addresses.length === 0 && (
            <p className="text-gray-500">
              No address found. Please add one in your profile.
            </p>
          )}

          <div className="space-y-4">
            <button
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowAddressModal(true)}
            >
              + Add New Address
            </button>

            {addresses.map((addr) => (
              <label
                key={addr.id}
                className={`block border p-4 rounded-lg cursor-pointer ${
                  selectedAddressId === addr.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="address"
                  value={addr.id}
                  onChange={() => setSelectedAddressId(addr.id)}
                  checked={selectedAddressId === addr.id}
                  className="mr-3"
                />
                <div className="inline-block">
                  <p className="font-semibold text-gray-800">
                    {addr.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {addr.streetName}, {addr.city}, {addr.homeAddress} -{" "}
                    {addr.postalCode}
                  </p>
                  <p className="text-sm text-gray-500">
                    📞 {addr.customerPhone}
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
                            if (addr.id === selectedAddressId)
                              setSelectedAddressId(null);
                            dispatch(fetchUserAddresses(userId));
                          }
                        });
                      }
                    }}
                    className="text-red-600 text-sm hover:underline mt-2 block"
                  >
                    Delete
                  </button>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Billing Summary
          </h3>
          {loadingCartItems ? (
            <p className="text-gray-500">Loading cart...</p>
          ) : cartError ? (
            <p className="text-red-500">Error loading cart: {cartError}</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {/* Render each item */}
              {cartItems.map((item) => (
                <div
                  key={item.plantId}
                  className="border-b pb-3 mb-3 flex justify-between items-start"
                >
                  <div>
                    <p className="text-gray-900 font-semibold">
                      {item.plantName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              {/* Total */}
              <div className="pt-4 border-t mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-700">₹{cartTotal}</span>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleBooking}
                disabled={cartItems.length === 0}
                className={`w-full mt-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                Proceed to Payment
              </button>
            </>
          )}

          {showAddressModal && (
            <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                <h2 className="text-xl font-semibold mb-4 text-green-800">
                  Add New Address
                </h2>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                      addAddress({ addressData: newAddress, userId })
                    ).then((res) => {
                      if (res.meta.requestStatus === "fulfilled") {
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
                      }
                    });
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newAddress.customerName}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        customerName: e.target.value,
                      })
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
                      setNewAddress({
                        ...newAddress,
                        homeAddress: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Street"
                    value={newAddress.streetName}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        streetName: e.target.value,
                      })
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
                      setNewAddress({
                        ...newAddress,
                        postalCode: e.target.value,
                      })
                    }
                    className="w-full border px-3 py-2 rounded"
                    required
                  />

                  <div className="flex justify-end gap-2 pt-2">
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
          )}
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
