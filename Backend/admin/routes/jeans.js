const express = require("express");

const { Jeans } = require('../database/index');

const router = express.Router();

router.post("/add/jeans", async (req, res) => {
    const { name, companyName, size, colour, price, quantity, image } = req.body;
    const findJeans = await Jeans.findOne({ name, companyName, size, colour, price, image });
    if(findJeans) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newJeans = new Jeans({ name, companyName, size, colour, price, quantity,image });
        await newJeans.save();
        res.status(200).json({ message : "jeans added successfully" });
    }
});

router.put("/update/jeans/:id", async (req, res) => {
    const jeanId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updatedJean = await Jeans.findByIdAndUpdate(jeanId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updatedJean) {
            res.status(200).json({ message : "jean updated successfully" });
        } else {
            res.status(404).json({ message : "jeans not found" });
        }
    } catch(error) {
        if(error.name === 'CastError' && error.kind === 'ObjectId') {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;