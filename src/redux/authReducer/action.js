import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "./actionTypes";
import axios from "axios";

const API_BASE_URL = "https://lifestyle-mock-server-api.onrender.com";

export const SignUpFunc = (payload) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    await axios.post(`${API_BASE_URL}/registeredUser`, payload);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const getdata = () => async (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/registeredUser`);
    dispatch({ type: SIGNIN_REQUEST, payload: response.data });
  } catch (error) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
  }
};

export const loginFunction = (userData) => (dispatch) => {
  dispatch({ type: SIGNIN_SUCCESS, payload: userData });
};

export const logout = () => (dispatch) => {
  dispatch({ type: SIGNOUT });
};
