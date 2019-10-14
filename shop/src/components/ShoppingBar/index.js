import React from 'react';
import { Input, Badge, Icon, Row, Col } from 'antd';

const { Search } = Input;

const ShoppingBar = ({ quantity, searchValue }) => {
  return (
    <nav style={{ padding: '20px 0' }}>
      <Row type="flex" justify="space-around" align="middle">
        <Col span={4} className="txtalgn-center">
          Logo
        </Col>
        <Col span={16} className="searchBar-container txtalgn-center">
          <Search
            placeholder="input search text"
            onSearch={value => searchValue(value)}
            enterButton
          />
        </Col>
        <Col span={4} className="shopCart txtalgn-center">
          <Badge count={quantity}>
            <Icon type="shopping-cart" style={{ fontSize: '3em' }} />
          </Badge>
        </Col>
      </Row>
    </nav>
  );
};
export default ShoppingBar;
