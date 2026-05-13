const mysql = require("mysql2");


const db = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",           
  database: "food_waste_db"
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err.message);
    return;
  }
  console.log("MySQL Connected Successfully!");
});

module.exports = db;
