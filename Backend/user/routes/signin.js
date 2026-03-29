const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");

dotenv.config({
    path : "../../.env"
});

const secret = process.env.SECRET;

const router = express.Router();

const { Admin } = require("../../admin/database/index");

router.post("/user/signin", async(req, res) => {
    const { username, password } = req.body;
    const checkUser = await Admin.findOne({ username, password });
    if(!checkUser)
        return res.status(404).json({ message : "User not found" });
    const token = jwt.sign({ userId : checkUser._id }, secret, { expiresIn : "1h" });
    res.status(200).json({ message : "User found", Token : token });
});

module.exports = router;