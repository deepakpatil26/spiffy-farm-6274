import { Dispatch } from 'redux';
import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
  GET_USER,
} from './actionTypes';
import { authService, SignUpData, SignInData } from '../../services/authService';

export const signUp = (userData: SignUpData) => async (dispatch: Dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const data = await authService.signUp(userData);
    dispatch({ type: SIGNUP_SUCCESS, payload: data });
    return data;
  } catch (error: any) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    throw error;
  }
};

export const signIn = (credentials: SignInData) => async (dispatch: Dispatch) => {
  dispatch({ type: SIGNIN_REQUEST });
  try {
    const data = await authService.signIn(credentials);
    dispatch({ type: SIGNIN_SUCCESS, payload: data });
    return data;
  } catch (error: any) {
    dispatch({ type: SIGNIN_FAILURE, payload: error.message });
    throw error;
  }
};

export const signOut = () => async (dispatch: Dispatch) => {
  try {
    await authService.signOut();
    dispatch({ type: SIGNOUT });
  } catch (error: any) {
    console.error('Sign out error:', error);
  }
};

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  try {
    const user = await authService.getCurrentUser();
    dispatch({ type: GET_USER, payload: user });
    return user;
  } catch (error: any) {
    console.error('Get user error:', error);
    return null;
  }
};

export const getSession = () => async (dispatch: Dispatch) => {
  try {
    const session = await authService.getSession();
    if (session?.user) {
      dispatch({ type: SIGNIN_SUCCESS, payload: { user: session.user, session } });
    }
    return session;
  } catch (error: any) {
    console.error('Get session error:', error);
    return null;
  }
};

// Legacy actions for backward compatibility
export const SignUpFunc = signUp;
export const loginFunction = (userData: any) => (dispatch: Dispatch) => {
  dispatch({ type: SIGNIN_SUCCESS, payload: { user: userData } });
};
export const logout = signOut;
export const getdata = () => async (dispatch: Dispatch) => {
  // This was used to get registered users from JSON server
  // Now we'll use Supabase auth instead
  return [];
};