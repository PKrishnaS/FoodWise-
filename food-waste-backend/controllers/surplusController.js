const db = require("../db");

// POST /api/surplus/add
exports.addSurplus = (req, res) => {
  const { item, quantity, date } = req.body;

  if (!item || !quantity || !date) {
    return res.status(400).json({ message: "Item, quantity, and date required" });
  }

  db.query(
    "INSERT INTO surplus (item, quantity, date) VALUES (?, ?, ?)",
    [item, quantity, date],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Surplus food added successfully" });
    }
  );
};

// GET /api/surplus/all
exports.getAllSurplus = (req, res) => {
  db.query(
    "SELECT * FROM surplus ORDER BY date DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

// PATCH /api/surplus/request/:id  (NGO requests pickup)
exports.requestPickup = (req, res) => {
  const { ngo_name } = req.body;

  db.query(
    "UPDATE surplus SET status = 'Requested', ngo_name = ? WHERE id = ?",
    [ngo_name, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Pickup requested" });
    }
  );
};

// PATCH /api/surplus/status/:id  (Admin marks as Collected)
exports.updateStatus = (req, res) => {
  const { status } = req.body; // "Available" | "Requested" | "Collected"

  db.query(
    "UPDATE surplus SET status = ? WHERE id = ?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: `Status updated to ${status}` });
    }
  );
};
