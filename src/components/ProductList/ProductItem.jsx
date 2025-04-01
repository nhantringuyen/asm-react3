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
    <div className={classes["product-card"]} onClick={handleClick}>
      <Card.Img variant="top" src={product.img1} alt={product.name} />
      <Card.Body className="text-center">
        <h4 className={classes["product-title"]}>{product.name}</h4>
        <Card.Text className={classes.price}>
            {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default ProductItem;
