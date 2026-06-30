import { motion, AnimatePresence } from 'framer-motion';

export function BirdZone({ completed }) {
  return (
    <svg viewBox="0 0 110 70" width={110} height={70}>
      {/* branch */}
      <path d="M 5 50 Q 55 42 105 52" fill="none" stroke="#4a8c40" strokeWidth="5" strokeLinecap="round" />
      {/* leaf nubs */}
      <ellipse cx="30" cy="46" rx="8" ry="4" fill="#4a8c40" transform="rotate(-20 30 46)" />
      <ellipse cx="70" cy="44" rx="8" ry="4" fill="#4a8c40" transform="rotate(15 70 44)" />
      {/* bird — hidden in incomplete */}
      <AnimatePresence>
        {completed && (
          <motion.g
            initial={{ y: -12, opacity: 0 }} animate={{ y: [0, -3, 0] }}
            transition={{ y: { delay: 0.15, duration: 0.3, repeat: 2, type: 'tween' }, opacity: { duration: 0.2 } }}
          >
            {/* body */}
            <ellipse cx="55" cy="36" rx="12" ry="8" fill="#E2243B" stroke="#111" strokeWidth="2.5" />
            {/* head */}
            <circle cx="67" cy="32" r="7" fill="#E2243B" stroke="#111" strokeWidth="2.5" />
            {/* beak */}
            <polygon points="73,31 80,33 73,35" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
            {/* eye */}
            <circle cx="69" cy="31" r="1.5" fill="#111" />
            {/* wing */}
            <path d="M 52 36 Q 50 26 58 28 Q 62 32 55 38 Z" fill="#111" opacity="0.3" />
            {/* tail */}
            <path d="M 43 36 L 36 30 M 43 37 L 35 37 M 43 38 L 36 44"
              stroke="#E2243B" strokeWidth="2.5" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>
      {/* hint dot where bird will appear */}
      {!completed && <circle cx="55" cy="38" r="4" fill="rgba(17,17,17,0.08)" stroke="rgba(17,17,17,0.15)" strokeWidth="1.5" strokeDasharray="3 2" />}
    </svg>
  );
}
