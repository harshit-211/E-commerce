const express = require("express");
const router = express.Router();

const { Tablets } = require("../../admin/database/index");

router.get("/user/get/tablets", async(req, res) => {
    const allTablets = await Tablets.find({});
    res.status(200).json({ allTablets });
});

router.get("/user/get/tablets/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Tablets.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;