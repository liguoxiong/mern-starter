import axios from "axios";

const getProduct = async () =>
  axios
    .get("/api/v1/products")
    .then(res => res.data)
    .catch(err => err);

const product = { getProduct };
export default product;
