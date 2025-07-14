import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";

export const fetchProviderBookings = createAsyncThunk(
  "provider/fetchProviderBookings",
  async (providerId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/Booking/assigned/${providerId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch provider bookings"
      );
    }
  }
);

export const providerUpdateBookingStatus = createAsyncThunk(
  "provider/updateBookingStatus",
  async ({ bookingId, status }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axiosInstance.put(
        `/Booking/update-status?bookingId=${bookingId}&status=${status}`
      );

      console.log("Update response:", response.data);

      const providerId = getState().provider.providerId || 1;
      await dispatch(fetchProviderBookings(providerId));
      return { bookingId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Slice
const providerSlice = createSlice({
  name: "provider",
  initialState: {
    bookings: [],
    loadingBookings: false,
    errorBookings: null,

    updatingStatus: false,
    updateStatusError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviderBookings.pending, (state) => {
        state.loadingBookings = true;
        state.errorBookings = null;
        console.log("⏳ Fetching provider bookings...");
      })
      .addCase(fetchProviderBookings.fulfilled, (state, action) => {
        state.loadingBookings = false;
        state.bookings = action.payload;
        console.log("✅ Provider bookings fetched:", action.payload);
      })
      .addCase(fetchProviderBookings.rejected, (state, action) => {
        state.loadingBookings = false;
        state.errorBookings = action.payload;
        console.error("❌ Failed to fetch provider bookings:", action.payload);
      })

      .addCase(providerUpdateBookingStatus.pending, (state) => {
        state.updatingStatus = true;
        state.updateStatusError = null;
      })

      .addCase(providerUpdateBookingStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated || !updated.id) {
          console.error("Update payload is invalid:", updated);
          state.updatingStatus = false;
          return;
        }
        state.updatingStatus = false;
        const index = state.bookings.findIndex((b) => b.id === updated.id);
        if (index !== -1) {
          state.bookings[index] = updated;
        }
        console.log("✅ Booking status updated:", updated);
      })
      .addCase(providerUpdateBookingStatus.rejected, (state, action) => {
        state.updatingStatus = false;
        state.updateStatusError = action.payload;
        console.error("❌ Failed to update booking:", action.payload);
      });
  },
});

export default providerSlice.reducer;
