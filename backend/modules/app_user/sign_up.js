const express = require('express');
const bcrypt = require('bcrypt');
const { MongoClient, ServerApiVersion} = require('mongodb');
const User = require('../../model/users_model')
// const {DB_NAME} = require("../../config/config");

const router = express.Router();

// MongoDB database name
// const dbName = DB_NAME;

// Sign-up API endpoint
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', newUser });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Failed to sign up' });
    }
});

module.exports = router;
