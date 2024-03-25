const express = require('express');
const Portfolio = require('../../model/portfolio_model')
const UserProperties = require('../../model/user_properties_model')
const jwt = require("jsonwebtoken");
const {verifyToken } = require('../../utils/verify_token');

const router = express.Router();

router.get('/portfolio/:userId', verifyToken, async (req, res) => {
    const { userId } = req.params;
    try {
        // Query the database to retrieve user's portfolio
        const portfolio = await Portfolio.findOne({ userId });
        res.json(portfolio.stocks);
    } catch (error) {
        console.error('Error fetching user portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch user portfolio' });
    }
});

// Add stock portfolio API endpoint
router.post('/portfolio/:userId', async (req, res) => {
    const { userId } = req.params;
    const { stock } = req.body;

    let userProperties = UserProperties.findOne({userId});

    let currentBalance = userProperties.balance;

    let holdingValue = userProperties.holdingValue;

    const transactionValue = stock.avgPrice * stock.quantity;

    console.log(currentBalance, transactionValue)

    if (currentBalance >= transactionValue) {
        try {
            let portfolio = await Portfolio.findOne({userId});

            if (!portfolio) {
                // If the user does not have a portfolio, create a new one
                portfolio = new Portfolio({userId, stocks: []});
            }

            // Push the new stock to the user's portfolio
            portfolio.stocks.push(stock);

            userProperties.updateOne({userId: userId}, {$set: {balance: currentBalance - transactionValue, holdingValue: holdingValue + transactionValue}})

            // Save the updated portfolio to the database
            await portfolio.save();

            await userProperties.save();

            res.status(201).json({message: 'Stock added to portfolio'});
        } catch (error) {
            console.error('Error adding stock to user portfolio:', error);
            res.status(500).json({error: 'Failed to add stock to user portfolio'});
        }
    }
    else {
        console.error('Balance not enough');
        res.status(500).json({error: 'Balance not enough'});
    }
});

module.exports = router;
