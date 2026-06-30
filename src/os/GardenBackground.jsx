import './GardenBackground.css';
import { SNAP_ZONES } from './snapZones';
import { SunZone } from './zones/SunZone';
import { RainbowZone } from './zones/RainbowZone';
import { ButterflyZone } from './zones/ButterflyZone';
import { BirdZone } from './zones/BirdZone';
import { FlowerAZone } from './zones/FlowerAZone';
import { FlowerBZone } from './zones/FlowerBZone';
import { FlowerCZone } from './zones/FlowerCZone';
import { BeehiveZone } from './zones/BeehiveZone';
import { WateringCanZone } from './zones/WateringCanZone';
import { SpiderwebZone } from './zones/SpiderwebZone';

const ZONE_COMPONENTS = {
  sun: SunZone,
  rainbow: RainbowZone,
  butterfly: ButterflyZone,
  bird: BirdZone,
  'flower-a': FlowerAZone,
  'flower-b': FlowerBZone,
  'flower-c': FlowerCZone,
  beehive: BeehiveZone,
  'watering-can': WateringCanZone,
  spiderweb: SpiderwebZone,
};

export function GardenBackground({ completedZones }) {
  return (
    <div className="garden-bg" aria-hidden="true">
      <div className="garden-ground" />
      {SNAP_ZONES.map((zone) => {
        const Component = ZONE_COMPONENTS[zone.id];
        return (
          <div
            key={zone.id}
            className="garden-zone"
            style={{ left: `${zone.xPct * 100}%`, top: `${zone.yPct * 100}%` }}
          >
            <Component completed={completedZones[zone.id]} />
          </div>
        );
      })}
    </div>
  );
}
