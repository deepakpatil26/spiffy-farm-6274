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
} from "./actionTypes";
import { CartItem } from '../../types';

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

// Add item to cart
export const addToCart = (item: CartItem | CartItem[]) => (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
    
    // Save to localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(item)) {
      localStorage.setItem("cart", JSON.stringify(item));
    } else {
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Remove item from cart
export const removeFromCart = (id: string) => (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
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
export const incrementQuantity = (id: string) => (dispatch: Dispatch) => {
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
export const decrementQuantity = (id: string) => (dispatch: Dispatch) => {
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
export const clearCart = () => (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cart");
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
  }
};