// server.js

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const session = require('express-session');
const { passport, users } = require('./modules/app_user/authentication');
const stockSearch = require('./modules/stock_search/stock_search'); // Import passport and users from auth module
const WebSocket = require('ws');

const signupApi = require('./modules/app_user/sign_up');

// Express setup
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server });

// Add express-session middleware
app.use(session({
    secret: 'secret_key_to_be_changed_in_production', // TODO: Change this to a long, random string in production
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(signupApi);

// Login route
app.post('/login', passport.authenticate('local', {failureRedirect: '/login-fail' }), (req, res) => {
    res.send('Login successful!');
});

app.get('/login-fail', (req, res) => {
    res.status(401).send('Login failed!');
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received message from client:', message);
        stockSearch.subscribeStock(message);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});