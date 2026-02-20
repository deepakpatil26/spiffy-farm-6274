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
} from './actionTypes';
import { CartState, CartItem } from '../../types';

const initialState: CartState = {
  items: [], // This will be our single source of truth for cart items
  cartItems: [], // This is redundant and can be removed in future refactoring
  isLoading: false,
  error: null,
  total: 0,
};

interface CartAction {
  type: string;
  payload?: any;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const reducer = (
  state = initialState,
  { type, payload }: CartAction,
): CartState => {
  switch (type) {
    case CART_REQUEST_PENDING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case CART_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        // Ensure we have a valid array
        items: Array.isArray(state.items) ? state.items : [],
        cartItems: Array.isArray(state.items) ? state.items : [],
        total: calculateTotal(Array.isArray(state.items) ? state.items : []),
      };

    case CART_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case LOAD_CART:
      // Ensure payload is an array and transform it if needed
      const cartItems = Array.isArray(payload) ? payload : [payload];

      return {
        ...state,
        items: cartItems,
        cartItems: cartItems, // For backward compatibility
        total: calculateTotal(cartItems),
        isLoading: false,
        error: null,
      };

    case ADD_TO_CART:
      // If payload is an array, replace the entire cart
      if (Array.isArray(payload)) {
        const newItems = payload.map((item) => ({
          ...item,
          // Ensure quantity is always a number
          quantity: typeof item.quantity === 'number' ? item.quantity : 1,
        }));

        return {
          ...state,
          items: newItems,
          cartItems: newItems, // For backward compatibility
          total: calculateTotal(newItems),
          isLoading: false,
          error: null,
        };
      }

      // Handle single item addition
      const existingItemIndex = state.items.findIndex((item) =>
        // Use cart_item_id if available, otherwise fall back to id
        item.cart_item_id
          ? item.cart_item_id === payload.cart_item_id
          : item.id === payload.id,
      );

      let newItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + (payload.quantity || 1),
                // Preserve cart_item_id if it exists
                cart_item_id: item.cart_item_id || payload.cart_item_id,
              }
            : item,
        );
      } else {
        // New item, add to cart
        newItems = [
          ...state.items,
          {
            ...payload,
            quantity: payload.quantity || 1,
            // Ensure we have a cart_item_id for new items
            cart_item_id: payload.cart_item_id || `temp_${Date.now()}`,
          },
        ];
      }

      return {
        ...state,
        items: newItems,
        cartItems: newItems, // For backward compatibility
        total: calculateTotal(newItems),
        isLoading: false,
        error: null,
      };

    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter(
        (item: CartItem) => item.id !== payload,
      );
      return {
        ...state,
        items: filteredItems,
        cartItems: filteredItems,
        total: calculateTotal(filteredItems),
      };

    case INCREMENT_QUANTITY:
      const incrementedItems = state.items.map((item: CartItem) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item,
      );
      return {
        ...state,
        items: incrementedItems,
        cartItems: incrementedItems,
        total: calculateTotal(incrementedItems),
      };

    case DECREMENT_QUANTITY:
      const decrementedItems = state.items.map((item: CartItem) =>
        item.id === payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      );
      return {
        ...state,
        items: decrementedItems,
        cartItems: decrementedItems,
        total: calculateTotal(decrementedItems),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        cartItems: [],
        total: 0,
      };

    default:
      return state;
  }
};
