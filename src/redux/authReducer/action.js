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

export const SignUpFunc = (payload) => (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  axios
    .post(
      "https://lifestyle-mock-server-api.onrender.com/registeredUser",
      payload
    )
    .then((response) => {
      dispatch({ type: SIGNUP_SUCCESS });
    })
    .catch((e) => {
      dispatch({ type: SIGNUP_FAILURE });
    });
};

export const getdata = (dispatch) => {
  axios
    .get("https://lifestyle-mock-server-api.onrender.com/registeredUser")
    .then((res) => {
      dispatch({ type: SIGNIN_REQUEST, payload: res.data });
    })
    .catch(() => {
      dispatch({ type: SIGNIN_FAILURE });
    });
};

export const loginFunction = (payload) => (dispatch) => {
  dispatch({ type: SIGNIN_SUCCESS, payload: payload });
  console.log(payload);
};

export const logout = (dispatch) => {
  dispatch({ type: SIGNOUT });
};
