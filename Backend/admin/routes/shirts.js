const express = require("express");

const { Shirts } = require('../database/index');

const router = express.Router();

router.post("/add/shirt", async (req, res) => {
    const { name, companyName, size, colour, price, quantity, image } = req.body;
    const findShirt = await Shirts.findOne({ name, companyName, size, colour, price, image });
    if(findShirt) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newShirt = new Shirts({ name, companyName, size, colour, price, quantity,image });
        await newShirt.save();
        res.status(200).json({ message : "shirt added successfully" });
    }
});

router.put("/update/shirt/:id", async (req, res) => {
    const shirtId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateShirt = await Shirts.findByIdAndUpdate(shirtId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateShirt) {
            res.status(200).json({ message : "shirt updated successfully" });
        } else {
            res.status(404).json({ message : "shirt not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;