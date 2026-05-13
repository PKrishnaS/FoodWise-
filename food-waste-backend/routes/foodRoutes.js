const router = require("express").Router();
const { addFood, getAllFood, getFoodByDate } = require("../controllers/foodController");

router.post("/add",        addFood);
router.get("/all",         getAllFood);
router.get("/date/:date",  getFoodByDate);

module.exports = router;
