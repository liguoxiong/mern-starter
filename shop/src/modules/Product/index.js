import React, { useEffect, Fragment } from "react";
import ProductItem from "./../../components/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { GET_PRODUCT } from "./../../constants/actionTypes";

import ShoppingBar from "./../../components/ShoppingBar";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { productList, isError, isLoading } = products;
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: GET_PRODUCT });
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <ShoppingBar />
      {!isLoading &&
        (isError ? (
          <div>Something went wrong...</div>
        ) : (
          productList.map(item => (
            <ProductItem key={item._id} product={item} grid={true} />
          ))
        ))}
    </Fragment>
  );
};

export default Product;
