const express = require("express");
const router = express.Router();

const { Admin } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

router.get("/user/info", authMiddleware, async(req, res) => {
    const userId = req.userId;
    const findUser = await Admin.findById(userId);
    const email = findUser.email;
    const name = findUser.name;
    res.status(200).json({ email, name });
});

module.exports = router;