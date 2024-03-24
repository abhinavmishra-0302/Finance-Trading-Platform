const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../config/config");
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    try {
        req.user = jwt.verify(token.split(' ')[1], 'your_secret_key');
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = {verifyToken};