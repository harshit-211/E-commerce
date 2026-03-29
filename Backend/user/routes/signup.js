const dotenv = require("dotenv");
const express = require("express");
const jwt = require("jsonwebtoken");

dotenv.config({
    path : "../../.env"
});

const secret = process.env.SECRET;

const { Admin } = require("../../admin/database/index");

const router = express.Router();

router.post("/user/signup", async( req, res ) => {
    const { username, password } = req.body;
    const checkUser = await Admin.findOne({ username, password });
    if(checkUser)
        return res.status(409).json({ message : "This account already exists" });
    const findUser = await Admin.findOne({ username });
    if(findUser)
        return res.status(409).json({ message : "This username already exists" });
    const newUser = new Admin({ username, password });
    await newUser.save();
    const token = jwt.sign({ userId : newUser._id }, secret, { expiresIn : "1h" });
    res.status(200).json({ message : "New user added successfully", Token : token });
});

module.exports = router;