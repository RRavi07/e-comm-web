const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Raviisagodb$oy'; // Define your JWT secret key
const router = express.Router();
const { fetchuser } = require('../middleware/authMiddleware');


router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create new user in the database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            isAdmin: req.body.isAdmin || false, // Optional: set isAdmin field
        });

        // Generate JWT token for authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        return res.json({ authtoken }); // Return the response and ensure no further code execution

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Some Error occurred"); // Ensure the response is returned
    }
});

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Compare hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.json({ success, authtoken }); // Return the response and ensure no further code execution

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error"); // Ensure the response is returned
    }
});
router.post('/admin', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        // Compare hashed password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Invalid credentials" });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ success, error: "Access denied. Admins only." });
        }
        // Generate JWT token for authentication
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        return res.json({ success, authtoken }); // Return the response and ensure no further code execution

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error"); // Ensure the response is returned
    }
});

//fetch all users 
router.get('/fetchalluser', async (req, res) => {
    try {
        const response = await User.find({})
        res.status(200).send(response)
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error"); // Ensure the response is returned
    }

})
// Fetch logged-in user details
router.post('/fetchuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error"); // Ensure the response is returned
    }
});

module.exports = router;
