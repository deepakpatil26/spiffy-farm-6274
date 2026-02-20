import { Dispatch } from 'redux';
import {
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  CART_REQUEST_PENDING,
  CART_REQUEST_SUCCESS,
  CART_REQUEST_FAILURE,
  CLEAR_CART,
  LOAD_CART,
} from './actionTypes';
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
export const addToCart =
  (item: CartItem | CartItem[], userId?: string) =>
  async (dispatch: Dispatch) => {
    dispatch(cartRequestPending());
    try {
      if (Array.isArray(item)) {
        dispatch({
          type: LOAD_CART,
          payload: item,
        });
      } else {
        if (userId) {
          try {
            const updatedCart = await cartService.addToCart(
              userId,
              item.id,
              item.quantity || 1,
            );

            dispatch({
              type: LOAD_CART,
              payload: updatedCart,
            });

            // Also update local storage for consistency
            localStorage.setItem('cart', JSON.stringify(updatedCart));
          } catch (error) {
            console.error('Error in cartService.addToCart:', error);
            throw error;
          }
        } else {
          const cart: CartItem[] = JSON.parse(
            localStorage.getItem('cart') || '[]',
          );

          const existingItemIndex = cart.findIndex(
            (cartItem: CartItem) => cartItem.id === item.id,
          );

          if (existingItemIndex >= 0) {
            cart[existingItemIndex].quantity += item.quantity || 1;
          } else {
            cart.push({ ...item, quantity: item.quantity || 1 });
          }

          localStorage.setItem('cart', JSON.stringify(cart));

          dispatch({
            type: LOAD_CART,
            payload: [...cart],
          });
        }
      }
      dispatch(cartRequestSuccess());
    } catch (error: any) {
      console.error('Error in addToCart:', error);
      dispatch(cartRequestFailure(error.message));
      throw error;
    }
  };

// Remove item from cart
export const removeFromCart =
  (productId: string, userId?: string) => async (dispatch: Dispatch) => {
    dispatch(cartRequestPending());
    try {
      if (userId) {
        // For authenticated users, we need to find the cart item by product ID and remove it
        const cartItems = await cartService.getCartItems(userId);
        const itemToRemove = cartItems.find(
          (item: CartItem) => item.id === productId,
        );

        if (itemToRemove && itemToRemove.cart_item_id) {
          // Pass both userId and cartItemId to the service
          const updatedCart = await cartService.removeFromCart(
            userId,
            itemToRemove.cart_item_id,
          );

          // Update the Redux store with the new cart
          dispatch({
            type: LOAD_CART,
            payload: updatedCart,
          });
        }
      } else {
        // For non-authenticated users, use localStorage
        dispatch({
          type: REMOVE_FROM_CART,
          payload: productId,
        });

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.filter(
          (item: CartItem) => item.id !== productId,
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      dispatch(cartRequestSuccess());
    } catch (error: any) {
      console.error('Error in removeFromCart:', error);
      dispatch(
        cartRequestFailure(error.message || 'Failed to remove item from cart'),
      );
      throw error;
    }
  };

// Increment item quantity
export const incrementQuantity =
  (productId: string, userId?: string) => async (dispatch: Dispatch) => {
    dispatch(cartRequestPending());
    try {
      if (userId) {
        const cartItems = await cartService.getCartItems(userId);
        const item = cartItems.find(
          (cartItem: CartItem) => cartItem.id === productId,
        );

        if (item && item.cart_item_id) {
          // Pass userId, cartItemId, and new quantity to the service
          const updatedCart = await cartService.updateCartItem(
            userId,
            item.cart_item_id,
            item.quantity + 1,
          );

          // Update the Redux store with the new cart
          dispatch({
            type: LOAD_CART,
            payload: updatedCart,
          });
        }
      } else {
        dispatch({
          type: INCREMENT_QUANTITY,
          payload: productId,
        });

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.map((item: CartItem) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      dispatch(cartRequestSuccess());
    } catch (error: any) {
      console.error('Error in incrementQuantity:', error);
      dispatch(
        cartRequestFailure(error.message || 'Failed to update item quantity'),
      );
      throw error;
    }
  };

// Decrement item quantity
export const decrementQuantity =
  (productId: string, userId?: string) => async (dispatch: Dispatch) => {
    dispatch(cartRequestPending());
    try {
      if (userId) {
        const cartItems = await cartService.getCartItems(userId);
        const item = cartItems.find(
          (cartItem: CartItem) => cartItem.id === productId,
        );

        if (item && item.cart_item_id && item.quantity > 1) {
          // Pass userId, cartItemId, and new quantity to the service
          const updatedCart = await cartService.updateCartItem(
            userId,
            item.cart_item_id,
            item.quantity - 1,
          );

          // Update the Redux store with the new cart
          dispatch({
            type: LOAD_CART,
            payload: updatedCart,
          });
        }
      } else {
        dispatch({
          type: DECREMENT_QUANTITY,
          payload: productId,
        });

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const updatedCart = cart.map((item: CartItem) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
        localStorage.setItem('cart', JSON.stringify(updatedCart));
      }

      dispatch(cartRequestSuccess());
    } catch (error: any) {
      console.error('Error in decrementQuantity:', error);
      dispatch(
        cartRequestFailure(error.message || 'Failed to update item quantity'),
      );
      throw error;
    }
  };

// Clear cart
export const clearCart = (userId?: string) => async (dispatch: Dispatch) => {
  dispatch(cartRequestPending());
  try {
    if (userId) {
      await cartService.clearCart(userId);
      // After clearing, the cart should be empty
      dispatch({
        type: LOAD_CART,
        payload: [],
      });
    } else {
      localStorage.removeItem('cart');
      dispatch({ type: CLEAR_CART });
    }

    dispatch(cartRequestSuccess());
  } catch (error: any) {
    console.error('Error in clearCart:', error);
    dispatch(cartRequestFailure(error.message || 'Failed to clear cart'));
    throw error;
  }
};
