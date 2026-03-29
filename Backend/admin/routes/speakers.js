const express = require("express");

const { Speakers } = require('../database/index');

const router = express.Router();

router.post("/add/speaker", async (req, res) => {
    const { name, companyName, colour, price, quantity, image } = req.body;
    const findSpeaker = await Speakers.findOne({ name, companyName, colour, price, image });
    if(findSpeaker) {
        res.status(409).json({ message : "Item already exists" });
    } else {
        const newSpeaker = new Speakers({ name, companyName, colour, price, quantity, image });
        await newSpeaker.save();
        res.status(200).json({ message : "Speaker added successfully" });
    }
});

router.put("/update/speaker/:id", async (req, res) => {
    const speakerId = req.params;
    const { newPrice, newQuantity } = req.body;
    try {
        const updateSpeaker = await Speakers.findByIdAndUpdate(speakerId, {
            price : newPrice,
            quantity : newQuantity
        });
        if(updateSpeaker) {
            res.status(200).json({ message : "Speaker updated successfully" });
        } else {
            res.status(404).json({ message : "Item not found" });
        }
    } catch(error) {
        if(error.name === "CastError" && error.kind === "ObjectId") {
            res.status(411).json({ messge : "Invalid Id format" });
        }
    }
});

module.exports = router;