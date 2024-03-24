const mongoose = require('mongoose');

// Define schema for the user's stock portfolio
const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stocks: [{
        symbol: {
            type: String,
            required: true
        },
        avgPrice: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
        // Add more fields as needed (e.g., marketPrice, etc.)
    }]
});

// Create model for the user's stock portfolio
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
