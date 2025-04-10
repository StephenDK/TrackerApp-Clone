import { combineReducers } from "redux";

// Reducers
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";
import navReducer from "./navReducer";
import loadingReducer from "./loadingReducer";
import successReducer from "./successReducer";
import errorReducer from "./errorReducer";
import filesReducer from "./filesReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  data: dataReducer,
  cart: cartReducer,
  user: userReducer,
  nav: navReducer,
  loading: loadingReducer,
  success: successReducer,
  error: errorReducer,
  files: filesReducer,
});

export default rootReducer;
