const db = require("../db");

// GET /api/report/dashboard
exports.getDashboard = (req, res) => {
  const foodQuery = `
    SELECT
      SUM(prepared)           AS total_prepared,
      SUM(consumed)           AS total_consumed
    FROM food
  `;
  const wasteQuery = `
    SELECT SUM(wasted) AS total_wasted FROM waste
  `;

  db.query(foodQuery, (err, foodResult) => {
    if (err) return res.status(500).json({ message: err.message });

    db.query(wasteQuery, (err2, wasteResult) => {
      if (err2) return res.status(500).json({ message: err2.message });

      const prepared = foodResult[0].total_prepared || 0;
      const consumed = foodResult[0].total_consumed || 0;
      const wasted   = wasteResult[0].total_wasted  || 0;
      const waste_pct = prepared > 0
        ? ((wasted / prepared) * 100).toFixed(1)
        : 0;

      res.json({
        total_prepared: prepared,
        total_consumed: consumed,
        total_wasted:   wasted,
        waste_percentage: parseFloat(waste_pct)
      });
    });
  });
};

// GET /api/report/monthly
exports.getMonthlyReport = (req, res) => {
  db.query(
    `SELECT
       DATE_FORMAT(f.date, '%Y-%m') AS month,
       SUM(f.prepared)              AS prepared,
       SUM(f.consumed)              AS consumed,
       COALESCE(SUM(w.wasted), 0)  AS wasted
     FROM food f
     LEFT JOIN waste w ON f.date = w.date
     GROUP BY month
     ORDER BY month DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

// GET /api/report/alerts
// Returns items where wasted > 20% of prepared (configurable threshold)
exports.getWasteAlert = (req, res) => {
  const threshold = req.query.threshold || 20; // percent

  db.query(
    `SELECT
       w.item,
       SUM(w.wasted)  AS total_wasted,
       SUM(f.prepared) AS total_prepared,
       ROUND((SUM(w.wasted) / SUM(f.prepared)) * 100, 1) AS waste_pct
     FROM waste w
     JOIN food f ON w.item = f.item
     GROUP BY w.item
     HAVING waste_pct > ?
     ORDER BY waste_pct DESC`,
    [threshold],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({
        alerts: results,
        threshold_used: threshold
      });
    }
  );
};
