import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  loadCart,
} from "../redux/cartReducer/action";
import NewNavbar from "../Components/Home/NewNavbar";
import Footer from "../Components/Home/Footer";
import { RootState } from "../types";
import { toast } from 'react-toastify';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch } from "../redux/hooks";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get cart state from Redux
  const { items: cartItems, isLoading: isCartLoading, error: cartError } = useSelector(
    (store: RootState) => store.cartReducer
  );
  
  const { user } = useSelector((store: RootState) => store.AuthReducer);

  // Show error toast helper
  const showErrorToast = useCallback((message: string) => {
    toast.error(message);
  }, []);

  // Load cart data
  const getData = useCallback(async () => {
    if (!user) {
      // If user is not logged in, try to load from localStorage
      try {
        const localCart = localStorage.getItem('cart');
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          dispatch({ type: 'LOAD_CART', payload: parsedCart });
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
      return;
    }
    
    // For logged-in users, load from server
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('[Cart] Loading cart for user:', user.id);
      await dispatch(loadCart(user.id) as any);
      console.log('[Cart] Cart loaded successfully');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch cart items';
      console.error('[Cart] Error loading cart:', error);
      setError(errorMessage);
      showErrorToast("Failed to load cart items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, user, showErrorToast]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleDelete = async (item: any) => {
    const { id, title } = item;
    setIsLoading(true);
    try {
      await dispatch(removeFromCart(id, user?.id) as any);
      toast.success(`${title} has been removed from your cart`);
    } catch (error) {
      showErrorToast("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleINC = async (id: string, currentQuantity: number) => {
    setIsLoading(true);
    try {
      await dispatch(incrementQuantity(id, user?.id) as any);
    } catch (error) {
      showErrorToast("Failed to update quantity. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDEC = async (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      setIsLoading(true);
      try {
        await dispatch(decrementQuantity(id, user?.id) as any);
      } catch (error) {
        showErrorToast("Failed to update quantity. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getSavedAmount = () => {
    return cartItems.reduce((total, item) => {
      const actualPrice = item.actualPrice || item.price;
      return total + ((actualPrice - item.price) * item.quantity);
    }, 0);
  };

  // Show loading state
  if ((isLoading || isCartLoading) && !cartItems.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NewNavbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-gray-900">Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Show error state
  if (error || cartError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NewNavbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error || cartError}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show empty cart state
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NewNavbar />
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-gray-500">Start shopping to add items to your cart.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  return (
    <>
      <NewNavbar />
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