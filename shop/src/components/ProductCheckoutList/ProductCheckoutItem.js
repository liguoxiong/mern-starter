import React from 'react';
import { Button, Col, InputNumber } from 'antd';
import StarRatingComponent from 'react-star-rating-component';

import { display } from '../../utils';

const ProductCheckoutItem = ({ product, quantity }) => {
  const { image, name, sale_price, stock } = product;
  const thumb = image.length
    ? image[0].url
    : 'https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image.png';
  return (
    <Row>
      <Col span={8}>
        <div>
          <img src={thumb} alt={name} />
        </div>
      </Col>
      <Col span={16}>
        <div>
          <div>
            <h3>{name}</h3>
          </div>
          <div>
            <h4>{display.priceVND(sale_price)}</h4>
          </div>
          <div>
            <InputNumber min={1} max={stock} defaultValue={quantity} />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ProductCheckoutItem;
