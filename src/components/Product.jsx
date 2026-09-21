import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    addToCart,
    removeFromCart
} from "../redux/cartSlice";


const Products = [
    {
        id: 1,
        name: "Product 1",
        price: 10,
    },
    {
        id: 2,
        name: "Product 2",
        price: 20,
    },
    {
        id: 3,
        name: "Product 3",
        price: 30,
    },
    {
        id: 4,
        name: "Product 4",
        price: 40,
    }
];


const Product = () => {

    const dispatch = useDispatch();


    // Get cart items from Redux
    const cartProducts = useSelector(
        (state) => state.counter.cartItems
    );


    // ==============================
    // ADD TO CART
    // ==============================

    const addCart = async (item) => {

        // Add product to Redux
        dispatch(addToCart(item));


        try {

            // Send product to backend
            const response = await fetch(
                "http://localhost:7654/cart",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: 1
                    })
                }
            );


            // Convert response to JSON
            const data = await response.json();


            console.log(
                "Backend response:",
                data
            );


        } catch (error) {

            console.log(
                "Backend error:",
                error
            );

        }
    };


    // ==============================
    // REMOVE FROM CART
    // ==============================

    const deleteCart = async (itemId) => {

        // Remove product from Redux
        dispatch(removeFromCart(itemId));


        try {

            // Send delete request to backend
            const response = await fetch(
                `http://localhost:7654/cart/${itemId}`,
                {
                    method: "DELETE"
                }
            );


            // Convert response to JSON
            const data = await response.json();


            console.log(
                "Delete response:",
                data
            );


        } catch (error) {

            console.log(
                "Delete error:",
                error
            );

        }
    };


    return (

        <div className="product-container">

            <h1>Products</h1>


            <div className="product-list">

                {Products.map((item) => (

                    <div
                        className="product-item"
                        key={item.id}
                    >

                        <h3>
                            {item.name}
                        </h3>


                        <p>
                            Price: ₹{item.price}
                        </p>


                        {/* Add to Cart */}

                        <button
                            onClick={() => addCart(item)}
                        >
                            Add to Cart
                        </button>


                        {/* Remove from Cart */}

                        <button
                            onClick={() =>
                                deleteCart(item.id)
                            }
                        >
                            Remove from Cart
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );
};


export default Product;