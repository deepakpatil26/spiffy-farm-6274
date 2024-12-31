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

// Action to start cart operation
const cartRequestPending = () => ({
  type: CART_REQUEST_PENDING,
});

// Action for successful cart operation
const cartRequestSuccess = () => ({
  type: CART_REQUEST_SUCCESS,
});

// Action for failed cart operation
const cartRequestFailure = (error) => ({
  type: CART_REQUEST_FAILURE,
  payload: error,
});

// Add item to cart
export const addToCart = (item) => (dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
    // Save to localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch(cartRequestSuccess());
  } catch (error) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Remove item from cart
export const removeFromCart = (id) => (dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(cartRequestSuccess());
  } catch (error) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Increment item quantity
export const incrementQuantity = (id) => (dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: INCREMENT_QUANTITY,
      payload: id,
    });
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(cartRequestSuccess());
  } catch (error) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Decrement item quantity
export const decrementQuantity = (id) => (dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({
      type: DECREMENT_QUANTITY,
      payload: id,
    });
    // Update localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(cartRequestSuccess());
  } catch (error) {
    dispatch(cartRequestFailure(error.message));
  }
};

// Clear cart
export const clearCart = () => (dispatch) => {
  dispatch(cartRequestPending());
  try {
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cart");
    dispatch(cartRequestSuccess());
  } catch (error) {
    dispatch(cartRequestFailure(error.message));
  }
};
