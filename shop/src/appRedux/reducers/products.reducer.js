import { GET_PRODUCT_SUCCESS, SHOW_MESSAGE } from "../../constants/actionTypes";
const INIT_STATE = {
  isloading: false,
  alertMessage: "",
  isError: false,
  // initURL: '',
  productList: []
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        isloading: false,
        productList: action.payload
      };
    }
    case SHOW_MESSAGE: {
      return {
        ...state,
        isloading: false,
        alertMessage: action.message,
        isError: true
      };
    }
    //   case INIT_URL: {
    //     return {
    //       ...state,
    //       initURL: action.payload,
    //     };
    //   }
    default:
      return state;
  }
};
