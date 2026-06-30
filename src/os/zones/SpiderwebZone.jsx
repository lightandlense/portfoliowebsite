import { motion, AnimatePresence } from 'framer-motion';

const CX = 40, CY = 40, RINGS = [14, 24, 34];
// 5 spokes at 0, 72, 144, 216, 288 degrees (pentagon web)
// The "missing" section is between 0° and 72° (top-right quadrant)
const SPOKE_ANGLES = [72, 144, 216, 288, 360]; // 0/360 is the gap boundary
const MISSING_ANGLES = [0, 72];

function toXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export function SpiderwebZone({ completed }) {
  return (
    <svg viewBox="0 0 80 80" width={80} height={80}>
      {/* always-visible spokes (3 of 5) */}
      {[144, 216, 288].map((a) => {
        const [x, y] = toXY(CX, CY, 36, a);
        return <line key={a} x1={CX} y1={CY} x2={x} y2={y} stroke="#111" strokeWidth="1.5" />;
      })}
      {/* always-visible ring arcs (3 rings, 3/5 of each) */}
      {RINGS.map((r) => (
        ['144,216','216,288','288,360'].map((pair) => {
          const [a1, a2] = pair.split(',').map(Number);
          const [x1,y1] = toXY(CX, CY, r, a1);
          const [x2,y2] = toXY(CX, CY, r, a2);
          return <path key={`${r}-${pair}`}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            fill="none" stroke="#111" strokeWidth="1.5" />;
        })
      ))}
      {/* missing section hint */}
      {!completed && RINGS.map((r) => {
        const [x1,y1] = toXY(CX, CY, r, 0);
        const [x2,y2] = toXY(CX, CY, r, 72);
        return <path key={`hint-${r}`}
          d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
          fill="none" stroke="rgba(17,17,17,0.12)" strokeWidth="1.5" strokeDasharray="3 2" />;
      })}
      {/* spider */}
      <circle cx={CX} cy={CY} r="4" fill="#111" />
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 0.6, times: [0, 0.5, 1] }}>
            {/* fill in the 2 missing spokes */}
            {[0, 72].map((a) => {
              const [x,y] = toXY(CX, CY, 36, a);
              return <motion.line key={a} x1={CX} y1={CY} x2={x} y2={y}
                stroke="#111" strokeWidth="1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.3 }} />;
            })}
            {/* fill in missing ring arcs */}
            {RINGS.map((r) => {
              const [x1,y1] = toXY(CX, CY, r, 0);
              const [x2,y2] = toXY(CX, CY, r, 72);
              return <motion.path key={r}
                d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                fill="none" stroke="#111" strokeWidth="1.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }} />;
            })}
            {/* shimmer overlay */}
            <motion.circle cx={CX} cy={CY} r="36" fill="none"
              stroke="rgba(255,212,0,0.4)" strokeWidth="1"
              initial={{ r: 0, opacity: 1 }} animate={{ r: 50, opacity: 0 }}
              transition={{ duration: 0.6 }} />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
