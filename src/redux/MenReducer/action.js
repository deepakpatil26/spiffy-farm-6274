import axios from "axios";
import {
  MEN_REQUEST_FAILURE,
  MEN_REQUEST_PENDING,
  MEN_REQUEST_SUCCESS,
  WOMEN_REQUEST_FAILURE,
  WOMEN_REQUEST_PENDING,
  WOMEN_REQUEST_SUCCESS,
} from "./actionType";

const API_BASE_URL = "https://lifestyle-mock-server-api.onrender.com";

export const getmens = (paramObj) => async (dispatch) => {
  dispatch({ type: MEN_REQUEST_PENDING });
  try {
    const response = await axios.get(
      `${API_BASE_URL}/men?_limit=12`,
      paramObj
    );
    const obj = {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
    dispatch({ type: MEN_REQUEST_SUCCESS, payload: obj });
  } catch (error) {
    dispatch({ type: MEN_REQUEST_FAILURE });
  }
};

export const getwomens = (paramObj) => async (dispatch) => {
  dispatch({ type: WOMEN_REQUEST_PENDING });
  try {
    const response = await axios.get(
      `${API_BASE_URL}/women?_limit=12`,
      paramObj
    );
    const obj = {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
    dispatch({ type: WOMEN_REQUEST_SUCCESS, payload: obj });
  } catch (error) {
    dispatch({ type: WOMEN_REQUEST_FAILURE });
  }
};
