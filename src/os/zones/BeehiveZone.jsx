import { motion, AnimatePresence } from 'framer-motion';

export function BeehiveZone({ completed }) {
  return (
    <svg viewBox="0 0 80 100" width={80} height={100}>
      {/* hanging string */}
      <line x1="40" y1="0" x2="40" y2="14" stroke="#111" strokeWidth="2" strokeDasharray="3 2" />
      {/* hive body */}
      <path d="M 40 14 L 62 30 L 62 70 Q 62 82 40 88 Q 18 82 18 70 L 18 30 Z"
        fill="#FFD400" stroke="#111" strokeWidth="3" />
      {/* cell lines */}
      <line x1="40" y1="14" x2="40" y2="88" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="40" x2="62" y2="40" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      <line x1="18" y1="58" x2="62" y2="58" stroke="#111" strokeWidth="1.5" opacity="0.4" />
      {/* entrance hole */}
      <ellipse cx="40" cy="82" rx="7" ry="4" fill="#111" />
      {/* bee hint */}
      {!completed && <circle cx="64" cy="28" r="5" fill="rgba(255,212,0,0.2)" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" strokeDasharray="3 2" />}
      <AnimatePresence>
        {completed && (
          <motion.g
            animate={{ x: [0, 14, 0, -10, 0], y: [0, -8, 4, -6, 0] }}
            transition={{ duration: 1.2, repeat: 2, ease: 'easeInOut' }}
            style={{ x: 64, y: 20 }}>
            {/* bee body */}
            <ellipse cx="0" cy="0" rx="7" ry="5" fill="#FFD400" stroke="#111" strokeWidth="2" />
            <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#111" strokeWidth="1.5" />
            <line x1="-5" y1="1" x2="5" y2="1" stroke="#111" strokeWidth="1.5" />
            {/* wings */}
            <ellipse cx="-3" cy="-7" rx="5" ry="3" fill="rgba(255,255,255,0.7)" stroke="#111" strokeWidth="1.5" transform="rotate(-20 -3 -7)" />
            <ellipse cx="3" cy="-7" rx="5" ry="3" fill="rgba(255,255,255,0.7)" stroke="#111" strokeWidth="1.5" transform="rotate(20 3 -7)" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
