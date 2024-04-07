// Import Mongoose
const mongoose = require('mongoose');

// Define User Schema
const propertiesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    holdingValue: {
        type: Number,
        required: true,
    },
});

// Create User Model
const UserProperties = mongoose.model('UserProperties', propertiesSchema);

// Export User Model
module.exports = UserProperties;
