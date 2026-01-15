const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());


function generateTelemetry() {
  return {
    timestamp: new Date().toISOString(),

    altitude_km: +(400 + Math.random() * 50).toFixed(2),
    velocity_kms: +(7.5 + Math.random() * 0.5).toFixed(3),
    temperature_c: +(15 + Math.random() * 60).toFixed(1),
    battery_percent: +(40 + Math.random() * 60).toFixed(0),
    signal_db: +(-85 + Math.random() * 20).toFixed(1),

    gps: {
      latitude: +(-90 + Math.random() * 180).toFixed(5),
      longitude: +(-180 + Math.random() * 360).toFixed(5),
    },
  };
}

// API Route
app.get("/telemetry", (req, res) => {
  res.json(generateTelemetry());
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Telemetry server running on port ${PORT}`);
});
