
import React, { useContext, useEffect, useState } from 'react';
import styles from './Css/CheckOut.module.css';
import { CartContext } from '../context/CartState';
import { AddressContext } from '../context/AddressState';
import { OrderContext } from '../context/OrderState';
import Cartitem from './Cartitem';
import Login from './login';

const CheckOut = () => {
  const { cart, getCart, updateCartItem, removeFromCart } = useContext(CartContext);
  const { addresses, fetchAddresses } = useContext(AddressContext);
  const { addOrder } = useContext(OrderContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('token')) {
        setIsModalOpen(true);
      } else {
        await getCart();
        await fetchAddresses();
      }
      setLoading(false);
    };
    fetchData();
  }, [getCart, fetchAddresses]);

  const primaryAddress = Array.isArray(addresses) ? addresses.find(address => address.primary) : null;

  const handleOrder = async () => {
    if (cart && primaryAddress) {
      const orderData = {
        orderItems: cart.cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
        shippingAddress: primaryAddress._id,
      };
      try {
        await addOrder(orderData);
      } catch (error) {
        console.error("Error placing order:", error);
      }
    }
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!localStorage.getItem('token') ? (
        <div className={styles.login}>
          <Login isOpen={isModalOpen} onClose={() => { (localStorage.getItem('token')) ? setIsModalOpen(false) : setIsModalOpen(true) }} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.item}>
            <div className={styles.number}>1</div>
            <div className={styles.text}>LOGIN</div>
          </div>
          <div className={styles.item}>
            <div className={styles.number}>2</div>
            <div className={styles.text}>ADDRESS -</div>
            {primaryAddress ? (
              <div className={styles.addressDetails}>
                <p>{primaryAddress.address}, {primaryAddress.city}, {primaryAddress.postalCode}, {primaryAddress.country}</p>
              </div>
            ) : (
              <p className={styles.noAddress}>No primary address selected</p>
            )}
          </div>
          <div className={styles.item}>
            <div className={styles.number}>3</div>
            <div className={styles.text}>ORDER SUMMARY</div>
            <div>
              {cart && cart.cartItems && cart.cartItems.length > 0 ? (
                <div className={styles.cartItems}>
                  {cart.cartItems.map((item) => (
                    <Cartitem key={item._id} item={item} handleQuantityChange={handleQuantityChange} handleDelete={handleDelete} />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyCart}>Your cart is empty</p>
              )}
            </div>
          </div>
          <div className={styles.item}>
            {cart && cart.user ? (
              <div>
                Order Confirmation email will be sent to <b>{cart.user.email}</b>
                <button className={styles.Cbutton} onClick={handleOrder}>Continue</button>
              </div>
            ) : (
              <div>Order Confirmation email will be sent to</div>
            )}
          </div>
          <div className={styles.item}>
            <div className={styles.number}>4</div>
            <div className={styles.text}>PAYMENT OPTIONS</div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckOut;

