const router = require("express").Router();
const { addSurplus, getAllSurplus, requestPickup, updateStatus } = require("../controllers/surplusController");

router.post("/add",            addSurplus);     // Staff adds surplus
router.get("/all",             getAllSurplus);   // NGO views available surplus
router.patch("/request/:id",   requestPickup);  // NGO requests pickup
router.patch("/status/:id",    updateStatus);   // Admin updates status

module.exports = router;
