const dotenv = require("dotenv");
const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const { Order } = require("../../admin/database/index");
const { Cart } = require("../../admin/database/index");
const { authMiddleware } = require("../middleware/auth");

dotenv.config({
    path : "../../.env"
});

router.post("/verify/payment", authMiddleware, async(req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const userId = req.userId;
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(body)
            .digest("hex");
        
        if(expectedSignature === razorpay_signature) {
            await Order.findOneAndUpdate(
                { razorpayOrderId : razorpay_order_id },
                { paymentStatus : "paid" }
            );
            await Cart.updateOne(
                { userId },
                { $set: { items : [] } }
            );
            return res.json({ message : "Payment verified" });
        }
        else {
            return res.json({ message : "Invalid signature" });
        }
    }
    catch(error) {
        res.status(500).json({ message : "Verification failed" });
    }
});

module.exports = router;