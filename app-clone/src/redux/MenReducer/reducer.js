import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";

const initialState = {
  isLoading: false,
  isError: false,
  total: "",
  men: [],
  women: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MEN_REQUEST_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case MEN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        total: payload.total,
        men: payload.data,
      };
    case MEN_REQUEST_PENDING:
      return { ...state, isLoading: true };
    case WOMEN_REQUEST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        total: payload.total,
        women: payload.data,
      };
    default:
      return state;
  }
};
