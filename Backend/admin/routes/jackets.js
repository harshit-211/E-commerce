const express = require("express");

const { Jackets } = require('../database/index');

const router = express.Router();

router.post("/add/jacket", async (req, res) => {
    const { name, companyName, size, colour, price, quantity, image } = req.body;
    const findJacket = await Jackets.findOne({ name, companyName, size, colour, price, image });
    if(findJacket) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newJacket = new Jackets({ name, companyName, size, colour, price, quantity, image });
        await newJacket.save();
        res.status(200).json({ message : "Jacket added successfully" });
    }
});

router.put("/update/jacket/:id", async (req, res) => {
    const jacketId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateJacket = await Jackets.findByIdAndUpdate(jacketId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateJacket) {
            res.status(200).json({ message : "Item updated successfully" });
        } else {
            res.status(404).json({ message : "Item not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;