import './windows.css';
import './ProjectWindow.css';
import { RESUME } from '../data/resume';

export function ResumeWindow() {
  return (
    <div className="resume-win">
      <h2 className="resume-win__name">{RESUME.name}</h2>
      <p className="resume-win__contact">{RESUME.contact}</p>
      <p className="resume-win__links">
        {RESUME.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
        ))}
      </p>

      <h3 className="pw__section-h">Summary</h3>
      <p className="pw__p">{RESUME.summary}</p>

      <h3 className="pw__section-h">Skills</h3>
      <dl className="resume-win__skills">
        {RESUME.skills.map((s) => (
          <div key={s.label} className="resume-win__skill-row">
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>

      <h3 className="pw__section-h">Recognition</h3>
      <ul className="resume-win__list">
        {RESUME.recognition.map((r) => <li key={r}>{r}</li>)}
      </ul>

      <h3 className="pw__section-h">Employment</h3>
      {RESUME.employment.map((job) => (
        <div key={job.company} className="resume-win__job">
          <div className="resume-win__job-head">
            <span className="resume-win__job-company">{job.company}</span>
            <span className="resume-win__job-location">{job.location}</span>
          </div>
          <div className="resume-win__job-sub">
            <span className="resume-win__job-role">{job.role}</span>
            <span className="resume-win__job-dates">{job.dates}</span>
          </div>
          <ul className="resume-win__list">
            {job.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      ))}

      <h3 className="pw__section-h">Education</h3>
      {RESUME.education.map((e) => (
        <p key={e.degree} className="pw__p">
          <strong>{e.degree}</strong><br />{e.school}
        </p>
      ))}

      <a
        className="about-win__resume"
        href="/images/Russell Klimas AI Resume 2026.pdf"
        target="_blank"
        rel="noreferrer"
      >
        Download PDF ↗
      </a>
    </div>
  );
}
