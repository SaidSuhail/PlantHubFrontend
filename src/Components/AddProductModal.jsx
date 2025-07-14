import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlant,
  patchUpdatePlant,
  resetAddPlantStatus,
} from "../Features/adminSlice";
import { toast } from "sonner";

const AddProductModal = ({ isOpen, onClose, existingData = null }) => {
  const dispatch = useDispatch();
  const addPlantStatus = useSelector((state) => state.admin.addPlantStatus);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    latinName: "",
    description: "",
    price: "",
    careLevel: "",
    color: "",
    categoryId: "",
    providerId: "",
    stock: "",
    image: null,
  });

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        latinName: "",
        description: "",
        price: "",
        careLevel: "",
        color: "",
        categoryId: "",
        providerId: "",
        stock: "",
        image: null,
      });
      dispatch(resetAddPlantStatus());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (existingData) {
      setFormData({
        name: existingData.name || "",
        latinName: existingData.latinName || "",
        description: existingData.description || "",
        price: existingData.price || "",
        careLevel: existingData.careLevel || "",
        color: existingData.color || "",
        categoryId: existingData.categoryId?.toString() || "",
        providerId: existingData.providerId?.toString() || "",
        stock: existingData.stock || "",
        image: null, // Don't prefill image
      });
    }
  }, [existingData]);

  useEffect(() => {
    if (addPlantStatus === "succeed") {
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        onClose();
        dispatch(resetAddPlantStatus());
      }, 2000);
    }
  }, [addPlantStatus, onClose, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //   // dispatch(addPlant(formData));
  //   try{
  //   if (existingData) {
  //    await dispatch(patchUpdatePlant({ id: existingData.id, patchData: formData })).unwrap();
  //    toast.success("Plant Updated Successfully")
  //     console.log("PATCH DATA", patchData);
  //   } else {
  //    await dispatch(addPlant(formData)).unwrap();
  //     toast.success("Plant Added Successfully");
  //   }
  //   onClose();
  //   console.log("Submitted:", formData);
  //   // onClose();
  // }catch(error){
  //   toast.error(error);
  // }
  // }

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (existingData) {
          console.log("Existing data received in modal:", existingData); // ✅ Add this
      await dispatch(patchUpdatePlant({ id: existingData.id, patchData: formData })).unwrap();
      toast.success("Plant Updated Successfully");
    } else {
      await dispatch(addPlant(formData)).unwrap();
      toast.success("Plant Added Successfully");
    }
  } catch (error) {
    toast.error(error.message || "Something went wrong");
  } finally {
    onClose();
  }
};

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with fade animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 10,
              }}
              className="fixed top-6 left-[55%] -translate-x-1/2 z-40 bg-white shadow-xl rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-hidden border border-green-100 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with decorative elements */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-2 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400"></div>
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* Add New Plant */}
                      {existingData ? "Update Plant" : "Add New Plant"}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
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
                    </button>
                  </div>
                  <p className="text-gray-500 mt-1">
                    Fill in the details for your new plant
                  </p>
                </div>
              </div>

              {/* Form content with scroll */}
              <div className="overflow-y-auto px-6 pb-6 flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Plant Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g., Peace Lily"
                        onChange={handleChange}
                        value={formData.name}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                          />
                        </svg>
                        Latin Name
                      </label>
                      <input
                        type="text"
                        name="latinName"
                        placeholder="e.g., Spathiphyllum"
                        onChange={handleChange}
                        value={formData.latinName}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Care Level
                      </label>
                      <select
                        name="careLevel"
                        onChange={handleChange}
                        value={formData.careLevel}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                      >
                        <option value="">Select care level</option>
                        <option value="Easy">Easy</option>
                        <option value="Moderate">Medium</option>
                        <option value="Difficult">Difficult</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                          />
                        </svg>
                        Primary Color
                      </label>
                      <input
                        type="text"
                        name="color"
                        placeholder="e.g., Green"
                        onChange={handleChange}
                        value={formData.color}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Price ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        placeholder=""
                        onChange={handleChange}
                        value={formData.price}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        // className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                         style={{ appearance: 'textfield' }}
                           onWheel={(e) => e.target.blur()} // Optional: Prevent scroll increment

                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="stock"
                        placeholder="e.g., 50"
                        onChange={handleChange}
                        value={formData.stock}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Category ID
                      </label>
                      <input
                        type="number"
                        name="categoryId"
                        placeholder="e.g., 3"
                        onChange={handleChange}
                        value={formData.categoryId}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Provider ID
                      </label>
                      <input
                        type="number"
                        name="providerId"
                        placeholder="e.g., 5"
                        onChange={handleChange}
                        value={formData.providerId}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                        />
                      </svg>
                      Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe the plant's features, care instructions, etc."
                      rows={3}
                      onChange={handleChange}
                      value={formData.description}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-400 transition duration-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Plant Image
                    </label>
                    <div className="flex items-center">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          <p className="text-sm text-gray-500 mt-2">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleChange}
                          // value={formData.image}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <motion.button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity duration-200 flex items-center shadow-md shadow-green-100"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      {/* Add Plant */}
                      {existingData ? "Update Plant" : "Add Plant"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/*     
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          className="fixed top-[20%] left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 px-6 py-4 rounded shadow-md z-50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
        >
           Plant added successfully!
        </motion.div>
      )}
    </AnimatePresence> */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            className="fixed inset-0 flex items-start justify-center p-4 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg border border-green-200 max-w-md w-full pointer-events-auto p-5 relative overflow-hidden"
              initial={{
                opacity: 0,
                scale: 0.8,
                y: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
            >
              {/* Animated checkmark */}
              <motion.div
                className="absolute -top-3 -right-3 bg-green-500/10 w-24 h-24 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="flex items-start">
                {/* Checkmark icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      delay: 0.15,
                    },
                  }}
                  className="flex-shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.div>

                <div className="ml-4">
                  <motion.h3
                    className="text-lg font-bold text-green-800"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.25 },
                    }}
                  >
                    Success!
                  </motion.h3>
                  <motion.p
                    className="mt-1 text-green-700"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      transition: { delay: 0.35 },
                    }}
                  >
                    Plant added successfully!
                  </motion.p>
                </div>
              </div>

              {/* Progress bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-300 origin-left"
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: {
                    duration: 19,
                    ease: "linear",
                  },
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddProductModal;
