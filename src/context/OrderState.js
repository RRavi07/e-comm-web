import React, { useState, createContext, useEffect } from 'react';

export const OrderContext = createContext();

const OrderState = (props) => {
    const host = "http://localhost:5000";
    const [orders, setOrders] = useState([]);

    // Fetch all orders
    const fetchOrders = async () => {
        try {
            const response = await fetch(`${host}/api/order/all`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setOrders(json);
        } catch (error) {
            console.error(error);
        }
    };

    // Add a new order
    const addOrder = async (orderData) => {
        try {
            const response = await fetch(`${host}/api/order/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify(orderData)
            });
            const json = await response.json();
            setOrders([...orders, json]);
        } catch (error) {
            console.error(error);
        }
    };

    // Update an order
    const updateOrder = async (orderId, updateData) => {
        try {
            const response = await fetch(`${host}/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify(updateData)
            });
            const json = await response.json();
            setOrders(orders.map(order => order._id === orderId ? json : order));
        } catch (error) {
            console.error(error);
        }
    };

    // Delete an order
    const deleteOrder = async (orderId) => {
        try {
            const response = await fetch(`${host}/api/order/${orderId}`, {
                method: "DELETE",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            const json = await response.json();
            setOrders(orders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <OrderContext.Provider value={{ orders, fetchOrders, addOrder, updateOrder, deleteOrder }}>
            {props.children}
        </OrderContext.Provider>
    );
};

export default OrderState;
