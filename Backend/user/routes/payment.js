const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const express = require("express");

const { authMiddleware } = require("../middleware/auth");
const { Cart } = require("../../admin/database/index");
const { Order } = require("../../admin/database/index");

dotenv.config({
    path : "../../.env"
});

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
});

const router = express.Router();

router.post("/payment", authMiddleware, async(req, res) => {
    try {
        const cart = await Cart.findOne({ userId : req.userId }).populate("items.productId");
        if(!cart || cart.items.length === 0) {
            return res.status(400).json({ message : "Cart is empty" });
        }
        let totalAmount = 0;
        const orderItems = cart.items.map((item) => {
            const product = item.productId;
            if(!product) return null;
            const itemTotal = product.price * item.quantity;
            totalAmount += itemTotal;

            return {
                productId : product._id,
                productType : item.productType,
                quantity : item.quantity,
                price : product.price,
            }
        }).filter(Boolean);

        const razorpayOrder = await razorpay.orders.create({
            amount : totalAmount * 100,
            currency : "INR",
            receipt : `receipt_${Date.now()}`
        });

        const newOrder = await Order.create({
            userId : req.userId,
            items : orderItems,
            totalAmount,
            razorpayOrderId : razorpayOrder.id,
            paymentStatus : "pending"
        });
        res.status(200).json({ order : razorpayOrder });
    }
    catch(error) {
        res.status(500).json({
            message : "Payment creating failed",
            error
        });
    }
});

module.exports = router;