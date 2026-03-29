const express = require("express");

const { Phones } = require('../database/index');

const router = express.Router();

router.post("/add/phone", async(req, res) => {
    const { name, companyName, size, colour, ram, batteryCapacity, processor, camera, storage, operatingSystem, price, quantity, image } = req.body;
    const findPhone = await Phones.findOne({ name, companyName, colour, ram, storage, price, image });
    if(findPhone) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const addPhone = new Phones({
            name,
            companyName,
            size,
            colour,
            ram,
            batteryCapacity,
            processor,
            camera,
            storage,
            operatingSystem,
            price,
            quantity,
            image
        });
        await addPhone.save();
        res.status(200).json({ message : "phone added successfully" });
    }
});

router.put("/update/phone/:id", async(req, res) => {
    const phoneId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updatePhone = await Phones.findByIdAndUpdate(phoneId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updatePhone) {
            res.status(200).json({ message : "phone updated successfully" });
        } else {
            res.status(404).json({ message : "phone not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid Id format" });
        }
    }
});

module.exports = router;