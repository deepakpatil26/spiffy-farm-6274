import { Dispatch } from 'redux';
import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_FAILURE,
  WOMEN_REQUEST_PENDING,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";
import { productService, ProductFilters } from "../../services/productService";
import { QueryParams, Product, ApiResponse } from "../../types";

export const getmens = (queryParams: QueryParams) => async (dispatch: Dispatch) => {
  dispatch({ type: MEN_REQUEST_PENDING });
  try {
    const filters: ProductFilters = {
      category: queryParams.params.category,
      page: queryParams.params._page ? parseInt(queryParams.params._page) : 1,
      limit: 12,
      sortBy: queryParams.params._sort ? 'price' : undefined,
      sortOrder: queryParams.params._order as 'asc' | 'desc' | undefined,
    };

    const result = await productService.getMenProducts(filters);
    
    const obj: ApiResponse<Product[]> = {
      data: result.data,
      total: result.total,
    };
    
    dispatch({ type: MEN_REQUEST_SUCCESS, payload: obj });
  } catch (error) {
    console.error('Error fetching men products:', error);
    dispatch({ type: MEN_REQUEST_FAILURE });
  }
};

export const getwomens = (queryParams: QueryParams) => async (dispatch: Dispatch) => {
  dispatch({ type: WOMEN_REQUEST_PENDING });
  try {
    const filters: ProductFilters = {
      category: queryParams.params.category,
      page: queryParams.params._page ? parseInt(queryParams.params._page) : 1,
      limit: 12,
      sortBy: queryParams.params._sort ? 'price' : undefined,
      sortOrder: queryParams.params._order as 'asc' | 'desc' | undefined,
    };

    const result = await productService.getWomenProducts(filters);
    
    const obj: ApiResponse<Product[]> = {
      data: result.data,
      total: result.total,
    };
    
    dispatch({ type: WOMEN_REQUEST_SUCCESS, payload: obj });
  } catch (error) {
    console.error('Error fetching women products:', error);
    dispatch({ type: WOMEN_REQUEST_FAILURE });
  }
};