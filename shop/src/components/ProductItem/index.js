import React from "react";
import { Button, Col } from "antd";
import StarRatingComponent from "react-star-rating-component";
import "./productItem.style.less";

import { display } from "./../../utils";

const ProductItem = ({ product, grid }) => {
  const { image, name, sale_price, original_price, rating, overview } = product;
  const offer = Math.floor(
    ((original_price - sale_price) / original_price) * 100
  );
  const thumb = image.length
    ? image[0].url
    : "https://www.lamonde.com/pub/media/catalog/product/placeholder/default/Lamonde_-_Image_-_No_Product_Image.png";
  return (
    <Col md={6} xs={24}>
      <div
        className={`gx-product-item mr-5 ${
          grid ? "gx-product-vertical" : "gx-product-horizontal"
        }`}
      >
        <div className="gx-product-image">
          <div className="gx-grid-thumb-equal">
            <span className="gx-link gx-grid-thumb-cover">
              <img alt="Remy Sharp" src={thumb} />
            </span>
          </div>
        </div>

        <div className="gx-product-body">
          <h3 className="gx-product-title">
            {name}
            {/* <small className="gx-text-grey">{", " + variant}</small> */}
          </h3>
          <div className="ant-row-flex">
            <h4>{display.priceVND(sale_price)}</h4>
            <h5 className="gx-text-muted gx-px-2">
              <del>{display.priceVND(original_price)}</del>
            </h5>
            <h5 className="gx-text-success">Tiết kiệm {offer}%</h5>
          </div>
          <div className="ant-row-flex gx-mb-1">
            <StarRatingComponent
              name=""
              value={rating}
              starCount={5}
              editing={false}
            />
          </div>
          <p>{overview}</p>
        </div>

        <div className="gx-product-footer">
          <Button variant="raised">Thêm vào giỏ</Button>

          <Button type="primary">Xem thêm</Button>
        </div>
      </div>
    </Col>
  );
};

export default ProductItem;
