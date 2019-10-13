import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import productReducer from "./products.reducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    products: productReducer
  });
export default rootReducer;
