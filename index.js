// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const indexRoutes = require("./routes/index");
const cors = require('cors');

const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(config.database.uri)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// REST API Routes
app.use("/api", indexRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: config.env === "development" ? err.message : {},
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} in ${config.env} mode`);
});
