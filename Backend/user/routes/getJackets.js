const express = require("express");
const router = express.Router();

const { Jackets } = require("../../admin/database/index");

router.get("/user/get/jacket", async(req,res) => {
    const allJackets = await Jackets.find({});
    res.status(200).json({ allJackets });
});

router.get("/user/get/jacket/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Jackets.findById(id);
    if(!findItem)
        return res.status(200).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;