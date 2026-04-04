const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const express = require("express");

const { authMiddleware } = require("../middleware/auth");

dotenv.config({
    path : "../../.env"
});

const razorpay = new Razorpay({
    key_id : process.env.RAZORPAY_API_KEY,
    key_secret : process.env.RAZORPAY_API_SECRET
});

const router = express.Router();

router.post("/payment", authMiddleware, async (req, res) => {
    try {
      const options = {
        amount: 100, // ₹1 (in paise)
        currency: "INR",
        receipt: "order-receipt-1"
      };
  
      const order = await razorpay.orders.create(options);
  
      res.status(200).json(order);
  
    } catch (error) {
      console.error("Razorpay Error:", error);
  
      res.status(500).json({
        message: "Payment creation failed",
        error: error
      });
    }
});

module.exports = router;