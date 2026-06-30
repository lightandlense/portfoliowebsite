import { motion, AnimatePresence } from 'framer-motion';

export function FlowerAZone({ completed }) {
  return (
    <svg viewBox="0 0 60 100" width={60} height={100}>
      {/* stem */}
      <line x1="30" y1="98" x2="30" y2="42" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="20" cy="74" rx="12" ry="5" fill="#4a8c40" transform="rotate(-30 20 74)" />
      <ellipse cx="40" cy="62" rx="12" ry="5" fill="#4a8c40" transform="rotate(30 40 62)" />
      {/* bloom hint */}
      {!completed && <circle cx="30" cy="34" r="14" fill="rgba(226,36,59,0.08)" stroke="rgba(17,17,17,0.12)" strokeWidth="1.5" strokeDasharray="4 3" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            style={{ transformOrigin: '30px 34px' }}>
            {/* petals */}
            {[0,60,120,180,240,300].map((a) => {
              const rad = a * Math.PI / 180;
              return <ellipse key={a} cx={30 + 13 * Math.cos(rad)} cy={34 + 13 * Math.sin(rad)}
                rx="7" ry="5" fill="#E2243B" stroke="#111" strokeWidth="2"
                transform={`rotate(${a} ${30 + 13 * Math.cos(rad)} ${34 + 13 * Math.sin(rad)})`} />;
            })}
            <circle cx="30" cy="34" r="7" fill="#FFD400" stroke="#111" strokeWidth="2" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
