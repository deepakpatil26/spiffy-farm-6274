import { Dispatch } from 'redux';
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CART_REQUEST_PENDING,
  CART_REQUEST_SUCCESS,
  CART_REQUEST_FAILURE,
  CLEAR_CART,
  LOAD_CART,
} from "./actionTypes";
import { CartItem } from '../../types';
import { cartService } from '../../services/cartService';

// Action to start cart operation
const cartRequestPending = () => ({
  type: CART_REQUEST_PENDING,
});

// Action for successful cart operation
const cartRequestSuccess = () => ({
  type: CART_REQUEST_SUCCESS,
});

// Action for failed cart operation
const cartRequestFailure = (error: string) => ({
  type: CART_REQUEST_FAILURE,
  payload: error,
});

// Load cart from Supabase
export const loadCart = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    const cartItems = await cartService.getCartItems(userId);
    dispatch({
      type: LOAD_CART,
      payload: cartItems,
    });
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Add item to cart
export const addToCart = (item: CartItem | CartItem[], userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (Array.isArray(item)) {
      // Loading existing cart items
      dispatch({
        type: ADD_TO_CART,
        payload: item,
      });
    } else {
      // Adding new item
      if (userId) {
        await cartService.addToCart(userId, item.id, item.quantity);
      }
      
      dispatch({
        type: ADD_TO_CART,
        payload: item,
      });
      
      // Save to localStorage as backup
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        cart.push(item);
      }
      
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Remove item from cart
export const removeFromCart = (id: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      // Find cart item ID and remove from Supabase
      // This would need the cart item ID, not product ID
      // For now, we'll handle this in the component
    }
    
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });
    
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item: CartItem) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Increment item quantity
export const incrementQuantity = (id: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: INCREMENT_QUANTITY,
      payload: id,
    });
    
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map((item: CartItem) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Decrement item quantity
export const decrementQuantity = (id: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: DECREMENT_QUANTITY,
      payload: id,
    });
    
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map((item: CartItem) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Clear cart
export const clearCart = (userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      await cartService.clearCart(userId);
    }
    
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cart");
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};