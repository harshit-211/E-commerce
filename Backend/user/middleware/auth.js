const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({
    path : "../../.env"
});

const secret = process.env.SECRET;

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
}

module.exports = { authMiddleware };