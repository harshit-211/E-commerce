const express = require("express");

const { Refrigerators } = require('../database/index');

const router = express.Router();

router.post("/add/refrigerator", async (req, res) => {
    const { name, companyName, size, colour, star, price, quantity, image } = req.body;
    const findRefrigerator = await Refrigerators.findOne({ name, companyName, size, colour, star, price, image });
    if(findRefrigerator) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newRefrigerator = new Refrigerators({ name, companyName, size, colour, star, price, quantity, image });
        await newRefrigerator.save();
        res.status(200).json({ message : "Refrigerator added successfully" });
    }
});

router.put("/update/refrigerator/:id", async (req, res) => {
    const refrigeratorId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateRefrigerator = await Refrigerators.findByIdAndUpdate(refrigeratorId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateRefrigerator) {
            res.status(200).json({ message : "Refrigerator updated successfully" });
        } else {
            res.status(404).json({ message : "Item not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid Id format" });
        }
    }
});

module.exports = router;