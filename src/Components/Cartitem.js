import React, { useState } from 'react'
import styles from './Css/cartitem.module.css';
const Cartitem = ({ item, handleQuantityChange, handleDelete }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleChange = async (e) => {
        const newQuantity = e.target.value;
        await setQuantity(newQuantity);
        handleQuantityChange(item.product._id, newQuantity);
    };

    return (
        <div className={styles.cartCard}>
            <div className={styles.cartContainer}>
                <div className={styles.image}>
                    <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.name}>{item.product.name}</h1>
                    <p className={styles.description}>{item.product.description}</p>
                    <div className={styles.stock}>
                        Stock: {item.product.stock}
                    </div>
                    <div   div className={styles.buttons}>
                        <div className={styles.quantity}>
                            <select name="quantity" id="" value={quantity} onChange={handleChange}>
                                {[...Array(item.product.stock).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.delete}>
                            <button onClick={() => { handleDelete(item.product._id) }}>Delete</button>
                        </div>
                        
                        <div className={styles.seeMore}>
                            <button>Order Now!</button>
                        </div>
                        
                    </div>
                </div>
                <div className={styles.price}>
                    <div className={styles.SPrice}>
                    ${item.product.price}
                    </div>
                    <div className={styles.subtotal}>
                           <span>Subtotal: </span> ${item.product.price * quantity}
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Cartitem