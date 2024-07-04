const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Search Products
router.get('/search/:key', async (req, res) => {
    try {
        const key = req.params.key;
        let searchQuery = {
            $or: [
                { name: { $regex: key, $options: 'i' } },
                { description: { $regex: key, $options: 'i' } },
                { brand: { $regex: key, $options: 'i' } },
            ],
        };

        // Check if the key is a number (for price search)
        if (!isNaN(key)) {
            searchQuery = { price: key };
        }

        const products = await Product.find(searchQuery).populate('category');

        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
