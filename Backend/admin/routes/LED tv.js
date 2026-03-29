const express = require("express");

const { Tv } = require('../database/index');

const router = express.Router();

router.post("/add/tv", async (req, res) => {
    const { name, companyName, size, colour, price, quantity, image } = req.body;
    const findWatch = await Tv.findOne({ name, companyName, size, colour, price, image });
    if(findWatch) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newTv = new Tv({name, companyName, size, colour, price, quantity, image});
        await newTv.save();
        res.status(200).json({ message : "Tv added successfully" });
    }
});

router.put("/update/tv/:id", async (req, res) => {
    const tvId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateTv = await Tv.findByIdAndUpdate(tvId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateTv) {
            res.status(200).json({ message : "Tv updated successfully" });
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