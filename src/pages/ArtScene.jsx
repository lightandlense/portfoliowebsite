import { useReducer, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ART_SCENE_ZONES,
  artSceneReducer,
  loadArtSceneState,
  findArtSceneZone,
} from './artSceneZones';
import './ArtScene.css';

// Background SVG dimensions for scaling pieces
const BG_H = 2524;

function pieceStyle(zone) {
  // Scale piece to match background rendered at 100vh tall
  const h = (zone.svgH / BG_H) * 100;
  const w = (zone.svgW / BG_H) * 100;
  return { width: `${w}vh`, height: `${h}vh` };
}

export function ArtScene() {
  const [state, dispatch] = useReducer(artSceneReducer, undefined, loadArtSceneState);
  const dragging = useRef(null);

  const allDone = ART_SCENE_ZONES.every((z) => state.completedZones[z.id]);

  const onDragStart = useCallback((zoneId, e) => {
    dragging.current = zoneId;
    e.dataTransfer.setData('text/plain', zoneId);
    const ghost = document.createElement('div');
    ghost.style.cssText = 'position:fixed;top:-999px;width:40px;height:40px;background:#FFD400;border:2px solid #111';
    document.body.appendChild(ghost);
    e.dataTransfer.setDragImage(ghost, 20, 20);
    setTimeout(() => ghost.remove(), 0);
  }, []);

  useEffect(() => {
    function onDragOver(e) {
      if (dragging.current) e.preventDefault();
    }
    function onDrop(e) {
      const id = dragging.current;
      dragging.current = null;
      if (!id) return;
      e.preventDefault();
      const zone = findArtSceneZone(e.clientX, e.clientY, id, state.completedZones);
      if (zone) dispatch({ type: 'SNAP', zoneId: zone.id });
    }
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);
    return () => {
      document.removeEventListener('dragover', onDragOver);
      document.removeEventListener('drop', onDrop);
    };
  }, [state.completedZones]);

  const pendingZones = ART_SCENE_ZONES.filter((z) => !state.completedZones[z.id]);

  useEffect(() => {
    const prev = document.body.style.cssText;
    document.body.style.background = `url('/art-scene/background.svg') center / 100% 100% no-repeat #7bc9ef`;
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.cssText = prev; };
  }, []);

  return (
    <div className="art-scene" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Link to="/" className="art-scene__back">← OS</Link>

      {ART_SCENE_ZONES.map((zone) =>
        state.completedZones[zone.id] ? (
          <div
            key={zone.id}
            className={`art-scene__piece-wrap art-scene__piece--${zone.id}`}
            style={{ left: `${zone.xPct * 100}%`, top: `${zone.yPct * 100}%` }}
          >
            <img
              src={`/art-scene/${zone.id}.svg`}
              alt={zone.id}
              style={pieceStyle(zone)}
              draggable={false}
            />
          </div>
        ) : null
      )}

      {allDone ? (
        <div className="art-scene__done">✦ Scene complete ✦</div>
      ) : (
        <div className="art-scene__tray">
          {pendingZones.map((zone) => (
            <div
              key={zone.id}
              className="art-scene__sticker"
              draggable
              onDragStart={(e) => onDragStart(zone.id, e)}
            >
              <img
                src={`/art-scene/${zone.id}.svg`}
                alt={zone.id}
                draggable={false}
                style={{ width: 32, height: 32, objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
              />
              <span>{zone.id.replace(/-/g, ' ')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
