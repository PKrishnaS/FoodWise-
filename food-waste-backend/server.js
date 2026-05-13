const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth",       require("./routes/authRoutes"));
app.use("/api/food",       require("./routes/foodRoutes"));
app.use("/api/waste",      require("./routes/wasteRoutes"));
app.use("/api/prediction", require("./routes/predictionRoutes"));
app.use("/api/report",     require("./routes/reportRoutes"));
app.use("/api/surplus",    require("./routes/surplusRoutes"));

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Food Waste Management API is running!" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
