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

    case ADD_TO_CART:
      if (Array.isArray(payload)) {
        return {
          ...state,
          items: payload,
          cartItems: payload,
          total: payload.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
        cartItems: [...state.cartItems, { ...payload, quantity: 1 }],
        total: state.total + payload.price,
      };

    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find((item: CartItem) => item.id === payload);
      const newItems = state.items.filter((item: CartItem) => item.id !== payload);
      return {
        ...state,
        items: newItems,
        cartItems: newItems,
        total: state.total - (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };

    case INCREMENT_QUANTITY:
      const incrementedItems = state.items.map((item: CartItem) =>
        item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        items: incrementedItems,
        cartItems: incrementedItems,
        total: state.total + (state.items.find((item: CartItem) => item.id === payload)?.price || 0),
      };

    case DECREMENT_QUANTITY:
      const decrementedItems = state.items.map((item: CartItem) =>
        item.id === payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      const decrementPrice = state.items.find((item: CartItem) => item.id === payload);
      return {
        ...state,
        items: decrementedItems,
        cartItems: decrementedItems,
        total: state.total - (decrementPrice && decrementPrice.quantity > 1 ? decrementPrice.price : 0),
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