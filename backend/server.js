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


//Signup route
app.use(signupApi);

// Login route
app.use(loginApi);

const usersApi = require('./modules/app_user/get_all_users');
const {connect} = require("mongoose");

connect(
    'mongodb+srv://abhinav_stocker:abhinav321@atlascluster.icr73gp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
    )
    .then(() => console.log("Database connected!"));

app.use('/users', usersApi);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});