const db = require("../db");

// POST /api/auth/register
exports.registerUser = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, role],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already exists" });
        }
        return res.status(500).json({ message: err.message });
      }
      res.json({ message: "User registered successfully" });
    }
  );
};

// POST /api/auth/login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.query(
    "SELECT id, name, email, role FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });

      if (results.length > 0) {
        res.json({ message: "Login successful", user: results[0] });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    }
  );
};

// GET /api/auth/users
exports.getAllUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, role, created_at FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

// DELETE /api/auth/users/:id
exports.deleteUser = (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "User deleted" });
  });
};
