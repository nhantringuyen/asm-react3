import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Container , Row, Col} from "react-bootstrap"; // Import Bootstrap Modal
import {hidePopup} from "../../services/actions";
import classes from "./Popup.module.css";
import {useNavigate} from "react-router-dom"; // Import module CSS


const Popup = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { isPopupVisible, product } = useSelector((state) => state.popup);

  if (!isPopupVisible) return null;
    const handleClick = () => {
        navigate(`/product/${product._id.$oid}`);
    };
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
                    <Button type="button" className="btn-black" onClick={handleClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-cart" viewBox="0 0 16 16">
                            <path
                                d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                        </svg> View Detail</Button>
                  </Col>
              </Row>
          </Container>
      </Modal.Body>
    </Modal>
  );
};

export default Popup;
