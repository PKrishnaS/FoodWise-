const router = require("express").Router();
const { predict, predictByItem } = require("../controllers/predictionController");

router.get("/",          predict);          // Overall average prediction
router.get("/:item",     predictByItem);    // Prediction for a specific food item

module.exports = router;
