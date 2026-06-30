import { motion, AnimatePresence } from 'framer-motion';

const CX = 50, CY = 50, R = 20, R1 = 26, R2 = 40;

function toXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function Ray({ angle, color = '#111' }) {
  const [x1, y1] = toXY(CX, CY, R1, angle);
  const [x2, y2] = toXY(CX, CY, R2, angle);
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" strokeLinecap="round" />;
}

const LEFT_RAYS = [135, 180, 225, 270, 315];
const RIGHT_RAYS = [0, 45, 90];

export function SunZone({ completed }) {
  return (
    <motion.svg
      viewBox="0 0 100 100" width={100} height={100}
      animate={completed ? { rotate: [0, 360] } : {}}
      transition={completed ? { duration: 8, repeat: Infinity, ease: 'linear' } : {}}
    >
      {LEFT_RAYS.map((a) => <Ray key={a} angle={a} />)}
      <AnimatePresence>
        {completed && RIGHT_RAYS.map((a, i) => (
          <motion.g key={a} initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 15 }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <Ray angle={a} />
          </motion.g>
        ))}
      </AnimatePresence>
      {/* incomplete hint: dotted outlines where rays will appear */}
      {!completed && RIGHT_RAYS.map((a) => <Ray key={`hint-${a}`} angle={a} color="rgba(17,17,17,0.12)" />)}
      <circle cx={CX} cy={CY} r={R} fill="#FFD400" stroke="#111" strokeWidth="3" />
    </motion.svg>
  );
}
