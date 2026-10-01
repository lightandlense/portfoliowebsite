import { getProject } from '../data/projects';
import { ParticleSketch } from './ParticleSketch';
import { openWindow } from '../state/windowManager';
import './ProjectWindow.css';

export function ProjectWindow({ projectId, dispatch }) {
  const p = getProject(projectId);
  if (!p) return null;

  function openExperiment(item) {
    if (!item.src || !dispatch) return;
    dispatch(openWindow({
      id: 'experiment:' + item.id,
      type: 'experiment',
      title: item.title,
      payload: item.src,
      w: 700,
      h: 560,
    }));
  }

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
          if (b.type === 'image-row') return (
            <div key={i} className="pw__image-row">
              {b.items.map((it, j) => (
                <figure key={j} className="pw__figure">
                  <img src={it.src} alt={it.alt} loading="lazy" />
                  {it.caption && <figcaption className="pw__caption">{it.caption}</figcaption>}
                </figure>
              ))}
            </div>
          );
          if (b.type === 'quote') return (
            <blockquote key={i} className="pw__quote">
              <p>{b.text}</p>
              {b.sub && <footer>{b.sub}</footer>}
            </blockquote>
          );
          if (b.type === 'before-after') return (
            <div key={i} className="pw__ba">
              {b.items.map((it, j) => (
                <div key={j} className="pw__ba-item">
                  <span className="pw__ba-label">{it.label}</span>
                  <img src={it.src} alt={it.alt} loading="lazy" />
                  <p className="pw__caption">{it.caption}</p>
                </div>
              ))}
            </div>
          );
          if (b.type === 'video') return (
            <figure key={i} className="pw__figure pw__figure--video">
              <video src={b.src} autoPlay loop muted playsInline preload="metadata" />
              {b.caption && <figcaption className="pw__caption">{b.caption}</figcaption>}
            </figure>
          );
          if (b.type === 'youtube') return (
            <figure key={i} className="pw__yt">
              <div className="pw__yt-wrap">
                <iframe
                  src={'https://www.youtube.com/embed/' + b.id}
                  title={b.caption || 'YouTube video'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {b.caption && <figcaption className="pw__caption">{b.caption}</figcaption>}
            </figure>
          );
          if (b.type === 'youtube-grid') return (
            <div key={i} className={`pw__yt-grid${b.portrait ? ' pw__yt-grid--portrait' : ''}`}>
              {b.items.map((v, j) => (
                <div key={j} className="pw__yt-grid-item">
                  <div className={`pw__yt-wrap${b.portrait ? ' pw__yt-wrap--portrait' : ''}`}>
                    <iframe
                      src={'https://www.youtube.com/embed/' + v.id}
                      title={v.label}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="pw__caption">{v.label}</p>
                </div>
              ))}
            </div>
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
          if (b.type === 'experiment-cards') return (
            <div key={i} className="pw__exp-grid">
              {b.items.map((it) => (
                <div key={it.id} className="pw__exp-card">
                  <div
                    className={`pw__exp-thumb${it.src ? '' : ' pw__exp-thumb--disabled'}`}
                    onClick={() => openExperiment(it)}
                    role={it.src ? 'button' : undefined}
                    tabIndex={it.src ? 0 : undefined}
                    onKeyDown={it.src ? (e) => e.key === 'Enter' && openExperiment(it) : undefined}
                    aria-label={it.src ? `Launch ${it.title}` : undefined}
                  >
                    <img src={it.image} alt={it.title} loading="lazy" />
                  </div>
                  <div className="pw__exp-info">
                    <b>{it.title}</b>
                    <p>{it.desc}</p>
                  </div>
                  <button
                    className="pw__exp-btn"
                    onClick={() => openExperiment(it)}
                    disabled={!it.src}
                  >
                    {it.src ? '▶ Try it' : 'Coming Soon'}
                  </button>
                </div>
              ))}
            </div>
          );
          return <p key={i} className="pw__p">{b.text}</p>;
        })}
        {p.tags.length > 0 && (
          <div className="pw__tags">{p.tags.map((t) => <span key={t} className="pw__tag">{t}</span>)}</div>
        )}
        {p.links.length > 0 && (
          <div className="pw__links">
            {p.links.map((l) => (
              <a key={l.url} className="pw__link" href={l.url} target="_blank" rel="noreferrer">{l.label} ↗</a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
