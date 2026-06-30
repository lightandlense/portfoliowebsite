import './GardenBackground.css';
import { SNAP_ZONES } from './snapZones';
import { SunZone } from './zones/SunZone';
import { RainbowZone } from './zones/RainbowZone';
import { ButterflyZone } from './zones/ButterflyZone';
import { BirdZone } from './zones/BirdZone';

const ZONE_COMPONENTS = {
  sun: SunZone,
  rainbow: RainbowZone,
  butterfly: ButterflyZone,
  bird: BirdZone,
  // ground zones added in Task 4 — fall through to stub
};

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
      {SNAP_ZONES.map((zone) => {
        const Component = ZONE_COMPONENTS[zone.id] || ZoneStub;
        return (
          <div
            key={zone.id}
            className="garden-zone"
            style={{ left: `${zone.xPct * 100}%`, top: `${zone.yPct * 100}%` }}
          >
            <Component zone={zone} completed={completedZones[zone.id]} />
          </div>
        );
      })}
    </div>
  );
}
