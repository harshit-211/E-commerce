const express = require("express");
const router = express.Router();

const { Headphones } = require("../../admin/database/index");

router.get("/user/get/headphones", async(req, res) => {
    const allHeadphones = await Headphones.find({});
    res.status(200).json({ allHeadphones });
});

router.get("/user/get/headphones/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Headphones.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;