import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import popupReducer from "./reducer";

const rootReducer = combineReducers({
  popup: popupReducer,
});

const store = createStore(rootReducer);

export default store;
