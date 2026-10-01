import { useReducer, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ART_SCENE_ZONES,
  SNAP_RADIUS,
  artSceneReducer,
  loadArtSceneState,
} from './artSceneZones';
import './ArtScene.css';

// Background SVG dimensions for scaling pieces (extended bg: 2287.06x1080)
const BG_W = 2287.06;
const BG_H = 1080;
const BG_ASPECT = BG_W / BG_H;

// The background renders at a fixed 100% height (see ArtScene.css) and keeps
// its native aspect ratio, so on any viewport that isn't exactly 16:9 it's
// letterboxed left/right — pillarboxed, never cropped. Zone xPct/yPct are
// authored against the IMAGE, not the raw viewport, so every position (and
// the drag-snap hit test) has to go through this offset or it drifts off
// the actual art the further the viewport is from 16:9.
function useBgBox() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  useEffect(() => {
    function onResize() { setSize({ w: window.innerWidth, h: window.innerHeight }); }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const bgW = size.h * BG_ASPECT;
  return { left: (size.w - bgW) / 2, width: bgW, height: size.h };
}

// Curated left-to-right entrance order for already-placed scene pieces
// (balloon reads as leftmost despite its center x being just right of the
// pink flower). Ghost hints aren't real stickers yet, so they don't animate.
const ENTRANCE_ORDER = [
  'balloon-basket', 'pink-flower', 'blue-flower', 'yellow-flower',
  'cherry-blossom-tree', 'windmill-sails', 'sun-rays',
];
const ENTRANCE_STEP_MS = 150;
const entranceDelayMs = (zoneId) => ENTRANCE_ORDER.indexOf(zoneId) * ENTRANCE_STEP_MS;

function pieceStyle(zone) {
  // Scale piece to match background rendered at 100vh tall
  const h = (zone.svgH / BG_H) * 100;
  const w = (zone.svgW / BG_H) * 100;
  return { width: `${w}vh`, height: `${h}vh` };
}

// Preset petal drift/timing so falling petals look organic without re-randomizing on render
const CHERRY_PETALS = [
  { left: '15%', duration: '4.5s', delay: '0s',    drift: '18px' },
  { left: '35%', duration: '5.2s', delay: '-1.4s', drift: '-14px' },
  { left: '55%', duration: '4.8s', delay: '-3s',   drift: '10px' },
  { left: '70%', duration: '5.6s', delay: '-0.6s', drift: '-20px' },
  { left: '45%', duration: '4.2s', delay: '-2.2s', drift: '16px' },
];

// Renders the hills scene (background + snap-piece stickers + tray). Pass
// standalone={true} to also get the dev-only back link, reset, and position
// editing tools (used by the dedicated /art-scene page). Embedded uses
// (e.g. the OS desktop background) should leave it false.
export function ArtSceneCanvas({ standalone = false, resetTrigger }) {
  const [state, dispatch] = useReducer(artSceneReducer, undefined, loadArtSceneState);
  const bgBox = useBgBox();
  const bgX = (xPct) => bgBox.left + xPct * bgBox.width;
  const dragging = useRef(null);
  const [draggingZoneId, setDraggingZoneId] = useState(null);
  const dragGhostRef = useRef(null);
  // Snapshot of what was already completed on mount (e.g. from a prior
  // session). Only these get the slide-in-from-the-left populate animation;
  // pieces snapped live during this session already traveled to their spot
  // under the cursor, so they should just pop into place instead.
  const initiallyCompletedRef = useRef(state.completedZones);

  // Preload the full-tree SVG so it's cached before the leaves sticker is placed
  // (the hint shows cherry-blossom-leaves.svg; placement switches to cherry-blossom-tree.svg)
  useEffect(() => {
    if (!initiallyCompletedRef.current['cherry-blossom-tree']) {
      new Image().src = '/art-scene/cherry-blossom-tree.svg';
    }
  }, []);

  // Lets an embedding page (e.g. the OS desktop) trigger a reset from its own UI
  // by bumping resetTrigger, without needing to own this component's state.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    if (resetTrigger !== undefined) dispatch({ type: 'RESET' });
  }, [resetTrigger]);

  // Debug/positioning mode — only wired up when standalone
  const [debugMode, setDebugMode] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [debugPos, setDebugPos] = useState(
    () => ART_SCENE_ZONES.map((z) => ({ xPct: z.xPct, yPct: z.yPct }))
  );
  const debugPosRef = useRef(debugPos);
  debugPosRef.current = debugPos;
  const debugModeRef = useRef(debugMode);
  debugModeRef.current = debugMode;

  const allDone = ART_SCENE_ZONES.every((z) => state.completedZones[z.id]);

  // Pointer-based drag (not native HTML5 DnD) so the sticker visibly follows
  // the cursor/finger the whole way — native drag images render inconsistently
  // across browsers and don't work at all on most touch devices.
  function positionDragGhost(x, y) {
    const el = dragGhostRef.current;
    if (!el) return;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  function onStickerPointerDown(zoneId, e) {
    e.preventDefault();
    dragging.current = zoneId;
    setDraggingZoneId(zoneId);
    e.currentTarget.setPointerCapture(e.pointerId);
    positionDragGhost(e.clientX, e.clientY);
  }

  function onStickerPointerMove(e) {
    if (!dragging.current) return;
    positionDragGhost(e.clientX, e.clientY);
  }

  function onStickerPointerUp(e) {
    const id = dragging.current;
    dragging.current = null;
    setDraggingZoneId(null);
    if (!id) return;
    // Use debug positions if in debug mode
    const positions = debugModeRef.current ? debugPosRef.current : null;
    for (const zone of ART_SCENE_ZONES) {
      if (zone.id !== id) continue;
      if (state.completedZones[zone.id]) continue;
      const pos = positions ? positions[ART_SCENE_ZONES.indexOf(zone)] : zone;
      const zx = bgX(pos.xPct);
      const zy = pos.yPct * window.innerHeight;
      if (Math.sqrt((e.clientX - zx) ** 2 + (e.clientY - zy) ** 2) <= SNAP_RADIUS) {
        dispatch({ type: 'SNAP', zoneId: zone.id });
        break;
      }
    }
  }

  // Keyboard debug controls — standalone dev page only
  useEffect(() => {
    if (!standalone) return undefined;
    function onKey(e) {
      if (e.key === 'd') {
        setDebugMode((prev) => !prev);
        return;
      }
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= ART_SCENE_ZONES.length) {
        setSelectedIdx(num - 1);
        return;
      }
      if (!debugModeRef.current) return;
      const STEP = e.shiftKey ? 0.001 : 0.005;
      const delta = { ArrowLeft: [-STEP, 0], ArrowRight: [STEP, 0], ArrowUp: [0, -STEP], ArrowDown: [0, STEP] };
      if (delta[e.key]) {
        e.preventDefault();
        const [dx, dy] = delta[e.key];
        setDebugPos((prev) =>
          prev.map((pos, i) =>
            i === selectedIdx
              ? { xPct: +(pos.xPct + dx).toFixed(4), yPct: +(pos.yPct + dy).toFixed(4) }
              : pos
          )
        );
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [standalone, selectedIdx]);

  const pendingZones = ART_SCENE_ZONES.filter((z) => !state.completedZones[z.id]);

  useEffect(() => {
    if (!standalone) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [standalone]);

  const getPos = (zone, i) => (standalone && debugMode) ? debugPos[i] : zone;

  const copyPositions = () => {
    const lines = ART_SCENE_ZONES.map(
      (z, i) =>
        `  { id: '${z.id}', xPct: ${debugPos[i].xPct.toFixed(3)}, yPct: ${debugPos[i].yPct.toFixed(3)}, svgW: ${z.svgW}, svgH: ${z.svgH} },`
    ).join('\n');
    navigator.clipboard.writeText(lines);
  };

  return (
    <div className={standalone ? 'art-scene' : 'art-scene art-scene--embedded'}>
      {standalone && (
        <>
          <Link to="/" className="art-scene__back">← OS</Link>
          <button className="art-scene__reset" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
          <button
            className="art-scene__edit-positions"
            onClick={() => setDebugMode((prev) => !prev)}
          >
            {debugMode ? 'Done editing' : 'Edit positions'}
          </button>
        </>
      )}

      {ART_SCENE_ZONES.map((zone, i) => {
        const pos = getPos(zone, i);
        if (state.completedZones[zone.id]) {
          const floating = zone.id === 'balloon-basket';
          const justPlaced = !floating && !initiallyCompletedRef.current[zone.id];
          // Negative delay makes drift start from the snap zone x position
          // Animation: translateX(-25vw) → translateX(115vw) over 28s (range=140vw)
          const driftDelay = floating
            ? -((pos.xPct * 100 + 25) / 140) * 28
            : 0;
          return (
            <div
              key={zone.id}
              className={`art-scene__piece-wrap art-scene__piece--${zone.id}${justPlaced ? ' art-scene__piece-wrap--placed' : ''}`}
              style={floating
                ? { top: `${pos.yPct * 100}%`, left: 0, animationDelay: `${driftDelay}s` }
                : { left: `${bgX(pos.xPct)}px`, top: `${pos.yPct * 100}%`, animationDelay: justPlaced ? '0s' : `${entranceDelayMs(zone.id)}ms` }}
            >
              <img
                src={`/art-scene/${zone.id}.svg`}
                alt={zone.id}
                style={pieceStyle(zone)}
                draggable={false}
              />
              {zone.id === 'cherry-blossom-tree' && (
                <div className="art-scene__petals">
                  {CHERRY_PETALS.map((p, idx) => (
                    <span
                      key={idx}
                      className="art-scene__petal"
                      style={{
                        left: p.left,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        '--petal-drift': p.drift,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        }
        return (
          <div
            key={zone.id}
            className="art-scene__hint"
            style={{ left: `${bgX(pos.xPct)}px`, top: `${pos.yPct * 100}%` }}
          >
            <img
              src={`/art-scene/${zone.pieceId || zone.id}.svg`}
              alt=""
              style={pieceStyle(zone)}
              draggable={false}
            />
          </div>
        );
      })}

      {/* Debug overlay — standalone dev page only */}
      {standalone && debugMode && (
        <>
          {ART_SCENE_ZONES.map((zone, i) => {
            const pos = debugPos[i];
            const selected = i === selectedIdx;
            return (
              <div
                key={zone.id}
                className="art-scene__debug-dot"
                data-selected={selected}
                style={{ left: `${bgX(pos.xPct)}px`, top: `${pos.yPct * 100}%` }}
                onPointerDown={(e) => {
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setSelectedIdx(i);
                }}
                onPointerMove={(e) => {
                  if (e.buttons !== 1) return;
                  const xPct = +((e.clientX - bgBox.left) / bgBox.width).toFixed(4);
                  const yPct = +(e.clientY / window.innerHeight).toFixed(4);
                  setDebugPos((prev) => prev.map((p, idx) => (idx === i ? { xPct, yPct } : p)));
                }}
              >
                {i + 1}
              </div>
            );
          })}
          <div className="art-scene__debug-panel">
            <div className="art-scene__debug-title">
              [{selectedIdx + 1}] {ART_SCENE_ZONES[selectedIdx].id}
            </div>
            <div>x: {debugPos[selectedIdx].xPct.toFixed(3)}</div>
            <div>y: {debugPos[selectedIdx].yPct.toFixed(3)}</div>
            <div className="art-scene__debug-hint">
              drag a dot to move it · ←→↑↓ nudge (shift=fine) · 1–{ART_SCENE_ZONES.length} select · D exit
            </div>
            <button className="art-scene__debug-copy" onClick={copyPositions}>
              Copy all positions
            </button>
          </div>
        </>
      )}

      {allDone ? (
        <div className="art-scene__done">✦ Scene complete ✦</div>
      ) : (
        <div className="art-scene__tray">
          {pendingZones.map((zone) => (
            <div
              key={zone.id}
              className="art-scene__sticker"
              data-dragging={draggingZoneId === zone.id}
              onPointerDown={(e) => onStickerPointerDown(zone.id, e)}
              onPointerMove={onStickerPointerMove}
              onPointerUp={onStickerPointerUp}
              onPointerCancel={onStickerPointerUp}
            >
              <img
                src={`/art-scene/${zone.pieceId || zone.id}.svg`}
                alt={zone.id}
                draggable={false}
                style={{ width: 32, height: 32, objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
              />
              <span>{zone.label || zone.id.replace(/-/g, ' ')}</span>
            </div>
          ))}
        </div>
      )}

      {draggingZoneId && (
        <img
          ref={dragGhostRef}
          className="art-scene__drag-ghost"
          src={`/art-scene/${ART_SCENE_ZONES.find((z) => z.id === draggingZoneId)?.pieceId || draggingZoneId}.svg`}
          alt=""
          draggable={false}
        />
      )}
    </div>
  );
}
