import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  compose,
  Store,
} from "redux";
import thunk from "redux-thunk";
import { reducer as MenReducer } from "./MenReducer/reducer";
import { reducer as cartReducer } from "./cartReducer/reducer";
import { reducer as AuthReducer } from "../redux/authReducer/reducer";
import { RootState } from "../types";

const rootReducer = combineReducers({
  MenReducer,
  AuthReducer,
  cartReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store: Store<RootState> = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);