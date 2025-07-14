import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { jwtDecode } from "jwt-decode";
export const registerUser = createAsyncThunk(
  "admin/registerUser",
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Auth/Register", newUserData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Booking/user/${userId}`);
      console.log("bookingresponse", response);
      return response.data.data; // assuming response is like { success, message, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user bookings"
      );
    }
  }
);
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/Cart/add/${plantId}`);
      return response.data;
    } catch (error) {
      const err = error.response?.data;

      return rejectWithValue(err?.message || "Failed To Add to Cart");
    }
  }
);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/Cart/remove/${plantId}`);
      return { plantId, message: response.data.message }; // returning the removed item's ID
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove item");
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Cart");
      const data = response.data.data;
      return {
        items: data.items,
        totalPrice: data.totalPrice,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch cartitems"
      );
    }
  }
);

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axiosInstance.get("/User");
  return response.data; // adjust if your API structure differs
});

export const fetchProfile = createAsyncThunk("admin/fetchprofile", async () => {
  const response = await axiosInstance.get("/Profile");
  console.log(response);
  return response.data.data;
});
export const fetchPlantById = createAsyncThunk(
  "admin/fetchPlantById",
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/Plant/${plantId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch plant");
    }
  }
);

export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Cart/increase/${plantId}`);
      // console.log("Quantity Management",response);
      console.log("Increase Quantity Response", response.data.data);
      return {
        items: response.data.data.items,
        totalPrice: response.data.data.totalPrice,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to increase quantity";
      return rejectWithValue(errorMessage); // ✅ always a string
      // return rejectWithValue(error.response?.data||"failed to increase quantity");
    }
  }
);
export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (plantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/Cart/decrease/${plantId}`);
      return {
        items: response.data.data,
        totalPrice: response.data.data.totalPrice,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed To Decrease Quantity"
      );
    }
  }
);

export const blockUnblockUser = createAsyncThunk(
  "admin/blockUnblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `/User/BlockUnBlockUser/${userId}`
      );
      return { userId, updatedUser: response.data }; // Adjust structure if needed
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to block/unblock user"
      );
    }
  }
);

export const UpdateProfile = createAsyncThunk(
  "admin/updateprofile",
  async (updatedData) => {
    const response = await axiosInstance.patch("/Profile/Update", updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data.data;
  }
);
export const fetchPlans = createAsyncThunk(
  "plans/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Plans");
      return response.data.data; // Adjust if your API wraps data differently
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plans"
      );
    }
  }
);
export const subscribeToPlan = createAsyncThunk(
  "user/subscribeToPlan",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      console.log("📦 Subscribing with:", subscriptionData); // Add this
      const response = await axiosInstance.post(
        "/UserPlan/subscribe",
        subscriptionData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to subscribe to plan"
      );
    }
  }
);

export const fetchUserPlan = createAsyncThunk(
  "plans/fetchUserPlan",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/UserPlan/${userId}`);
      const plans = response.data;
      if (Array.isArray(plans) && plans.length > 0) {
        const activePlan = plans.find((p) => p.isActive) || plans[0];
        return activePlan;
      }
      return null;
    } catch (error) {
      return rejectWithValue("Failed to fetch user plan");
    }
  }
);
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Service"); // Adjust path if needed
      return response.data.data; // Assuming API returns { success, message, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);
export const fetchUserAddresses = createAsyncThunk(
  "users/fetchUserAddresses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/UserAddress/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch addresses"
      );
    }
  }
);
export const addAddress = createAsyncThunk(
  "users/addAddress",
  async ({ addressData, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/UserAddress", {
        ...addressData,
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add address"
      );
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "users/deleteAddress",
  async (addressId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/UserAddress/${addressId}`);
      return addressId; // we return only the ID to remove it from state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete address"
      );
    }
  }
);

export const createRazorpayOrder = createAsyncThunk(
  "booking/createRazorpayOrder",
  async (amount, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/Booking/razorpay-order-create?amount=${amount}`
      );
      return response.data.data; // Razorpay Order ID
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create Razorpay order"
      );
    }
  }
);
export const verifyRazorpayPayment = createAsyncThunk(
  "razorpay/verifyPayment",
  async (
    { razorpay_order_id, razorpay_payment_id, razorpay_signature },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        "/Booking/razorpay-payment-verify",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        }
      );
      return response.data; // success confirmation
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

export const createServiceBooking = createAsyncThunk(
  "booking/createServiceBooking",
  async (bookingPayload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/Booking/create-service",
        bookingPayload
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create service booking"
      );
    }
  }
);

export const createPlantBooking = createAsyncThunk(
  "users/createPlantBooking",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/Booking/Create", null, {
        params: {
          userId: Number(payload.userId),
          addressId: payload.addressId,
          transactionId: payload.transactionId,
        },
      });
      return res.data;
    } catch (err) {
      console.error("❌ Booking API Error Full:", err);
      return rejectWithValue(err.response?.data?.message || "Booking failed");
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "user/fetchNotifications",
  async (userId, thunkAPI) => {
    try {
      console.log("📨 Fetching notifications for userId:", userId);
      const response = await axiosInstance.get(
        `/Notification/user?userId=${userId}`
      );
      console.log("✅ Notifications API response:", response.data);
      return response.data; // Assuming backend returns plain list, not { data: [] }
    } catch (error) {
      console.error(
        "❌ Error fetching notifications:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue("Failed to fetch notifications");
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "user/markNotificationAsRead",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.post(`/Notification/${id}/read`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to mark notification as read");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userId: null,
    token: null,
    cartItems: [],
    cartTotal: 0,
    profile: null,
    plant: null,
    loadingUsers: false,
    loadingPlant: false,
    addingUser: false,
    addUserError: null,
    addUserSuccess: null,
    loadingProfile: false,
    errorUsers: null,
    errorPlant: null,
    errorProfile: null,
    addingToCart: false,
    addToCartSuccess: null,
    addToCartError: null,
    fetchingCart: false,
    fetchingCartError: null,
    subscribing: false,
    subscribeError: null,
    subscribeSuccess: null,
    plans: [],
    loadingPlans: false,
    plansError: null,
    userPlan: null,
    loadingSubscribedPlan: false,
    subscribedPlanId: null,
    userBookings: [],
    loadingBookings: false,
    bookingsError: null,
    services: [],
    loadingServices: false,
    servicesError: null,
    addresses: [],
    loadingAddresses: false,
    addressesError: null,
    addAddressStatus: "idle",
    addAddressError: null,
    deletingAddress: false,
    deleteAddressError: null,
    razorpayOrderId: null,
    razorpayKey: null,
    razorpayOrderStatus: "idle",
    razorpayOrderError: null,
    razorpayVerificationStatus: "idle",
    razorpayVerificationError: null,
    createServiceBookingStatus: "idle",
    createServiceBookingError: null,
    createBookingStatus: "idle",
    createBookingError: null,
    notifications: [],
    loadingNotifications: false,
    errorNotifications: null,
    markingNotification: false,
    errorMarkingNotification: null,
  },
  reducers: {
    clearCartMessages: (state) => {
      state.addToCartSuccess = null;
      state.addToCartError = null;
    },
    clearSubscribeMessages: (state) => {
      state.subscribeError = null;
      state.subscribeSuccess = null;
    },
    setUserFromToken: (state, action) => {
      console.log("🧠 setUserFromToken reducer triggered");
      const token = action.payload;
      const decoded = jwtDecode(token);
      const userId =
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
      console.log("✅ Decoded userId:", userId);
      state.token = token;
      state.userId = userId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.errorUsers = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.error.message || "Failed to fetch users";
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loadingProfile = true;
        state.errorProfile = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorProfile = action.error.message || "failed to fetch profile";
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.loadingProfile = true;
        state.errorProfile = null;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.loadingProfile = false;
        state.profile = action.payload;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        state.errorProfile = action.error.message || "Failed to update profile";
      })
      .addCase(blockUnblockUser.fulfilled, (state, action) => {
        const { userId, updatedUser } = action.payload;
        const index = state.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...updatedUser };
        }
      })
      .addCase(blockUnblockUser.rejected, (state, action) => {
        state.errorUsers = action.payload || "Failed to block/unblock user";
      })
      .addCase(registerUser.pending, (state) => {
        state.addingUser = true;
        state.addUserError = null;
        state.addUserSuccess = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.addingUser = false;
        state.addUserSuccess = "User added successfully";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.addingUser = false;
        state.addUserError = action.payload || "Failed to add user";
      })
      .addCase(fetchPlantById.pending, (state) => {
        state.loadingPlant = true;
        state.errorPlant = null;
      })
      .addCase(fetchPlantById.fulfilled, (state, action) => {
        state.loadingPlant = false;
        state.plant = action.payload;
      })
      .addCase(fetchPlantById.rejected, (state, action) => {
        state.loadingPlant = false;
        state.errorPlant = action.payload || "failed to fetch plant";
      })
      .addCase(addToCart.pending, (state) => {
        state.addingToCart = true;
        state.addToCartSuccess = null;
        state.addToCartError = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.addingToCart = false;
        state.addToCartSuccess = "Item Added To Cart Successfully";
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        console.log("addToCart.rejected payload:", action.payload); // debug
        state.addingToCart = false;
        state.addToCartError = action.payload || "Failed to add to cart";
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.fetchingCart = true;
        state.fetchingCartError = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.fetchingCart = false;
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.totalPrice;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.fetchingCart = false;
        state.fetchingCartError =
          action.payload || "failed to fetch cart items";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedId = action.payload.plantId;
        state.cartItems = state.cartItems.filter(
          (item) => item.plantId != removedId
        );

        state.cartTotal = state.cartItems.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.addingToCart = false;
        state.addToCartError =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed To Add To Cart";
      })
      .addCase(increaseCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.totalPrice;
      })
      .addCase(increaseCartQuantity.rejected, (state, action) => {
        state.addToCartError =
          typeof action.payload === "string"
            ? action.payload
            : action.payload.message || "Failed to increase quantity";
      })
      .addCase(decreaseCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.items;
        state.cartTotal = action.payload.totalPrice;
      })
      .addCase(decreaseCartQuantity.rejected, (state, action) => {
        state.addToCartError =
          typeof action.payload === "string"
            ? action.payload
            : action.payload?.message || "Failed To Decrease Quantity";
      })
      .addCase(subscribeToPlan.pending, (state) => {
        state.subscribing = true;
        state.subscribeError = null;
        state.subscribeSuccess = null;
      })
      .addCase(subscribeToPlan.fulfilled, (state, action) => {
        state.subscribing = false;
        state.subscribeSuccess = "Plan subscribed successfully";
      })
      .addCase(subscribeToPlan.rejected, (state, action) => {
        state.subscribing = false;
        state.subscribeError = action.payload || "Failed to subscribe to plan";
      })
      .addCase(fetchPlans.pending, (state) => {
        state.loadingPlans = true;
        state.plansError = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loadingPlans = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loadingPlans = false;
        state.plansError = action.payload || "Failed to fetch plans";
      })
      .addCase(fetchUserPlan.pending, (state) => {
        state.loadingSubscribedPlan = true;
      })

      .addCase(fetchUserPlan.fulfilled, (state, action) => {
        const userPlan = action.payload;
        state.loadingSubscribedPlan = false;
        state.userPlan = userPlan;
        if (userPlan && userPlan.isActive) {
          console.log("🎯 Active Plan ID from API:", userPlan.planId);
          state.subscribedPlanId = userPlan.planId;
        } else {
          console.log("⚠️ No active plan or inactive plan.");
          state.subscribedPlanId = null;
        }
      })
      .addCase(fetchUserPlan.rejected, (state, action) => {
        state.loadingSubscribedPlan = false;
        state.subscribedPlanId = null;
        state.userPlan = null;
        state.plansError = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.loadingBookings = true;
        state.bookingsError = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loadingBookings = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loadingBookings = false;
        state.bookingsError = action.payload;
      })
      .addCase(fetchServices.pending, (state) => {
        state.loadingServices = true;
        state.servicesError = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loadingServices = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loadingServices = false;
        state.servicesError = action.payload;
      })
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loadingAddresses = true;
        state.addressesError = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loadingAddresses = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loadingAddresses = false;
        state.addressesError = action.payload;
      })
      .addCase(addAddress.pending, (state) => {
        state.addAddressStatus = "loading";
        state.addAddressError = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.addAddressStatus = "succeeded";
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.addAddressStatus = "failed";
        state.addAddressError = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.deletingAddress = true;
        state.deleteAddressError = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.deletingAddress = false;
        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.deletingAddress = false;
        state.deleteAddressError = action.payload;
      })
      .addCase(createRazorpayOrder.pending, (state) => {
        state.razorpayOrderStatus = "loading";
        state.razorpayOrderError = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.razorpayOrderStatus = "succeeded";
        state.razorpayOrderId = action.payload;
        state.razorpayKey = action.payload;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.razorpayOrderStatus = "failed";
        state.razorpayOrderError = action.payload;
      })
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.razorpayVerificationStatus = "loading";
        state.razorpayVerificationError = null;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.razorpayVerificationStatus = "succeeded";
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.razorpayVerificationStatus = "failed";
        state.razorpayVerificationError = action.payload;
      })
      .addCase(createServiceBooking.pending, (state) => {
        state.createServiceBookingStatus = "loading";
        state.createServiceBookingError = null;
      })
      .addCase(createServiceBooking.fulfilled, (state, action) => {
        state.createServiceBookingStatus = "succeeded";
      })
      .addCase(createServiceBooking.rejected, (state, action) => {
        state.createServiceBookingStatus = "failed";
        state.createServiceBookingError = action.payload;
      })
      .addCase(createPlantBooking.pending, (state) => {
        state.createBookingStatus = "loading";
        state.createBookingError = null;
      })
      .addCase(createPlantBooking.fulfilled, (state, action) => {
        state.createBookingStatus = "succeeded";
        state.createBookingError = null;
        state.cartItems = [];
        state.cartTotal = 0;
      })
      .addCase(createPlantBooking.rejected, (state, action) => {
        state.createBookingStatus = "failed";
        state.createBookingError = action.payload;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.loadingNotifications = true;
        state.errorNotifications = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        console.log("✅ Updating state.notifications with:", action.payload);
        state.loadingNotifications = false;
        state.notifications = action.payload;
        console.log("📦 Updated state.notifications:", state.notifications);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loadingNotifications = false;
        state.errorNotifications = action.error.message;
      })
      .addCase(markNotificationAsRead.pending, (state) => {
        state.markingNotification = true;
        state.errorMarkingNotification = null;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.markingNotification = false;
        const notif = state.notifications.find((n) => n.id === action.payload);
        if (notif) notif.isRead = true;
      })

      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.markingNotification = false;
        state.errorMarkingNotification = action.payload;
      });
  },
});
export const { clearCartMessages, clearSubscribeMessages, setUserFromToken } =
  userSlice.actions;
export default userSlice.reducer;
