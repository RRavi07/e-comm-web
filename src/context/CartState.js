import React, { useState, createContext, useEffect } from 'react';

export const CartContext = createContext();

const CartState = (props) => {
    const host = "http://localhost:5000";
    const [cart, setCart] = useState(null);

    // Fetch the user's cart
    const getCart = async () => {
        try {
            const response = await fetch(`${host}/api/cart`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setCart(json);
        } catch (error) {
            console.error(error);
        }
    };

    // Add an item to the cart
    const addToCart = async (product, quantity) => {
        try {
            const response = await fetch(`${host}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ product, quantity })
            });
            const json = await response.json();
            setCart(json);

        } catch (error) {
            console.error(error);
        }

    };

    // Update item quantity in the cart
    const updateCartItem = async (product, quantity) => {
        try {
            const response = await fetch(`${host}/api/cart/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ product, quantity })
            });
            const json = await response.json();
    
            // If the response indicates an error, handle it here
            if (!response.ok) {
                console.error('Failed to update cart item:', json);
                return;
            }
    
            // Update the cart state with the new data
            setCart(json);
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };
    

    // Remove an item from the cart
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`${host}/api/cart/remove/${productId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setCart(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, getCart, addToCart, updateCartItem, removeFromCart }}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartState;