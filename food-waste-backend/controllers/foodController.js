const db = require("../db");

// POST /api/food/add
exports.addFood = (req, res) => {
  const { date, item, prepared, consumed } = req.body;

  if (!date || !item || prepared == null || consumed == null) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO food (date, item, prepared, consumed) VALUES (?, ?, ?, ?)",
    [date, item, prepared, consumed],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Food data added successfully" });
    }
  );
};

// GET /api/food/all
exports.getAllFood = (req, res) => {
  db.query(
    "SELECT * FROM food ORDER BY date DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

// GET /api/food/date/:date
exports.getFoodByDate = (req, res) => {
  db.query(
    "SELECT * FROM food WHERE date = ?",
    [req.params.date],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};
