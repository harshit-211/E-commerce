const express = require("express");
const router = express.Router();

const { tShirts } = require("../../admin/database/index");

router.get("/user/get/tshirts", async(req, res) => {
    const allTShirts = await tShirts.find({});
    res.status(200).json({ allTShirts });
});

router.get("/user/get/tshirts/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await tShirts.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;