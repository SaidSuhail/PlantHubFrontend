// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories, fetchPlants, SearchPlant } from "../Features/adminSlice";

// function PlantDatabase() {

//   const [plants, setPlants] = useState([]);
//   const [query, setQuery] = useState("");
//   const [selectedCareLevel, setSelectedCareLevel] = useState("");
// const [selectedCategory, setSelectedCategory] = useState("");

//   const dispatch = useDispatch();
//   const {
//     plants: reduxplants,
//     loading,
//     error,
//   } = useSelector((state) => state.admin);

//   const categories = useSelector((state)=>state.admin.categories);
//   useEffect(() => {
//     dispatch(fetchPlants());
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     setPlants(reduxplants);
//   }, [reduxplants]);

//     const filteredPlants = plants
//   .filter((plant) =>
//     selectedCareLevel ? plant.careLevel === selectedCareLevel : true
//   )
//   .filter((plant) =>
//     query.trim() === ""
//       ? true
//       : plant.name.toLowerCase().includes(query.toLowerCase())
//   )
//   .filter((plant) =>
//     selectedCategory ? plant.categoryName === selectedCategory : true
//   );

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen font-sans ml-0 sm:ml-44">
//       {/* Loading/Error States */}
//       {loading && (
//         <p className="text-green-700 text-lg mb-4">Loading plants...</p>
//       )}
//       {error && <p className="text-red-500 text-lg mb-4">Error: {error}</p>}
//       {!loading && Array.isArray(plants) && plants.length === 0 && (
//         <p className="text-gray-600 text-lg mb-4">No plants found.</p>
//       )}

//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
//         <h1 className="text-3xl font-extrabold text-gray-900">
//           Plant Database Management
//         </h1>
//         <div className="flex flex-wrap gap-3">
//           <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
//             + Add New Plant
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//         {[
//           { label: "Total Plants", value: "2,456" },
//           { label: "Active Species", value: "342" },
//           { label: "Recently Added", value: "48" },
//           { label: "Needs Update", value: "15" },
//         ].map((stat) => (
//           <div
//             key={stat.label}
//             className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition cursor-default"
//           >
//             <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
//             <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
//         <div className="flex flex-wrap gap-4 w-full sm:w-auto">
//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
//             aria-label="Category filter"
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//           >
//             <option value="">All Categories</option>
//             {Array.isArray(categories) &&
//               categories.map((category) => (
//                 <option
//             key={category.id} value={category.categoryName}>
//                   {category.categoryName}
//                 </option>
//               ))}
//           </select>
//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
//             value={selectedCareLevel}
//             onChange={(e) => setSelectedCareLevel(e.target.value)}
//           >
//             <option value="">All Levels</option>
//             <option value="Easy">Easy</option>
//             <option value="Medium">Medium</option>
//             <option value="Hard">Hard</option>
//           </select>

//           <select
//             className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
//             aria-label="Status filter"
//           >
//             <option>All Status</option>
//           </select>
//         </div>

//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="Search plants..."
//             className="border px-4 py-2 rounded"
//             value={query}
//             onChange={(e) => {
//               const value = e.target.value;
//               setQuery(value);

//               if (value.trim() === "") {
//                 // If empty, fetch all plants again
//                 dispatch(fetchPlants());
//               } else {
//                 // Else, search plants by query
//                 dispatch(SearchPlant(value));
//               }
//             }}
//           />
//         </div>
//       </div>
//       {/* Table */}
//       <div className="bg-white rounded-xl shadow overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               {[
//                 "Plant ID",
//                 "Image",
//                 "Plant Name",
//                 "Scientific Name",
//                 "Category",
//                 "Care Level",
//                 "Stock",
//                 "Last Updated",
//                 "Actions",
//               ].map((header) => (
//                 <th
//                   key={header}
//                   className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {Array.isArray(filteredPlants) &&
//               filteredPlants.map((plant) => (
//                 <tr
//                   key={plant.id}
//                   className="hover:bg-green-50 transition cursor-pointer"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-medium">
//                     {plant.id}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {plant.imageUrl ? (
//                       <img
//                         src={plant.imageUrl}
//                         alt={plant.name}
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                     ) : (
//                       "🌿"
//                     )}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
//                     {plant.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-600 italic">
//                     {plant.latinName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700">
//                     {plant.categoryName}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold ${
//                         plant.careLevel === "Easy"
//                           ? "bg-green-500"
//                           : plant.careLevel === "Medium"
//                           ? "bg-yellow-500"
//                           : "bg-red-600"
//                       }`}
//                     >
//                       {plant.careLevel}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-semibold">
//                     {plant.stock}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                     {plant.updatedAt?.split("T")[0]}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap flex space-x-4">
//                     <button className="text-blue-600 hover:text-blue-800 transition">
//                       ✏️
//                     </button>
//                     <button className="text-red-600 hover:text-red-800 transition">
//                       🗑️
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default PlantDatabase;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "../Components/AddProductModal";
import {
  fetchCategories,
  fetchPlants,
  SearchPlant,
} from "../Features/adminSlice";

function PlantDatabase() {
  const [plants, setPlants] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCareLevel, setSelectedCareLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddModal,SetShowAddModal] = useState(false);
  // const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen font-sans ml-0 sm:ml-44">
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Plant Database Management
        </h1>
        <button 
        onClick={()=>SetShowAddModal(true)}
        className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition w-full sm:w-auto">
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
              filteredPlants.map((plant,index) => (
                <tr
                  key={plant.id}
                  className="hover:bg-green-50 transition cursor-pointer"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-gray-800 font-medium">
                    {index+1}
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
                    <button className="text-blue-600 hover:text-blue-800 transition">
                      ✏️
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <AddProductModal isOpen={showAddModal} onClose={() => SetShowAddModal(false)} />
      </div>
    </div>
  );
}

export default PlantDatabase;
