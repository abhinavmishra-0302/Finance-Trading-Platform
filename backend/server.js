// server.js

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');

const signupApi = require('./modules/app_user/sign_up');
const loginApi = require('./modules/app_user/authentication');

const cors = require('cors');

// Express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add express-session middleware
app.use(session({
    secret: 'secret_key_to_be_changed_in_production', // TODO: Change this to a long, random string in production
    resave: false,
    saveUninitialized: false
}));

app.use(cors());
app.use(express.json());

app.use(signupApi);

// Login route
app.use(loginApi);

app.get('/login-fail', (req, res) => {
    res.status(401).send('Login failed!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});