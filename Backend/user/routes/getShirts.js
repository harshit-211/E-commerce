const express = require("express");
const router = express.Router();

const { Shirts } = require("../../admin/database/index");

router.get("/user/get/shirts", async(req, res) => {
    const allShirts = await Shirts.find({});
    res.status(200).json({ allShirts });
});

router.get("/user/get/shirts/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Shirts.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;