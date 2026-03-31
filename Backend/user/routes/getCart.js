const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middleware/auth");

const { Cart } = require("../../admin/database/index");

router.post("/add/to/cart", authMiddleware, async(req, res) => {
    const { productId, productType } = req.body;
    const userId = req.userId;
    let cart = await Cart.findOne({ userId });
    if(!cart) {
        cart = await Cart.create({
            userId,
            items : [{ productId, productType, quantity : 1 }]
        });
        return res.status(200).json({ cart });
    }
    const item = cart.items.find(
        i => i.productId.toString() === productId
    );
    if(item) {
        item.quantity = item.quantity + 1;
    }
    else {
        cart.items.push({ productId, productType, quantity : 1 });
    }
    await cart.save();
    res.status(200).json({ message : "Item added to cart succesfully" });
});

router.get("/user/get/cart", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const allItems = await Cart.find({ userId }).populate("items.productId");
    res.status(200).json({ allItems });
});

module.exports = router;