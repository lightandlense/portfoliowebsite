const LS_KEY = 'llos-art-scene-zones';

export const SNAP_RADIUS = 80;

// xPct/yPct = fraction of viewport; svgW/H = piece dimensions in background SVG space (1920x1080)
export const ART_SCENE_ZONES = [
  { id: 'sun-rays',            xPct: 0.835, yPct: 0.188, svgW: 201.45, svgH: 202.35 },
  { id: 'balloon-basket',      label: 'Balloon', xPct: 0.193, yPct: 0.236, svgW: 197.66, svgH: 272.23 },
  { id: 'windmill-sails',      xPct: 0.796, yPct: 0.460, svgW: 220, svgH: 216.16 },
  { id: 'pink-flower',         xPct: 0.202, yPct: 0.802, svgW:  64.64, svgH:  65.58 },
  { id: 'blue-flower',         xPct: 0.237, yPct: 0.802, svgW:  64.64, svgH:  65.58 },
  { id: 'yellow-flower',       xPct: 0.271, yPct: 0.802, svgW:  64.64, svgH:  65.58 },
  { id: 'cherry-blossom-tree', pieceId: 'cherry-blossom-leaves', label: 'Cherry Blossom Leaves', xPct: 0.509, yPct: 0.639, svgW: 180, svgH: 184 },
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
  if (action.type === 'RESET') {
    try { localStorage.removeItem(LS_KEY); } catch {}
    return { completedZones: Object.fromEntries(ART_SCENE_ZONES.map((z) => [z.id, false])) };
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
