import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCartMessages,
  fetchPlantById,
} from "../Features/userSlice";
import { fetchPlants } from "../Features/adminSlice";
import { toast, Toaster } from "sonner";

function PlantView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { plant, loadingPlant, errorPlant } = useSelector(
    (state) => state.users
  );
  const { addingToCart, addToCartSuccess, addToCartError } = useSelector(
    (state) => state.users
  );
  const { plants } = useSelector((state) => state.admin); // or state.plants if stored separately
  console.log("All Plants", plants);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const filteredSuggestions = (plants || [])
    .filter((p) => p?.id !== plant?.id)
    .slice(0, 5);
  // const handleClick = () => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     alert("Item added to cart!"); // Simulate success
  //   }, 1500); // Simulate a delay
  // };
  const handleClick = () => {
    dispatch(addToCart(plant.id));

    // Auto-clear messages after a few seconds
    setTimeout(() => {
      dispatch(clearCartMessages());
    }, 3000);
  };

  console.log(plant);
  useEffect(() => {
    if (id) {
      dispatch(fetchPlants());
      dispatch(fetchPlantById(id));
    }
  }, [id, dispatch]);

  useEffect(()=>{
    if(addToCartSuccess){
      toast.success("Plant Added To Cart");
      dispatch(clearCartMessages());
    }else if(addToCartError){
      
      toast.error(addToCartError);
      dispatch(clearCartMessages());
    }
  },[addToCartSuccess,addToCartError,dispatch]);

  if (loadingPlant)
    return <div className="p-10 text-center text-lg">Loading...</div>;
  if (errorPlant)
    return (
      <div className="p-10 text-red-500 text-center">Error: {errorPlant}</div>
    );
  if (!plant) return null;

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto mt-16">
      {/* Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image & Thumbnails */}
        <div>
          <img
            src={plant.imageUrl || "/plant-main.jpg"}
            alt={plant.name}
            className="w-full h-[400px] object-cover rounded-lg shadow"
          />
          <div className="flex gap-2 mt-4">
            {[...Array(3)].map((_, index) => (
              <img
                key={index}
                src={plant?.imageUrl || "/plant-main.jpg"}
                alt={`leaf-${index}`}
                className="w-20 h-20 rounded-md border object-cover"
              />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h1 className="text-3xl font-bold text-green-900">{plant.name}</h1>
          <p className="text-gray-500 italic mt-1">
            {plant.latinName || "Plant"}
          </p>
          <p className="text-2xl font-semibold text-green-700 mt-4">
            ${plant.price}
          </p>
          {/* <p className="text-sm text-gray-600 mt-1">
            Quantity: {plant.quantity || 1}
          </p> */}

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
            <div>
              <p className="font-semibold">Size</p>
              <p>{plant.size || "Medium (40-50cm)"}</p>
            </div>
            <div>
              <p className="font-semibold">Plant Health</p>
              <p>{plant.health || "Excellent"}</p>
            </div>
            <div>
              <p className="font-semibold">Care Level</p>
              <p>{plant.careLevel || "Intermediate"}</p>
            </div>
            <div>
              <p className="font-semibold">Pot Type</p>
              <p>{plant.potType || "Ceramic, 10”"}</p>
            </div>
          </div>

          {/* Care Guide */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Plant Care Guide
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                🌤 <strong>Light:</strong>{" "}
                {plant.light || "Bright indirect light"}
              </div>
              <div>
                💧 <strong>Water:</strong> {plant.water || "Every 7-10 days"}
              </div>
              <div>
                🌡 <strong>Temp:</strong>{" "}
                {plant.temperature || "65-80°F (18-27°C)"}
              </div>
              <div>
                💨 <strong>Humidity:</strong> {plant.humidity || "60–80%"}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Plant Benefits
            </h3>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              {plant.description}
            </ul>
          </div>

          {/* Action Buttons */}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleClick}
              disabled={addingToCart}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 active:scale-95
      ${
        addingToCart
          ? "bg-green-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }
      text-white shadow-md hover:shadow-lg`}
            >
              {addingToCart ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v2m0 12v2m8-8h2M4 12H2m15.36-6.36l-1.42 1.42M6.34 17.66l-1.42 1.42m0-13.08l1.42 1.42M17.66 17.66l1.42 1.42"
                    />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-green-800 mb-4">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {filteredSuggestions.map((item, idx) => (
            <div
              key={idx}
              className="text-center cursor-pointer"
              onClick={() => navigate(`/plant/${item.id}`)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-cover rounded-lg shadow-sm"
              />
              <p className="mt-2 text-sm font-medium text-green-900">
                {item.name}
              </p>
              {/* <p className="text-xs text-gray-600">{item.price}</p> */}
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" richColors/>
    </div>
  );
}

export default PlantView;
