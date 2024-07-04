import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderState';
import styles from './Css/Order.module.css';
import Login from './login';

const Order = () => {
    const { orders, fetchOrders } = useContext(OrderContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsModalOpen(true);
        } else {
            fetchOrders();
        }
    }, [fetchOrders]);

    return (
        <>
            {!localStorage.getItem('token') ? (
                <div className={styles.login}>
                    <Login isOpen={isModalOpen}onClose={() => { (localStorage.getItem('token')) ? setIsModalOpen(false) : setIsModalOpen(true) }} />
                </div>
            ) : (
                <div className={styles.orderContainer}>
                    {orders && orders.length > 0 ? (
                        orders.map(order => {
                            const calculatedTotalPrice = order.orderItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

                            return (
                                <div key={order._id} className={styles.orderCard}>
                                    <div className={styles.orderHeader}>
                                        <h6>Order Summary</h6>
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <div>
                                            <p><strong>User:</strong> {order.user.name}</p>
                                            <p><strong>Shipping Address:</strong> {order.shippingAddress.address}</p>
                                        </div>
                                        <div>
                                            <p><strong>Total Price:</strong> ${calculatedTotalPrice.toFixed(2)}</p>
                                            <p><strong>Delivered:</strong> {order.delivered ? 'Yes' : 'No'}</p>
                                        </div>
                                    </div>
                                    <ul className={styles.orderItems}>
                                        {order.orderItems.map(item => (
                                            <div key={item.product._id} className={styles.card}>
                                                <img src={item.product.image} alt={item.product.name} className={styles.cardimg} />
                                                <h1 className={styles.name}>{item.product.name}</h1>
                                                <p className={styles.description}>{item.product.description}</p>
                                                <p className={styles.price}>Price: ${item.product.price} x {item.quantity}</p>
                                            </div>
                                        ))}
                                    </ul>
                                    <hr className={styles.hr} />
                                </div>
                            );
                        })
                    ) : (
                        <p>No orders found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default Order;
