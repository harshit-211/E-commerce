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
    const { email, name, password } = req.body;
    console.log(req.body);
    const checkUser = await Admin.findOne({ email, password });
    if(checkUser)
        return res.status(409).json({ message : "This account already exists" });
    const findUser = await Admin.findOne({ email });
    if(findUser)
        return res.status(409).json({ message : "This username already exists" });
    const newUser = new Admin({ email, name, password });
    await newUser.save();
    const token = jwt.sign({ userId : newUser._id }, secret, { expiresIn : "24h" });
    res.status(200).json({ message : "New user added successfully", Token : token });
});

module.exports = router;