import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CART, DELETE_CART } from "../../services/cartSlice";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import classes from "./CartPage.module.css"; // Import CSS Module
import PageHeader from "../../components/PageHeader";
import { shallowEqual } from "react-redux";
import CartSummary from "../../components/Cart/CartSummary";
import CartTable  from "../../components/Cart/CartTable";


const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.listCart, shallowEqual);

  // Tính tổng giá trị đơn hàng
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Cập nhật số lượng sản phẩm
  const handleUpdateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) return;
    dispatch(UPDATE_CART({ id, quantity }));
  }, [dispatch]);

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = useCallback((id) => {
    dispatch(DELETE_CART(id));
  }, [dispatch]);

  return (
      <Container className={classes.cartContainer}>
        <PageHeader title="CART" />
        <section className={classes.cartContent}>
          <Row className={classes['cart-row']}>
          {/* Danh sách sản phẩm */}
          <Col md={8} className={classes.cartItems}>
            <h3 className={classes.sectionTitle}>SHOPPING CART</h3>
            {cart.length === 0 ? (
                <p className="text-center">Giỏ hàng của bạn đang trống.</p>
            ) : (
               <CartTable cart={cart} onUpdateQuantity={handleUpdateQuantity} onDelete={handleDelete} />
            )}
          </Col>
          {/* Tổng tiền giỏ hàng */}
          <Col md={4} className={classes.cartSummary}>
            <CartSummary totalPrice={totalPrice} />
          </Col>
        </Row>
        </section>
      </Container>
  );
};
export default CartPage;
