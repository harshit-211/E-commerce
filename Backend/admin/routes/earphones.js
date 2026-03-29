const express = require("express");

const { Earphones } = require('../database/index');

const router = express.Router();

router.post("/add/earphones", async (req, res) => {
    const { name, companyName, colour, type, batteryLife, price, image } = req.body;
    const findEarphones = await Earphones.findOne({ name, companyName, colour, type, price, image });
    if(findEarphones) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newEarphones = new Earphones({ name, companyName, colour, type, batteryLife, price, image });
        await newEarphones.save();
        res.status(200).json({ message : "earphones added successfully" });
    }
});

router.put("/update/earphones/:id", async (req, res) => {
    const earphoneId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateEarphones = await Earphones.findByIdAndUpdate( earphoneId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateEarphones) {
            res.status(200).json({ message : "earphones updated successfully" });
        } else {
            res.status(404).json({ message : "earphones not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid Id format" });
        }
    }
});

module.exports = router;