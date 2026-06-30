# Garden Sticker Snap — Design Spec
**Date:** 2026-06-30  
**Project:** Light & Lense OS (Art Website)  
**Status:** Approved

---

## Overview

A layered garden scene sits between the existing canvas doodle background and the desktop interface. The scene has 10 intentionally incomplete SVG elements scattered across a sky zone and a ground zone. A second section in the sticker tray holds custom SVG stickers — one matching piece for each incomplete element. When a visitor drags the right sticker near the right spot, it snaps into place and triggers a completion animation.

The goal: discovery-driven delight. Visitors who explore the sticker tray find pieces that clearly belong somewhere. The incomplete background elements are obvious enough that the mechanic is self-explanatory.

---

## Visual Style

**Neubrutalist SVGs:** thick outlines (3–4px stroke), flat fills from the site's existing palette (black, red `#E2243B`, yellow `#FFD400`, orange `#FF6B35`), hard drop shadows where appropriate. Matches the site's existing brutalist personality.

**Scene composition:**
- Sky occupies the top ~75% of viewport height
- Ground strip occupies the bottom ~25% — a flat fill rectangle with thick top border
- Scene elements are positioned at percentage-based coordinates so they hold layout at any screen size
- Overall density: sparse. A few defined anchor elements, lots of negative space. The OS windows sit on top without feeling buried.

---

## The 10 Snap Zones

Each zone has: a visible incomplete SVG state, a matching sticker in the tray, and a completion animation.

### Sky Zone

| # | Zone ID | Incomplete State | Sticker | Completion Animation |
|---|---------|-----------------|---------|---------------------|
| 1 | `sun` | Circle with rays on left half only; right half bare | Missing rays (SVG arc) | Rays spring in; sun slowly rotates |
| 2 | `rainbow` | Cloud with a rainbow arc, one color band gap | The missing band (SVG arc) | Band fades in; whole rainbow pulses once |
| 3 | `butterfly` | Body + right wing only, left wing outlined faintly | Left wing (filled SVG) | Wing bounces in; butterfly flutters upward 20px and back |
| 4 | `bird` | Lone branch visible, bare | Bird (SVG) | Bird hops onto branch and bobs once |

### Ground Zone

| # | Zone ID | Incomplete State | Sticker | Completion Animation |
|---|---------|-----------------|---------|---------------------|
| 5 | `flower-a` | Stem + leaves, no bloom | Bloom (SVG circle + petals) | Bloom pops in with spring bounce |
| 6 | `flower-b` | Full flower, one petal cluster missing | The petal cluster (SVG) | Petals spring in; flower sways |
| 7 | `flower-c` | Stem only, nothing above | Full flower head (SVG) | Flower grows up from stem |
| 8 | `beehive` | Hive shape hanging from off-screen branch; no bee | Bee (SVG) | Bee appears and does a small figure-8 path |
| 9 | `watering-can` | Watering can body; no water stream | Water drops / arc (SVG) | Water arc animates flowing out of spout |
| 10 | `spiderweb` | Web in lower corner with one section gap | Missing web section (SVG) | Section weaves in; full web shimmers |

---

## Snap Mechanic

### Detection
- Each zone defines a center position `{x: number, y: number}` in viewport percentages
- Each zone defines its expected `stickerId` (matches the sticker's type in the tray)
- On sticker drop, the system converts zone center to absolute pixels and checks distance to drop point
- **Match radius:** 70px
- If distance ≤ 70px AND sticker type matches AND zone is not already completed → trigger snap

### On Snap
1. Sticker animates to the exact zone center (Framer Motion layout animation)
2. SVG zone transitions from incomplete to complete state
3. Zone-specific completion animation plays (see table above)
4. SNAP_ZONE_COMPLETE action dispatched to OS reducer

### Non-matching drops
Stickers that miss or don't match any zone drop as normal free-floating stickers, same behavior as today.

---

## Sticker Tray Changes

The tray gains a second section below the existing emoji grid:

```
┌─────────────────────────────┐
│  drag to desktop            │
│  [⭐][💥][🔥]...  (emoji)   │
│  ─────────────────────────  │
│  find their spot            │
│  [☀][🌈][🦋][🐦]           │
│  [🌸][🌸][🌸][🐝]           │
│  [💧][🕸]                   │
└─────────────────────────────┘
```

- Custom SVG stickers are rendered as inline SVGs in the tray (not emoji)
- They have a subtle gold star badge (`✦`) to signal they're special
- Label: "find their spot" above the special section

---

## State Management

### New state in OS reducer
```js
completedZones: {
  sun: false,
  rainbow: false,
  butterfly: false,
  bird: false,
  'flower-a': false,
  'flower-b': false,
  'flower-c': false,
  beehive: false,
  'watering-can': false,
  spiderweb: false,
}
```

### New action
```js
{ type: 'SNAP_ZONE_COMPLETE', zoneId: 'sun' }
// sets completedZones[zoneId] = true
```

### Persistence
`completedZones` is saved to `localStorage` under the key `llos-completed-zones` and rehydrated on OS boot. Visitors who complete zones on one visit find them still completed on return.

---

## New Files

| File | Purpose |
|------|---------|
| `src/os/GardenBackground.jsx` | Renders all 10 snap zone SVG components, positioned absolutely |
| `src/os/GardenBackground.css` | Layout, neubrutalist SVG stroke/fill styles |
| `src/os/snapZones.js` | Zone data: id, position (%), stickerId, animation config |
| `src/os/zones/SunZone.jsx` | Sun SVG — incomplete + complete states |
| `src/os/zones/RainbowZone.jsx` | Cloud + rainbow SVG |
| `src/os/zones/ButterflyZone.jsx` | Butterfly SVG |
| `src/os/zones/BirdZone.jsx` | Branch + bird SVG |
| `src/os/zones/FlowerAZone.jsx` | Flower A SVG |
| `src/os/zones/FlowerBZone.jsx` | Flower B SVG |
| `src/os/zones/FlowerCZone.jsx` | Flower C SVG |
| `src/os/zones/BeehiveZone.jsx` | Beehive + bee SVG |
| `src/os/zones/WateringCanZone.jsx` | Watering can + water SVG |
| `src/os/zones/SpiderwebZone.jsx` | Spider web SVG |

## Modified Files

| File | Change |
|------|--------|
| `src/os/DesktopStickers.jsx` | Add SVG special stickers section; pass snap zone data into drop detection |
| `src/os/state/osReducer.js` | Add `completedZones` state + `SNAP_ZONE_COMPLETE` action + localStorage persistence |
| `src/os/Desktop.jsx` | Render `<GardenBackground>` between canvas and sticker layer |

**No changes to `PetalBackground.jsx`** — canvas ambient layer stays exactly as-is.

---

## Out of Scope

- Mobile snap interactions (touch drag-and-drop is a separate problem)
- Sound effects on snap (could be added later)
- A "completion counter" or progress indicator (could be a fun addition in a future update)
- Resetting completed zones (intentionally not included — persistence is the reward)
