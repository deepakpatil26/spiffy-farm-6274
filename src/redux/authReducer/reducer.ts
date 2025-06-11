import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
  GET_USER,
} from "./actionTypes";
import { AuthState, User, AuthUser } from "../../types";

const initialState: AuthState = {
  createAccountLoading: false,
  successCreate: false,
  createError: false,
  userData: [],
  isAuth: false,
  isLoading: false,
  isError: false,
  afterLoginUser: {} as AuthUser,
  isAdmin: false,
};

interface AuthAction {
  type: string;
  payload?: any;
}

export const reducer = (state = initialState, action: AuthAction): AuthState => {
  const { type, payload } = action;
  
  switch (type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        createAccountLoading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        createAccountLoading: false,
        successCreate: true,
        createError: false,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        createAccountLoading: false,
        successCreate: false,
        createError: true,
      };

    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        userData: payload || state.userData,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        afterLoginUser: payload,
        isError: false,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
      
    case SIGNOUT:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        isError: false,
        successCreate: false,
        createAccountLoading: false,
        createError: false,
        afterLoginUser: {} as AuthUser,
      };
      
    case GET_USER:
      return {
        ...state,
      };
      
    default:
      return state;
  }
};