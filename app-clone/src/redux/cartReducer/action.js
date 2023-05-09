import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "./actionTypes";

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
export const incrementQuantity = (id) => {
  return {
    type: INCREMENT_QUANTITY,
    payload: id,
  };
};

export const decrementQuantity = (id) => {
  return {
    type: DECREMENT_QUANTITY,
    payload: id,
  };
};
