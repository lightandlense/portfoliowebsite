import './windows.css';
import './ProjectWindow.css';

const WORKED_WITH = [
  { src: '/images/logos/olympics-logo-trans.png', alt: 'Olympics' },
  { src: '/images/logos/saudi-arabia-flag-trans.png', alt: 'Saudi Arabia' },
  { src: '/images/logos/adobe-transparent.png', alt: 'Adobe' },
  { src: '/images/logos/lumecube-logo-trans.png', alt: 'LumeCube' },
  { src: '/images/logos/nanlite-logo_brandlogos.net_jey7u.png', alt: 'Nanlite' },
  { src: '/images/logos/pubg-logo-trans.png', alt: 'PUBG' },
];

export function AboutWindow({ onOpenResume }) {
  return (
    <div className="about-win">
      <img src="/images/about me photo.jpg" alt="Russell Klimas" className="about-win__photo" />
      <p className="about-win__bio">
        Russell Klimas — creative technologist behind Light &amp; Lense. I build interactive installations,
        projection-mapped experiences, and real-time systems where the physical and digital meet.
      </p>
      <h3 className="pw__section-h">Recognition</h3>
      <div className="pw__stats">
        <div className="pw__stat">
          <span className="pw__stat-value">91M+</span>
          <span className="pw__stat-label">Combined Reel Views</span>
        </div>
        <div className="pw__stat">
          <span className="pw__stat-value">4.6M+</span>
          <span className="pw__stat-label">Likes</span>
        </div>
      </div>
      <p className="pw__p">Olympics — Milano Cortina 2026 reel commission</p>
      <button type="button" className="about-win__resume" onClick={onOpenResume}>
        Read résumé →
      </button>
      <a
        className="about-win__resume"
        href="/images/Russell Klimas AI Resume 2026.pdf"
        target="_blank"
        rel="noreferrer"
      >
        Download PDF ↗
      </a>
      <h3 className="pw__section-h">Worked With</h3>
      <div className="about-win__trusted">
        {WORKED_WITH.map((l) => (
          <img key={l.alt} src={l.src} alt={l.alt} className="about-win__trusted-logo" loading="lazy" />
        ))}
      </div>
    </div>
  );
}
