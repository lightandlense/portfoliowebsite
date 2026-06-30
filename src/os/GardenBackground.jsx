import './GardenBackground.css';
import { SNAP_ZONES } from './snapZones';

// Placeholder until zone components are built in Tasks 3–4
function ZoneStub({ zone, completed }) {
  return (
    <div style={{
      width: 60, height: 60,
      border: '3px dashed #ccc',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, color: '#ccc', fontFamily: 'monospace',
      background: completed ? 'rgba(255,212,0,0.2)' : 'transparent',
    }}>
      {zone.id}
    </div>
  );
}

export function GardenBackground({ completedZones }) {
  return (
    <div className="garden-bg" aria-hidden="true">
      <div className="garden-ground" />
      {SNAP_ZONES.map((zone) => (
        <div
          key={zone.id}
          className="garden-zone"
          style={{ left: `${zone.xPct * 100}%`, top: `${zone.yPct * 100}%` }}
        >
          <ZoneStub zone={zone} completed={completedZones[zone.id]} />
        </div>
      ))}
    </div>
  );
}
