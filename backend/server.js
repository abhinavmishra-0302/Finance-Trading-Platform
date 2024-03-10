// server.js

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { passport, users } = require('./modules/login_api/auth'); // Import passport and users from auth module

// Express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add express-session middleware
app.use(session({
    secret: 'secret', // Change this to a long, random string in production
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Login route
app.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail' }), (req, res) => {
    res.send('Login successful!');
});

app.get('/login-fail', (req, res) => {
    res.status(401).send('Login failed!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
