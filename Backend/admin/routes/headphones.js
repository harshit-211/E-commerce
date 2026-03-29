const express = require("express");

const { Headphones } = require('../database/index');

const router = express.Router();

router.post("/add/headphones", async (req, res) => {
    const { name, companyName, type, colour, price, quantity, image } = req.body;
    const findHeadphone = await Headphones.findOne({ name, companyName, type, colour, price, image });
    if(findHeadphone) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const addHeadphone = new Headphones({ name, companyName, type, colour, price, quantity, image });
        await addHeadphone.save();
        res.status(200).json({ message : "Headphone added successfully" });
    }
});

router.put("/update/headphones/:id", async (req, res) => {
    const { newPrice, newQuantity } = req.body;
    try {
        const updateHeadphone = await Headphones.findByIdAndUpdate(headphoneId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateHeadphone) {
            res.status(200).json({ message : "Headphone updated successfully" });
        } else {
            res.status(404).json({ message : "Headphone not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;