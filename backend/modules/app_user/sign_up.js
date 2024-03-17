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

// Sign-up API endpoint
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password with a salt round of 10

        // Insert user details into the database with the hashed password
        const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        connection.query(sql, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error signing up:', err);
                res.status(500).json({ error: 'Failed to sign up' });
                return;
            }
            console.log('User signed up successfully');
            res.status(201).json({ message: 'User signed up successfully' });
        });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ error: 'Failed to sign up' });
    }
});

module.exports = router;
