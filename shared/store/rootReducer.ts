import { combineReducers } from "redux";
import web3UserReducer from "./web3User/web3UserReducer";

export default combineReducers({
  web3User: web3UserReducer,
});
