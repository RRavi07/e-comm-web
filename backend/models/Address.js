const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,  // This field is required
    },
    address: {
        type: String,
        required: true  // This field is required
    },
    city: {
        type: String,
        required: true  // This field is required
    },
    postalCode: {
        type: String,
        required: true  // This field is required
    },
    primary: {
        type: Boolean,
        default: false
    },
    country: {
        type: String,
        required: true  // This field is required
    },
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create the Address model using the schema
const Address = mongoose.model('Address', addressSchema);

// Export the Address model
module.exports = Address;
