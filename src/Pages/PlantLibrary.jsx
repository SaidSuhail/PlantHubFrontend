import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlants,SearchPlant,fetchCategories } from "../Features/adminSlice";
import { useNavigate } from "react-router-dom";

function PlantLibrary() {
  const dispatch = useDispatch();
  const { plants, status,categories } = useSelector((state) => state.admin);
  const [visibleCount, setVisibleCount] = useState(12);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareLevel, setSelectedCareLevel] = useState("");
  const [selectedLight, setSelectedLight] = useState("");
  const [selectedWater, setSelectedWater] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchPlants());
    dispatch(fetchCategories());
  }, [dispatch]);

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchTerm.trim() === "") {
      dispatch(fetchPlants());
    } else {
      dispatch(SearchPlant(searchTerm));
    }
  }, 500); // debounce delay (ms)

  return () => clearTimeout(delayDebounce);
}, [dispatch, searchTerm]);

  // const filteredPlants = Array.isArray(plants)
  //   ? plants
  //       .filter((plant) =>
  //         plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //       .filter((plant) =>
  //         selectedCareLevel ? plant.careLevel === selectedCareLevel : true
  //       )
  //       .filter((plant) =>
  //         selectedLight ? plant.lightRequirement === selectedLight : true
  //       )
  //       .filter((plant) =>
  //     (selectedCategory ? plant.categoryName === selectedCategory : true)
  //   )
  //       .filter((plant) =>
  //     selectedColor ? plant.color === selectedColor : true
  //   )
  //       .filter((plant) =>
  //         selectedWater ? plant.waterNeed === selectedWater : true
  //       )
  //   : [];
  const filteredPlants = Array.isArray(plants)
  ? plants
      .filter((plant) =>
        selectedCareLevel ? plant.careLevel === selectedCareLevel : true
      )
      .filter((plant) =>
        selectedLight ? plant.lightRequirement === selectedLight : true
      )
      .filter((plant) =>
        selectedCategory ? plant.categoryName === selectedCategory : true
      )
      .filter((plant) =>
        selectedColor ? plant.color === selectedColor : true
      )
      .filter((plant) =>
        selectedWater ? plant.waterNeed === selectedWater : true
      )
  : [];

const colors = Array.from(
  new Set(plants.map((plant) => plant.color).filter(Boolean))
);

 

  const visiblePlants = filteredPlants.slice(0, visibleCount);

  return (
    <div className="bg-white-50 min-h-screen p-6">
      {/* Header Section */}
      <div className="text-center mb-10 pt-16">
        <h1 className="text-4xl font-bold text-green-900">Plant Library</h1>
        <p className="text-gray-600 mt-2">
          Discover and learn about thousands of plants
        </p>
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search plants by name, type, or characteristics"
            className="w-full max-w-xl px-4 py-2 rounded-l-md border border-gray-300"
          />
          <button className="bg-green-600 text-white px-6 rounded-r-md">
            Search
          </button>
        </div>
{/*        
<div className="mt-4 flex flex-wrap justify-center gap-2">
  {categories?.map((cat) => (
    <span key={cat.id} className="px-3 py-1 bg-gray-200 text-sm rounded-full">
      {cat.categoryName}
    </span>
  ))}
</div> */}
<div className="mt-4 flex flex-wrap justify-center gap-2">
  {categories?.map((cat) => (
    <button
      key={cat.id}
      onClick={() =>
        setSelectedCategory(
          selectedCategory === cat.categoryName ? "" : cat.categoryName
        )
      }
      className={`px-3 py-1 rounded-full text-sm ${
        selectedCategory === cat.categoryName
          ? "bg-green-600 text-white"
          : "bg-gray-200 text-gray-700"
      }`}
    >
      {cat.categoryName}
    </button>
  ))}
</div>

      </div>

      {/* Filter and Sort Section */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCareLevel}
            onChange={(e) => setSelectedCareLevel(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="">Care Level</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Difficult">Difficult</option>
          </select>

          <select
            value={selectedLight}
            onChange={(e) => setSelectedLight(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="">Light Requirements</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={selectedWater}
            onChange={(e) => setSelectedWater(e.target.value)}
            className="px-4 py-2 border rounded-md text-sm"
          >
            <option value="">Water Needs</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm">Sort By</label>
         
          <select
  className="px-4 py-2 border rounded-md text-sm"
  value={selectedColor}
  onChange={(e) => setSelectedColor(e.target.value)}
>
  <option value="">All Colors</option>
  {colors.map((color) => (
    <option key={color} value={color}>
      {color}
    </option>
  ))}
</select>
        </div>
      </div>

      {/* Loading State */}
      {status === "loading" && (
        <p className="text-center text-gray-500">Loading plants...</p>
      )}

      {/* Plant Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visiblePlants.map((plant) => (
          <div
            key={plant.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="h-40 bg-gray-200 rounded mb-3 overflow-hidden">
              {plant.imageUrl ? (
                <img
                  src={plant.imageUrl}
                  alt={plant.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-green-900">
              {plant.name}
            </h3>
            <p className="text-sm text-gray-600 italic">{plant.latinName}</p>
            <div className="text-xs text-gray-500 my-1">
              ☀ {plant.lightRequirement || "Varies"} ☘{" "}
              {plant.waterNeed || "Weekly"}
            </div>
            <div className="text-xs text-green-600 font-medium">
              {plant.careLevel}
            </div>
            {/* <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-md text-sm">
              Learn More
            </button> */}
            <button
  onClick={() => navigate(`/plant/${plant.id}`)}
  className="mt-3 w-full bg-green-600 text-white py-2 rounded-md text-sm"
>
  Learn More
</button>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {filteredPlants.length > visibleCount && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 12)}
          className="mt-8 mx-auto block bg-green-600 text-white px-6 py-2 rounded-md text-sm"
        >
          Load More
        </button>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          Featured Collections
        </h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {[
            {
              name: "Indoor Plants",
              image: "indoor.webp",
              link: "/collections/pet-friendly-plants",
            },
            {
              name: "Palm Plants",
              image: "/palm plants.avif",
              link: "/collections/low-light-plants",
            },
            {
              name: "Desk Plants",
              image: "officedesk.webp",
              link: "/collections/desk-plants",
            },
            {
              name: "Succulents & Cacti",
              image: "succulant plant.avif",
              link: "/collections/succulents-cacti",
            },
            {
              name: "Flowering Plant",
              image: "Flowering.webp",
              link: "/collections/succulents-cacti",
            },
            {
              name: "Tropical Plant",
              image: "Regsiterimg.jpg",
              link: "/collections/succulents-cacti",
            },
          ].map((collection, idx) => (
            <a
              key={idx}
              href={collection.link}
              className="min-w-[160px] flex flex-col items-center text-center"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-32 h-32 object-cover rounded-full border border-green-400"
              />
              <span className="mt-2 text-sm font-medium text-green-900">
                {collection.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlantLibrary;
