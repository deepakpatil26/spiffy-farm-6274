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

// Admin email list - you can expand this or move to environment variables
const ADMIN_EMAILS = ['deepakpatil2612@gmail.com'];

const checkIsAdmin = (email: string): boolean => {
  return ADMIN_EMAILS.includes(email.toLowerCase());
};

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
      const userEmail = payload.user?.email || '';
      const isAdmin = checkIsAdmin(userEmail);
      
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user: payload.user,
        session: payload.session,
        isAdmin: isAdmin,
        afterLoginUser: {
          email: userEmail,
          name: payload.user?.user_metadata?.first_name || payload.user?.email?.split('@')[0] || '',
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
        isAdmin: false,
      };
      
    case SIGNOUT:
      return {
        ...initialState, // Reset to initial state to clear cart and other data
      };
      
    case GET_USER:
      const getUserEmail = payload?.email || '';
      const getUserIsAdmin = checkIsAdmin(getUserEmail);
      
      return {
        ...state,
        user: payload,
        isAuth: !!payload,
        isAdmin: getUserIsAdmin,
      };
      
    default:
      return state;
  }
};