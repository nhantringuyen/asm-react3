import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import PageHeader from "../../components/PageHeader";
import { CLEAR_CART } from "../../services/cartSlice";
import {useNavigate} from "react-router-dom";
import classes from "./Checkout.module.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // State lưu thông tin form
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Giỏ hàng lấy từ state (Giả định có sẵn)
  const cart = useSelector((state) => state.cart.listCart);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Xử lý thay đổi form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý submit đơn hàng
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, phone, address } = formData;

    // Kiểm tra nhập đầy đủ
    if (!fullName || !email || !phone || !address) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    // Kiểm tra email hợp lệ
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ.");
      return;
    }

    // Kiểm tra số điện thoại Việt Nam
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ.");
      return;
    }

    // Lưu đơn hàng vào Local Storage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = { fullName, email, phone, address, cart };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    dispatch(CLEAR_CART());

    // Reset form và hiển thị thông báo thành công
    setFormData({ fullName: "", email: "", phone: "", address: "" });
    setSuccess("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
    setError("");
    setTimeout(() => {
      navigate("/shop");
    }, 2000);
  };

  // Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
      <Container className={classes.checkoutContainer}>
      <PageHeader title="CHECKOUT" breadcrumb={["HOME", "CART", "CHECKOUT"]} />
        <section className={`mt-5 pb-5 ${classes["checkout-section"]}`}>
          <Row>
            <Col md={8} className={classes.formSection}>
              <h2 className={classes.title}>Billing Details</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form className={classes["checkout-form"]} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className={classes["form-label"]}>Full Name:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Your Full Name Here!"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={classes.inputField}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={classes["form-label"]}>Email:</Form.Label>
                  <Form.Control
                      type="email"
                      placeholder="Enter Your Email Here!"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={classes.inputField}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={classes["form-label"]}>Phone Number:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Your Phone Number Here!"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={classes.inputField}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className={classes["form-label"]}>Address:</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Enter Your Address Here!"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={classes.inputField}
                  />
                </Form.Group>

                <Button className={classes.placeOrderButton} type="submit">
                  Place order
                </Button>
              </Form>
            </Col>

            <Col md={4}>
              <Card className={classes.orderSummary}>
                <Card.Body>
                  <h4 className={classes.orderTitle}>YOUR ORDER</h4>
                  {cart.length === 0 ? (
                      <p className={classes.emptyCart}>Your cart is empty.</p>
                  ) : (
                      <ul className={`list-unstyled`}>
                        {cart.map((item) => (
                            <li key={item.id} className={classes.orderItem}>
                              <div className={classes.itemInfo}>
                                <span className={classes.itemName}>{item.name}</span>
                                <span className={classes.itemPrice}>
                    {(parseFloat(item.price) || 0).toLocaleString()} VND x {item.quantity}
                  </span>
                              </div>
                              <hr className={classes.itemDivider} />
                            </li>
                        ))}
                      </ul>
                  )}
                  <div className={classes.totalSection}>
                    <span className={classes.totalLabel}>TOTAL</span>
                    <span className={classes.totalAmount}>
                      {total.toLocaleString()} VND
                    </span>
                  </div>
                </Card.Body>
              </Card>

            </Col>
          </Row>
        </section>
  </Container>
  );
};

export default Checkout;
