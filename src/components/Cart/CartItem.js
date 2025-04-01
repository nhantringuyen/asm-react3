import React from "react";
import { Button } from "react-bootstrap";
import classes from "./CartItem.module.css";

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
    return (
        <tr key={item._id.$oid}>
            <td className="text-center">
                <img src={item.img1} alt={item.name} className={classes.cartItemImage} />
            </td>
            <td className={classes["product-title"]}>{item.name}</td>
            <td className={classes.price}>{(parseFloat(item.price) || 0).toLocaleString()} VND</td>
            <td>
                <div className={classes.quantityControl}>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                            if (item.quantity > 1) onUpdateQuantity(item._id.$oid, item.quantity - 1);
                            else onDelete(item._id.$oid);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path
                                d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </Button>
                    <span className={classes.quantityText}>{item.quantity}</span>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onUpdateQuantity(item._id.$oid, item.quantity + 1)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                            <path
                                d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </Button>
                </div>
            </td>
            <td className={classes.price}>{(item.price * item.quantity).toLocaleString()} VND</td>
            <td className="text-center">
                <Button className={classes.removeButton} size="sm" onClick={() => onDelete(item._id.$oid)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-trash3" viewBox="0 0 16 16">
                        <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </Button>
            </td>
        </tr>
    );
};

export default React.memo(CartItem);
