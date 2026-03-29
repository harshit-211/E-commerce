const express = require("express");
const router = express.Router();

const { Cart } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

router.delete("/cart/delete/item", authMiddleware, async(req, res) => {
    const { productId } = req.body;
    const userId = req.userId;
    await Cart.updateOne(
        { userId },
        { $pull: { items : { productId } } }
    );
    res.status(200).json({ message : "Item deleted successfully" });
});

module.exports = router;