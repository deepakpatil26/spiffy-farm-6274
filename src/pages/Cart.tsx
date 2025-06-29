import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cartReducer/action";
import axios from "axios";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import { RootState } from "../types";
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const API_BASE_URL = "https://lifestyle-mock-server-api.onrender.com";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cartItems } = useSelector((store: RootState) => store.cartReducer);

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`);
      dispatch(addToCart(response.data) as any);
    } catch (error) {
      setError("Failed to fetch cart items");
      showErrorToast("Failed to load cart items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async (item: any) => {
    const { id, title } = item;
    setIsLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/cart/${id}`);
      dispatch(removeFromCart(id) as any);
      toast.success(`${title} has been removed from your cart`);
    } catch (error) {
      showErrorToast("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number, action: 'increment' | 'decrement') => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    try {
      await axios.patch(`${API_BASE_URL}/cart/${id}`, {
        quantity: newQuantity,
      });
      if (action === 'increment') {
        dispatch(incrementQuantity(id) as any);
      } else {
        dispatch(decrementQuantity(id) as any);
      }
    } catch (error) {
      showErrorToast("Failed to update quantity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleINC = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1, 'increment');
  };

  const handleDEC = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1, 'decrement');
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getSavedAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + ((item.actualPrice - item.price) * item.quantity);
    }, 0);
  };

  if (isLoading && !cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error && !cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96 flex-col">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={getData}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </>
    );
  }

  if (!cartItems.length) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-96 flex-col">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate("/")}
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-lg mr-4" 
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-lg font-bold text-primary-600">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDEC(item.id, item.quantity)}
                      disabled={item.quantity <= 1 || isLoading}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <AiOutlineMinus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    
                    <button
                      onClick={() => handleINC(item.id, item.quantity)}
                      disabled={isLoading}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <AiOutlinePlus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="ml-6">
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={isLoading}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                  >
                    <AiOutlineClose className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{getTotalPrice()}</span>
                </div>
                
                <div className="flex justify-between text-green-600">
                  <span>You Save:</span>
                  <span className="font-semibold">₹{getSavedAmount()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate("/checkout")}
                disabled={isLoading}
                className="w-full mt-6 bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};