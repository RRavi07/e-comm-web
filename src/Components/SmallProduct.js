import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Css/SmallProduct.module.css';
import { CartContext } from '../context/CartState';

const SmallProduct = ({ product, onData }) => {
    const context = useContext(CartContext);
    const { addToCart } = context;
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate('/productcard', { state: { id } });
    }

    const handleCart = async (event, id) => {
        if (!localStorage.getItem('token')) {
            onData(true)
        } else {
            event.stopPropagation(); // Prevent the click event from bubbling up to the container div
            await addToCart(id, 1);
            alert("add-to-cart-successfully")
        }
    }

    return (
        // <div className={styles.container} onClick={() => handleClick(product._id)}>
        <div className={styles.container} >
            <div className={styles.image}onClick={() => handleClick(product._id)}>
                <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.content}>
                <div className={styles.name}onClick={() => handleClick(product._id)}>
                    <p className={styles.nameN}>{product.name}</p>
                </div>

                <div className={styles.price}onClick={() => handleClick(product._id)}>
                    <p>{`$${product.price}`}</p>
                    <p>MRP<del>Delete Price</del></p>
                </div>
                <div className={styles.emi}onClick={() => handleClick(product._id)}>
                    <p>Save extra with No Cost EMI</p>
                </div>
                <div className={styles.delivery}onClick={() => handleClick(product._id)}>
                    <p>Get it by Monday 24 June</p>
                    <p>FREE Delivery</p>
                </div>
                <div className={styles.rating}onClick={() => handleClick(product._id)}>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                </div>
                <div className={styles.btn}>
                    <button type="button" onClick={(event) => handleCart(event, product._id)}  >Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default SmallProduct;