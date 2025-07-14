import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosInstance";
import { data } from "react-router-dom";

export const fetchPlants = createAsyncThunk("admin/fetchPlants", async () => {
  const response = await axiosInstance.get("/Plant/GetAllPlants");
  return response.data.data;
});
export const deletePlant = createAsyncThunk(
  "admin/deletePlant",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/Plant/${id}`);
      return id; // return plant id to remove from Redux state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete plant"
      );
    }
  }
);

export const patchUpdatePlant = createAsyncThunk(
  "admin/patchUpdatePlant",
  async ({ id, patchData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      for (const key in patchData) {
        if (patchData[key] !== null && patchData[key] !== "") {
          formData.append(key, patchData[key]);
        }
      }

      const response = await axiosInstance.patch(`/Plant/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update plant"
      );
    }
  }
);

export const SearchPlant = createAsyncThunk(
  "admin/searchplant",
  async (searchTerm) => {
    const response = await axiosInstance.get(
      `/Plant/search?keyword=${encodeURIComponent(searchTerm)}`
    );
    return response.data.data;
  }
);
export const fetchAllRoleRequests = createAsyncThunk(
  "admin/fetchAllRoleRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/controller/all");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch role requests");
    }
  }
);

export const requestProviderRole = createAsyncThunk(
  "admin/requestProviderRole",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.auth?.currentUser?.id;

      const payload = {
        userId,
        requestedRole: "Provider", // Corrected key
      };

      const res = await axiosInstance.post("/controller/submit", payload); // Corrected endpoint & method
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Request failed");
    }
  }
);
export const reviewProviderRequest = createAsyncThunk(
  "admin/reviewProviderRequest",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/controller/review", {
        requestId,
        approve: status === 1,
      });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Review failed");
    }
  }
);

export const fetchPendingProviders = createAsyncThunk(
  "admin/fetchPendingProviders",
  async () => {
    const response = await axiosInstance.get("/controller/pending");
    return response.data.data; // assuming your API wraps data inside `.data`
  }
);

export const fetchCategories = createAsyncThunk(
  "admin/fetchCategories",
  async () => {
    const res = await axiosInstance.get("/Category");
    return res.data.data;
  }
);
export const addPlan = createAsyncThunk(
  "admin/addPlan",
  async (planData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/Plans", planData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add plan"
      );
    }
  }
);
export const patchUpdatePlan = createAsyncThunk(
  "admin/patchUpdatePlan",
  async ({ id, patchData }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/Plans/${id}`, patchData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update plan"
      );
    }
  }
);
// adminSlice.js
export const deletePlan = createAsyncThunk(
  "admin/deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/Plans/${id}`);
      return id; // Return the deleted plan ID
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);
export const changeUserRole = createAsyncThunk(
  "admin/changeUserRole",
  async ({ userId, newRole }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/Role/Change-Role", {
        userId,
        role: newRole,
      });
      return response.data; // or response.data.data if wrapped
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to change user role"
      );
    }
  }
);

export const fetchAllUserPlans = createAsyncThunk(
  "admin/fetchAllUserPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/UserPlan/All"); // ✅ correct endpoint
      return response.data; // Assuming it's a list of user plans
    } catch (error) {
      return rejectWithValue("Failed to fetch all user plans");
    }
  }
);
export const fetchAllProviders = createAsyncThunk(
  "admin/fetchAllProviders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/Role/providers");
      return res.data.data; // assuming response format { success, message, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch providers"
      );
    }
  }
);

export const fetchPendingBookings = createAsyncThunk(
  "admin/fetchPendingBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/Booking/pending");
      console.log("Pnedingbookingss", response.data);
      return response.data.data; // Assuming your API wraps data under .data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pending bookings"
      );
    }
  }
);

export const assignProviderToBooking = createAsyncThunk(
  "admin/assignProviderToBooking",
  async ({ bookingId, providerId }, { rejectWithValue }) => {
    try {
      console.log("🚀 Sending assignment request:", { bookingId, providerId });

      const response = await axiosInstance.post(
        `/Booking/Assign-provider?bookingId=${bookingId}&providerId=${providerId}`
      );

      console.log("✅ Assign-provider API response:", response.data);

      return {
        bookingId,
        providerId,
        message: response.data.message || "Assigned successfully",
      };
    } catch (error) {
      console.error("❌ assignProviderToBooking error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to assign provider"
      );
    }
  }
);

export const addPlant = createAsyncThunk(
  "admin/addPlant",
  async (PlantData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      const fields = [
        "name",
        "latinName",
        "description",
        "price",
        "careLevel",
        "color",
        "categoryId",
        "providerId",
        "stock",
      ];
      fields.forEach((field) => {
        formData.append(field, PlantData[field]);
      });
      formData.append("image", PlantData.image);

      const res = await axiosInstance.post("/Plant/AddPlant", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error occurred");
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    plants: [],
    categories: [],
    pendingProviders: [],
    plans: [],
    allUserPlans: [],
    userPlansLoading: false,
    userPlansError: null,
    addPlanStatus: null,
    addPlanError: null,
    loadingPlants: false,
    errorPlants: null,
    addPlantStatus: null,
    roleRequestStatus: null,
    roleRequestError: null,
    updatePlanError: null,
    roleRequests: [],
    roleRequestsLoading: false,
    roleRequestsError: null,
    pendingBookings: [],
    loadingPendingBookings: false,
    errorPendingBookings: null,
    assignProviderStatus: null,
    assignProviderError: null,
    providers: [],
    loadingProviders: false,
    errorProviders: null,
  },
  reducers: {
    resetAddPlantStatus: (state) => {
      state.addPlantStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loadingPlants = true;
        state.errorPlants = null;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.plants = action.payload;
        state.loadingPlants = false;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.errorPlants = action.error.message;
        state.loadingPlants = false;
      })

      .addCase(SearchPlant.pending, (state) => {
        state.loadingPlants = true;
        state.errorPlants = null;
      })
      .addCase(SearchPlant.fulfilled, (state, action) => {
        state.plants = action.payload;
        state.loadingPlants = false;
      })
      .addCase(SearchPlant.rejected, (state) => {
        state.errorPlants = action.error.message;
        state.loadingPlants = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loadingPlants = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loadingPlants = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loadingPlants = false;
        state.errorPlants = action.error.message;
      })
      .addCase(addPlant.pending, (state) => {
        state.addPlantStatus = "loading";
      })
      .addCase(addPlant.fulfilled, (state, action) => {
        state.addPlantStatus = "succeed";
        state.plants.push(action.payload);
      })
      .addCase(addPlant.rejected, (state, action) => {
        state.addPlantStatus = "failed";
        state.error = action.payload;
      })
      .addCase(requestProviderRole.pending, (state) => {
        state.roleRequestStatus = "loading";
        state.roleRequestError = null;
      })
      .addCase(requestProviderRole.fulfilled, (state, action) => {
        state.roleRequestStatus = "succeeded";
        state.roleRequestError = null;
      })
      .addCase(requestProviderRole.rejected, (state, action) => {
        state.roleRequestStatus = "failed";
        state.roleRequestError = action.payload || "Request Failed";
      })
      .addCase(fetchPendingProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingProviders = action.payload;
      })
      .addCase(fetchPendingProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(reviewProviderRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewProviderRequest.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRequest = action.payload;
        const index = state.pendingProviders.findIndex(
          (req) => req.id === updatedRequest.id
        );
        if (index !== -1) {
          state.pendingProviders.splice(index, 1);
        }
      })
      .addCase(reviewProviderRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addPlan.pending, (state) => {
        state.addPlanStatus = "loading";
        state.addPlanError = null;
      })
      .addCase(addPlan.fulfilled, (state, action) => {
        state.addPlanStatus = "succeeded";
        state.plans.push(action.payload); // or refetch if needed
      })
      .addCase(addPlan.rejected, (state, action) => {
        state.addPlanStatus = "failed";
        state.addPlanError = action.payload;
      })
      .addCase(patchUpdatePlan.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.plans.findIndex((p) => p.id === updated.id);
        if (index !== -1) {
          state.plans[index] = updated;
        }
      })
      .addCase(patchUpdatePlan.rejected, (state, action) => {
        state.updatePlanError = action.payload;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.plans = state.plans.filter((plan) => plan.id !== action.payload);
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.error = action.payload || "Delete failed";
      })
      .addCase(fetchAllUserPlans.pending, (state) => {
        state.userPlansLoading = true;
        state.userPlansError = null;
      })
      .addCase(fetchAllUserPlans.fulfilled, (state, action) => {
        state.userPlansLoading = false;
        state.allUserPlans = action.payload;
      })
      .addCase(fetchAllUserPlans.rejected, (state, action) => {
        state.userPlansLoading = false;
        state.userPlansError = action.payload;
      })
      .addCase(fetchAllRoleRequests.pending, (state) => {
        state.roleRequestsLoading = true;
        state.roleRequestsError = null;
      })
      .addCase(fetchAllRoleRequests.fulfilled, (state, action) => {
        state.roleRequestsLoading = false;
        state.roleRequests = action.payload;
      })
      .addCase(fetchAllRoleRequests.rejected, (state, action) => {
        state.roleRequestsLoading = false;
        state.roleRequestsError = action.payload;
      })
      .addCase(changeUserRole.pending, (state) => {
        state.roleRequestStatus = "changing";
      })
      .addCase(changeUserRole.fulfilled, (state) => {
        state.roleRequestStatus = "changed";
      })
      .addCase(changeUserRole.rejected, (state, action) => {
        state.roleRequestStatus = "failed";
        state.roleRequestError = action.payload || "Role change failed";
      })

      .addCase(fetchPendingBookings.pending, (state) => {
        state.loadingPendingBookings = true;
        state.errorPendingBookings = null;
      })
      .addCase(fetchPendingBookings.fulfilled, (state, action) => {
        state.loadingPendingBookings = false;
        state.pendingBookings = action.payload;
      })
      .addCase(fetchPendingBookings.rejected, (state, action) => {
        state.loadingPendingBookings = false;
        state.errorPendingBookings = action.payload;
      })

      .addCase(assignProviderToBooking.pending, (state) => {
        state.assignProviderStatus = "loading";
        state.assignProviderError = null;
      })

      .addCase(assignProviderToBooking.fulfilled, (state, action) => {
        const { bookingId, providerId } = action.payload;
        const booking = state.pendingBookings.find((b) => b.id === bookingId);
        if (booking) {
          booking.providerId = providerId;
          booking.bookingStatus = "Assigned";
        }
      })
      .addCase(assignProviderToBooking.rejected, (state, action) => {
        state.assignProviderStatus = "failed";
        state.assignProviderError = action.payload;
      })
      .addCase(fetchAllProviders.pending, (state) => {
        state.loadingProviders = true;
        state.errorProviders = null;
      })
      .addCase(fetchAllProviders.fulfilled, (state, action) => {
        state.loadingProviders = false;
        state.providers = action.payload;
      })
      .addCase(fetchAllProviders.rejected, (state, action) => {
        state.loadingProviders = false;
        state.errorProviders = action.payload;
      })
      .addCase(deletePlant.fulfilled, (state, action) => {
        state.plants = state.plants.filter(
          (plant) => plant.id !== action.payload
        );
      })
      .addCase(deletePlant.rejected, (state, action) => {
        state.errorPlants = action.payload;
      })
      .addCase(patchUpdatePlant.fulfilled, (state, action) => {
        const updatedPlant = action.payload;
        const index = state.plants.findIndex((p) => p.id === updatedPlant.id);
        if (index !== -1) {
          state.plants[index] = updatedPlant;
        }
      })
      .addCase(patchUpdatePlant.rejected, (state, action) => {
        state.errorPlants = action.payload || "Failed to update plant";
      });
  },
});
export const { resetAddPlantStatus } = adminSlice.actions;
export default adminSlice.reducer;
