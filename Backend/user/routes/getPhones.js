const express = require("express");
const router = express.Router();

const { Phones } = require("../../admin/database/index");

router.get("/user/get/phones", async( req, res ) => {
    const allPhones = await Phones.find({});
    res.status(200).json({ allPhones });
});

router.get("/user/get/phones/:id", async(req, res) => {
    const { id } = req.params;
    const findItem = await Phones.findById(id);
    if(!findItem) 
        return res.status(404).json({ message : "Item not found" });
    res.status(200).json({ findItem });
});

module.exports = router;