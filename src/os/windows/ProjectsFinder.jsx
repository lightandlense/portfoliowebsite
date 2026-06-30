import { PROJECTS } from '../data/projects';
import './windows.css';

export function ProjectsFinder({ onOpenProject }) {
  return (
    <div className="finder">
      {PROJECTS.map((p) => (
        <button key={p.id} type="button" className="finder__row" onClick={() => onOpenProject(p.id)}>
          <span className="finder__thumb" style={{ background: p.accent }} />
          <span className="finder__meta">
            <b>{p.title}</b>
            <span>{p.category}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
