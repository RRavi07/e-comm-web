import React, { useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '../context/ProductState'; // Correct import
import styles from './Css/Productcard.module.css'; // Ensure this path is correct
import { CartContext } from '../context/CartState';


const ProductCard = () => {
    const context = useContext(ProductContext);
    const cartcontext = useContext(CartContext);
    const { addToCart } = cartcontext;
    const { products, getProducts } = context;

    const handleCart = async (event, id) => {
        event.stopPropagation(); // Prevent the click event from bubbling up to the container div
        await addToCart(id, 1);
        alert("add-to-cart-successfully")
    }

    useEffect(() => {
        getProducts();
    }, []); // Include getProducts in the dependency array

    const location = useLocation();
    const productId = location.state?.id;

    // Memoize the product variable
    const product = useMemo(() => {
        return products.length > 0 ? products.find(product => product._id === productId) : null;
    }, [products, productId]);

    // console.log(product);

    return (
        <>
            <div className={styles.main}  style={{position:"relative",top:"55px"}}>
                <div className={styles.productContainer}>
                    <div className={styles.productImage}>
                        {/* <img src={require(`../../backend/images/${product.image}`)} alt={product.title} /> */}
                        <img src={product?.image} alt={product?.title} />
                    </div>
                    <div className={styles.productInfo}>
                        <h1>{product?.name}</h1>
                        <p>Special price: <span className={styles.price}>{product?.price}</span> <span className={styles.originalPrice}>1000</span> 20% off</p>
                        <p>Hurry, Only 1 left!</p>
                        <div className={styles.ratings}>
                            <span className={styles.rating}>{product?.ratings}</span>
                            <span className={styles.reviews}>(13,286 ratings and 1,236 reviews)</span>
                        </div>
                        <p>Assured TITAN 25</p>
                        <p>Strap Color: WASOM</p>
                        <p>Dial Color: [Insert dial color]</p>
                        <div className={styles.buttons}>
                            {/* <button className={styles.addToCart}>ADD TO CART</button>
                            <button className={styles.buyNow}>BUY NOW</button> */}
                        </div>
                        <div className={styles.offers}>
                            <h2>Available offers</h2>
                            <ul>
                                <li>Bank Offer: Get 10% off up to 50 on first Flipkart UPI Transactions on order of 200 and above T&C</li>
                                <li>Bank Offer: Additional 15 off on first Flipkart UPI Transaction, on orders of 600 and above T&C</li>
                                <li>Bank Offer: 5% Cashback on Flipkart Axis Bank Card T&C</li>
                            </ul>
                        </div>
                    </div>
                </div>


                <div className={styles.orderCard}>
                    <div className={styles.orderPrice}>$ {product?.price} /-</div>
                    <div className={styles.orderDetails}>
                        <div className={styles.orderTitle}>FREE delivery Sunday, 9 June</div>
                        <p>on your first order in this category. Order within 21 hrs 15 mins. Details</p>
                        <p className={styles.location}><i className="fa-solid fa-location-dot"></i>Deliver to RAVI - Gondal 360311</p>
                        <p className={styles.stock}> Stock:{product?.stock}</p>
                        <p>Ships from Amazon</p>
                        <p>Sold by Louis Devin</p>
                        <p>Upto ₹30 cashback ₹10 per unit on buying 2+</p>
                    </div>
                    <div className={styles.orderQuantity}>
                        <label htmlFor="quantity">Quantity:</label>
                        <select id="quantity">
                            {Array.from({ length: product?.stock || 0 }, (_, index) => (
                                <option key={index + 1} value={index + 1}>{index + 1}</option>
                            ))}
                        </select>
                    </div>
                    <button className={styles.orderButtonYellow} onClick={(event) => handleCart(event, product._id)}>Add to Cart</button>
                    <button className={styles.orderButtonOrange}>Buy Now</button>
                    <div className={styles.orderSecure}>
                        <i className="fa fa-lock"></i> Secure transaction
                    </div>
                    <div className={styles.orderGift}>
                        <input type="checkbox" id="gift" />
                        <label htmlFor="gift">Add gift options</label>
                    </div>
                    <div className={styles.orderWishlist}>
                        <select>
                            <option value="add">Add to Wish List</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;

