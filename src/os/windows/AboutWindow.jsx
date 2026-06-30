import './windows.css';

export function AboutWindow() {
  return (
    <div className="about">
      <img src="/images/about me photo.jpg" alt="Russell Klimas" className="about__photo" />
      <p className="about__bio">
        Russell Klimas — creative technologist behind Light &amp; Lense. I build interactive installations,
        projection-mapped experiences, and real-time systems where the physical and digital meet.
      </p>
      <h3>Recognition</h3>
      <ul className="about__rec">
        <li>Olympics — Milano Cortina 2026 reel commission</li>
        <li>91M+ combined reel views · 4.6M+ likes</li>
        <li>Google Creative Fellowship 2026</li>
      </ul>
      <iframe
        className="about__resume-viewer"
        src="/images/Russell Klimas AI Resume 2026.pdf"
        title="Russell Klimas résumé"
      />
      <a className="about__resume" href="/images/Russell Klimas AI Resume 2026.pdf" target="_blank" rel="noreferrer">Download résumé ↗</a>
    </div>
  );
}
