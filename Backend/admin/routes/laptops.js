const express = require("express");

const { Laptops } = require('../database/index');

const router = express.Router();

router.post("/add/laptop", async (req, res) => {
    const { name, companyName, screenSize, colour, ram, storage, processor, graphicsCard, batteryCapacity, weight, operatingSystem, price, quantity, image } = req.body;
    const findLaptop = await Laptops.findOne({
        name,
        companyName,
        screenSize,
        colour,
        ram,
        storage,
        processor,
        graphicsCard,
        price,
    });
    if(findLaptop) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newLaptop = new Laptops({
        name,
        companyName,
        screenSize,
        colour,
        ram,
        storage,
        processor,
        graphicsCard,
        batteryCapacity,
        weight,
        operatingSystem,
        price,
        quantity,
        image
        });
        await newLaptop.save();
        res.status(200).json({ message : "laptop added successfully" });
    }
});

router.put("/update/laptop/:id", async (req, res) => {
    const laptopId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateLaptop = await Laptops.findByIdAndUpdate(laptopId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateLaptop) {
            res.status(200).json({ message : "laptop updated successfully" });
        } else {
            res.status(404).json({ message : "laptop not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId" ) {
            res.status(411).json({ message : "Invalid Id format" });
        }
    }
});

module.exports = router;