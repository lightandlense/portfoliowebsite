import { motion, AnimatePresence } from 'framer-motion';

const ALL_PETAL_ANGLES = [0, 60, 120, 180, 240, 300];
const ALWAYS_ANGLES = [120, 180, 240];   // left side — always shown
const MISSING_ANGLES = [0, 60, 300];     // right side — missing until complete

function Petal({ angle, opacity = 1, dashed = false }) {
  const rad = angle * Math.PI / 180;
  const cx = 40 + 13 * Math.cos(rad), cy = 40 + 13 * Math.sin(rad);
  return (
    <ellipse cx={cx} cy={cy} rx="7" ry="5"
      fill={dashed ? 'rgba(226,36,59,0.1)' : '#E2243B'}
      stroke={dashed ? 'rgba(17,17,17,0.18)' : '#111'} strokeWidth="2"
      strokeDasharray={dashed ? '3 2' : 'none'}
      transform={`rotate(${angle} ${cx} ${cy})`}
      opacity={opacity}
    />
  );
}

export function FlowerBZone({ completed }) {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80}>
      <line x1="40" y1="78" x2="40" y2="50" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      {ALWAYS_ANGLES.map((a) => <Petal key={a} angle={a} />)}
      {!completed && MISSING_ANGLES.map((a) => <Petal key={a} angle={a} dashed />)}
      <AnimatePresence>
        {completed && MISSING_ANGLES.map((a, i) => (
          <motion.g key={a} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 16 }}
            style={{ transformOrigin: '40px 40px' }}>
            <Petal angle={a} />
          </motion.g>
        ))}
      </AnimatePresence>
      <circle cx="40" cy="40" r="8" fill="#FFD400" stroke="#111" strokeWidth="2" />
    </svg>
  );
}
