import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ResponsiveContainer } from "recharts";

function TelemetryCard({ label, value }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

function App() {
  const [telemetry, setTelemetry] = useState(null);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await axios.get("http://localhost:5000/telemetry");
        setTelemetry(res.data);
        setStatus("connected");
      } catch {
        setStatus("error");
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <h2>Connecting to vehicle…</h2>;

  return (
    <div className="dashboard">




<header className="top-header">
  <div className="title-block">
    <h1>Mission Telemetry Dashboard</h1>
    <p className="subtitle">Mission ID • SAT-IX-2026</p>
  </div>

  <div className="status-block">
    <span className="status-dot"></span>
    <span className="status-text">LIVE FEED</span>
  </div>

  {telemetry.signal_db < -75 && (
        <div className="alert danger">⚠ Signal Strength Critical</div>
      )}
</header>






      

      <div className="grid">
        <TelemetryCard label="Altitude" value={`${telemetry.altitude_km} km`} />
        <TelemetryCard
          label="Velocity"
          value={`${telemetry.velocity_kms} km/s`}
        />
        <TelemetryCard
          label="Temperature"
          value={`${telemetry.temperature_c} °C`}
        />
        <TelemetryCard
          label="Battery"
          value={`${telemetry.battery_percent} %`}
        />
        <TelemetryCard label="Signal" value={`${telemetry.signal_db} dB`} />
        <TelemetryCard
          label="GPS"
          value={`${telemetry.gps.latitude}, ${telemetry.gps.longitude}`}
        />
      </div>

      <p className={`status ${status}`}>Status: {status}</p>
    </div>
  );
}

export default App;
