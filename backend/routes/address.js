const express = require('express')
const Address = require('../models/Address')
const { fetchuser } = require('../middleware/authMiddleware');

const router = express.Router()

router.get('/fetchall', fetchuser, async (req, res) => {
    try {
        const address = await Address.find({ user: req.user.id })
        if (!address) return res.status(404).json({ message: 'Address not found' });
        res.status(200).json(address);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//ADD address
router.post('/addAddress', fetchuser, async (req, res) => {
    const { address, city, postalCode, country } = req.body;  // Ensure 'postalCode' is correctly cased
    const user = req.user.id;

    try {
        const newAddress = new Address({ address, city, postalCode, country, user });
        const savedAddress = await newAddress.save();
        res.status(201).send(savedAddress);  // Use 201 for successful creation
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// Update an address by ID
router.put('/api/addresses/:id',fetchuser, async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('user');
        if (!updatedAddress) return res.status(404).json({ message: 'Address not found' });
        res.status(200).json(updatedAddress);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an address by ID
router.delete('/delete/:id',fetchuser, async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) return res.status(404).json({ message: 'Address not found' });
        res.status(200).json({ message: 'Address deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Set an address as the primary address
router.put('/makePrimary/:id', fetchuser, async (req, res) => {
    const addressId = req.params.id;
    const userId = req.user.id;

    try {
        // Find the address by ID
        const address = await Address.findOne({ _id: addressId, user: userId });

        if (!address) return res.status(404).json({ message: 'Address not found' });

        // Toggle the primary status
        const newPrimaryStatus = !address.primary;

        // If setting to primary, set all other addresses' primary field to false
        if (newPrimaryStatus) {
            await Address.updateMany({ user: userId }, { primary: false });
        }
        // Update the specified address's primary field
        address.primary = newPrimaryStatus;
        await address.save();

        res.status(200).json(address);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = router;