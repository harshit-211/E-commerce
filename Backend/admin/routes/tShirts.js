const express = require("express");

const { tShirts } = require('../database/index');

const router = express.Router();

router.post("/add/tshirts", async(req, res) => {
    const { name, companyName, size, colour, price, image } = req.body;
    const findTShirt = await tShirts.findOne({ name, companyName, size, colour, price, image  });
    if(findTShirt) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const addTShirt = new tShirts({ name, companyName, size, colour, price, quantity, image });
        await addTShirt.save();
        res.status(200).json({ message : "t-shirt added successfully" });
    }
});

router.put("/update/t-shirt/:id", async(req, res) => {
    const tShirtId = req.params.id;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateTShirt = await tShirts.findByIdAndUpdate(tShirtId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateTShirt) {
            res.status(200).json({ message : "t-shirt updated successfully" });
        } else {
            res.status(404).json({ message : "t-shirt not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ message : "Invalid id format" });
        }
    }
});

module.exports = router;