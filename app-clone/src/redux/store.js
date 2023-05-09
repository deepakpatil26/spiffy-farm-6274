import {applyMiddleware, combineReducers, legacy_createStore,compose} from "redux"
import thunk from "redux-thunk";
import {reducer as MenReducer} from "./MenReducer/reducer"
import {reducer as cartReducer} from "./cartReducer/reducer"

import {reducer as AuthReducer} from "../redux/authReducer/reducer"


const rootReducer = combineReducers({
   MenReducer,
   AuthReducer,
   cartReducer,
  });
  
const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;




  export const store = legacy_createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

