import { motion, AnimatePresence } from 'framer-motion';

const BANDS = [
  { r: 48, color: '#E2243B' },   // red — outermost
  { r: 40, color: '#FF6B35' },   // orange — MISSING in incomplete
  { r: 32, color: '#FFD400' },   // yellow
  { r: 24, color: '#4a8c40' },   // green
  { r: 16, color: '#3b82f6' },   // blue — innermost
];

const MISSING_BAND = BANDS[1]; // orange

function Arc({ r, color }) {
  // Semicircle arc from (10, 60) curving up to (110, 60) at radius r from center (60, 60)
  return (
    <path
      d={`M ${60 - r} 60 A ${r} ${r} 0 0 1 ${60 + r} 60`}
      fill="none" stroke={color} strokeWidth="5" strokeLinecap="round"
    />
  );
}

export function RainbowZone({ completed }) {
  return (
    <svg viewBox="0 0 120 80" width={120} height={80}>
      {/* cloud */}
      <ellipse cx="60" cy="65" rx="52" ry="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="35" cy="60" r="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="55" cy="54" r="17" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="75" cy="57" r="14" fill="#fff" stroke="#111" strokeWidth="3" />
      <circle cx="90" cy="63" r="11" fill="#fff" stroke="#111" strokeWidth="3" />
      {/* always-visible bands (skip orange) */}
      {BANDS.filter(b => b !== MISSING_BAND).map(b => <Arc key={b.r} {...b} />)}
      {/* missing band: hint in incomplete, animated in complete */}
      {!completed && <Arc r={MISSING_BAND.r} color="rgba(17,17,17,0.1)" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ opacity: 0, filter: 'brightness(1)' }}
            animate={{ opacity: [0, 1, 1], filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'] }}
            transition={{ duration: 0.4, times: [0, 0.6, 1] }}>
            <Arc r={MISSING_BAND.r} color={MISSING_BAND.color} />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
