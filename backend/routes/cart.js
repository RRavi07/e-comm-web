const express = require('express');
const Cart = require('../models/Cart');
const { fetchuser } = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new cart or add items to an existing cart
router.post('/add', fetchuser, async (req, res) => {
    const { product, quantity } = req.body;
    try {
        // Find the cart for the user
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            // Check if product already exists in the cart
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === product);
            if (itemIndex > -1) {
                // If product exists, update quantity
                cart.cartItems[itemIndex].quantity +=  quantity;
            } else {
                // If product doesn't exist, add it to cartItems
                cart.cartItems.push({ product, quantity });
            }
            // Save the updated cart
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            // If no cart exists for user, create a new cart
            const newCart = new Cart({
                user: req.user.id,
                cartItems: [{ product, quantity }]
            });
            // Save the new cart
            const savedCart = await newCart.save();
            res.status(201).json(savedCart);
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Get the user's cart
// router.get('/', fetchuser, async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
//         if (!cart) {
//             return res.status(404).json('Cart not found');
//         }
//         res.status(200).json(cart);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send('Server Error');
//     }
// });
router.get('/', fetchuser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id })
            .populate({
                path: 'cartItems',
                populate: {
                    path: 'product',
                    model: 'Product' // Replace 'Product' with your actual product model name
                }
            })
            .populate('user');

        if (!cart) {
            return res.status(404).json('Cart not found');
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Update cart item quantity
router.put('/update', fetchuser, async (req, res) => {
    const { product, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === product);
            if (itemIndex > -1) {
                if (quantity > 0) {
                    cart.cartItems[itemIndex].quantity = quantity;
                } else {
                    cart.cartItems.splice(itemIndex, 1); // Remove the item if quantity is zero
                }
                cart = await cart.save();
                res.status(200).json(cart);
            } else {
                return res.status(404).json('Product not found in cart');
            }
        } else {
            return res.status(404).json('Cart not found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Remove an item from the cart
router.delete('/remove/:productId', fetchuser, async (req, res) => {
    const { productId } = req.params;
    try {
        let cart = await Cart.findOne({ user: req.user.id });
        if (cart) {
            // Check if product exists in the cart
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);
            if (itemIndex > -1) {
                // If product exists, remove it from cartItems
                cart.cartItems.splice(itemIndex, 1);
                cart = await cart.save();
                res.status(200).json(cart);
            } else {
                return res.status(404).json('Product not found in cart');
            }
        } else {
            return res.status(404).json('Cart not found');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
