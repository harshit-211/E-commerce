const express = require("express");
const router = express.Router();

const { Ac } = require("../../admin/database/index");

router.get("/user/get/ac", async( req, res ) => {
    const allAcs = await Ac.find({});
    res.status(200).json({ allAcs });
});

router.get("/user/get/ac/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Ac.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;