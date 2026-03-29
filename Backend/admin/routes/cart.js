const express = require("express");

const { Cart } = require("../database/index");

const { authMiddleware } = require("../../user/middleware/auth");

const router = express.Router();

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
    res.status(200).json({ message : "Item added to cart successfully" });
});

module.exports = router;