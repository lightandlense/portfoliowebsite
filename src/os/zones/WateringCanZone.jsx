import { motion, AnimatePresence } from 'framer-motion';

export function WateringCanZone({ completed }) {
  return (
    <svg viewBox="0 0 100 80" width={100} height={80}>
      {/* can body */}
      <rect x="10" y="28" width="48" height="36" rx="4" fill="#3b82f6" stroke="#111" strokeWidth="3" />
      {/* handle */}
      <path d="M 10 36 Q 0 46 10 56" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
      {/* spout */}
      <path d="M 58 38 Q 76 32 82 24" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
      {/* spout tip */}
      <circle cx="82" cy="23" r="3" fill="#111" />
      {/* water hint */}
      {!completed && (
        <path d="M 82 24 Q 90 34 86 48 Q 84 54 88 60"
          fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
      )}
      <AnimatePresence>
        {completed && (
          <motion.g>
            {[0, 1, 2].map((i) => (
              <motion.path key={i}
                d={`M ${82 + i * 4} ${24 + i * 6} Q ${90 + i * 2} ${36 + i * 6} ${86 + i * 3} ${52 + i * 4}`}
                fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
      {/* lid */}
      <ellipse cx="34" cy="28" rx="24" ry="5" fill="#3b82f6" stroke="#111" strokeWidth="2.5" />
    </svg>
  );
}
