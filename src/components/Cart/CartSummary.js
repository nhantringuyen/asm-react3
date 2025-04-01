import React from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./CartSummary.module.css";

const CartSummary = ({ totalPrice }) => {
    console.log(totalPrice);
    return (
        <div className={classes["cartSummary-inner"]}>
            <h3 className={classes["summary-title"]}>CART TOTAL</h3>
            <p className={classes.price}>
                <strong>SUBTOTAL:</strong> <span>{totalPrice.toLocaleString()} VND</span>
            </p>
            <p className={`${classes.price} ${classes["total-price"]}`}>
                <strong>TOTAL:</strong> <span>{totalPrice.toLocaleString()} VND</span>
            </p>
            <Form.Control type="text" placeholder="Enter your coupon" className={classes.couponInput} />
            <Button variant="dark" className={classes.applyCoupon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-gift-fill" viewBox="0 0 16 16">
                    <path
                        d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
                </svg>
                Apply coupon
            </Button>
        </div>
    );
};

export default React.memo(CartSummary);
