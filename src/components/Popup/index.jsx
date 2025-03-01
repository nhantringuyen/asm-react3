import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Container , Row, Col} from "react-bootstrap"; // Import Bootstrap Modal
import { hidePopup } from "../../services/actions";
import classes from "./Popup.module.css"; // Import module CSS

const Popup = () => {
  const dispatch = useDispatch();
  const { isPopupVisible, product } = useSelector((state) => state.popup);

  if (!isPopupVisible) return null;

  return (
    <Modal show={isPopupVisible} onHide={() => dispatch(hidePopup())} size="xl">
      <Modal.Header closeButton className={classes["modal-header"]}>
      </Modal.Header>
      <Modal.Body className={classes["modal-body"]}>
          <Container>
              <Row>
                  <Col lg={6}>
                        <img
                          src={product?.img1}
                          alt={product?.name}
                          className="img-fluid mb-3"
                        />
                  </Col>
                  <Col lg={6}>
                        <h4>{product?.name}</h4>
                      <p>
                          <strong>Giá:</strong> {product?.price?.toLocaleString()} VND
                      </p>
                    <p>{product?.short_desc}</p>
                    <p>{product.long_desc}</p>
                  </Col>
              </Row>
          </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
