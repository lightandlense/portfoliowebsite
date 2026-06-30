import { useEffect } from 'react';
import { useReducedMotion } from './hooks/useReducedMotion';
import './BootScreen.css';

export function BootScreen({ onDone }) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const delay = reduced ? 0 : 1400;
    const t = setTimeout(onDone, delay);
    return () => clearTimeout(t);
  }, [reduced, onDone]);
  return (
    <div className="os-boot">
      <pre className="os-boot__text">LIGHT &amp; LENSE//OS{'\n'}booting…</pre>
    </div>
  );
}
