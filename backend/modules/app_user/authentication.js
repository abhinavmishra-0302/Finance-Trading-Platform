const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const router = express.Router();

// MySQL database configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'abhinav',
    password: '@Abhinav321',
    database: 'stocker_database'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Login API endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Retrieve user details from the database based on the provided email
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.error('Error retrieving user details:', err);
                res.status(500).json({ error: 'Failed to login' });
                return;
            }

            if (results.length === 0) {
                // User not found
                res.status(404).json({ error: 'User not found' });
                return;
            }

            const user = results[0];

            // Compare the hashed password stored in the database with the hashed version of the provided password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Passwords match, login successful
                res.status(200).json({ message: 'Login successful' });
            } else {
                // Passwords don't match
                res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login' });
    }
});

module.exports = router;
