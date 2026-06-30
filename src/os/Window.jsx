import { motion } from 'framer-motion';
import './Window.css';

export function Window({ window: win, isFocused, onClose, onMinimize, onFocus, onMove, reducedMotion, children }) {
  if (win.minimized) return null;
  return (
    <motion.section
      className={`os-window${isFocused ? ' is-focused' : ''}`}
      style={{ zIndex: win.z }}
      initial={false}
      animate={{ x: win.x, y: win.y }}
      transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 600, damping: 40 }}
      drag
      dragMomentum={!reducedMotion}
      dragListener={false}
      onMouseDown={() => onFocus?.(win.id)}
      onDragEnd={(_, info) => onMove?.(win.id, win.x + info.offset.x, win.y + info.offset.y)}
    >
      <header
        className="os-window__bar"
        onPointerDown={() => { onFocus?.(win.id); }}
      >
        <span className="os-window__lights" aria-hidden="true"><i /><i /><i /></span>
        <span className="os-window__title">{win.title}</span>
        <span className="os-window__actions">
          <button type="button" aria-label="Minimize" onClick={() => onMinimize?.(win.id)}>—</button>
          <button type="button" aria-label="Close" onClick={() => onClose?.(win.id)}>×</button>
        </span>
      </header>
      <div className="os-window__body">{children}</div>
    </motion.section>
  );
}
