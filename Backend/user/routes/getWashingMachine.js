const express = require("express");
const router = express.Router();

const { WashingMachine } = require("../../admin/database/index");

router.get("/user/get/washingMachine", async(req, res) => {
    const allWashingMachines = await WashingMachine.find({});
    res.status(200).json({ allWashingMachines });
});

router.get("/user/get/washingMachine/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await WashingMachine.findById(id);
    if(!findItem)
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;