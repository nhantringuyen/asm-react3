import React from "react";
import { Row, Col } from "react-bootstrap";
import ProductItem from "./ProductItem";
import classes from "./ProductList.module.css";

const ProductList = ({ products, isTopProduct, columns }) => {
  return (
    <Row className={classes["product-list"]}>
      {products.map((product) => (
        <Col key={product._id.$oid} xs={12} sm={6} md={columns === 4 ? 3 : 4}>
          <ProductItem product={product} isTopProduct={isTopProduct} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
