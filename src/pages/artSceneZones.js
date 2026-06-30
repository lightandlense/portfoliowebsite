const LS_KEY = 'llos-art-scene-zones';

export const SNAP_RADIUS = 80;

// xPct/yPct = fraction of viewport; svgW/H = piece dimensions in background SVG space (4510.81 x 2524)
export const ART_SCENE_ZONES = [
  { id: 'sun-rays',            xPct: 0.919, yPct: 0.133, svgW: 201.45, svgH: 202.35 },
  { id: 'balloon-basket',      xPct: 0.187, yPct: 0.342, svgW: 197.66, svgH: 272.23 },
  { id: 'windmill-sails',      xPct: 0.852, yPct: 0.472, svgW: 429.27, svgH: 285.68 },
  { id: 'rainbow-orange-band', xPct: 0.415, yPct: 0.300, svgW: 202.06, svgH: 116.68 },
  { id: 'yellow-flower',       xPct: 0.406, yPct: 0.820, svgW:  64.64, svgH:  65.58 },
];

const initialState = { completedZones: Object.fromEntries(ART_SCENE_ZONES.map((z) => [z.id, false])) };

export function loadArtSceneState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    return { completedZones: { ...initialState.completedZones, ...saved } };
  } catch {
    return initialState;
  }
}

export function artSceneReducer(state, action) {
  if (action.type === 'SNAP') {
    const completedZones = { ...state.completedZones, [action.zoneId]: true };
    try { localStorage.setItem(LS_KEY, JSON.stringify(completedZones)); } catch {}
    return { ...state, completedZones };
  }
  return state;
}

export function findArtSceneZone(dropX, dropY, stickerId, completedZones) {
  for (const zone of ART_SCENE_ZONES) {
    if (zone.id !== stickerId) continue;
    if (completedZones[zone.id]) continue;
    const zx = zone.xPct * window.innerWidth;
    const zy = zone.yPct * window.innerHeight;
    if (Math.sqrt((dropX - zx) ** 2 + (dropY - zy) ** 2) <= SNAP_RADIUS) return zone;
  }
  return null;
}
