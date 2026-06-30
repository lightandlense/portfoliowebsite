const ZONE_IDS = [
  'sun','rainbow','butterfly','bird',
  'flower-a','flower-b','flower-c',
  'beehive','watering-can','spiderweb',
];

const LS_KEY = 'llos-completed-zones';

export const initialSnapState = {
  completedZones: Object.fromEntries(ZONE_IDS.map((id) => [id, false])),
};

export const completeZone = (zoneId) => ({ type: 'SNAP_ZONE_COMPLETE', zoneId });

export function loadSnapState() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    return { completedZones: { ...initialSnapState.completedZones, ...saved } };
  } catch {
    return initialSnapState;
  }
}

export function snapReducer(state, action) {
  switch (action.type) {
    case 'SNAP_ZONE_COMPLETE': {
      const completedZones = { ...state.completedZones, [action.zoneId]: true };
      try { localStorage.setItem(LS_KEY, JSON.stringify(completedZones)); } catch {}
      return { ...state, completedZones };
    }
    default:
      return state;
  }
}
