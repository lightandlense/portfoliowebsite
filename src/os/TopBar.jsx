import { useEffect, useState } from 'react';
import './TopBar.css';

const fmt = (d) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;

export function TopBar() {
  const [now, setNow] = useState(() => fmt(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(fmt(new Date())), 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="os-topbar">
      <span className="os-topbar__brand">LIGHT &amp; LENSE//OS</span>
      <nav className="os-topbar__nav">
        <span>PROJECTS</span><span>ABOUT</span><span>CONTACT</span>
      </nav>
      <span className="os-topbar__clock" data-testid="os-clock">{now}</span>
    </header>
  );
}
