const express = require("express");
const router = express.Router();

const { Jeans } = require("../../admin/database/index");

router.get("/user/get/jeans", async(req, res) => {
    const allJeans = await Jeans.find({});
    res.status(200).json({ allJeans });
});

router.get("/user/get/jeans/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Jeans.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;