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

const initialState = {
  items: JSON.parse(localStorage.getItem("cart") || "[]"),
  isLoading: false,
  error: null,
  total: 0,
};

export const reducer = (state = initialState, { type, payload }) => {
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
      return {
        ...state,
        items: [...state.items, { ...payload, quantity: 1 }],
        total: state.total + payload.price,
      };

    case REMOVE_FROM_CART:
      const itemToRemove = state.items.find((item) => item.id === payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== payload),
        total:
          state.total -
          (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };

    case INCREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        total:
          state.total +
          (state.items.find((item) => item.id === payload)?.price || 0),
      };

    case DECREMENT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === payload
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
        total:
          state.total -
          (state.items.find((item) => item.id === payload)?.quantity > 1
            ? state.items.find((item) => item.id === payload)?.price
            : 0),
      };

    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
      };

    default:
      return state;
  }
};
