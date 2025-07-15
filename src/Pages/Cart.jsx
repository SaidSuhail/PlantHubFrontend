import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import CartAnimation from '../assets/CartAnimation.json';
import {
  decreaseCartQuantity,
  fetchCartItems,
  increaseCartQuantity,
  removeFromCart,
} from "../Features/userSlice";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loadingCartItems, cartError, cartTotal } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemove = (plantId) => {
    dispatch(removeFromCart(plantId)).then(() => {
      toast.error("Item removed from Cart");
      dispatch(fetchCartItems());
    });
  };

  const handleIncreaseQuantity = (plantId) => {
    dispatch(increaseCartQuantity(plantId)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Quantity increased");
        dispatch(fetchCartItems());
      } else {
        toast.error(res.payload);
      }
    });
  };

  const handleDecreaseQuantity = (plantId, currentQuantity) => {
    if (currentQuantity <= 1) {
      toast.warning("Minimum Quantity Reached");
      return;
    }
    dispatch(decreaseCartQuantity(plantId)).then(() => {
      toast.success("Quantity Decreased");
      dispatch(fetchCartItems());
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      {/* <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1> */}
      
      <Toaster position="top-right" richColors />
      
      {loadingCartItems && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      )}
      
      {cartError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">Error: {cartError}</p>
        </div>
      )}
      
      {Array.isArray(cartItems) && cartItems.length === 0 && !loadingCartItems ? (
//         <div className="text-center py-20">
//           {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//           </svg> */}
//           <div className="text-center py-12 flex flex-col items-center justify-center text-gray-500">
//   <Lottie 
//     animationData={CartAnimation} 
//     loop={true} 
//     className="w-64 h-64"
//   />
//   <p className="mt-4 text-lg font-medium text-gray-700">
//     Cart Is Empty
//   </p>
// </div>

//           {/* <p className="text-xl text-gray-500 mt-4">Your cart is empty</p> */}
//           <button 
//             onClick={() => navigate("/library")}
//             className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
//           >
//             Continue Shopping
//           </button>
//         </div>
<div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-gray-500 px-4">
  <Lottie 
    animationData={CartAnimation} 
    loop={true} 
    className="w-64 h-64" 
  />

  <p className="mt-6 text-xl font-semibold text-gray-700">
    Your cart is empty
  </p>

  <button 
    onClick={() => navigate("/library")}
    className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
  >
    Continue Shopping
  </button>
</div>

      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-50 text-gray-600 text-sm font-medium px-6 py-4 border-b">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="divide-y divide-gray-100">
                {Array.isArray(cartItems) && cartItems.map((item, index) => (
                  <div key={index} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row items-center">
                      {/* Product Image and Name */}
                      <div className="flex items-center mb-4 md:mb-0 md:w-2/5">
                        <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.plantImage || "/plant-main.jpg"}
                            alt={item.plantName}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-base font-medium text-gray-900">
                            {item.plantName || "Plant"}
                          </h3>
                          {/* <p className="text-sm text-gray-500 mt-1">SKU: {item.plantId || "N/A"}</p> */}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex md:justify-center mb-4 md:mb-0 md:w-1/6">
                        <p className="text-base font-medium text-gray-900">${item.price}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between md:justify-center mb-4 md:mb-0 md:w-1/4">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleDecreaseQuantity(item.plantId, item.quantity)}
                            disabled={item.quantity <= 1}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              item.quantity <= 1 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            -
                          </button>
                          <span className="w-10 text-center">{item.quantity || 1}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.plantId)}
                            disabled={item.quantity >= item.maxQuantity}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              item.quantity >= item.maxQuantity 
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Remove Button */}
                      <div className="md:w-1/12 flex justify-end">
                        <button
                          onClick={() => handleRemove(item.plantId)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Number of Plants</span>
                  <span className="font-medium">{cartItems.length}</span>
                </div> */}
                
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-base font-bold text-gray-900">${cartTotal}</span>
                </div>
              </div>
              
              <button
              onClick={()=>navigate("/checkout")}
                className="mt-8 w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="text-green-600 font-medium hover:text-green-500"
                    onClick={() => window.history.back()}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;