import React, { useState, createContext, useEffect } from 'react';

export const CategoryContext = createContext();

const CategoryState = (props) => {
    const host = "http://localhost:5000";
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const response = await fetch(`${host}/api/category/fetchAllCategories`, {
                method: "GET"
                // headers: {
                //     "auth-token": localStorage.getItem('token')
                // }
            });
            const json = await response.json();
            setCategories(json);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ getCategories, categories }}>
            {props.children}
        </CategoryContext.Provider>
    );
};

export default CategoryState;
