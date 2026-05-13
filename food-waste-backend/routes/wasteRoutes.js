const router = require("express").Router();
const { addWaste, getAllWaste, getWasteSummary } = require("../controllers/wasteController");

router.post("/add",     addWaste);
router.get("/all",      getAllWaste);
router.get("/summary",  getWasteSummary);

module.exports = router;
