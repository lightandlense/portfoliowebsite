import { motion, AnimatePresence } from 'framer-motion';

export function ButterflyZone({ completed }) {
  return (
    <svg viewBox="0 0 80 60" width={80} height={60}>
      {/* body */}
      <ellipse cx="40" cy="30" rx="4" ry="14" fill="#111" />
      {/* antennae */}
      <line x1="38" y1="16" x2="28" y2="6" stroke="#111" strokeWidth="2" />
      <line x1="42" y1="16" x2="52" y2="6" stroke="#111" strokeWidth="2" />
      <circle cx="28" cy="5" r="2" fill="#111" />
      <circle cx="52" cy="5" r="2" fill="#111" />
      {/* right wing — always visible */}
      <path d="M 44 22 Q 72 8 74 30 Q 72 48 44 38 Z" fill="#FF6B35" stroke="#111" strokeWidth="3" />
      {/* left wing — outline hint in incomplete, filled in complete */}
      {!completed && (
        <path d="M 36 22 Q 8 8 6 30 Q 8 48 36 38 Z"
          fill="rgba(255,107,53,0.12)" stroke="rgba(17,17,17,0.2)" strokeWidth="2" strokeDasharray="4 3" />
      )}
      <AnimatePresence>
        {completed && (
          <motion.path
            d="M 36 22 Q 8 8 6 30 Q 8 48 36 38 Z"
            fill="#FF6B35" stroke="#111" strokeWidth="3"
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            style={{ transformOrigin: '36px 30px' }}
          />
        )}
      </AnimatePresence>
    </svg>
  );
}
