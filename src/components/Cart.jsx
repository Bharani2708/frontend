import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import {
    removeFromCart,
    updateQuantity,
    calculateTotalAmount
} from "../redux/cartSlice";

const Cart = () => {

    const dispatch = useDispatch();

    const {
        cartItems,
        totalAmount
    } = useSelector((state) => state.counter);


    useEffect(() => {
        dispatch(calculateTotalAmount());
    }, [cartItems, dispatch]);


    return (
        <div className="cart-container">

            <h1>Shopping Cart</h1>

            {cartItems.length === 0 ? (

                <p>Your cart is empty.</p>

            ) : (

                <div>

                    <ul>

                        {cartItems.map((item) => (

                            <li key={item.id}>

                                <h3>{item.name}</h3>

                                <p>
                                    Price: ₹{item.price}
                                </p>

                                {/* Quantity controls */}
                                <div>

                                    <button
                                        onClick={() =>
                                            dispatch(
                                                updateQuantity({
                                                    itemId: item.id,
                                                    quantity: -1
                                                })
                                            )
                                        }
                                    >
                                        -
                                    </button>


                                    <span style={{ margin: "0 15px" }}>
                                        {item.quantity}
                                    </span>


                                    <button
                                        onClick={() =>
                                            dispatch(
                                                updateQuantity({
                                                    itemId: item.id,
                                                    quantity: 1
                                                })
                                            )
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <p>
                                    Product Total: ₹
                                    {item.price * item.quantity}
                                </p>


                                <button
                                    onClick={() =>
                                        dispatch(removeFromCart(item.id))
                                    }
                                >
                                    Remove
                                </button>

                            </li>

                        ))}

                    </ul>


                    <h2>
                        Total Amount: ₹{totalAmount.toFixed(2)}
                    </h2>

                </div>

            )}

        </div>
    );
};

export default Cart;