import { LAUNCHERS } from './launchers';
import { ICONS } from './icons';
import './launchers.css';

const RAIL = LAUNCHERS.filter((l) => l.id !== 'about' && l.id !== 'contact' && !l.hideFromRail);

export function DesktopIcons({ onOpen }) {
  return (
    <div className="os-icons">
      {RAIL.map((l, i) => (
        <button
          key={l.id}
          type="button"
          className="os-icon"
          style={{ animationDelay: `${i * 70}ms` }}
          onClick={() => onOpen(l)}
        >
          <span className="os-icon__glyph" style={{ borderColor: l.color }}>
            {ICONS[l.id]?.(l.color) ?? l.glyph}
          </span>
          <span className="os-icon__label">{l.title}</span>
        </button>
      ))}
    </div>
  );
}
