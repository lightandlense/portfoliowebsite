import { useEffect, useRef } from 'react';
import { motion, useDragControls, useMotionValue, animate } from 'framer-motion';
import './Window.css';

export function Window({ window: win, isFocused, onClose, onMinimize, onFocus, onMove, onResize, reducedMotion, children }) {
  const controls = useDragControls();
  const resizeStart = useRef(null);
  const x = useMotionValue(win.x);
  const y = useMotionValue(win.y);

  // drag writes directly to these same motion values; driving them via the
  // `animate` prop instead (re-asserted every render) races with drag and can
  // leave transform unset after a zero-movement click (only reproduces in prod builds)
  useEffect(() => {
    const transition = reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 600, damping: 40 };
    animate(x, win.x, transition);
    animate(y, win.y, transition);
  }, [win.x, win.y, reducedMotion]);

  function startResize(e) {
    e.stopPropagation();
    e.preventDefault();
    onFocus?.(win.id);
    resizeStart.current = { mx: e.clientX, my: e.clientY, w: win.w, h: win.h };
    function onMove(e) {
      const { mx, my, w, h } = resizeStart.current;
      onResize?.(win.id, Math.max(280, w + e.clientX - mx), Math.max(200, h + e.clientY - my));
    }
    function onUp() {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }

  if (win.minimized) return null;
  return (
    <motion.section
      className={`os-window${isFocused ? ' is-focused' : ''}`}
      style={{ zIndex: win.z, width: win.w, height: win.h, x, y }}
      drag
      dragControls={controls}
      dragMomentum={!reducedMotion}
      dragListener={false}
      onMouseDown={() => onFocus?.(win.id)}
      onDragEnd={(_, info) => {
        const fling = reducedMotion ? 0 : 0.1;
        onMove?.(win.id, x.get() + info.offset.x + info.velocity.x * fling, y.get() + info.offset.y + info.velocity.y * fling);
      }}
    >
      <header
        className="os-window__bar"
        onPointerDown={(e) => { controls.start(e); onFocus?.(win.id); }}
      >
        <span className="os-window__lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="os-window__title">{win.title}</span>
        <span className="os-window__actions">
          <button type="button" aria-label="Minimize" onClick={() => onMinimize?.(win.id)}>—</button>
          <button type="button" aria-label="Close" onClick={() => onClose?.(win.id)}>×</button>
        </span>
      </header>
      <div className="os-window__body">{children}</div>
      <div className="os-window__resize-handle" onPointerDown={startResize} aria-hidden="true" />
    </motion.section>
  );
}
