const db = require("../db");

// POST /api/waste/add
exports.addWaste = (req, res) => {
  const { date, item, wasted, reason } = req.body;

  if (!date || !item || wasted == null) {
    return res.status(400).json({ message: "Date, item, and wasted quantity required" });
  }

  db.query(
    "INSERT INTO waste (date, item, wasted, reason) VALUES (?, ?, ?, ?)",
    [date, item, wasted, reason || null],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Waste recorded successfully" });
    }
  );
};

// GET /api/waste/all
exports.getAllWaste = (req, res) => {
  db.query(
    "SELECT * FROM waste ORDER BY date DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

// GET /api/waste/summary  — total waste per item
exports.getWasteSummary = (req, res) => {
  db.query(
    `SELECT item,
            SUM(wasted)        AS total_wasted,
            COUNT(*)           AS entries,
            MAX(date)          AS last_recorded
     FROM waste
     GROUP BY item
     ORDER BY total_wasted DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};
