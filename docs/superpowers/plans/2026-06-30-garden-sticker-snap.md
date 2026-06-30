# Garden Sticker Snap — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a neubrutalist garden scene to the desktop background with 10 interactive snap zones — dragging a matching special sticker onto a zone completes it and plays an animation.

**Architecture:** A `GardenBackground` layer sits absolutely between the canvas doodles and the desktop UI, rendering 10 SVG zone components at fixed percentage positions. A separate `snapReducer` manages which zones are completed (persisted to localStorage). `DesktopStickers` gains a second tray section with custom SVG stickers that trigger snap detection on drop.

**Tech Stack:** React 19, Framer Motion, Vitest, vanilla SVG in JSX, HTML5 drag API.

## Global Constraints

- Neubrutalist style: stroke `#111`, strokeWidth 3, fills from `#FFD400` / `#FF6B35` / `#E2243B` / `#fff` / `#4a8c40`
- No new npm packages — Framer Motion already installed
- All new files in `src/os/` or `src/os/zones/`
- Snap match radius: 70px
- localStorage key: `llos-completed-zones`
- Vitest for tests, run with `npm test` in `E:/Antigravity/Projects/Art Website`
- Do NOT modify `PetalBackground.jsx`

---

### Task 1: Snap zone data + reducer

**Files:**
- Create: `src/os/snapZones.js`
- Create: `src/os/state/snapReducer.js`
- Create: `src/os/state/snapReducer.test.js`

**Interfaces:**
- Produces:
  - `SNAP_ZONES` — array of `{ id, stickerId, xPct, yPct }`
  - `SNAP_RADIUS` — number (70)
  - `initialSnapState` — `{ completedZones: Record<string, boolean> }`
  - `loadSnapState()` — reads localStorage, returns state shape
  - `snapReducer(state, action)` — pure reducer
  - `completeZone(zoneId)` — action creator

- [ ] **Step 1: Write the failing tests**

Create `src/os/state/snapReducer.test.js`:

```js
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { snapReducer, initialSnapState, completeZone, loadSnapState } from './snapReducer';

describe('snapReducer', () => {
  it('starts with all zones incomplete', () => {
    expect(Object.values(initialSnapState.completedZones).every(v => v === false)).toBe(true);
    expect(Object.keys(initialSnapState.completedZones)).toHaveLength(10);
  });

  it('completes a zone', () => {
    const next = snapReducer(initialSnapState, completeZone('sun'));
    expect(next.completedZones.sun).toBe(true);
    expect(next.completedZones.rainbow).toBe(false);
  });

  it('does not mutate previous state', () => {
    const s0 = initialSnapState;
    const s1 = snapReducer(s0, completeZone('sun'));
    expect(s0.completedZones.sun).toBe(false);
    expect(s1).not.toBe(s0);
  });

  it('unknown action returns unchanged state', () => {
    const s = snapReducer(initialSnapState, { type: 'NOOP' });
    expect(s).toBe(initialSnapState);
  });
});

describe('loadSnapState', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('returns initial state when nothing saved', () => {
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(false);
  });

  it('merges saved completions onto initial state', () => {
    localStorage.setItem('llos-completed-zones', JSON.stringify({ sun: true, bird: true }));
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(true);
    expect(s.completedZones.bird).toBe(true);
    expect(s.completedZones.rainbow).toBe(false);
  });

  it('returns initial state when localStorage contains invalid JSON', () => {
    localStorage.setItem('llos-completed-zones', 'not-json');
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```
cd "E:/Antigravity/Projects/Art Website" && npm test -- snapReducer
```

Expected: FAIL — `snapReducer` not found.

- [ ] **Step 3: Create `src/os/snapZones.js`**

```js
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
```

- [ ] **Step 4: Create `src/os/state/snapReducer.js`**

```js
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
```

- [ ] **Step 5: Run tests to verify they pass**

```
npm test -- snapReducer
```

Expected: all 7 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add src/os/snapZones.js src/os/state/snapReducer.js src/os/state/snapReducer.test.js
git commit -m "feat: add snap zone data and reducer"
```

---

### Task 2: GardenBackground skeleton + Desktop wiring

**Files:**
- Create: `src/os/GardenBackground.jsx`
- Create: `src/os/GardenBackground.css`
- Modify: `src/os/Desktop.jsx` — add snapReducer + render GardenBackground

**Interfaces:**
- Consumes: `loadSnapState`, `snapReducer`, `completeZone` from Task 1; `SNAP_ZONES` from snapZones.js
- Produces: `<GardenBackground completedZones={...} />` renders between canvas and UI layers

- [ ] **Step 1: Write failing render test**

Create `src/os/GardenBackground.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { GardenBackground } from './GardenBackground';

const allFalse = {
  sun: false, rainbow: false, butterfly: false, bird: false,
  'flower-a': false, 'flower-b': false, 'flower-c': false,
  beehive: false, 'watering-can': false, spiderweb: false,
};

describe('GardenBackground', () => {
  it('renders without crashing', () => {
    const { container } = render(<GardenBackground completedZones={allFalse} />);
    expect(container.querySelector('.garden-bg')).not.toBeNull();
  });

  it('renders 10 zone wrappers', () => {
    const { container } = render(<GardenBackground completedZones={allFalse} />);
    expect(container.querySelectorAll('.garden-zone').length).toBe(10);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```
npm test -- GardenBackground
```

Expected: FAIL — `GardenBackground` not found.

- [ ] **Step 3: Create `src/os/GardenBackground.css`**

```css
.garden-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

/* ground strip — bottom 25% */
.garden-ground {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  background: #4a8c40;
  border-top: 3px solid #111;
}

/* each zone is absolutely positioned at its % coords */
.garden-zone {
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
```

- [ ] **Step 4: Create `src/os/GardenBackground.jsx` (stub zones)**

```jsx
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
```

- [ ] **Step 5: Run test to verify it passes**

```
npm test -- GardenBackground
```

Expected: PASS.

- [ ] **Step 6: Wire GardenBackground into Desktop.jsx**

In `src/os/Desktop.jsx`, add these imports at the top:

```jsx
import { useReducer as useSnapReducer } from 'react'; // already imported as useReducer
import { GardenBackground } from './GardenBackground';
import { snapReducer, loadSnapState, completeZone } from './state/snapReducer';
```

Change the existing `useReducer` import line — React's `useReducer` is already imported. Add a second reducer call inside `Desktop()`:

```jsx
export function Desktop() {
  const [booting, setBooting] = useState(true);
  const [state, dispatch] = useReducer(windowReducer, undefined, lazyInit);
  const [snapState, snapDispatch] = useReducer(snapReducer, undefined, loadSnapState); // ADD THIS
  const reducedMotion = useReducedMotion();
```

In the JSX return, add `<GardenBackground>` after `<PetalBackground>` and pass snap props to `<DesktopStickers>`:

```jsx
  return (
    <div className="os-root">
      {booting && <BootScreen onDone={() => setBooting(false)} />}
      <PetalBackground reducedMotion={reducedMotion} />
      <GardenBackground completedZones={snapState.completedZones} />  {/* ADD */}
      <TopBar onOpen={onOpen} />
      <DesktopIcons onOpen={onOpen} />
      {state.windows.map((win) => (
        // ... unchanged ...
      ))}
      <DesktopStickers
        completedZones={snapState.completedZones}     {/* ADD */}
        onSnap={(zoneId) => snapDispatch(completeZone(zoneId))}  {/* ADD */}
      />
      <IdleToast />
    </div>
  );
```

- [ ] **Step 7: Verify full test suite still passes**

```
npm test
```

Expected: all tests PASS (DesktopStickers will get the new props but ignores unknown props for now).

- [ ] **Step 8: Commit**

```bash
git add src/os/GardenBackground.jsx src/os/GardenBackground.css src/os/GardenBackground.test.jsx src/os/Desktop.jsx
git commit -m "feat: add GardenBackground skeleton and wire snap state into Desktop"
```

---

### Task 3: Sky zone SVG components

**Files:**
- Create: `src/os/zones/SunZone.jsx`
- Create: `src/os/zones/RainbowZone.jsx`
- Create: `src/os/zones/ButterflyZone.jsx`
- Create: `src/os/zones/BirdZone.jsx`
- Modify: `src/os/GardenBackground.jsx` — replace ZoneStub with real components for sky zones

**Interfaces:**
- Each zone: `function SunZone({ completed })` — renders an SVG, no other props needed

- [ ] **Step 1: Create `src/os/zones/SunZone.jsx`**

```jsx
import { motion, AnimatePresence } from 'framer-motion';

const CX = 50, CY = 50, R = 20, R1 = 26, R2 = 40;

function toXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function Ray({ angle, color = '#111' }) {
  const [x1, y1] = toXY(CX, CY, R1, angle);
  const [x2, y2] = toXY(CX, CY, R2, angle);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" />;
}

const LEFT_RAYS = [135, 180, 225, 270, 315];
const RIGHT_RAYS = [0, 45, 90];

export function SunZone({ completed }) {
  return (
    <motion.svg
      viewBox="0 0 100 100" width={100} height={100}
      animate={completed ? { rotate: [0, 360] } : {}}
      transition={completed ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
    >
      {LEFT_RAYS.map((a) => <Ray key={a} angle={a} />)}
      <AnimatePresence>
        {completed && RIGHT_RAYS.map((a, i) => (
          <motion.g key={a} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 15 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <Ray angle={a} />
          </motion.g>
        ))}
      </AnimatePresence>
      {/* incomplete hint: dotted outlines where rays will appear */}
      {!completed && RIGHT_RAYS.map((a) => <Ray key={`hint-${a}`} angle={a} color="rgba(17,17,17,0.12)" />)}
      <circle cx={CX} cy={CY} r={R} fill="#FFD400" stroke="#111" strokeWidth="3" />
    </motion.svg>
  );
}
```

- [ ] **Step 2: Create `src/os/zones/RainbowZone.jsx`**

```jsx
import { motion, AnimatePresence } from 'framer-motion';

const BANDS = [
  { r: 48, color: '#E2243B' },   // red — outermost
  { r: 40, color: '#FF6B35' },   // orange — MISSING in incomplete
  { r: 32, color: '#FFD400' },   // yellow
  { r: 24, color: '#4a8c40' },   // green
  { r: 16, color: '#3b82f6' },   // blue — innermost
];

const MISSING_BAND = BANDS[1]; // orange

function Arc({ r, color }) {
  // Semicircle arc from (10, 60) curving up to (110, 60) at radius r from center (60, 60)
  return (
    <path
      d={`M ${60 - r} 60 A ${r} ${r} 0 0 1 ${60 + r} 60`}
      fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
    />
  );
}

export function RainbowZone({ completed }) {
  return (
    <svg viewBox="0 0 120 80" width={120} height={80}>
      {/* cloud */}
      <ellipse cx="60" cy="65" rx="52" ry="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="35" cy="60" r="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="55" cy="54" r="17" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="75" cy="57" r="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="90" cy="63" r="11" fill="#fff" stroke="#111" strokeWidth="3" />
      {/* always-visible bands (skip orange) */}
      {BANDS.filter(b => b !== MISSING_BAND).map(b => <Arc key={b.r} {...b} />)}
      {/* missing band: hint in incomplete, animated in complete */}
      {!completed && <Arc r={MISSING_BAND.r} color="rgba(17,17,17,0.1)" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 1.2, 1] }}
            transition={{ duration: 0.4, times: [0, 0.6, 1] }}>
            <Arc r={MISSING_BAND.r} color={MISSING_BAND.color} />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 3: Create `src/os/zones/ButterflyZone.jsx`**

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function ButterflyZone({ completed }) {
  return (
    <svg viewBox="0 0 80 60" width={80} height={60}>
      {/* body */}
      <ellipse cx="40" cy="30" rx="4" ry="14" fill="#111" />
      {/* antennae */}
      <line x1="38" y1="16" x2="28" y2="6" stroke="#111" strokeWidth="2" />
      <line x1="42" y1="16" x2="52" y2="6" stroke="#111" strokeWidth="2" />
      <circle cx="28" cy="5" r="2" fill="#111" />
      <circle cx="52" cy="5" r="2" fill="#111" />
      {/* right wing — always visible */}
      <path d="M 44 22 Q 72 8 74 30 Q 72 48 44 38 Z" fill="#FF6B35" stroke="#111" strokeWidth="3" />
      {/* left wing — outline hint in incomplete, filled in complete */}
      {!completed && (
        <path d="M 36 22 Q 8 8 6 30 Q 8 48 36 38 Z"
          fill="rgba(255,107,53,0.12)" stroke="rgba(17,17,17,0.2)" strokeWidth="2" strokeDasharray="4 3" />
      )}
      <AnimatePresence>
        {completed && (
          <motion.path
            d="M 36 22 Q 8 8 6 30 Q 8 48 36 38 Z"
            fill="#FF6B35" stroke="#111" strokeWidth="3"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            style={{ transformOrigin: '36px 30px' }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 4: Create `src/os/zones/BirdZone.jsx`**

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function BirdZone({ completed }) {
  return (
    <svg viewBox="0 0 110 70" width={110} height={70}>
      {/* branch */}
      <path d="M 5 50 Q 55 42 105 52" fill="none" stroke="#4a8c40" strokeWidth="5" strokeLinecap="round" />
      {/* leaf nubs */}
      <ellipse cx="30" cy="46" rx="8" ry="4" fill="#4a8c40" transform="rotate(-20 30 46)" />
      <ellipse cx="70" cy="44" rx="8" ry="4" fill="#4a8c40" transform="rotate(15 70 44)" />
      {/* bird — hidden in incomplete */}
      <AnimatePresence>
        {completed && (
          <motion.g
            initial={{ y: -12, opacity: 0 }} animate={{ y: [0, -3, 0] }}
            transition={{ y: { delay: 0.15, duration: 0.3, repeat: 2, type: 'tween' }, opacity: { duration: 0.2 } }}
          >
            {/* body */}
            <ellipse cx="55" cy="36" rx="12" ry="8" fill="#E2243B" stroke="#111" strokeWidth="2.5" />
            {/* head */}
            <circle cx="67" cy="32" r="7" fill="#E2243B" stroke="#111" strokeWidth="2.5" />
            {/* beak */}
            <polygon points="73,31 80,33 73,35" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
            {/* eye */}
            <circle cx="69" cy="31" r="1.5" fill="#111" />
            {/* wing */}
            <path d="M 52 36 Q 50 26 58 28 Q 62 32 55 38 Z" fill="#111" opacity="0.3" />
            {/* tail */}
            <path d="M 43 36 L 36 30 M 43 37 L 35 37 M 43 38 L 36 44"
              stroke="#E2243B" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>
      {/* hint dot where bird will appear */}
      {!completed && <circle cx="55" cy="38" r="4" fill="rgba(17,17,17,0.08)" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" strokeDasharray="3 2" />}
    </svg>
  );
}
```

- [ ] **Step 5: Update GardenBackground to use sky zone components**

In `src/os/GardenBackground.jsx`, replace the import and ZoneStub usage:

```jsx
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
```

- [ ] **Step 6: Run tests**

```
npm test
```

Expected: all PASS.

- [ ] **Step 7: Commit**

```bash
git add src/os/zones/SunZone.jsx src/os/zones/RainbowZone.jsx src/os/zones/ButterflyZone.jsx src/os/zones/BirdZone.jsx src/os/GardenBackground.jsx
git commit -m "feat: add sky zone SVG components (sun, rainbow, butterfly, bird)"
```

---

### Task 4: Ground zone SVG components

**Files:**
- Create: `src/os/zones/FlowerAZone.jsx`
- Create: `src/os/zones/FlowerBZone.jsx`
- Create: `src/os/zones/FlowerCZone.jsx`
- Create: `src/os/zones/BeehiveZone.jsx`
- Create: `src/os/zones/WateringCanZone.jsx`
- Create: `src/os/zones/SpiderwebZone.jsx`
- Modify: `src/os/GardenBackground.jsx` — add all 6 ground zone imports

**Interfaces:**
- Each zone: `function FlowerAZone({ completed })` (same pattern as Task 3)

- [ ] **Step 1: Create `src/os/zones/FlowerAZone.jsx`**

Stem + leaves always visible. Bloom pops in on complete.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function FlowerAZone({ completed }) {
  return (
    <svg viewBox="0 0 60 100" width={60} height={100}>
      {/* stem */}
      <line x1="30" y1="98" x2="30" y2="42" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="20" cy="74" rx="12" ry="5" fill="#4a8c40" transform="rotate(-30 20 74)" />
      <ellipse cx="40" cy="62" rx="12" ry="5" fill="#4a8c40" transform="rotate(30 40 62)" />
      {/* bloom hint */}
      {!completed && <circle cx="30" cy="34" r="14" fill="rgba(226,36,59,0.08)" stroke="rgba(17,17,17,0.12)" strokeWidth="1.5" strokeDasharray="4 3" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            style={{ transformOrigin: '30px 34px' }}>
            {/* petals */}
            {[0,60,120,180,240,300].map((a) => {
              const rad = a * Math.PI / 180;
              return <ellipse key={a} cx={30 + 13 * Math.cos(rad)} cy={34 + 13 * Math.sin(rad)}
                rx="7" ry="5" fill="#E2243B" stroke="#111" strokeWidth="2"
                transform={`rotate(${a} ${30 + 13 * Math.cos(rad)} ${34 + 13 * Math.sin(rad)})`} />;
            })}
            <circle cx="30" cy="34" r="7" fill="#FFD400" stroke="#111" strokeWidth="2" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 2: Create `src/os/zones/FlowerBZone.jsx`**

Full flower with one petal cluster (3 right-side petals) missing in incomplete.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

const ALL_PETAL_ANGLES = [0, 60, 120, 180, 240, 300];
const ALWAYS_ANGLES = [120, 180, 240];   // left side — always shown
const MISSING_ANGLES = [0, 60, 300];     // right side — missing until complete

function Petal({ angle, opacity = 1, dashed = false }) {
  const rad = angle * Math.PI / 180;
  const cx = 40 + 13 * Math.cos(rad), cy = 40 + 13 * Math.sin(rad);
  return (
    <ellipse cx={cx} cy={cy} rx="7" ry="5"
      fill={dashed ? 'rgba(226,36,59,0.1)' : '#E2243B'}
      stroke={dashed ? 'rgba(17,17,17,0.18)' : '#111'} strokeWidth="2"
      strokeDasharray={dashed ? '3 2' : 'none'}
      transform={`rotate(${angle} ${cx} ${cy})`}
      opacity={opacity}
    />
  );
}

export function FlowerBZone({ completed }) {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80}>
      <line x1="40" y1="78" x2="40" y2="50" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      {ALWAYS_ANGLES.map((a) => <Petal key={a} angle={a} />)}
      {!completed && MISSING_ANGLES.map((a) => <Petal key={a} angle={a} dashed />)}
      <AnimatePresence>
        {completed && MISSING_ANGLES.map((a, i) => (
          <motion.g key={a} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 16 }}
            style={{ transformOrigin: '40px 40px' }}>
            <Petal angle={a} />
          </motion.g>
        ))}
      </AnimatePresence>
      <circle cx="40" cy="40" r="8" fill="#FFD400" stroke="#111" strokeWidth="2" />
    </svg>
  );
}
```

- [ ] **Step 3: Create `src/os/zones/FlowerCZone.jsx`**

Bare stem in incomplete. Full flower head grows from stem tip on complete.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function FlowerCZone({ completed }) {
  return (
    <svg viewBox="0 0 60 100" width={60} height={100}>
      <line x1="30" y1="98" x2="30" y2="50" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="22" cy="76" rx="10" ry="4" fill="#4a8c40" transform="rotate(-25 22 76)" />
      {!completed && <circle cx="30" cy="44" r="3" fill="rgba(17,17,17,0.12)" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            style={{ transformOrigin: '30px 50px' }}>
            {[0,60,120,180,240,300].map((a) => {
              const rad = a * Math.PI / 180;
              return <ellipse key={a} cx={30 + 12 * Math.cos(rad)} cy={42 + 12 * Math.sin(rad)}
                rx="7" ry="5" fill="#FF6B35" stroke="#111" strokeWidth="2"
                transform={`rotate(${a} ${30 + 12 * Math.cos(rad)} ${42 + 12 * Math.sin(rad)})`} />;
            })}
            <circle cx="30" cy="42" r="7" fill="#FFD400" stroke="#111" strokeWidth="2" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 4: Create `src/os/zones/BeehiveZone.jsx`**

Hive with no bee in incomplete. Bee appears and does a figure-8 path on complete.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function BeehiveZone({ completed }) {
  return (
    <svg viewBox="0 0 80 100" width={80} height={100}>
      {/* hanging string */}
      <line x1="40" y1="0" x2="40" y2="14" stroke="#111" strokeWidth="2" strokeDasharray="3 2" />
      {/* hive body */}
      <path d="M 40 14 L 62 30 L 62 70 Q 62 82 40 88 Q 18 82 18 70 L 18 30 Z"
        fill="#FFD400" stroke="#111" strokeWidth="3" />
      {/* cell lines */}
      <line x1="40" y1="14" x2="40" y2="88" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="40" x2="62" y2="40" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="58" x2="62" y2="58" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      {/* entrance hole */}
      <ellipse cx="40" cy="82" rx="7" ry="4" fill="#111" />
      {/* bee hint */}
      {!completed && <circle cx="64" cy="28" r="5" fill="rgba(255,212,0,0.2)" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" strokeDasharray="3 2" />}
      <AnimatePresence>
        {completed && (
          <motion.g
            animate={{ x: [0, 14, 0, -10, 0], y: [0, -8, 4, -6, 0] }}
            transition={{ duration: 1.2, repeat: 2, ease: 'easeInOut' }}
            style={{ x: 64, y: 20 }}>
            {/* bee body */}
            <ellipse cx="0" cy="0" rx="7" ry="5" fill="#FFD400" stroke="#111" strokeWidth="2" />
            <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#111" strokeWidth="1.5" />
            <line x1="-5" y1="1" x2="5" y2="1" stroke="#111" strokeWidth="1.5" />
            {/* wings */}
            <ellipse cx="-3" cy="-7" rx="5" ry="3" fill="rgba(255,255,255,0.7)" stroke="#111" strokeWidth="1.5" transform="rotate(-20 -3 -7)" />
            <ellipse cx="3" cy="-7" rx="5" ry="3" fill="rgba(255,255,255,0.7)" stroke="#111" strokeWidth="1.5" transform="rotate(20 3 -7)" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 5: Create `src/os/zones/WateringCanZone.jsx`**

Can body + spout always visible. Water arc animates out of spout on complete.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

export function WateringCanZone({ completed }) {
  return (
    <svg viewBox="0 0 100 80" width={100} height={80}>
      {/* can body */}
      <rect x="10" y="28" width="48" height="36" rx="4" fill="#3b82f6" stroke="#111" strokeWidth="3" />
      {/* handle */}
      <path d="M 10 36 Q 0 46 10 56" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      {/* spout */}
      <path d="M 58 38 Q 76 32 82 24" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      {/* spout tip */}
      <circle cx="82" cy="23" r="3" fill="#111" />
      {/* water hint */}
      {!completed && (
        <path d="M 82 24 Q 90 34 86 48 Q 84 54 88 60"
          fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
      )}
      <AnimatePresence>
        {completed && (
          <motion.g>
            {[0, 1, 2].map((i) => (
              <motion.path key={i}
                d={`M ${82 + i * 4} ${24 + i * 6} Q ${90 + i * 2} ${36 + i * 6} ${86 + i * 3} ${52 + i * 4}`}
                fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
      {/* lid */}
      <ellipse cx="34" cy="28" rx="24" ry="5" fill="#3b82f6" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}
```

- [ ] **Step 6: Create `src/os/zones/SpiderwebZone.jsx`**

3/4 of the web always visible, one pie-slice section missing.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

const CX = 40, CY = 40, RINGS = [14, 24, 34];
// 5 spokes at 0, 72, 144, 216, 288 degrees (pentagon web)
// The "missing" section is between 0° and 72° (top-right quadrant)
const SPOKE_ANGLES = [72, 144, 216, 288, 360]; // 0/360 is the gap boundary
const MISSING_ANGLES = [0, 72];

function toXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function SpiderwebZone({ completed }) {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80}>
      {/* always-visible spokes (3 of 5) */}
      {[144, 216, 288].map((a) => {
        const [x, y] = toXY(CX, CY, 36, a);
        return <line key={a} x1={CX} y1={CY} x2={x} y2={y} stroke="#111" strokeWidth="1.5" />;
      })}
      {/* always-visible ring arcs (3 rings, 3/5 of each) */}
      {RINGS.map((r) => (
        ['144,216','216,288','288,360'].map((pair) => {
          const [a1, a2] = pair.split(',').map(Number);
          const [x1,y1] = toXY(CX, CY, r, a1);
          const [x2,y2] = toXY(CX, CY, r, a2);
          return <path key={`${r}-${pair}`}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none" stroke="#111" strokeWidth="1.5" />;
        })
      ))}
      {/* missing section hint */}
      {!completed && RINGS.map((r) => {
        const [x1,y1] = toXY(CX, CY, r, 0);
        const [x2,y2] = toXY(CX, CY, r, 72);
        return <path key={`hint-${r}`}
          d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
          fill="none" stroke="rgba(17,17,17,0.12)" strokeWidth="1.5" strokeDasharray="3 2" />;
      })}
      {/* spider */}
      <circle cx={CX} cy={CY} r="4" fill="#111" />
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 0.6, times: [0, 0.5, 1] }}>
            {/* fill in the 2 missing spokes */}
            {[0, 72].map((a) => {
              const [x,y] = toXY(CX, CY, 36, a);
              return <motion.line key={a} x1={CX} y1={CY} x2={x} y2={y}
                stroke="#111" strokeWidth="1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }} />;
            })}
            {/* fill in missing ring arcs */}
            {RINGS.map((r) => {
              const [x1,y1] = toXY(CX, CY, r, 0);
              const [x2,y2] = toXY(CX, CY, r, 72);
              return <motion.path key={r}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none" stroke="#111" strokeWidth="1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }} />;
            })}
            {/* shimmer overlay */}
            <motion.circle cx={CX} cy={CY} r="36" fill="none"
              stroke="rgba(255,212,0,0.4)" strokeWidth="1"
              initial={{ r: 0, opacity: 1 }} animate={{ r: 50, opacity: 0 }}
              transition={{ duration: 0.6 }} />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
```

- [ ] **Step 7: Update GardenBackground to use all 10 zone components**

Replace the `ZONE_COMPONENTS` map in `src/os/GardenBackground.jsx`:

```jsx
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
```

- [ ] **Step 8: Run tests**

```
npm test
```

Expected: all PASS.

- [ ] **Step 9: Commit**

```bash
git add src/os/zones/FlowerAZone.jsx src/os/zones/FlowerBZone.jsx src/os/zones/FlowerCZone.jsx src/os/zones/BeehiveZone.jsx src/os/zones/WateringCanZone.jsx src/os/zones/SpiderwebZone.jsx src/os/GardenBackground.jsx
git commit -m "feat: add ground zone SVG components (flowers, beehive, watering can, spiderweb)"
```

---

### Task 5: Special stickers in tray + snap detection

**Files:**
- Create: `src/os/zones/SpecialStickerIcon.jsx` — small SVG icons for the tray
- Modify: `src/os/DesktopStickers.jsx` — add special sticker section, snap detection, new props

**Interfaces:**
- Consumes: `findMatchingZone`, `SNAP_ZONES`, `SNAP_RADIUS` from `snapZones.js`
- `DesktopStickers` now accepts props: `completedZones: Record<string, boolean>`, `onSnap: (zoneId: string) => void`

- [ ] **Step 1: Create `src/os/zones/SpecialStickerIcon.jsx`**

Small inline SVG icons for each special sticker (the "missing piece" that goes in the tray):

```jsx
// Each icon is a small 32x32 SVG showing the missing piece
export function SpecialStickerIcon({ stickerId }) {
  switch (stickerId) {
    case 'sun-rays':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0, 45, 90].map((a) => {
            const rad = (a - 90) * Math.PI / 180;
            const r1 = 10, r2 = 15;
            return <line key={a}
              x1={16 + r1 * Math.cos(rad)} y1={16 + r1 * Math.sin(rad)}
              x2={16 + r2 * Math.cos(rad)} y2={16 + r2 * Math.sin(rad)}
              stroke="#111" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </svg>
      );
    case 'rainbow-band':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <path d="M 2 20 A 14 14 0 0 1 30 20" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'butterfly-wing':
      return (
        <svg viewBox="0 0 32 28" width={28} height={25}>
          <path d="M 16 10 Q 2 2 2 14 Q 2 24 16 20 Z" fill="#FF6B35" stroke="#111" strokeWidth="2" />
        </svg>
      );
    case 'bird':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <ellipse cx="16" cy="14" rx="8" ry="5" fill="#E2243B" stroke="#111" strokeWidth="2" />
          <circle cx="22" cy="10" r="5" fill="#E2243B" stroke="#111" strokeWidth="2" />
          <polygon points="26,9 30,11 26,13" fill="#FFD400" stroke="#111" strokeWidth="1" />
        </svg>
      );
    case 'flower-bloom':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,60,120,180,240,300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#E2243B" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
          <circle cx="16" cy="16" r="5" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
        </svg>
      );
    case 'flower-petal':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0, 60, 300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#E2243B" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
        </svg>
      );
    case 'flower-head':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,60,120,180,240,300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#FF6B35" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
          <circle cx="16" cy="16" r="5" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
        </svg>
      );
    case 'bee':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <ellipse cx="16" cy="14" rx="8" ry="6" fill="#FFD400" stroke="#111" strokeWidth="2" />
          <line x1="10" y1="12" x2="22" y2="12" stroke="#111" strokeWidth="1.5" />
          <line x1="10" y1="15" x2="22" y2="15" stroke="#111" strokeWidth="1.5" />
          <ellipse cx="11" cy="7" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#111" strokeWidth="1.5" transform="rotate(-20 11 7)" />
          <ellipse cx="21" cy="7" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#111" strokeWidth="1.5" transform="rotate(20 21 7)" />
        </svg>
      );
    case 'water-stream':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,1,2].map((i) => (
            <path key={i} d={`M ${6+i*4} ${4+i*4} Q ${18+i*2} ${16+i*3} ${14+i*3} ${28+i*2}`}
              fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'web-section':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          <line x1="16" y1="16" x2="16" y2="2" stroke="#111" strokeWidth="1.5" />
          <line x1="16" y1="16" x2="29" y2="8" stroke="#111" strokeWidth="1.5" />
          {[8, 14, 20].map((r) => {
            const [x1, y1] = [16, 16 - r];
            const rad = (72 - 90) * Math.PI / 180;
            const [x2, y2] = [16 + r * Math.cos(rad), 16 + r * Math.sin(rad)];
            return <path key={r} d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none" stroke="#111" strokeWidth="1.5" />;
          })}
        </svg>
      );
    default:
      return <span style={{ fontSize: 20 }}>✦</span>;
  }
}

export const SPECIAL_STICKERS = [
  { stickerId: 'sun-rays',       label: 'Sun rays' },
  { stickerId: 'rainbow-band',   label: 'Rainbow band' },
  { stickerId: 'butterfly-wing', label: 'Butterfly wing' },
  { stickerId: 'bird',           label: 'Bird' },
  { stickerId: 'flower-bloom',   label: 'Flower bloom' },
  { stickerId: 'flower-petal',   label: 'Flower petal' },
  { stickerId: 'flower-head',    label: 'Flower head' },
  { stickerId: 'bee',            label: 'Bee' },
  { stickerId: 'water-stream',   label: 'Water stream' },
  { stickerId: 'web-section',    label: 'Web section' },
];
```

- [ ] **Step 2: Rewrite `src/os/DesktopStickers.jsx` with snap detection**

Replace the full file content:

```jsx
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { findMatchingZone, SNAP_ZONES } from './snapZones';
import { SpecialStickerIcon, SPECIAL_STICKERS } from './zones/SpecialStickerIcon';
import './DesktopStickers.css';

const STAMPS = [
  '⭐','💥','🔥','✨','🎨','🎮','📷','🚀',
  '💡','🎯','💫','⚡','🌈','🎲','👾','🌀',
  '🌸','🦋','🎪','🎭','🌟','💎','🎬','🏆',
];

let nextId = 0;

export function DesktopStickers({ completedZones = {}, onSnap = () => {} }) {
  const [stickers, setStickers] = useState([]);
  const [open, setOpen] = useState(false);
  const dragging = useRef(null); // { kind: 'emoji'|'special', emoji?, stickerId? }

  useEffect(() => {
    function onDragOver(e) {
      if (dragging.current) e.preventDefault();
    }
    function onDrop(e) {
      const d = dragging.current;
      dragging.current = null;
      if (!d) return;
      if (e.target.closest('.os-window') || e.target.closest('.sticker-dock')) return;
      e.preventDefault();

      if (d.kind === 'special') {
        const match = findMatchingZone(e.clientX, e.clientY, d.stickerId, completedZones);
        if (match) {
          onSnap(match.id);
          setOpen(false);
          return;
        }
        setStickers((prev) => [
          ...prev,
          { id: nextId++, kind: 'special', stickerId: d.stickerId, x: e.clientX - 18, y: e.clientY - 18 },
        ]);
      } else {
        setStickers((prev) => [
          ...prev,
          { id: nextId++, kind: 'emoji', emoji: d.emoji, x: e.clientX - 18, y: e.clientY - 18 },
        ]);
      }
      setOpen(false);
    }
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);
    return () => {
      document.removeEventListener('dragover', onDragOver);
      document.removeEventListener('drop', onDrop);
    };
  }, [completedZones, onSnap]);

  const onDragStartEmoji = useCallback((emoji, e) => {
    dragging.current = { kind: 'emoji', emoji };
    const ghost = document.createElement('span');
    ghost.textContent = emoji;
    ghost.style.cssText = 'position:fixed;top:-999px;font-size:28px;pointer-events:none';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    setTimeout(() => ghost.remove(), 0);
  }, []);

  const onDragStartSpecial = useCallback((stickerId, e) => {
    dragging.current = { kind: 'special', stickerId };
    const ghost = document.createElement('div');
    ghost.style.cssText = 'position:fixed;top:-999px;width:32px;height:32px;background:#FFD400;border:2px solid #111';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 16, 16);
    setTimeout(() => ghost.remove(), 0);
  }, []);

  const removeSticker = useCallback((id) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return (
    <>
      {stickers.map((s) => (
        <motion.div key={s.id} className="desktop-sticker" drag dragMomentum={false} style={{ x: s.x, y: s.y }}>
          {s.kind === 'emoji'
            ? <span className="desktop-sticker__emoji">{s.emoji}</span>
            : <div className="desktop-sticker__svg"><SpecialStickerIcon stickerId={s.stickerId} /></div>
          }
          <button className="desktop-sticker__remove" aria-label="Remove sticker" onClick={() => removeSticker(s.id)}>×</button>
        </motion.div>
      ))}

      <div className="sticker-dock">
        {open && (
          <div className="sticker-tray">
            <p className="sticker-tray__hint">drag to desktop</p>
            <div className="sticker-tray__grid">
              {STAMPS.map((emoji) => (
                <span key={emoji} className="sticker-tray__stamp" draggable
                  onDragStart={(e) => onDragStartEmoji(emoji, e)}
                  aria-label={emoji} role="img">
                  {emoji}
                </span>
              ))}
            </div>
            <p className="sticker-tray__hint sticker-tray__hint--special">find their spot ✦</p>
            <div className="sticker-tray__grid sticker-tray__grid--special">
              {SPECIAL_STICKERS.map(({ stickerId, label }) => {
                const zone = SNAP_ZONES.find((z) => z.stickerId === stickerId);
                const isCompleted = zone ? completedZones[zone.id] : false;
                return (
                  <span key={stickerId}
                    className={`sticker-tray__stamp sticker-tray__stamp--special${isCompleted ? ' sticker-tray__stamp--done' : ''}`}
                    draggable={!isCompleted}
                    onDragStart={!isCompleted ? (e) => onDragStartSpecial(stickerId, e) : undefined}
                    aria-label={label} role="img" title={label}>
                    <SpecialStickerIcon stickerId={stickerId} />
                    {isCompleted && <span className="sticker-tray__check">✓</span>}
                  </span>
                );
              })}
            </div>
          </div>
        )}
        <button className="sticker-dock__btn" onClick={() => setOpen((v) => !v)}
          aria-label="Sticker folder" title="Sticker folder">
          🗂️
        </button>
      </div>
    </>
  );
}
```

- [ ] **Step 3: Add CSS for special sticker section to `src/os/DesktopStickers.css`**

Append to the file:

```css
.sticker-tray__hint--special {
  margin-top: 10px;
  color: #E2243B;
  opacity: 1;
}

.sticker-tray__grid--special {
  grid-template-columns: repeat(5, 1fr);
}

.sticker-tray__stamp--special {
  position: relative;
  border: 2px solid #FFD400;
  background: rgba(255,212,0,0.08);
}

.sticker-tray__stamp--special:hover {
  border-color: #111;
  background: rgba(255,212,0,0.2);
}

.sticker-tray__stamp--done {
  opacity: 0.4;
  cursor: default;
  border-color: #4a8c40;
}

.sticker-tray__check {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #4a8c40;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
  width: 12px;
  height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #111;
}

.desktop-sticker__svg {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
}
```

- [ ] **Step 4: Run all tests**

```
npm test
```

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add src/os/zones/SpecialStickerIcon.jsx src/os/DesktopStickers.jsx src/os/DesktopStickers.css
git commit -m "feat: add special sticker tray section and snap detection"
```

---

### Task 6: Manual verification

No automated tests can verify visual snap animations — do a live smoke test.

- [ ] **Step 1: Start the dev server**

```
cd "E:/Antigravity/Projects/Art Website" && npm run dev
```

Open http://localhost:5173.

- [ ] **Step 2: Verify garden scene renders**

Check: ground strip visible at bottom. 10 SVG zones visible as illustrated elements. Doodle canvas still running behind them. No console errors.

- [ ] **Step 3: Verify sticker tray**

Open the 🗂️ folder. Check: emoji section at top, "find their spot ✦" divider, 10 SVG icons below. Icons show the special sticker pieces (rays, wing, bird, etc.).

- [ ] **Step 4: Test a snap (sun)**

Drag the sun-rays sticker from the tray. Drop it near the sun in the top-right. Verify: rays spring in and sun starts rotating. Tray reopens — sun-rays shows ✓ and is greyed out.

- [ ] **Step 5: Test a miss**

Drag a special sticker and drop it far from its zone. Verify: it places as a free-floating sticker (like emoji). Can be dragged around and removed with ✕.

- [ ] **Step 6: Test persistence**

Complete 2–3 zones. Refresh the page. Verify: completed zones still show their complete state (localStorage working).

- [ ] **Step 7: Run full test suite one more time**

```
npm test
```

Expected: all 41+ tests PASS.

- [ ] **Step 8: Final commit**

```bash
git add -A
git commit -m "feat: garden sticker snap — full implementation complete"
```
