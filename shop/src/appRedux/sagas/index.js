import { all } from "redux-saga/effects";
import productSagas from "./products.saga";

export default function* rootSaga(getState) {
  yield all([productSagas()]);
}
