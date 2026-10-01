import { useEffect, useRef, useState } from 'react';
import './IdleToast.css';

const MESSAGES = [
  "you've been here for 5 minutes, you should hire Russell 👀",
  "still exploring? nice.",
  "psst — hit the contact icon",
];

export function IdleToast() {
  const [visible, setVisible] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const toastRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const show = setTimeout(() => {
      setVisible(true);
      const hide = setTimeout(() => setVisible(false), 6000);
      return () => clearTimeout(hide);
    }, 5 * 60 * 1000);

    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const next = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setMsgIndex((i) => (i + 1) % MESSAGES.length);
        setVisible(true);
      }, 800);
    }, 30 * 1000);
    return () => clearTimeout(next);
  }, [visible, msgIndex]);

  useEffect(() => {
    function handleMove(e) {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (toastRef.current) {
        toastRef.current.style.left = `${e.clientX + 18}px`;
        toastRef.current.style.top = `${e.clientY + 18}px`;
      }
    }
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    if (visible && toastRef.current) {
      toastRef.current.style.left = `${mousePosRef.current.x + 18}px`;
      toastRef.current.style.top = `${mousePosRef.current.y + 18}px`;
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="idle-toast" ref={toastRef} role="status" aria-live="polite">
      <span className="idle-toast__text">{MESSAGES[msgIndex]}</span>
      <button
        className="idle-toast__close"
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
      >×</button>
    </div>
  );
}
