export default function WarningBanner({ telemetry }) {
  const warnings = [];

  if (telemetry.temperature_c > 60)
    warnings.push("🔥 High Temperature");
  if (telemetry.battery_percent < 45)
    warnings.push("🔋 Low Battery");
  if (telemetry.signal_db < -80)
    warnings.push("📡 Weak Signal");

  if (warnings.length === 0) return null;

  return (
    <div className="warning">
      {warnings.join(" | ")}
    </div>
  );
}
