import { Dispatch } from 'redux';
import axios from 'axios';
import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from './actionTypes';
import { User, AuthUser } from '../../types';

const API_BASE_URL = "https://lifestyle-mock-server-api.onrender.com";

export const SignUpFunc = (payload: User) => async (dispatch: Dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    await axios.post(`${API_BASE_URL}/registeredUser`, payload);
    dispatch({ type: SIGNUP_SUCCESS });
  } catch (error: any) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
  }
};

export const getdata = () => async (dispatch: Dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/registeredUser`);
    dispatch({ type: SIGNIN_REQUEST, payload: response.data });
  } catch (error: any) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
  }
};

export const loginFunction = (userData: AuthUser) => (dispatch: Dispatch) => {
  dispatch({ type: SIGNIN_SUCCESS, payload: userData });
};

export const logout = () => (dispatch: Dispatch) => {
  dispatch({ type: SIGNOUT });
};