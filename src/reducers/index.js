import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cart from "./cart";

const rootReducer = combineReducers({
  cart,
});

export default persistReducer({
  key: "root",
  storage,
}, rootReducer);
