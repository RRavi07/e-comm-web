import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Css/Box.css';

const Box = ({ category, products = [] }) => {
    const navigate = useNavigate();
    if (!category || !products) {
        return null; // or a loading indicator, or some fallback UI
    }

    const filteredProducts = products.filter(product => product.category === category._id);
    // Get only the first 4 products
    const limitedProducts = filteredProducts.slice(0, 4);
    // console.log(limitedProducts)

    const handleClick = (name) => {
        navigate('/product', { state: { name} }); 
        // console.log(name)
    }
    return (
        <div className="container"
            style={{ margin: "0px", backgroundColor: "white", height: "fit-content", width: "fit-content", zIndex: "2" }}
            >
            <div className="title">{category.name} | Up to 55% off</div>
            <div className="grid">
                {limitedProducts.map(product => (
                    <div className="item" key={product._id} onClick={() => handleClick(product.name)}>
                        {/* <img src={require(`../../backend/images/${product.image}`)} alt={`${product.name}`} /> */}
                        <img src={product.image} alt={`${product.name}`} />
                        <div>{product.name}</div>
                        <div><b>Price</b>${product.price}</div>
                    </div>
                ))}
            </div>
            <Link to="/" className="button">See more</Link>
        </div>
    );
}

export default Box;
