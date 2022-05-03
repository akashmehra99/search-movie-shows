import { createStore, combineReducers } from "redux";
import discoverReducer from "../reducers/discover";

// Store creation

const store = createStore(
  combineReducers({
    discover: discoverReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
