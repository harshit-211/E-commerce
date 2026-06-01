const express = require("express");

const router = express.Router();

const { Order } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

router.get("/get/orders",authMiddleware, async(req, res) => {
    const userId = req.userId;
    const allProducts = await Order.find({ userId }).populate("items.productId");
    res.status(200).json({ allProducts });
});

module.exports = router;