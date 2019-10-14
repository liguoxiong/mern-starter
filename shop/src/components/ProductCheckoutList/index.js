import React from 'react';

import ProductCheckoutItem from './ProductCheckoutItem';

const ProductCheckoutList = productsList => {
  productsList.map((item, i) => (
    <div key={i.toString()}>
      <ProductCheckoutItem product={item.product} quantity={item.quantity} />
    </div>
  ));
};

export default ProductCheckoutList;
