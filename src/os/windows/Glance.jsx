import { getGlance } from '../data/glance';
import './Glance.css';

const ROWS = [
  ['result', 'Result'],
  ['role', 'Role'],
  ['tech', 'Tech'],
  ['problem', 'Problem'],
  ['broke', 'What broke'],
];

// At-a-glance summary, result first. Renders nothing for slugs without one.
export function Glance({ slug }) {
  const g = getGlance(slug);
  if (!g) return null;
  return (
    <dl className="glance">
      {ROWS.filter(([k]) => g[k]).map(([k, label]) => (
        <div key={k} className={`glance__row glance__row--${k}`}>
          <dt>{label}</dt>
          <dd>{g[k]}</dd>
        </div>
      ))}
    </dl>
  );
}
