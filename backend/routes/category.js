const express = require('express');
const Category = require('../models/Category');
const { fetchuser, fetchadmin } = require('../middleware/authMiddleware');
const router = express.Router();
const app = express()
app.use(express.json())
// Create a new category
router.post('/addCategory', fetchuser, fetchadmin, async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: "Category already exists" });
        }

        const category = new Category({ name, description });
        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Fetch all categories
router.get('/fetchAllCategories', async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Fetch a single category by ID
router.get('/fetchCategory/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Update a category
router.put('/updateCategory/:id', fetchuser, fetchadmin, async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description },
            { new: true, runValidators: true }
        );
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Delete a category
router.delete('/deleteCategory/:id', fetchuser, fetchadmin, async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
