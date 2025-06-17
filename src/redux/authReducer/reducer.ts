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
  user: null,
  session: null,
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
        createError: false,
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
        isError: false,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload.user,
        session: payload.session,
        afterLoginUser: {
          email: payload.user?.email || '',
          name: payload.user?.user_metadata?.first_name || '',
          password: '',
        },
        isError: false,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        user: null,
        session: null,
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
        user: null,
        session: null,
      };
      
    case GET_USER:
      return {
        ...state,
        user: payload,
        isAuth: !!payload,
      };
      
    default:
      return state;
  }
};