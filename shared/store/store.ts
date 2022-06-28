import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./rootReducer";
import { Web3UserState } from "./web3User/web3UserTypes"

export type StoreState = {
  web3User: Web3UserState
  trace: any
  whale: any
}

// initial states here
const initalState = {
  web3User: {},
  trace: {},
  whale: {}
} as StoreState;

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
