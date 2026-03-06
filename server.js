require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.get("/", (req, res) => res.send("Server is listening to apis");

// Port (IMPORTANT for Render)
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
