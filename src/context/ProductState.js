import React, { useState, createContext } from 'react';
export const ProductContext = createContext();

const ProductState = (props) => {
    const host = "http://localhost:5000";
    const [products, setProducts] = useState([]);

    // Function to fetch all products from the server
    const getProducts = async () => {
        try {
            const response = await fetch(`${host}/api/product/fetchAllProducts`);
            const json = await response.json();
            setProducts(json);
            // console.log(products);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to add a new product
    const addProduct = async (formData) => {
        try {

            const response = await fetch(`${host}/api/product/addProduct`, {
                method: "POST",
                headers: {
                    // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1OWFmYmZjNmU0ZTBkNmU0MjdkM2RjIn0sImlhdCI6MTcxNzIxODA2N30.GqSc7nV6H_33Tb5HkZANlkPwbBnLAwuBpCxwBPaLHng" // Add your auth token
                    "auth-token": localStorage.getItem('token')
                },
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            getProducts(); // Refresh products after adding
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <ProductContext.Provider value={{ getProducts, products, addProduct ,}}>
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;
