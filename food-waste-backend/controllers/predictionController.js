const db = require("../db");

// GET /api/prediction
// Returns average prepared quantity across all food items (simple forecasting)
exports.predict = (req, res) => {
  db.query(
    `SELECT
       AVG(prepared)  AS avg_prepared,
       AVG(consumed)  AS avg_consumed,
       AVG(prepared - consumed) AS avg_leftover
     FROM food`,
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      const avg_prepared  = result[0].avg_prepared  || 0;
      const avg_consumed  = result[0].avg_consumed  || 0;
      const avg_leftover  = result[0].avg_leftover  || 0;

      res.json({
        predicted_quantity: Math.round(avg_consumed * 1.05), // 5% buffer
        avg_prepared:       Math.round(avg_prepared),
        avg_consumed:       Math.round(avg_consumed),
        avg_leftover:       Math.round(avg_leftover),
        recommendation:     avg_leftover > 10
          ? "Reduce preparation — high average leftover detected"
          : "Preparation levels look optimal"
      });
    }
  );
};

// GET /api/prediction/:item
// Returns prediction for a specific food item
exports.predictByItem = (req, res) => {
  const { item } = req.params;

  db.query(
    `SELECT
       AVG(prepared) AS avg_prepared,
       AVG(consumed) AS avg_consumed
     FROM food
     WHERE item = ?`,
    [item],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      const avg_consumed = result[0].avg_consumed || 0;
      res.json({
        item,
        predicted_quantity: Math.round(avg_consumed * 1.05),
        avg_consumed:       Math.round(avg_consumed)
      });
    }
  );
};
