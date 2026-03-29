const express = require("express");
const router = express.Router();

const { Tv } = require("../../admin/database/index");

router.get("/user/get/tvs", async(req, res) => {
    const allTv = await Tv.find({});
    res.status(200).json({ allTv });
});

router.get("/user/get/tvs/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Tv.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;