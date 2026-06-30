import { getProject } from '../data/projects';
import { ParticleSketch } from './ParticleSketch';
import './ProjectWindow.css';

export function ProjectWindow({ projectId }) {
  const p = getProject(projectId);
  if (!p) return null;
  return (
    <article className="pw">
      <div className="pw__hero" style={{ background: p.accent }}>
        {p.hero.type === 'interactive' ? (
          <div data-testid="project-hero-interactive" style={{ width: '100%', height: '100%' }}>
            <ParticleSketch />
          </div>
        ) : p.hero.type === 'video' ? (
          <video data-testid="project-hero-video" poster={p.hero.poster} preload="metadata" muted loop autoPlay playsInline>
            <source src={p.hero.src} type="video/mp4" />
          </video>
        ) : p.hero.type === 'iframe' ? (
          <iframe src={p.hero.src} title={p.title} allowFullScreen className="pw__iframe" />
        ) : (
          <img src={p.hero.src} alt={p.title} loading="lazy" />
        )}
      </div>
      <div className="pw__content">
        <p className="pw__category">{p.category}</p>
        <h2 className="pw__title">{p.title}</h2>
        <div className="pw__stats">
          {p.stats.map((s) => (
            <div key={s.label} className="pw__stat">
              <span className="pw__stat-value">{s.value}</span>
              <span className="pw__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        {p.body.map((b, i) => {
          if (b.type === 'h') return <h3 key={i} className="pw__section-h">{b.text}</h3>;
          if (b.type === 'image') return (
            <figure key={i} className="pw__figure">
              <img src={b.src} alt={b.alt} loading="lazy" />
              {b.caption && <figcaption className="pw__caption">{b.caption}</figcaption>}
            </figure>
          );
          if (b.type === 'pillars') return (
            <div key={i} className="pw__pillars">
              {b.items.map((it, j) => (
                <div key={j} className="pw__pillar">
                  <b>{it.title}</b>
                  <p>{it.text}</p>
                </div>
              ))}
            </div>
          );
          if (b.type === 'video-grid') return (
            <div key={i} className="pw__vgrid">
              {b.items.map((v, j) => (
                <div key={j} className="pw__vgrid-item">
                  <video src={v.src} autoPlay loop muted playsInline preload="metadata" style={{ objectPosition: v.objectPosition }} />
                  <p className="pw__caption"><strong>{v.label}</strong> {v.caption}</p>
                </div>
              ))}
            </div>
          );
          if (b.type === 'specs') return (
            <dl key={i} className="pw__specs">
              {b.items.map((s, j) => (
                <div key={j} className="pw__spec">
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          );
          if (b.type === 'takeaways') return (
            <div key={i} className="pw__takeaways">
              {b.items.map((t, j) => (
                <div key={j} className="pw__takeaway">
                  <span className="pw__takeaway-num">{t.num}</span>
                  <div><b>{t.title}</b><p>{t.text}</p></div>
                </div>
              ))}
            </div>
          );
          return <p key={i} className="pw__p">{b.text}</p>;
        })}
        <div className="pw__tags">{p.tags.map((t) => <span key={t} className="pw__tag">{t}</span>)}</div>
        <div className="pw__links">
          {p.links.map((l) => (
            <a key={l.url} className="pw__link" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
          ))}
        </div>
      </div>
    </article>
  );
}
