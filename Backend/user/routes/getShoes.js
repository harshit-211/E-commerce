const express = require("express");
const router = express.Router();

const { Shoes } = require("../../admin/database/index");

router.get("/user/get/shoes", async(req, res) => {
    const allShoes = await Shoes.find({});
    res.status(200).json({ allShoes });
});

router.get("/user/get/shoes/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Shoes.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;