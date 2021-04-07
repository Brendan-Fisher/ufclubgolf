import { combineReducers } from "redux";
import authReducer from "./authReducer";
import contentReducer from "./contentReducer";
import errorReducer from "./errorReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  users: userReducer,
  content: contentReducer
});
