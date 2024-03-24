const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../model/users_model')
const {JWT_SECRET_KEY, JWT_VALID_TIME, COOKIE_EXPIRY} = require("../../config/config");

const router = express.Router();

// Login API endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: JWT_VALID_TIME });

        res.cookie('jwtToken', token, { maxAge: COOKIE_EXPIRY, httpOnly: false});

        res.cookie('userId', user._id.toString(), { maxAge: COOKIE_EXPIRY, httpOnly: false});

        console.log(token)

        res.status(200).json({ token: token, userId: user._id });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;
