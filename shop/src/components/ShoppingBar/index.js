import React from "react";
import { Input, Badge, Icon, Row, Col } from "antd";

const { Search } = Input;

const ShoppingBar = () => {
  return (
    <Row justify="center" align="middle">
      <Col span={4} className="logo-container">
        Logo
      </Col>
      <Col span={16} className="searchBar-container">
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          enterButton
        />
      </Col>
      <Col span={4} className="shopCart">
        <Badge count={5}>
          <Icon type="shopping-cart" className="head-example" />
        </Badge>
      </Col>
    </Row>
  );
};
export default ShoppingBar;
