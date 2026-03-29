const express = require("express");

const { Shoes } = require('../database/index');

const router = express.Router();

router.post("/add/shoes", async (req, res) => {
    const { name, companyName, size, colour, price, image } = req.body;
    const findShoes = await Shoes.findOne({ name, companyName, size, colour, price, image });
    if(findShoes) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newShoes = new Shoes({ name, companyName, size, colour, price, quantity,image });
        await newShoes.save();
        res.status(200).json({ message : "shoes added successfully" });
    }
});

router.put("/update/shoes/:id", async (req, res) => {
    const shoesId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateShoes = await Shoes.findByIdAndUpdate(shoesId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateShoes) {
            res.status(200).json({ message : "Shoes updated successfully" });
        } else {
            res.status(404).json({ message : "shoes not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;