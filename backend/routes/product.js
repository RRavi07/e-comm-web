const express = require('express');
const Products = require('../models/Product');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('../utils/cloudinary'); // Import Cloudinary
const { fetchuser, fetchadmin } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "-" + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

//Fetch all Product
router.get('/fetchAllProducts', async (req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


//Add Product
router.post('/addProduct', fetchuser, fetchadmin, upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category, brand, stock } = req.body;
        let imageUrl;

        // Check if Cloudinary is configured
        if (!cloudinary || !cloudinary.uploader || !cloudinary.uploader.upload) {
            console.error("Cloudinary not properly configured");
            return res.status(500).send("Cloudinary configuration error");
        }

        // Upload image to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, { folder: "images" });
            imageUrl = result.secure_url;
        }

        const newProduct = new Products({
            name,
            description,
            price,
            category,
            brand,
            stock,
            image: imageUrl
        });
        newProduct.save()
            .then(product => res.json(product))
            .catch(err => {
                console.error(err.message);
                res.status(500).send("Error saving product");
            });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


//Update Product
router.put('/updateproduct/:id', fetchuser, fetchadmin, upload.single('image'), async (req, res) => {

    const { name, description, price, category, brand, stock } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const newProduct = {};
    if (name) { newProduct.name = name };
    if (description) { newProduct.description = description };
    if (price) { newProduct.price = price };
    if (category) { newProduct.category = category };
    if (brand) { newProduct.brand = brand };
    if (stock) { newProduct.stock = stock };
    if (image) { newProduct.image = image };

    try {
        let product = await Products.findById(req.params.id);
        if (!product) { return res.status(404).send("Product not found") }

        // Update the note with the new values
        product = await Products.findByIdAndUpdate(
            req.params.id,
            { $set: newProduct },
            { new: true }
        );
        res.json(product); // Send the updated note as a JSON response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});



//Delet Product
router.delete('/deleteproduct/:id', fetchuser, fetchadmin, async (req, res) => {
    try {
        const id = await req.params.id;
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).send("Product not found")
        }
        const products = await Products.findByIdAndDelete(id);
        if (products) {
            console.log("Product delete succesfully")
            res.status(200).send("Success");
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
