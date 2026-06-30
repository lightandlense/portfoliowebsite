# Neubrutalism OS Redesign — Design Spec
**Date:** 2026-06-29
**Status:** Approved

---

## Overview

Tighten the Light & Lense OS shell to fully comply with the neubrutalism design guide (neubrutalism.com). The OS shell is already ~80% there structurally; this pass completes the font, accent palette, shadow tier system, and interaction physics. Scope: OS experience only — scroll-site routes (Hero, Navbar, Work, etc.) are untouched.

---

## Approach

**Token pass + interaction layer.** Update CSS variables in `os.css`, then apply neubrutalism hover/active lift-press physics to all interactive OS elements. No markup changes, no new files, no component restructuring.

---

## Token Changes (`src/os/os.css`)

### Font

Replace Archivo import with Syne 800:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');
```

Update display variable:
```css
--os-display: 'Syne', sans-serif;
```

### Accent Palette

Replace current three-color system with red/orange/yellow:

```css
--os-red:    #E2243B;   /* primary accent — window lights, active states */
--os-orange: #FF6B35;   /* secondary accent */
--os-yellow: #FFD400;   /* tertiary — keep existing value */
```

Remove `--os-green: #00d26a` (no replacement; green is dropped from the palette).

Update `--os-accent` to point at red:
```css
--os-accent: var(--os-red);
```

### Shadow Tiers

Add three explicit tiers so components use the right weight:

```css
--os-shadow-sm: 3px 3px 0 var(--os-ink);   /* badges, tags, chips */
--os-shadow:    5px 5px 0 var(--os-ink);   /* dock items, small interactive */
--os-shadow-lg: 8px 8px 0 var(--os-ink);  /* windows (current value) */
```

Windows stay at `--os-shadow-lg`; focused windows stay at `10px 10px 0 var(--os-ink)`.

---

## Interaction States

All transitions: `transform 0.1s ease, box-shadow 0.1s ease`

### Dock Items (`.os-dock__item`)

```
Default:  box-shadow: var(--os-shadow)              /* 5px 5px */
Hover:    transform: translate(-2px, -2px);
          box-shadow: 7px 7px 0 var(--os-ink)
Active:   transform: translate(2px, 2px);
          box-shadow: none
Focus:    outline: 3px solid var(--os-red);
          outline-offset: 3px
```

### Window Action Buttons (`.os-window__actions button`)

```
Default:  box-shadow: none
Hover:    transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--os-ink)
Active:   transform: translate(1px, 1px);
          box-shadow: none
Focus:    outline: 3px solid var(--os-red);
          outline-offset: 2px
```

### Project Window Links (`.pw__link`)

```
Default:  box-shadow: var(--os-shadow-sm)           /* 3px 3px */
Hover:    transform: translate(-1px, -1px);
          box-shadow: 5px 5px 0 var(--os-ink)
Active:   transform: translate(1px, 1px);
          box-shadow: none
```

### Project Window Tags (`.pw__tag`)

```
Default:  box-shadow: var(--os-shadow-sm)           /* 3px 3px */
Hover:    transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--os-ink)
Active:   transform: translate(1px, 1px);
          box-shadow: none
```

### Window Traffic Lights (`.os-window__lights i`)

Update color assignments to match new palette:
```
1st light (close):   --os-red
2nd light (min):     --os-yellow
3rd light (max):     --os-orange
```

---

## Files Changed

| File | Changes |
|---|---|
| `src/os/os.css` | Font import, `--os-display`, accent palette, shadow tiers |
| `src/os/launchers.css` | Dock item hover/active/focus states |
| `src/os/Window.css` | Update `.os-window` base shadow from `--os-shadow` → `--os-shadow-lg`; action button hover/active/focus; traffic light colors |
| `src/os/windows/ProjectWindow.css` | Shadow on `.pw__link` + `.pw__tag`, hover/active states |

**Files not touched:** `src/index.css`, `src/os/BootScreen.css`, `src/os/TopBar.css`, `src/os/MobileInterstitial.css`, all scroll-route components.

---

## Out of Scope

- Scroll-site routes (Hero, Navbar, Work, About, Contact)
- Boot screen
- Mobile interstitial
- TopBar
- Full WCAG contrast audit (deferred to a future polish pass)
- New components or markup changes
