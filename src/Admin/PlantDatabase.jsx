import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "../Components/AddProductModal";
import {
  fetchCategories,
  fetchPlants,
  SearchPlant,
  deletePlant,
} from "../Features/adminSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";

function PlantDatabase() {
  const [plants, setPlants] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCareLevel, setSelectedCareLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal, SetShowAddModal] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(null);

  const dispatch = useDispatch();
  const {
    plants: reduxplants,
    loading,
    error,
  } = useSelector((state) => state.admin);

  const categories = useSelector((state) => state.admin.categories);
  useEffect(() => {
    dispatch(fetchPlants());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setPlants(reduxplants);
  }, [reduxplants]);
  console.log("sdfghjkcvbn m", reduxplants);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this plant?")) {
      dispatch(deletePlant(id))
        .unwrap()
        .then(() => toast.success("Plant deleted successfully"))
        .catch((err) => toast.error(err));
    }
  };

  const filteredPlants = plants
    .filter((plant) =>
      selectedCareLevel ? plant.careLevel === selectedCareLevel : true
    )
    .filter((plant) =>
      query.trim() === ""
        ? true
        : plant.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((plant) =>
      selectedCategory ? plant.categoryName === selectedCategory : true
    );
  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-emerald-50 to-white min-h-screen rounded-3xl w-full lg:w-270 ml-0 lg:ml-54 overflow-auto">
      {/* Loading/Error States */}
      {loading && (
        <p className="text-green-700 text-lg mb-4">Loading plants...</p>
      )}
      {error && <p className="text-red-500 text-lg mb-4">Error: {error}</p>}
      {!loading && Array.isArray(plants) && plants.length === 0 && (
        <p className="text-gray-600 text-lg mb-4"></p>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700">
          Plant Database Management
        </h1>
        <button
          onClick={() => SetShowAddModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition w-full sm:w-auto"
        >
          + Add New Plant
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Plants", value: "2,456" },
          { label: "Active Species", value: "342" },
          { label: "Recently Added", value: "48" },
          { label: "Needs Update", value: "15" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
          <select
            className="border border-gray-300 bg-white text-black rounded-lg px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {Array.isArray(categories) &&
              categories.map((category) => (
                <option key={category.id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}
          </select>

          <select
            className="border border-gray-300 bg-white text-black rounded-lg px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-green-400 focus:outline-none"
            value={selectedCareLevel}
            onChange={(e) => setSelectedCareLevel(e.target.value)}
          >
            <option value="">All Levels</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>

          <select
            className="border border-gray-300 bg-white text-black rounded-lg px-4 py-2 w-full sm:w-auto focus:ring-2 focus:ring-green-400 focus:outline-none"
            aria-label="Status filter"
          >
            <option>All Status</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Search plants..."
          className="border px-4 py-2 rounded w-full sm:w-64"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.trim() === "") {
              dispatch(fetchPlants());
            } else {
              dispatch(SearchPlant(value));
            }
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-[600px] w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {[
                "Plant ID",
                "Image",
                "Plant Name",
                "Scientific Name",
                "Category",
                "Care Level",
                "Stock",
                "Last Updated",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(filteredPlants) &&
              filteredPlants.map((plant, index) => (
                <tr
                  key={plant.id}
                  className="hover:bg-green-50 transition cursor-pointer"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {plant.imageUrl ? (
                      <img
                        src={plant.imageUrl}
                        alt={plant.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "🌿"
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-semibold">
                    {plant.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-600 italic">
                    {plant.latinName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                    {plant.categoryName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        plant.careLevel === "Easy"
                          ? "bg-green-500"
                          : plant.careLevel === "Medium"
                          ? "bg-yellow-500"
                          : "bg-red-600"
                      }`}
                    >
                      {plant.careLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-900 font-semibold">
                    {plant.stock}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-gray-500">
                    {plant.updatedAt?.split("T")[0]}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap flex gap-3">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => setPlantToEdit(plant)}
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(plant.id)}
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <AddProductModal
          isOpen={showAddModal || !!plantToEdit}
          onClose={() => {
            SetShowAddModal(false);
            setPlantToEdit(null);
          }}
          existingData={plantToEdit}
        />
      </div>
    </div>
  );
}

export default PlantDatabase;
