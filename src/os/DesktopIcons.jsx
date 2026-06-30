import { LAUNCHERS } from './launchers';
import './launchers.css';

const RAIL = LAUNCHERS.filter((l) => l.id !== 'about' && l.id !== 'contact');

export function DesktopIcons({ onOpen }) {
  return (
    <div className="os-icons">
      {RAIL.map((l) => (
        <button key={l.id} type="button" className="os-icon" onClick={() => onOpen(l)}>
          <span className="os-icon__glyph" style={{ borderColor: l.color }}>{l.glyph}</span>
          <span className="os-icon__label">{l.title}</span>
        </button>
      ))}
    </div>
  );
}
