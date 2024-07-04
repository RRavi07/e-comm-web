const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Raviisagodb$oy'; // Define your JWT secret key
const User = require('../models/User'); // Ensure this points to your User model

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please authenticate with a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with a valid token" });
    }
};

const fetchadmin = async (req, res, next) => {
    const id = req.user.id;
    const user = await User.findById(id);
    

    if (!user || !user.isAdmin) {
        console.log('Access denied:', req.user);
        return res.status(403).send({ error: 'Access denied. Admins only.' });
    }

    next();
};

module.exports = { fetchuser, fetchadmin };
