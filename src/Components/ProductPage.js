import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductState';
// import { useLocation } from 'react-router-dom';
import ProductFilter from './ProductFilter';
import SmallProduct from './SmallProduct';
import styles from './Css/ProductPage.module.css';
import Login from './login';
const ProductPage = () => {
    const context = useContext(ProductContext);
    const { products, getProducts } = context;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [name, setName] = useState()
    const [brand, setBrand] = useState([])
    const [lowerPrice, setLowerPrice] = useState([])
    const [higherPrice, setHigherPrice] = useState([])
    const [category, setCategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const handleDataFromChild = (data) => {
        setIsModalOpen(data);
    };

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        filterProducts();
    }, [name, brand, lowerPrice, higherPrice, category]);


    const filterProducts = () => {
        let filtered = products;


        if (name) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (brand.length > 0) {
            filtered = filtered.filter(product =>
                brand.includes(product.brand.toLowerCase())
            );
        }

        if (category.length > 0) {
            filtered = filtered.filter(product =>
                category.includes(product.category.toLowerCase())
            );
        }
        console.log(category)
        if (lowerPrice) {
            filtered = filtered.filter(product =>
                product.price >= lowerPrice
            );
        }
        if (higherPrice) {
            filtered = filtered.filter(product =>
                product.price <= higherPrice
            );
        }
        setFilteredProducts(filtered);
    };

    return (
        <div className={styles.container}>
            <div>
                <Login isOpen={isModalOpen} onClose={() => { setIsModalOpen(false) }} />
            </div>
            <div className={styles.productFilter}>
                <ProductFilter setName={setName} setBrand={setBrand} setLowerPrice={setLowerPrice} setHigherPrice={setHigherPrice} setCategory={setCategory} />
            </div>
            <div className={styles.productContainer}>
                {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
                    <SmallProduct key={product._id} product={product} onData={handleDataFromChild} />
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
