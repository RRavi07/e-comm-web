
const express = require('express');
const Order = require('../models/Order');
const { fetchuser } = require('../middleware/authMiddleware');
const router = express.Router();

// Add a new order
router.post('/add', fetchuser, async (req, res) => {
    const { orderItems, shippingAddress } = req.body;
    try {
        const newOrder = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//add item to exiting order
router.post('/additem', fetchuser, async (req, res) => {
    const { orderItems } = req.body;
    try {
        let order = await Order.findOne({ user: req.user.id }).populate('orderItems.product');
        if (order) {
            orderItems.forEach(newItem => {
                const itemIndex = order.orderItems.findIndex(p => p.product.toString() === newItem.product.toString());
                if (itemIndex > -1) {
                    order.orderItems[itemIndex].quantity += newItem.quantity;
                } else {
                    order.orderItems.push(newItem);
                }
            });
            order = await order.save();
            res.status(200).json(order);
        } else {
            res.status(500).send('order not found')
        };

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Delete an order item
router.post('/delete/:id', fetchuser, async (req, res) => {
    const productId = req.params.id;
    try {
        let order = await Order.findOne({ user: req.user.id }).populate('orderItems.product');

        if (!order) {
            return res.status(404).json({ msg: 'Order not found' });
        }

        const filteredItems = order.orderItems.filter(item => item.product.toString() === productId);

        if (filteredItems.length === 0) {
            return res.status(404).json({ msg: 'Product not found in order' });
        }

        order.orderItems = order.orderItems.filter(item => item.product.toString() !== productId);
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Fetch all order items
router.get('/all', fetchuser, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('orderItems.product').populate('user').populate('shippingAddress');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
