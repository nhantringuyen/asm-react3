import React from "react";
import {Button, Table} from "react-bootstrap";
import CartItem from "./CartItem";
import classes from "./CartTable.module.css";
import { useNavigate } from "react-router-dom";

const CartTable = ({ cart, onUpdateQuantity, onDelete }) => {
    const navigate = useNavigate();
    const handleNavigation = (path) => () => navigate(path);

    return (
        <Table className={classes.table} hover>
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
                <CartItem key={item._id.$oid} item={item} onUpdateQuantity={onUpdateQuantity} onDelete={onDelete} />
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={6}>
                    <div className="d-flex justify-content-between">
                        <Button variant="link" onClick={handleNavigation("/shop")} className={classes.continueShopping}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/></svg> Continue shopping
                        </Button>
                        <Button variant="primary" className={classes.checkoutButton} onClick={handleNavigation("/checkout")}>
                            Proceed to checkout <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/></svg>
                        </Button>
                    </div>
                </td>
            </tr>
            </tfoot>
        </Table>
    );
};
export default React.memo(CartTable);
