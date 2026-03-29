const express = require("express");
const router = express.Router();

const { Cart } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

router.put("/cart/decrease/quantity", authMiddleware, async(req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
    await Cart.updateOne(
        { 
          userId,
          items: { $elemMatch: { productId: productId, quantity: { $gt: 1 } } }
        },
        { $inc: { "items.$.quantity": -1 } }
    );
    res.status(200).json({ message : "Quantity decreased" });
});

module.exports = router;