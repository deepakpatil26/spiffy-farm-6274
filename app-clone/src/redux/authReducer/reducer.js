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

const SignUpState = {
  createAccountLoading: false,
  successCreate: false,
  createError: false,
  userData: [],
  isAuth: false,
  isLoading: false,
  isError: false,
  afterLoginUser: {},
};

export const reducer = (state = SignUpState, action) => {
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
        creatError: true,
      };

    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        userData: payload,
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
      };
    case GET_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};
