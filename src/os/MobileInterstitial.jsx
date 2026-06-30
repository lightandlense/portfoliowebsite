import { PROJECTS } from './data/projects';
import './MobileInterstitial.css';

export function MobileInterstitial() {
  return (
    <div className="mi">
      <h1 className="mi__brand">LIGHT &amp; LENSE//OS</h1>
      <p className="mi__note">🖥️ Best viewed on desktop — the full OS is built for a big screen.</p>
      <div className="mi__thumbs">
        {PROJECTS.slice(0, 3).map((p) => (
          <div key={p.id} className="mi__thumb" style={{ background: p.accent }}>{p.title}</div>
        ))}
      </div>
      <a className="mi__link" href="mailto:lightandlense@gmail.com">Email ↗</a>
    </div>
  );
}
