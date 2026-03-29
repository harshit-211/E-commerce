const express = require("express");

const { Ac } = require('../database/index');

const router = express.Router();

router.post("/add/ac", async (req, res) => {
    const { name, companyName, ton, star, price, quantity, image } = req.body;
    const findAc = await Ac.findOne({ name, companyName, ton, star, price, image });
    if(findAc) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newAc = new Ac({ name, companyName, ton, star, price, quantity, image });
        await newAc.save();
        res.status(200).json({ message : "Ac added successfully" });
    }
});

router.put("/update/ac/:id", async (req, res) => {
    const acId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateAc = await Ac.findByIdAndUpdate(acId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateAc) {
            res.status(200).json({ message : "Ac updated successfully" });
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