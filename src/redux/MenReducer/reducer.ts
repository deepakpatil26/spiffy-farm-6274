import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_FAILURE,
  WOMEN_REQUEST_PENDING,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";
import { ProductState, Product, ApiResponse } from "../../types";

const initialState: ProductState = {
  menLoading: false,
  menError: false,
  womenLoading: false,
  womenError: false,
  total: "",
  men: [],
  women: [],
  isLoading: false,
  isError: false,
};

interface ProductAction {
  type: string;
  payload?: ApiResponse<Product[]>;
}

export const reducer = (state = initialState, { type, payload }: ProductAction): ProductState => {
  switch (type) {
    case MEN_REQUEST_PENDING:
      return { 
        ...state, 
        menLoading: true, 
        menError: false,
        isLoading: true,
        isError: false
      };
    case MEN_REQUEST_FAILURE:
      return { 
        ...state, 
        menLoading: false, 
        menError: true,
        isLoading: false,
        isError: true
      };
    case MEN_REQUEST_SUCCESS:
      return {
        ...state,
        menLoading: false,
        menError: false,
        isLoading: false,
        isError: false,
        total: payload?.total || "",
        men: payload?.data || [],
      };
    case WOMEN_REQUEST_PENDING:
      return { 
        ...state, 
        womenLoading: true, 
        womenError: false,
        isLoading: true,
        isError: false
      };
    case WOMEN_REQUEST_FAILURE:
      return { 
        ...state, 
        womenLoading: false, 
        womenError: true,
        isLoading: false,
        isError: true
      };
    case WOMEN_REQUEST_SUCCESS:
      return {
        ...state,
        womenLoading: false,
        womenError: false,
        isLoading: false,
        isError: false,
        total: payload?.total || "",
        women: payload?.data || [],
      };
    default:
      return state;
  }
};