
import React, { useState, useContext } from 'react';
import "./Css/ProductForm.css";
import { CategoryContext } from '../context/CategoryState';
import { ProductContext } from '../context/ProductState';

const ProductForm = () => {
    const { categories } = useContext(CategoryContext);
    const { addProduct } = useContext(ProductContext);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        stock: '',
        image: null,
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0];
        setProduct({ ...product, image: imageFile });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price);
        formData.append('category', product.category);
        formData.append('brand', product.brand);
        formData.append('stock', product.stock);
        formData.append('image', product.image);

        await addProduct(formData);
        // console.log(formData)
        setProduct({
            name: '',
            description: '',
            price: '',
            category: '',
            brand: '',
            stock: '',
            image: null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={product.name}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Description:</label>
                <textarea
                    name="description"
                    id="description"
                    value={product.description}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={product.price}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <select
                    name="category"
                    id="category"
                    value={product.category}
                    onChange={onChange}
                    required
                >
                    <option value="" disabled hidden>
                        Select a category
                    </option>
                    {Array.isArray(categories) && categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

            </div>
            <div className="form-group">
                <label>Brand:</label>
                <input
                    type="text"
                    name="brand"
                    id="brand"
                    value={product.brand}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Stock:</label>
                <input
                    type="number"
                    name="stock"
                    id="stock"
                    value={product.stock}
                    onChange={onChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Image:</label>
                <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
};

export default ProductForm;
