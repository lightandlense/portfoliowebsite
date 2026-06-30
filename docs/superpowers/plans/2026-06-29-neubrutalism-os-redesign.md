# Neubrutalism OS Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tighten the Light & Lense OS shell to fully comply with the neubrutalism design guide — font, accent palette, shadow tiers, and lift/press interaction physics.

**Architecture:** Pure CSS token pass across 4 files. `os.css` owns all design tokens; the three component files consume those tokens and add interaction states. No markup changes, no new files, no JS edits.

**Tech Stack:** CSS custom properties, Google Fonts (Syne 800 + Space Mono), Vite dev server, Vitest (regression check)

## Global Constraints

- Scope: OS experience only — do NOT touch `src/index.css`, scroll-route components, `BootScreen.css`, `TopBar.css`, or `MobileInterstitial.css`
- No markup changes — CSS only
- No new files
- All transitions: `transform 0.1s ease, box-shadow 0.1s ease`
- Shadow values must use `var(--os-ink)` not hardcoded `#111`
- Dev server: `npm run dev` from `E:/Antigravity/Projects/Art Website`
- Test runner: `npm run test:run` from same directory

---

### Task 1: Update design tokens in `os.css`

**Files:**
- Modify: `src/os/os.css`

**Interfaces:**
- Produces: `--os-red`, `--os-orange`, `--os-yellow`, `--os-shadow-sm`, `--os-shadow`, `--os-shadow-lg`, `--os-display: 'Syne'` — consumed by all subsequent tasks

- [ ] **Step 1: Swap the Google Fonts import**

Replace the existing `@import` line at the top of `src/os/os.css`:

```css
/* BEFORE */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Archivo:wght@600;700;800&display=swap');

/* AFTER */
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@800&display=swap');
```

- [ ] **Step 2: Update the token block inside `.os-root`**

Find the current token declarations inside `.os-root { ... }` and replace:

```css
/* BEFORE */
--os-accent: #ff3b00;
--os-yellow: #ffd400;
--os-green: #00d26a;
--os-border: 3px solid #111111;
--os-shadow: 8px 8px 0 #111111;
--os-mono: 'Space Mono', monospace;
--os-display: 'Archivo', sans-serif;

/* AFTER */
--os-red:       #E2243B;
--os-orange:    #FF6B35;
--os-yellow:    #FFD400;
--os-accent:    var(--os-red);
--os-border:    3px solid #111111;
--os-shadow-sm: 3px 3px 0 var(--os-ink);
--os-shadow:    5px 5px 0 var(--os-ink);
--os-shadow-lg: 8px 8px 0 var(--os-ink);
--os-mono:      'Space Mono', monospace;
--os-display:   'Syne', sans-serif;
```

- [ ] **Step 3: Start the dev server and verify font loads**

```bash
cd "E:/Antigravity/Projects/Art Website"
npm run dev
```

Open `http://localhost:5173` in browser. Boot into the OS. The desktop icon labels and window title bars should now render in Syne (wider, more eccentric letterforms than Archivo). Check the dock area and any open window title.

- [ ] **Step 4: Run existing tests to confirm no regressions**

```bash
cd "E:/Antigravity/Projects/Art Website"
npm run test:run
```

Expected: all tests pass. These are JS/component tests — token changes should not break them.

- [ ] **Step 5: Commit**

```bash
cd "E:/Antigravity/Projects/Art Website"
git add src/os/os.css
git commit -m "feat: update OS design tokens — Syne font, red/orange/yellow palette, shadow tiers"
```

---

### Task 2: Add hover/active/focus states to desktop icons and dock items

**Files:**
- Modify: `src/os/launchers.css`

**Interfaces:**
- Consumes: `--os-ink`, `--os-shadow` (5px 5px), `--os-red` from Task 1
- Produces: neubrutalist lift/press on `.os-icon__glyph` and `.os-dock__item`

- [ ] **Step 1: Add transition and hover/active to desktop icon glyphs**

In `src/os/launchers.css`, update `.os-icon__glyph` and add interaction states:

```css
/* BEFORE */
.os-icon__glyph { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; margin: 0 auto 6px; font-size: 28px; background: #fff; border: var(--os-border); box-shadow: 5px 5px 0 var(--os-ink); }

/* AFTER */
.os-icon__glyph {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 6px;
  font-size: 28px;
  background: #fff;
  border: var(--os-border);
  box-shadow: var(--os-shadow);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.os-icon:hover .os-icon__glyph {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--os-ink);
}
.os-icon:active .os-icon__glyph {
  transform: translate(2px, 2px);
  box-shadow: none;
}
.os-icon:focus-visible .os-icon__glyph {
  outline: 3px solid var(--os-red);
  outline-offset: 3px;
}
```

- [ ] **Step 2: Add transition and hover/active/focus to dock items**

Update `.os-dock__item` and add interaction states:

```css
/* BEFORE */
.os-dock__item { width: 48px; height: 48px; font-size: 22px; background: #fff; border: 2px solid #fff; cursor: pointer; position: relative; }

/* AFTER */
.os-dock__item {
  width: 48px;
  height: 48px;
  font-size: 22px;
  background: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  position: relative;
  box-shadow: var(--os-shadow);
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.os-dock__item:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--os-ink);
}
.os-dock__item:active {
  transform: translate(2px, 2px);
  box-shadow: none;
}
.os-dock__item:focus-visible {
  outline: 3px solid var(--os-red);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Visually verify in browser**

With dev server running, open the OS. Hover over desktop icons — each glyph box should lift up-left (shadow expands). Click one — it should press down-right (shadow gone) then release. Hover dock items — same lift animation. Check that the running indicator dot (below dock items) stays visible and isn't clipped by overflow.

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "E:/Antigravity/Projects/Art Website"
git add src/os/launchers.css
git commit -m "feat: add neubrutalism lift/press interactions to desktop icons and dock items"
```

---

### Task 3: Update window chrome — shadow, action buttons, traffic lights

**Files:**
- Modify: `src/os/Window.css`

**Interfaces:**
- Consumes: `--os-border`, `--os-ink`, `--os-shadow-lg`, `--os-red`, `--os-orange`, `--os-yellow` from Task 1
- Produces: windows use `--os-shadow-lg`, action buttons have lift/press, traffic lights use new palette

- [ ] **Step 1: Fix base window shadow**

In `src/os/Window.css`, update `.os-window` to use the large shadow tier:

```css
/* BEFORE */
.os-window {
  position: absolute; top: 0; left: 0;
  background: #fff; border: var(--os-border); box-shadow: var(--os-shadow);
  display: flex; flex-direction: column;
}

/* AFTER */
.os-window {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  border: var(--os-border);
  box-shadow: var(--os-shadow-lg);
  display: flex;
  flex-direction: column;
}
```

(The focused state stays at `10px 10px 0 var(--os-ink)` — no change needed there.)

- [ ] **Step 2: Update traffic light colors to red/yellow/orange**

Update the three light color assignments:

```css
/* BEFORE */
.os-window__lights i:nth-child(1) { background: var(--os-accent); }
.os-window__lights i:nth-child(2) { background: var(--os-yellow); }
.os-window__lights i:nth-child(3) { background: var(--os-green); }

/* AFTER */
.os-window__lights i:nth-child(1) { background: var(--os-red); }
.os-window__lights i:nth-child(2) { background: var(--os-yellow); }
.os-window__lights i:nth-child(3) { background: var(--os-orange); }
```

- [ ] **Step 3: Add hover/active/focus to window action buttons**

Update `.os-window__actions button` with lift/press states:

```css
/* BEFORE */
.os-window__actions button {
  width: 24px; height: 24px; margin-left: 4px; background: #fff; color: var(--os-ink);
  border: 2px solid #fff; font-weight: 700; cursor: pointer;
}

/* AFTER */
.os-window__actions button {
  width: 24px;
  height: 24px;
  margin-left: 4px;
  background: #fff;
  color: var(--os-ink);
  border: 2px solid #fff;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.os-window__actions button:hover {
  transform: translate(-1px, -1px);
  box-shadow: 3px 3px 0 var(--os-ink);
}
.os-window__actions button:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}
.os-window__actions button:focus-visible {
  outline: 3px solid var(--os-red);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Visually verify in browser**

Open any project window. Confirm:
- Traffic lights show red / yellow / orange (no green)
- Window shadow is 8px offset when unfocused, 10px when focused (click another window to compare)
- Action buttons (×, −, □ or similar) lift on hover, press on click

- [ ] **Step 5: Run tests**

```bash
npm run test:run
```

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
cd "E:/Antigravity/Projects/Art Website"
git add src/os/Window.css
git commit -m "feat: update window chrome — shadow tiers, red/yellow/orange traffic lights, action button interactions"
```

---

### Task 4: Add shadow and hover/active to project window links and tags

**Files:**
- Modify: `src/os/windows/ProjectWindow.css`

**Interfaces:**
- Consumes: `--os-shadow-sm` (3px 3px), `--os-ink` from Task 1
- Produces: `.pw__link` and `.pw__tag` have hard shadows and lift/press

- [ ] **Step 1: Add shadow and hover/active to `.pw__link`**

Find `.pw__link` in `src/os/windows/ProjectWindow.css`:

```css
/* BEFORE */
.pw__link { font-weight: 700; font-size: 12px; border: 2px solid var(--os-ink); padding: 6px 12px; text-decoration: none; color: var(--os-ink); }

/* AFTER */
.pw__link {
  font-weight: 700;
  font-size: 12px;
  border: 2px solid var(--os-ink);
  padding: 6px 12px;
  text-decoration: none;
  color: var(--os-ink);
  box-shadow: var(--os-shadow-sm);
  display: inline-block;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.pw__link:hover {
  transform: translate(-1px, -1px);
  box-shadow: 5px 5px 0 var(--os-ink);
}
.pw__link:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}
```

- [ ] **Step 2: Add shadow and hover/active to `.pw__tag`**

Find `.pw__tag`:

```css
/* BEFORE */
.pw__tag { font-size: 11px; font-weight: 700; border: 2px solid var(--os-ink); padding: 4px 9px; }

/* AFTER */
.pw__tag {
  font-size: 11px;
  font-weight: 700;
  border: 2px solid var(--os-ink);
  padding: 4px 9px;
  box-shadow: var(--os-shadow-sm);
  display: inline-block;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.pw__tag:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--os-ink);
}
.pw__tag:active {
  transform: translate(1px, 1px);
  box-shadow: none;
}
```

- [ ] **Step 3: Visually verify in browser**

Open a project window (e.g. Gizmo Factory). Scroll to the tags row and links row. Each tag should have a small hard shadow; hover makes it lift. Each link button (Try / Watch / Code) should have the same behavior. Confirm the `display: inline-block` addition doesn't break the flex row layout (tags and links should still wrap correctly).

- [ ] **Step 4: Run tests**

```bash
npm run test:run
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
cd "E:/Antigravity/Projects/Art Website"
git add src/os/windows/ProjectWindow.css
git commit -m "feat: add neubrutalism shadows and hover/active to project window links and tags"
```

---

## Verification

After all 4 tasks are complete, do a full visual pass through the OS:

1. Boot screen loads → desktop appears
2. Desktop icons: hover lifts glyph, click presses it, double-click opens window
3. Dock items: hover lifts, click presses, running indicator dot visible
4. Open a project window: Syne font in title bar, red/yellow/orange traffic lights, 8px window shadow
5. Focus a window: shadow increases to 10px
6. Project window content: tags have small shadow + lift, links have small shadow + lift
7. Window action buttons: hover lifts, click presses
8. Reduced-motion: toggle OS-level reduced-motion preference → all animations disabled (`.os-root * { animation: none; transition: none }` already handles this)

Run full test suite one final time:

```bash
npm run test:run
```
