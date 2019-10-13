import {
  GET_PRODUCT,
  GET_PRODUCT_SUCCESS,
  SHOW_MESSAGE
} from "../../constants/actionTypes";

export const getProductList = () => ({ type: GET_PRODUCT });
export const getProductListSuccess = list => ({
  type: GET_PRODUCT_SUCCESS,
  payload: list
});
export const showMessage = message => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};
