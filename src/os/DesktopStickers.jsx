import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { findMatchingZone, SNAP_ZONES } from './snapZones';
import { SpecialStickerIcon, SPECIAL_STICKERS } from './zones/SpecialStickerIcon';
import './DesktopStickers.css';

let nextId = 0;

export function DesktopStickers({ completedZones = {}, onSnap = () => {} }) {
  const [stickers, setStickers] = useState([]);
  const [open, setOpen] = useState(false);
  const dragging = useRef(null); // { stickerId: string }

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

      const match = findMatchingZone(e.clientX, e.clientY, d.stickerId, completedZones);
      if (match) {
        onSnap(match.id);
        setOpen(false);
        return;
      }
      setStickers((prev) => [
        ...prev,
        { id: nextId++, stickerId: d.stickerId, x: e.clientX - 18, y: e.clientY - 18 },
      ]);
      setOpen(false);
    }
    document.addEventListener('dragover', onDragOver);
    document.addEventListener('drop', onDrop);
    return () => {
      document.removeEventListener('dragover', onDragOver);
      document.removeEventListener('drop', onDrop);
    };
  }, [completedZones, onSnap]);

  const onDragStartSpecial = useCallback((stickerId, e) => {
    dragging.current = { stickerId };
    e.dataTransfer.setData('text/plain', stickerId);
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
          <div className="desktop-sticker__svg"><SpecialStickerIcon stickerId={s.stickerId} /></div>
          <button className="desktop-sticker__remove" aria-label="Remove sticker" onClick={() => removeSticker(s.id)}>×</button>
        </motion.div>
      ))}

      <div className="sticker-dock">
        {open && (
          <div className="sticker-tray">
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
