import { PROJECTS } from '../data/projects';
import './windows.css';

export function ProjectsFinder({ onOpenProject, ids }) {
  const items = ids ? PROJECTS.filter((p) => ids.includes(p.id)) : PROJECTS;
  return (
    <div className="finder">
      {items.map((p) => (
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
