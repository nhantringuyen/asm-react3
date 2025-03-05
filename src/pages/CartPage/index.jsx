import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_CART, DELETE_CART } from "../../services/cartSlice";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Button, Form } from "react-bootstrap";
import classes from "./CartPage.module.css"; // Import CSS Module

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.listCart);

  // Tính tổng giá trị đơn hàng
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(UPDATE_CART({ id, quantity }));
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleDelete = (id) => {
    dispatch(DELETE_CART(id));
  };

  return (
      <Container className={classes.cartContainer}>
        <h2 className={classes.cartTitle}>CART</h2>

        <Row className={classes.cartContent}>
          {/* Danh sách sản phẩm */}
          <Col md={8} className={classes.cartItems}>
            <h3 className={classes.sectionTitle}>SHOPPING CART</h3>
            {cart.length === 0 ? (
                <p className="text-center">Giỏ hàng của bạn đang trống.</p>
            ) : (
                <Table bordered hover>
                  <thead className={classes.tableHeader}>
                  <tr>
                    <th>IMAGE</th>
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>TOTAL</th>
                    <th>REMOVE</th>
                  </tr>
                  </thead>
                  <tbody>
                  {cart.map((item) => (
                      <tr key={item._id.$oid}>
                        <td className="text-center">
                          <img src={item.img1} alt={item.name} className={classes.cartItemImage} />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price.toLocaleString()} VND</td>
                        <td>
                          <div className={classes.quantityControl}>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item._id.$oid, item.quantity - 1)}
                            >
                              −
                            </Button>
                            <span className={classes.quantityText}>{item.quantity}</span>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => handleUpdateQuantity(item._id.$oid, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>{(item.price * item.quantity).toLocaleString()} VND</td>
                        <td className="text-center">
                          <Button variant="danger" size="sm" onClick={() => handleDelete(item._id.$oid)}>
                            🗑
                          </Button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={6}>
                        <div className="d-flex justify-content-between">
                        <Button variant="link" onClick={() => navigate("/shop")} className={classes.continueShopping}>
                        ← Continue shopping
                      </Button>
                        <Button variant="primary" className={classes.checkoutButton} onClick={() => navigate("/checkout")}>
                          Proceed to checkout →
                        </Button>
                        </div>
                        </td>
                    </tr>
                  </tfoot>
                </Table>
            )}
          </Col>

          {/* Tổng tiền giỏ hàng */}
          <Col md={4} className={classes.cartSummary}>
            <h3 className={classes.sectionTitle}>CART TOTAL</h3>
            <p>
              <strong>SUBTOTAL:</strong> {totalPrice.toLocaleString()} VND
            </p>
            <p>
              <strong>TOTAL:</strong> {totalPrice.toLocaleString()} VND
            </p>
            <Form.Group>
              <Form.Control type="text" placeholder="Enter your coupon" className={classes.couponInput} />
            </Form.Group>
            <Button variant="dark" className={classes.applyCoupon}>
              🎁 Apply coupon
            </Button>
          </Col>
        </Row>
      </Container>
  );
};
export default CartPage;
