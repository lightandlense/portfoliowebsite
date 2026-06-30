export const SNAP_RADIUS = 70;

// xPct/yPct = fraction of viewport width/height for zone center
export const SNAP_ZONES = [
  { id: 'sun',          stickerId: 'sun-rays',       xPct: 0.82, yPct: 0.08 },
  { id: 'rainbow',      stickerId: 'rainbow-band',   xPct: 0.15, yPct: 0.13 },
  { id: 'butterfly',    stickerId: 'butterfly-wing', xPct: 0.38, yPct: 0.30 },
  { id: 'bird',         stickerId: 'bird',            xPct: 0.68, yPct: 0.22 },
  { id: 'flower-a',     stickerId: 'flower-bloom',   xPct: 0.12, yPct: 0.80 },
  { id: 'flower-b',     stickerId: 'flower-petal',   xPct: 0.35, yPct: 0.75 },
  { id: 'flower-c',     stickerId: 'flower-head',    xPct: 0.55, yPct: 0.82 },
  { id: 'beehive',      stickerId: 'bee',             xPct: 0.78, yPct: 0.58 },
  { id: 'watering-can', stickerId: 'water-stream',   xPct: 0.07, yPct: 0.87 },
  { id: 'spiderweb',    stickerId: 'web-section',    xPct: 0.93, yPct: 0.84 },
];

export function findMatchingZone(dropX, dropY, stickerId, completedZones) {
  for (const zone of SNAP_ZONES) {
    if (zone.stickerId !== stickerId) continue;
    if (completedZones[zone.id]) continue;
    const zx = zone.xPct * window.innerWidth;
    const zy = zone.yPct * window.innerHeight;
    const dist = Math.sqrt((dropX - zx) ** 2 + (dropY - zy) ** 2);
    if (dist <= SNAP_RADIUS) return zone;
  }
  return null;
}
