const express = require("express");
const router = express.Router();

const { Cart } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

router.put("/cart/increase/quantity", authMiddleware, async(req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
    await Cart.updateOne(
        {userId, "items.productId": productId},
        {$inc: { "items.$.quantity": 1 }}
    )
    res.status(200).json({ message : "Quantity increased" });
});

module.exports = router;