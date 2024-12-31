import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_FAILURE,
  WOMEN_REQUEST_PENDING,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";

const initialState = {
  menLoading: false,
  menError: false,
  womenLoading: false,
  womenError: false,
  total: "",
  men: [],
  women: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MEN_REQUEST_PENDING:
      return { ...state, menLoading: true, menError: false };
    case MEN_REQUEST_FAILURE:
      return { ...state, menLoading: false, menError: true };
    case MEN_REQUEST_SUCCESS:
      return {
        ...state,
        menLoading: false,
        menError: false,
        total: payload.total,
        men: payload.data,
      };
    case WOMEN_REQUEST_PENDING:
      return { ...state, womenLoading: true, womenError: false };
    case WOMEN_REQUEST_FAILURE:
      return { ...state, womenLoading: false, womenError: true };
    case WOMEN_REQUEST_SUCCESS:
      return {
        ...state,
        womenLoading: false,
        womenError: false,
        total: payload.total,
        women: payload.data,
      };
    default:
      return state;
  }
};
