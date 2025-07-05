import { Dispatch } from 'redux';
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LOAD_WISHLIST,
  CLEAR_WISHLIST,
  WISHLIST_REQUEST_PENDING,
  WISHLIST_REQUEST_SUCCESS,
  WISHLIST_REQUEST_FAILURE,
} from "./actionTypes";
import { wishlistService } from '../../services/wishlistService';

// Action to start wishlist operation
const wishlistRequestPending = () => ({
  type: WISHLIST_REQUEST_PENDING,
});

// Action for successful wishlist operation
const wishlistRequestSuccess = () => ({
  type: WISHLIST_REQUEST_SUCCESS,
});

// Action for failed wishlist operation
const wishlistRequestFailure = (error: string) => ({
  type: WISHLIST_REQUEST_FAILURE,
  payload: error,
});

// Load wishlist from Supabase
export const loadWishlist = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(wishlistRequestPending());
  try {
    const wishlistItems = await wishlistService.getWishlistItems(userId);
    dispatch({
      type: LOAD_WISHLIST,
      payload: wishlistItems,
    });
    dispatch(wishlistRequestSuccess());
  } catch (error: any) {
    dispatch(wishlistRequestFailure(error.message));
  }
};

// Add item to wishlist
export const addToWishlist = (userId: string, productId: string) => async (dispatch: Dispatch) => {
  dispatch(wishlistRequestPending());
  try {
    const wishlistItem = await wishlistService.addToWishlist(userId, productId);
    
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        ...wishlistItem,
        product_id: productId,
        user_id: userId,
        created_at: wishlistItem.created_at || new Date().toISOString(),
      },
    });
    
    dispatch(wishlistRequestSuccess());
    return wishlistItem;
  } catch (error: any) {
    dispatch(wishlistRequestFailure(error.message));
    throw error;
  }
};

// Remove item from wishlist
export const removeFromWishlist = (userId: string, productId: string) => async (dispatch: Dispatch) => {
  dispatch(wishlistRequestPending());
  try {
    await wishlistService.removeFromWishlist(userId, productId);
    
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: productId,
    });
    
    dispatch(wishlistRequestSuccess());
  } catch (error: any) {
    dispatch(wishlistRequestFailure(error.message));
    throw error;
  }
};

// Clear wishlist
export const clearWishlist = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(wishlistRequestPending());
  try {
    await wishlistService.clearWishlist(userId);
    
    dispatch({
      type: CLEAR_WISHLIST,
    });
    
    dispatch(wishlistRequestSuccess());
  } catch (error: any) {
    dispatch(wishlistRequestFailure(error.message));
    throw error;
  }
};