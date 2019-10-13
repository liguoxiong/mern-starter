import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { callProduct } from "./../../api";

import { GET_PRODUCT } from "./../../constants/actionTypes";
import {
  getProductListSuccess,
  showMessage
} from "./../actions/products.action";

function* getProductGenarator() {
  try {
    const res = yield call(callProduct.getProduct);
    if (res.message) {
      yield put(showMessage(res.message));
    } else {
      yield put(getProductListSuccess(res.products));
    }
  } catch (error) {
    yield put(showMessage(error));
  }
}

export function* getProduct() {
  yield takeEvery(GET_PRODUCT, getProductGenarator);
}

export default function* rootSaga() {
  yield all([fork(getProduct)]);
}
