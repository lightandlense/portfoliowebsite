import { LAUNCHERS } from './launchers';
import './launchers.css';

export function Dock({ openIds, onOpen }) {
  return (
    <div className="os-dock">
      {LAUNCHERS.map((l) => (
        <button
          key={l.id}
          type="button"
          className="os-dock__item"
          data-testid={`dock-item-${l.id}`}
          data-running={openIds.has(l.id) ? 'true' : 'false'}
          onClick={() => onOpen(l)}
          title={l.title}
        >
          <span>{l.glyph}</span>
        </button>
      ))}
    </div>
  );
}
