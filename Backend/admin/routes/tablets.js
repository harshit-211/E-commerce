const express = require("express");

const { Tablets } = require('../database/index');

const router = express.Router();

router.post("/add/tablet", async(req, res) => {
    const { name, companyName, screenSize, colour, ram, batteryCapacity, processor, camera, storage, operatingSystem, price, quantity, image, display } = req.body;
    const findTablet = await Tablets.findOne({
        name,
        companyName,
        colour,
        ram,
        storage,
        price,
        image
    });
    if(findTablet) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const addTablet = new Tablets({
            name,
            companyName,
            screenSize,
            colour,
            ram,
            batteryCapacity,
            processor,
            camera,
            storage,
            operatingSystem,
            price,
            quantity,
            image,
            display
        });
        await addTablet.save();
        res.status(200).json({ message : "tablet added successfully" });
    }
});

router.put("/update/tablet/:id", async(req, res) => {
    const tabletId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateTablet = await Tablets.findByIdAndUpdate(tabletId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateTablet) {
            res.status(200).json({ message : "tablet updated successfully" });
        } else {
            res.status(404).json({ message : "tablet not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid Id format" });
        }
    }
});

module.exports = router;