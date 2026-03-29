const express = require("express");
const router = express.Router();

const { Earphones } = require("../../admin/database/index");

router.get("/user/get/earphones", async( req,res ) => {
    const allEarphones = await Earphones.find({});
    res.status(200).json({ allEarphones });
});

router.get("/user/get/earphones/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Earphones.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;