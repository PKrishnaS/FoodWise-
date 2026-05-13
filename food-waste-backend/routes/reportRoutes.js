const router = require("express").Router();
const { getDashboard, getMonthlyReport, getWasteAlert } = require("../controllers/reportController");

router.get("/dashboard", getDashboard);    // Dashboard summary cards
router.get("/monthly",   getMonthlyReport);// Monthly report
router.get("/alerts",    getWasteAlert);   // High waste alerts

module.exports = router;
