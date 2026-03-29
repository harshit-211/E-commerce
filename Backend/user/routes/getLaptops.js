const express = require("express");
const router = express.Router();

const { Laptops } = require("../../admin/database/index");

router.get("/user/get/laptops", async(req,res) => {
    const allLaptops = await Laptops.find({});
    res.status(200).json({ allLaptops });
});

router.get("/user/get/laptops/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Laptops.findById(id);
    if(!findItem) 
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;