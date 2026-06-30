import { useEffect, useState } from 'react';
import { LAUNCHERS } from './launchers';
import './TopBar.css';

const fmt = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export function TopBar({ onOpen }) {
  const [now, setNow] = useState(() => fmt(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(fmt(new Date())), 10000);
    return () => clearInterval(t);
  }, []);

  const open = (id) => {
    const l = LAUNCHERS.find((x) => x.id === id);
    if (l) onOpen?.(l);
  };

  return (
    <header className="os-topbar">
      <span className="os-topbar__brand">LIGHT &amp; LENSE//OS</span>
      <nav className="os-topbar__nav">
        <button type="button" className="os-topbar__nav-btn" onClick={() => open('finder')}>PROJECTS</button>
        <button type="button" className="os-topbar__nav-btn" onClick={() => open('about')}>ABOUT</button>
        <button type="button" className="os-topbar__nav-btn" onClick={() => open('contact')}>CONTACT</button>
      </nav>
      <span className="os-topbar__clock" data-testid="os-clock">{now}</span>
    </header>
  );
}
