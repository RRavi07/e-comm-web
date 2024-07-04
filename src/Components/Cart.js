import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartState';
import Cartitem from './Cartitem';
import styles from './Css/Cart.module.css';
import Login from './login';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, getCart, updateCartItem, removeFromCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        if (!localStorage.getItem('token')) {
            setIsModalOpen(true)
        } else {
            getCart();
        }
    }, [])

    useEffect(() => {
        if (cart && cart.cartItems) {
            const total = cart.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
            setTotalPrice(total);
        }
    }, [cart]);

    const handleQuantityChange = async (product, quantity) => {
        try {
            await updateCartItem(product, quantity);
            getCart();
        } catch (error) {
            console.error("Error updating cart item:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await removeFromCart(id);
            getCart();
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    const goToCheckout = () => {
        navigate('/CheckOut');
    };

    return (<> 
    {(!localStorage.getItem('token')) ? <div className={styles.login}>
        <Login isOpen={isModalOpen} onClose={() => { (localStorage.getItem('token')) ? setIsModalOpen(false) : setIsModalOpen(true) }} />
    </div> :
        <div className={styles.main}>
            <h1 className={styles.heading}>Shopping Cart</h1>

            <div className={styles.cartContainer}>
                {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                    <div className={styles.cartItems}>
                        {cart.cartItems.map((item) => (
                            <Cartitem key={item._id} item={item} handleQuantityChange={handleQuantityChange} handleDelete={handleDelete} />
                        ))}
                    </div>
                ) : (
                    <p className={styles.emptyCart}>Your cart is empty</p>
                )}
                {cart && cart.cartItems && cart.cartItems.length > 0 && (
                    <div className={styles.tableContainer}>
                        <table className={styles.styledTable}>
                            <thead>
                                <tr>
                                    <th colSpan={2}>PRICE DETAILS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Price({cart.cartItems.length} items)</td>
                                    <td><i className="fa fa-rupee"></i>{totalPrice}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td>
                                    <td className={styles.highlightedCell}>20%</td>
                                </tr>
                                <tr>
                                    <td>Delivery Charges</td>
                                    <td className={styles.highlightedCell}>Free</td>
                                </tr>
                                <tr>
                                    <td>Total Amount</td>
                                    <td><i className="fa fa-rupee"></i>{Math.trunc(totalPrice * 0.8)}</td>
                                </tr>
                                <tr>
                                    <td className={styles.highlightedCell}>You will save <i className="fa fa-rupee"></i>{Math.trunc(totalPrice * 0.2)} on this order</td>
                                    <td><button className={styles.orderButton} onClick={goToCheckout}>PLACE ORDER</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>}
    </>
    );
};

export default Cart;
