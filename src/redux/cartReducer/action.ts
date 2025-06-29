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
    return cartItems;
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
    throw error;
  }
};

// Add item to cart
export const addToCart = (item: CartItem | CartItem[], userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (Array.isArray(item)) {
      // Loading existing cart items
      dispatch({
        type: LOAD_CART,
        payload: item,
      });
    } else {
      // Adding new item
      if (userId) {
        await cartService.addToCart(userId, item.id, item.quantity || 1);
        // Reload cart to get updated data
        const updatedCart = await cartService.getCartItems(userId);
        dispatch({
          type: LOAD_CART,
          payload: updatedCart,
        });
      } else {
        // Fallback to localStorage for non-authenticated users
        dispatch({
          type: ADD_TO_CART,
          payload: item,
        });
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItemIndex = cart.findIndex((cartItem: CartItem) => cartItem.id === item.id);
        
        if (existingItemIndex >= 0) {
          cart[existingItemIndex].quantity += item.quantity || 1;
        } else {
          cart.push({ ...item, quantity: item.quantity || 1 });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = (productId: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      // For authenticated users, we need to find the cart item by product ID and remove it
      const cartItems = await cartService.getCartItems(userId);
      const itemToRemove = cartItems.find((item: CartItem) => item.id === productId);
      
      if (itemToRemove && itemToRemove.cart_item_id) {
        await cartService.removeFromCart(itemToRemove.cart_item_id);
      }
      
      // Reload cart
      const updatedCart = await cartService.getCartItems(userId);
      dispatch({
        type: LOAD_CART,
        payload: updatedCart,
      });
    } else {
      // For non-authenticated users, use localStorage
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });
      
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.filter((item: CartItem) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
    throw error;
  }
};

// Increment item quantity
export const incrementQuantity = (productId: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      const cartItems = await cartService.getCartItems(userId);
      const item = cartItems.find((cartItem: CartItem) => cartItem.id === productId);
      
      if (item && item.cart_item_id) {
        await cartService.updateCartItem(item.cart_item_id, item.quantity + 1);
      }
      
      // Reload cart
      const updatedCart = await cartService.getCartItems(userId);
      dispatch({
        type: LOAD_CART,
        payload: updatedCart,
      });
    } else {
      dispatch({
        type: INCREMENT_QUANTITY,
        payload: productId,
      });
      
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.map((item: CartItem) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
    throw error;
  }
};

// Decrement item quantity
export const decrementQuantity = (productId: string, userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      const cartItems = await cartService.getCartItems(userId);
      const item = cartItems.find((cartItem: CartItem) => cartItem.id === productId);
      
      if (item && item.cart_item_id && item.quantity > 1) {
        await cartService.updateCartItem(item.cart_item_id, item.quantity - 1);
      }
      
      // Reload cart
      const updatedCart = await cartService.getCartItems(userId);
      dispatch({
        type: LOAD_CART,
        payload: updatedCart,
      });
    } else {
      dispatch({
        type: DECREMENT_QUANTITY,
        payload: productId,
      });
      
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = cart.map((item: CartItem) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
    dispatch(cartRequestSuccess());
  } catch (error: any) {
    dispatch(cartRequestFailure(error.message));
    throw error;
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
    throw error;
  }
};