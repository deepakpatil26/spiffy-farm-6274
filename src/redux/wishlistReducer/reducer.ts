import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LOAD_WISHLIST,
  CLEAR_WISHLIST,
  WISHLIST_REQUEST_PENDING,
  WISHLIST_REQUEST_SUCCESS,
  WISHLIST_REQUEST_FAILURE,
} from "./actionTypes";
import { WishlistItem } from "../../services/wishlistService";

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

interface WishlistAction {
  type: string;
  payload?: any;
}

export const reducer = (state = initialState, { type, payload }: WishlistAction): WishlistState => {
  switch (type) {
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
        error: payload,
      };

    case LOAD_WISHLIST:
      return {
        ...state,
        items: payload,
      };

    case ADD_TO_WISHLIST:
      // The actual item will be loaded when we refresh the wishlist
      return state;

    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        items: state.items.filter(item => item.product_id !== payload.productId),
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