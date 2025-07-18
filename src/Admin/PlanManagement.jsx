import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlans } from "../Features/userSlice";
import {
  addPlan,
  deletePlan,
  fetchAllUserPlans,
  patchUpdatePlan,
} from "../Features/adminSlice";
import { toast } from "sonner";
import ConfirmDeleteModal from "../Components/ConfirmDeleteModal";
import { SparkleIcon } from "lucide-react";
function PlanManagement() {
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [formData, setFormData] = useState({
    id: null,
    planName: "",
    price: "",
    minPlantsAllowed: "",
    maxPlantsAllowed: "",
    weeklyServices: "",
    monthlyReplacements: "",
    description: "",
  });
  const { allUserPlans = [], userPlansLoading } = useSelector(
    (state) => state.admin
  );
  const { addPlanStatus, addPlanError } = useSelector((state) => state.admin);
  const { plans, loadingPlans, plansError } = useSelector(
    (state) => state.users
  );
  console.log("..........", plans);
  useEffect(() => {
    dispatch(fetchPlans());
    dispatch(fetchAllUserPlans());
  }, [dispatch]);

  const handleEdit = (id) => {
    const selected = plans.find((plan) => plan.id === id);
    if (selected) {
      setModalMode("edit");
      setFormData(selected);
      setShowAddModal(true);
    }
  };

  const handleDelete = (id) => {
    setPlanToDelete(id);
    setShowConfirmDelete(true);
  };
  const confirmDelete = () => {
    dispatch(deletePlan(planToDelete)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Plan deleted successfully");
        dispatch(fetchPlans());
      } else {
        toast.error("Failed to delete plan");
      }
      setShowConfirmDelete(false);
      setPlanToDelete(null);
    });
  };
  const handleSubmit = () => {
    const payload = {
      ...formData,
      price: Number(formData.price),
      minPlantsAllowed: Number(formData.minPlantsAllowed),
      maxPlantsAllowed: Number(formData.maxPlantsAllowed),
      weeklyServices: Number(formData.weeklyServices),
      monthlyReplacements: Number(formData.monthlyReplacements),
    };

    const action =
      modalMode === "add"
        ? addPlan(payload)
        : patchUpdatePlan({ id: formData.id, patchData: payload });

    dispatch(action).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success(
          modalMode === "add"
            ? "Plan added successfully!"
            : "Plan updated successfully!"
        );
        dispatch(fetchPlans());
        setShowAddModal(false);
        setFormData({
          id: null,
          planName: "",
          price: "",
          minPlantsAllowed: "",
          maxPlantsAllowed: "",
          weeklyServices: "",
          monthlyReplacements: "",
          description: "",
        });
      }
    });
  };

  if (loadingPlans) return <div>Loading...</div>;
  if (plansError) return <div>Error Loading...{plansError}</div>;

  const activePlans = allUserPlans.filter((plan) => plan.isActive);
  const totalActivePlans = activePlans.length;

  const planFrequency = {};
  allUserPlans.forEach((plan) => {
    const name = plan.plan?.planName;
    if (name) {
      planFrequency[name] = (planFrequency[name] || 0) + 1;
    }
  });
  const mostPopularPlan =
    Object.entries(planFrequency).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const totalRevenue = allUserPlans.reduce((sum, plan) => {
    return sum + (plan.plan?.price || 0);
  }, 0);

  const stats = [
    {
      label: "Total Active Plans",
      value: totalActivePlans,
      change: "",
      changeColor: "",
    },
    {
      label: "Most Popular Plan",
      value: mostPopularPlan,
      change: "+32% users",
      changeColor: "text-green-600",
    },
    {
      label: "Total Revenue",
      value: totalRevenue.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      }),
      change: "+8.2%",
      changeColor: "text-green-600",
    },
    {
      label: "Plan Conversion Rate",
      value: "100%",
      change: "+0%",
      changeColor: "text-green-600",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-emerald-50 to-white rounded-3xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl text-emerald-700  font-bold">
          Plan Management
        </h1>
      </div>

      <div className="flex justify-end mb-6">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md transition duration-200 ease-in-out hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          onClick={() => setShowAddModal(true)}
        >
          Create New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-xl font-extrabold text-gray-800">{stat.value}</p>
            <p className={`text-sm mt-1 ${stat.changeColor}`}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="p-4">Plan Name</th>
              <th className="p-4">Price (₹)</th>
              <th className="p-4">Min Plants</th>
              <th className="p-4">Max Plants</th>
              <th className="p-4">Weekly Services</th>
              <th className="p-4">Monthly Replacements</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-700">
            {plans.map((plan, index) => (
              <tr
                key={index}
                className="group border-b hover:bg-emerald-50 transition duration-200"
              >
                <td className="px-4 py-3 font-semibold whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {/* <span className="text-green-500 text-xl">🪴</span> */}
                    <SparkleIcon className="text-green-500 w-5 h-5" />
                    <span className="text-gray-800 font-medium">
                      {plan.planName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3 font-semibold text-emerald-600">
                  ₹{plan.price}
                </td>
                <td className="px-4 py-3 text-center">
                  {plan.minPlantsAllowed}
                </td>
                <td className="px-4 py-3 text-center">
                  {plan.maxPlantsAllowed}
                </td>
                <td className="px-4 py-3 text-center">{plan.weeklyServices}</td>
                <td className="px-4 py-3 text-center">
                  {plan.monthlyReplacements}
                </td>

                <td className="px-4 py-3 max-w-xs text-gray-500 truncate">
                  {plan.description}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(plan.id)}
                      title="Edit"
                      className="p-2 rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(plan.id)}
                      title="Delete"
                      className="p-2 rounded-md text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-1 1v1H5.5a1 1 0 100 2h.328l.437 9.191A2 2 0 008.26 17h3.48a2 2 0 001.996-1.809l.437-9.191H15a1 1 0 100-2H12V3a1 1 0 00-1-1H9zm2 5a1 1 0 10-2 0v7a1 1 0 102 0V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 animate-fadeInUp">
            <h2 className="text-xl font-semibold text-emerald-700 mb-6">
              {modalMode === "add" ? "Add New Plan" : "Edit Plan"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formData)
                .filter((key) => key !== "id")
                .map((key) => (
                  <input
                    key={key}
                    type="text"
                    name={key}
                    placeholder={key.replace(/([A-Z])/g, " $1")}
                    value={formData[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder-gray-400"
                  />
                ))}
            </div>

            <div className="flex justify-end mt-6 gap-3 space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 text-sm rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition shadow"
              >
                {modalMode === "add" ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDelete && (
        <ConfirmDeleteModal
          title="Delete Plan"
          message="Are you sure you want to delete this plan? This action cannot be undone."
          onCancel={() => {
            setShowConfirmDelete(false);
            setPlanToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
      <div className="flex justify-between items-center mt-4 text-sm">
        <p>Showing 1 to 3 of 3 entries</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded">❮</button>
          <button className="px-3 py-1 border rounded bg-green-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded">❯</button>
        </div>
      </div>
    </div>
  );
}

export default PlanManagement;
