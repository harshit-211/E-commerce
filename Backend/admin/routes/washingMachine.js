const express = require("express");

const { WashingMachine } = require('../database/index');

const router = express.Router();

router.post("/add/washing/machine", async (req, res) => {
    const { name, companyName, size, colour, price, quantity, image } = req.body;
    const findWashingMachine = await WashingMachine.findOne({ name, companyName, size, colour, price, image });
    if(findWashingMachine) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newWashingMachine = new WashingMachine({ name, companyName, size, colour, price, quantity, image });
        await newWashingMachine.save();
        res.status(200).json({ message : "Washing machine added successfully" });
    }
});

router.put("/update/washing/machine/:id", async (req, res) => {
    const washingMachineId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateWashingMachine = await WashingMachine.findByIdAndUpdate(washingMachineId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateWashingMachine) {
            res.status(200).json({ message : "Washing machine updated successfully" });
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