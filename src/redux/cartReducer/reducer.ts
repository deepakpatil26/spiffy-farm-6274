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
import { CartState, CartItem } from "../../types";

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),
  isLoading: false,
  error: null,
  total: 0,
};

interface CartAction {
  type: string;
  payload?: any;
}

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const reducer = (state = initialState, { type, payload }: CartAction): CartState => {
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
      };

    case CART_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };

    case LOAD_CART:
      return {
        ...state,
        items: payload,
        cartItems: payload,
        total: calculateTotal(payload),
      };

    case ADD_TO_CART:
      if (Array.isArray(payload)) {
        return {
          ...state,
          items: payload,
          cartItems: payload,
          total: calculateTotal(payload),
        };
      }
      
      const existingItemIndex = state.items.findIndex(item => item.id === payload.id);
      let newItems;
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + (payload.quantity || 1) }
            : item
        );
      } else {
        newItems = [...state.items, { ...payload, quantity: payload.quantity || 1 }];
      }
      
      return {
        ...state,
        items: newItems,
        cartItems: newItems,
        total: calculateTotal(newItems),
      };

    case REMOVE_FROM_CART:
      const filteredItems = state.items.filter((item: CartItem) => item.id !== payload);
      return {
        ...state,
        items: filteredItems,
        cartItems: filteredItems,
        total: calculateTotal(filteredItems),
      };

    case INCREMENT_QUANTITY:
      const incrementedItems = state.items.map((item: CartItem) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
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
          : item
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