import React, { useContext, useEffect } from 'react';
import { CategoryContext } from '../context/CategoryState';
import { ProductContext } from '../context/ProductState';
import Box from './Box';
import './Css/product.css'

const CategoryList = () => {
    const { categories, getCategories } = useContext(CategoryContext);
    const { products, getProducts } = useContext(ProductContext);

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    if (!categories.length || !products.length) {
        return <div>Loading...</div>; // Show a loading indicator or message
    }

    return (
        <div className="category-list" style={{marginTop:"-400"}}>
            {Array.isArray(categories) && categories.map(category => (
                <Box key={category._id} category={category} products={products} />
            ))}
        </div>
    );
};

export default CategoryList;
