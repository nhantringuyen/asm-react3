import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const PromotionSection = () => {
  return (
    <Container fluid className="mt-5">
      {/* Phần thông tin khuyến mãi */}
      <Row className="bg-light py-4 text-center">
        <Col md={4}>
          <h5 className="fw-bold">FREE SHIPPING</h5>
          <p className="text-muted">Free shipping worldwide</p>
        </Col>
        <Col md={4}>
          <h5 className="fw-bold">24 X 7 SERVICE</h5>
          <p className="text-muted">Free shipping worldwide</p>
        </Col>
        <Col md={4}>
          <h5 className="fw-bold">FESTIVAL OFFER</h5>
          <p className="text-muted">Free shipping worldwide</p>
        </Col>
      </Row>

      {/* Phần nhập email */}
      <Row className="mt-4">
        <Col md={6}>
          <h5 className="fw-bold">LET'S BE FRIENDS!</h5>
          <p className="text-muted">Nisi nisi tempor consequat laboris nisi.</p>
        </Col>
        <Col md={6}>
          <Form className="d-flex">
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              className="border"
            />
            <Button variant="dark" className="px-4">
              Subscribe
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PromotionSection;
