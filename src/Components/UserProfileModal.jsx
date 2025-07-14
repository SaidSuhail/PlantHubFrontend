import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiEdit2, FiLock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, UpdateProfile } from "../Features/userSlice"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { requestProviderRole } from "../Features/adminSlice";

function UserProfileModal({ isOpen, onClose }) {
  const currentUser = useSelector((state) => state.auth?.currentUser);
  console.log("modaldataaaaaa", currentUser);
  const { roleRequestStatus, roleRequestError } = useSelector(
    (state) => state.admin
  );
  const userId = useSelector((state) => state.users?.userId);
  console.log("555555555555", userId);
  const fullState = useSelector((state) => state);
  console.log(
    "🧠 Full Redux state from Notification.jsx in profileeeeee:",
    fullState
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const dispatch = useDispatch();
  const { profile, loadingProfile } = useSelector((state) => state.users);
  console.log("fffffffffffffffff", profile);
  const navigate = useNavigate();
  const fileInputRef = React.useRef();
  const handleRequestProvider = () => {
    if (roleRequestStatus !== "loading") {
      dispatch(requestProviderRole());
    }
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userName", profile?.userName || "");
    formData.append("phone", profile?.phone || "");

    dispatch(UpdateProfile(formData)).then(() => {
      dispatch(fetchProfile());
    });
  };
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchProfile());
    }
  }, [isOpen, dispatch]);

  const userPlan = profile?.userPlans?.find(
    (plan) => plan.isActive && new Date(plan.endDate) > new Date()
  );

  const membershipStartDate = userPlan?.startDate
    ? new Date(userPlan.startDate)
    : null;
  const membershipExpiryDate = membershipStartDate
    ? new Date(membershipStartDate)
    : null;

  let daysLeft = null;
  let progressPercent = 0;

  if (
    membershipStartDate &&
    membershipExpiryDate &&
    !isNaN(membershipStartDate)
  ) {
    membershipExpiryDate.setMonth(membershipStartDate.getMonth() + 3);

    daysLeft = Math.ceil(
      (membershipExpiryDate - new Date()) / (1000 * 60 * 60 * 24)
    );

    progressPercent = Math.min(100, Math.max(0, 100 - (daysLeft / 90) * 100));
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-opacity-60 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={`bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl border border-gray-200 relative flex flex-col overflow-hidden
            ${
              isFullscreen
                ? "w-full h-full"
                : "w-full max-w-2xl h-auto max-h-[90vh] md:h-[70vh]"
            }`}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-100 py-4 px-6 border-b border-gray-200 flex justify-between items-center">
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-green-800"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hey {profile?.userName || "N/A"}
            </motion.h2>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-gray-600 hover:text-green-700 transition-colors"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {/* Add fullscreen icon */}
                {isFullscreen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a1 1 0 011-1h4a1 1 0 010 2H6v3a1 1 0 01-2 0V4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V6h-3a1 1 0 01-1-1zM4 16a1 1 0 011 1v3h3a1 1 0 110 2H4a1 1 0 01-1-1v-4a1 1 0 011-1zm16 0a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h3v-3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6v2a1 1 0 01-2 0V4zm8 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 11-2 0V6h-3a1 1 0 01-1-1zM3 16a1 1 0 011 1v2h2a1 1 0 110 2H4a1 1 0 01-1-1v-4a1 1 0 011-1zm14 0a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h3v-3a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-600 hover:text-red-600 transition-colors"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
              </motion.button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="overflow-auto p-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Image */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 md:w-40 md:h-40 mb-4 flex items-center justify-center text-gray-500 overflow-hidden">
                  <img
                    src={
                      profile?.profileImage ||
                      "https://i.pravatar.cc/300?img=12"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <button className="text-green-700 font-medium hover:text-green-900 transition-colors">
                  Change Photo
                </button> */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="text-green-700 font-medium hover:text-green-900 transition-colors"
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </motion.div>

              {/* User Info */}
              <div className="md:col-span-2">
                <motion.div className="space-y-5">
                  <motion.div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-32 text-gray-600 font-medium">
                      Full Name:
                    </label>
                    <div className="flex-grow text-lg font-medium text-gray-800">
                      {profile?.userName || "N/A"}
                    </div>
                  </motion.div>

                  <motion.div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-32 text-gray-600 font-medium">
                      Email:
                    </label>
                    <div className="flex-grow text-lg text-gray-800">
                      {profile?.userEmail || "N/A"}
                    </div>
                  </motion.div>

                  <motion.div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-32 text-gray-600 font-medium">
                      Role:
                    </label>
                    <div className="flex-grow">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {profile?.role || "User"}
                      </span>
                    </div>
                  </motion.div>

                  <motion.div className="flex flex-col md:flex-row md:items-center">
                    <label className="w-32 text-gray-600 font-medium">
                      Joined:
                    </label>
                    <div className="flex-grow text-lg text-gray-800">
                      {/* {profile?.userPlans[0]?.startDate ? new Date(profile.userPlans[0]?.startDate).toDateString() : "N/A"} */}
                      {userPlan?.startDate
                        ? new Date(userPlan.startDate).toDateString()
                        : "N/A"}
                    </div>
                  </motion.div>

                  {/* Membership Info */}

                  {/* ✅ Membership Plan Section */}
                  {userPlan ? (
                    <motion.div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <h3 className="text-green-800 font-bold text-lg mb-2 flex items-center justify-center">
                        <span className="mr-2 text-xl">🌱</span> Membership Plan
                      </h3>
                      <p className="text-sm text-gray-700">
                        <b>Plan:</b>{" "}
                        <strong className="text-green-700">
                          {userPlan?.plan?.planName || "N/A"}
                        </strong>
                      </p>
                      <p className="text-sm text-gray-700">
                        <b>Started:</b>{" "}
                        <strong>
                          {membershipStartDate?.toDateString() || "N/A"}
                        </strong>
                      </p>
                      <p className="text-sm text-gray-700">
                        <b>Expires:</b>{" "}
                        <strong>
                          {membershipExpiryDate?.toDateString() || "N/A"}
                        </strong>
                      </p>
                      <div className="mt-3">
                        <div className="w-full bg-green-100 h-3 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-green-600"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1 }}
                          ></motion.div>
                        </div>
                        <p className="text-xs text-right text-green-700 mt-1">
                          <span className="font-semibold">
                            {isNaN(daysLeft) ? "N/A" : daysLeft}
                          </span>{" "}
                          days left
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mt-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      🚫 <strong>No active plan found.</strong>
                      <br />
                      Please subscribe to a plan.
                      <button
                        onClick={() => {
                          onClose();
                          navigate("/plans");
                        }}
                        className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      >
                        Browse Plans
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-auto border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              //   onClick={handleLogout}
              onClick={() => setShowConfirmLogout(true)}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg"
            >
              <FiLogOut className="text-lg" />
              Logout
            </motion.button> */}
            {userId ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfirmLogout(true)}
                className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg"
              >
                <FiLogOut className="text-lg" />
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium px-4 py-2 rounded-lg"
              >
                <FiLock className="text-lg" />
                Login
              </motion.button>
            )}

            {currentUser?.role !== "Provider" &&
              currentUser?.role !== "Admin" && (
                <div className="mt-4 justify-end-safe">
                  <button
                    onClick={handleRequestProvider}
                    disabled={roleRequestStatus === "loading"}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {roleRequestStatus === "loading"
                      ? "Sending..."
                      : "Request Provider Access"}
                  </button>

                  {roleRequestStatus === "succeeded" && (
                    <p className="mt-2 text-green-600 text-sm">
                      Request sent successfully!
                    </p>
                  )}
                  {roleRequestStatus === "failed" && roleRequestError && (
                    <p className="mt-2 text-red-600 text-sm">
                      {roleRequestError}
                    </p>
                  )}
                </div>
              )}
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:opacity-90"
            >
              <FiEdit2 className="text-lg" />
              Edit Profile
            </motion.button> */}
          </div>

          <motion.div className="bg-gray-50 py-3 px-6 border-t border-gray-200 text-center text-gray-600 text-sm">
            User ID: {profile?.id || "N/A"} • Last updated: Today
          </motion.div>
        </motion.div>
      </motion.div>
      {showConfirmLogout && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmLogout(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              {/* <button
                onClick={() => {
                  localStorage.clear();
                  localStorage.removeItem("token");
                  setShowConfirmLogout(false);
                  onClose(); // close profile modal
                  setTimeout(() => navigate("/login"), 100);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button> */}
              {userId ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.clear();
                    setShowConfirmLogout(false);
                    onClose();
                    navigate("/login");
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowConfirmLogout(false);
                    onClose();
                    navigate("/login");
                  }}
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default UserProfileModal;
