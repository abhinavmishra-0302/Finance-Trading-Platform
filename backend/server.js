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

const {MONGO_CONNECTION_STRING, EXPRESS_SESSION_KEY} = require("./config/config");

// Add express-session middleware
app.use(session({
    secret: EXPRESS_SESSION_KEY,
    resave: false,
    saveUninitialized: false
}));


app.use(cors());
app.use(express.json());


//Signup route
app.use(signupApi);

// Login route
app.use(loginApi);

const usersApi = require('./modules/app_user/get_all_users');
const {connect} = require("mongoose");


connect(
    MONGO_CONNECTION_STRING
    )
    .then(() => console.log("Database connected!"));

app.use('/users', usersApi);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});