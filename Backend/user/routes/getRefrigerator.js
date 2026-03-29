const express = require("express");
const router = express.Router();

const { Refrigerators } = require("../../admin/database/index");

router.get("/user/get/refrigerator", async(req, res) => {
    const allRefrigerators = await Refrigerators.find({});
    res.status(200).json({ allRefrigerators });
});

router.get("/user/get/refrigerator/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Refrigerators.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;