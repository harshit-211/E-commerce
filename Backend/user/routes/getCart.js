const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const { Cart } = require("../../admin/database/index");

router.get("/user/get/cart/", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const allItems = await Cart.find({ userId }).populate("items.productId");
    res.status(200).json({ allItems });
});

module.exports = router;