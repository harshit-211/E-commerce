const express = require("express");
const router = express.Router();

const { Watches } = require("../../admin/database/index");

router.get("/user/get/watches", async(req, res) => {
    const allWatches = await Watches.find({});
    res.status(200).json({ allWatches });
});

router.get("/user/get/watches/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Watches.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;