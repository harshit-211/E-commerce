const express = require("express");
const router = express.Router();

const { Speakers } = require("../../admin/database/index");

router.get("/user/get/speakers", async(req, res) => {
    const allSpeakers = await Speakers.find({});
    res.status(200).json({ allSpeakers });
});

router.get("/user/get/speakers/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Speakers.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;