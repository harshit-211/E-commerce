const express = require("express");

const { Watches } = require('../database');

const router = express.Router();

router.post("/add/watches", async (req, res) => {
    const { name, companyName, size, colour, price, quantity } = req.body;
    const findWatch = await Watches.findOne({ name, companyName, size, colour, price, image });
    if(findWatch) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newWatch = new Watches({ name, companyName, size, colour, price, quantity });
        await newWatch.save();
        res.status(200).json({ message : "Watch added successfully" });
    }
});

router.put("/update/watch/:id", async (req, res) => {
    const watchId = re.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateWatch = await Watches.findByIdAndUpdate(watchId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateWatch) {
            res.status(200).json({ message : "Watch updated successfully" });
        } else {
            res.status(404).json({ message : "Watch not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;