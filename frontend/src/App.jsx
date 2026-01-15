import { useEffect, useState } from "react";
import TelemetryCard from "./components/TelemetryCard";
import WarningBanner from "./components/WarningBanner";
import "./App.css";

function App() {
  const [telemetry, setTelemetry] = useState(null);
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const res = await fetch("http://localhost:5000/telemetry");
        const data = await res.json();
        setTelemetry(data);
        setStatus("connected");
      } catch {
        setStatus("error");
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!telemetry) return <h2>Connecting to vehicle…</h2>;

  return (
    <div className="dashboard">
      <h1>🛰️ Mission Telemetry Dashboard</h1>

      <WarningBanner telemetry={telemetry} />

      <div className="grid">
        <TelemetryCard label="Altitude" value={`${telemetry.altitude_km} km`} />
        <TelemetryCard label="Velocity" value={`${telemetry.velocity_kms} km/s`} />
        <TelemetryCard label="Temperature" value={`${telemetry.temperature_c} °C`} />
        <TelemetryCard label="Battery" value={`${telemetry.battery_percent} %`} />
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
