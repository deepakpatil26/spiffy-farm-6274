import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LOAD_WISHLIST,
  CLEAR_WISHLIST,
  WISHLIST_REQUEST_PENDING,
  WISHLIST_REQUEST_SUCCESS,
  WISHLIST_REQUEST_FAILURE,
} from "./actionTypes";
import { WishlistItem } from "../../types";

interface WishlistState {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

type WishlistAction =
  | { type: typeof WISHLIST_REQUEST_PENDING }
  | { type: typeof WISHLIST_REQUEST_SUCCESS }
  | { type: typeof WISHLIST_REQUEST_FAILURE; payload: string }
  | { type: typeof LOAD_WISHLIST; payload: WishlistItem[] }
  | { type: typeof ADD_TO_WISHLIST; payload: WishlistItem }
  | { type: typeof REMOVE_FROM_WISHLIST; payload: string }
  | { type: typeof CLEAR_WISHLIST };

export const reducer = (state = initialState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case WISHLIST_REQUEST_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case WISHLIST_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };

    case WISHLIST_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case LOAD_WISHLIST:
      return {
        ...state,
        items: action.payload || [],
        isLoading: false,
        error: null,
      };

    case ADD_TO_WISHLIST: {
      // Check if item already exists in wishlist
      const existingItem = state.items.some(
        (item) => item.product_id === action.payload.product_id
      );

      if (existingItem) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter((item) => item.product_id !== action.payload),
      };

    case CLEAR_WISHLIST:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};