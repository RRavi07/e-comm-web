import React, { useEffect, useState, useContext } from 'react';
import styles from './Css/ProductFilter.module.css';
import { CategoryContext } from '../context/CategoryState';

const ProductFilter = ({ setName, setBrand, setLowerPrice, setHigherPrice, setCategory }) => {
    const { categories } = useContext(CategoryContext);

    const [filterValue, setFilterValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [lowerPriceValue, setLowerPriceValue] = useState('');
    const [higherPriceValue, setHigherPriceValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    useEffect(() => {
        setName(filterValue)
        setBrand(brandValue)
        setLowerPrice(lowerPriceValue)
        setHigherPrice(higherPriceValue)
        setCategory(categoryValue)
    }, [filterValue, brandValue, lowerPriceValue, higherPriceValue, categoryValue])


    const handleBrandChange = (brand) => {
        setBrandValue((prev) => {
            if (prev.includes(brand)) {
                return prev.filter((b) => b !== brand);
            } else {
                return [...prev, brand];
            }
        });
    };
    const handleCategoryChange = (category) => {
        setCategoryValue((prev) => {
            if (prev.includes(category)) {
                return prev.filter((cat) => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.filterGroup}>
                <label htmlFor="name" className={styles.label}>Name:</label>
                <input
                    id='name'
                    type="text"
                    placeholder="Search by name"
                    value={filterValue}
                    onChange={(e) => { setFilterValue(e.target.value); }}
                    className={styles.input}
                />
            </div>
            <div className={styles.filterGroup}>
                <label className={styles.label}>Brands:</label>
                {["branda", "brandb", "brandc", "brandd", "brande", "brandf", "brandg", "brandh"].map(brand => (
                    <div key={brand} className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            id={brand}
                            value={brand}
                            checked={brandValue.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                        />
                        <label htmlFor={brand}>{brand}</label>
                    </div>
                ))}
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="lowerPrice" className={styles.label}>Lower Price:</label>
                <input
                    type="number"
                    id="lowerPrice"
                    value={lowerPriceValue}
                    onChange={(e) => { setLowerPriceValue(e.target.value); }}
                    className={styles.input}
                />
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="higherPrice" className={styles.label}>Higher Price:</label>
                <input
                    type="number"
                    id="higherPrice"
                    value={higherPriceValue}
                    onChange={(e) => { setHigherPriceValue(e.target.value); }}
                    className={styles.input}
                />
            </div>
            <div className={styles.filterGroup}>
                <label className={styles.label}>Categories:</label>
                <div className={styles.categoriesBox}>
                    {Array.isArray(categories) && categories.map(category => (
                        <div key={category._id} className={styles.checkboxGroup}>
                            <input
                                type="checkbox"
                                id={category._id}
                                value={category._id}
                                checked={categoryValue.includes(category._id)}
                                onChange={() => handleCategoryChange(category._id)}
                            />
                            <label htmlFor={category._id}>{category.name}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
