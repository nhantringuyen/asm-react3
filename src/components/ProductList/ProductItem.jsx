import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showPopup } from "../../services/actions";
import classes from "./ProductItem.module.css";

const ProductItem = ({ product, isTopProduct }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Hàm xử lý khi click vào sản phẩm
  const handleClick = () => {
    isTopProduct
      ? dispatch(showPopup(product))
      : navigate(`/product/${product._id.$oid}`);
  };

  return (
    <Card className={classes["product-card"]} onClick={handleClick}>
      <Card.Img variant="top" src={product.img1} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className={classes.price}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
