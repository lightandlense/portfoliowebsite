import { useEffect, useRef } from 'react';
import './PetalBackground.css';

const DOODLE_COUNT = 28;
const REPEL_RADIUS = 90;
const REPEL_FORCE = 0.5;

const COLORS = [
  'rgba(17,17,17,0.18)',
  'rgba(17,17,17,0.12)',
  'rgba(226,36,59,0.22)',
  'rgba(255,212,0,0.28)',
  'rgba(255,107,53,0.20)',
];
const TYPES = ['circle', 'square', 'triangle', 'diamond', 'plus', 'star'];

function makeDoodle(W, H) {
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    angle: Math.random() * Math.PI * 2,
    angleSpeed: (Math.random() - 0.5) * 0.006,
    size: Math.random() * 18 + 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    type: TYPES[Math.floor(Math.random() * TYPES.length)],
    strokeW: Math.random() < 0.5 ? 2 : 3,
  };
}

function drawDoodle(ctx, d) {
  ctx.save();
  ctx.translate(d.x, d.y);
  ctx.rotate(d.angle);
  ctx.strokeStyle = d.color;
  ctx.lineWidth = d.strokeW;
  ctx.lineJoin = 'miter';
  const s = d.size;

  ctx.beginPath();
  switch (d.type) {
    case 'circle':
      ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
      break;
    case 'square':
      ctx.rect(-s / 2, -s / 2, s, s);
      break;
    case 'triangle': {
      const h = s * 0.866;
      ctx.moveTo(0, -h * 0.67);
      ctx.lineTo(s / 2, h * 0.33);
      ctx.lineTo(-s / 2, h * 0.33);
      ctx.closePath();
      break;
    }
    case 'diamond':
      ctx.moveTo(0, -s / 2);
      ctx.lineTo(s / 2.4, 0);
      ctx.lineTo(0, s / 2);
      ctx.lineTo(-s / 2.4, 0);
      ctx.closePath();
      break;
    case 'plus': {
      const t = s * 0.22;
      ctx.rect(-s / 2, -t, s, t * 2);
      ctx.rect(-t, -s / 2, t * 2, s);
      break;
    }
    case 'star': {
      const r1 = s / 2, r2 = s / 4.5, pts = 4;
      for (let i = 0; i < pts * 2; i++) {
        const r = i % 2 === 0 ? r1 : r2;
        const a = (i * Math.PI) / pts - Math.PI / 2;
        if (i === 0) ctx.moveTo(r * Math.cos(a), r * Math.sin(a));
        else ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
      }
      ctx.closePath();
      break;
    }
  }
  ctx.stroke();
  ctx.restore();
}

export function PetalBackground({ reducedMotion }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const doodles = Array.from({ length: DOODLE_COUNT }, () => makeDoodle(W, H));
    const mouse = { x: -999, y: -999 };
    let raf;

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    function tick() {
      ctx.clearRect(0, 0, W, H);

      for (const d of doodles) {
        // mouse repulsion
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        // drag
        d.vx *= 0.978;
        d.vy *= 0.978;

        d.x += d.vx;
        d.y += d.vy;
        d.angle += d.angleSpeed;

        // wrap
        if (d.x < -40) d.x = W + 30;
        if (d.x > W + 40) d.x = -30;
        if (d.y < -40) d.y = H + 30;
        if (d.y > H + 40) d.y = -30;

        drawDoodle(ctx, d);
      }

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return <canvas ref={canvasRef} className="petal-bg" aria-hidden="true" />;
}
