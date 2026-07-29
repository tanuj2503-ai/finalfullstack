const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ========================
// Middleware
// ========================

app.use(cors());
app.use(express.json());

// ========================
// MongoDB Connection
// ========================

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      console.warn("⚠️ MONGO_URL is not defined.");
      return;
    }

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:");
    console.error(error.message);
  }
};

connectDB();

// ========================
// Routes
// ========================

// Main API route
app.get("/api", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  res.status(200).json({
    success: true,
    message: "Backend Running Successfully",
    database: mongoConnected ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString(),
  });
});

// Health check
app.get("/api/health", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;

  res.status(mongoConnected ? 200 : 503).json({
    status: mongoConnected ? "healthy" : "degraded",
    server: "running",
    database: mongoConnected ? "connected" : "disconnected",
    uptime: Math.floor(process.uptime()),
  });
});

// ========================
// 404 Handler
// ========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// ========================
// Error Handler
// ========================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ========================
// Start Server
// ========================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});