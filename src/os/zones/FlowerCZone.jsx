import { motion, AnimatePresence } from 'framer-motion';

export function FlowerCZone({ completed }) {
  return (
    <svg viewBox="0 0 60 100" width={60} height={100}>
      <line x1="30" y1="98" x2="30" y2="50" stroke="#4a8c40" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="22" cy="76" rx="10" ry="4" fill="#4a8c40" transform="rotate(-25 22 76)" />
      {!completed && <circle cx="30" cy="44" r="3" fill="rgba(17,17,17,0.12)" />}
      <AnimatePresence>
        {completed && (
          <motion.g initial={{ scale: 0, y: 10 }} animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            style={{ transformOrigin: '30px 50px' }}>
            {[0,60,120,180,240,300].map((a) => {
              const rad = a * Math.PI / 180;
              return <ellipse key={a} cx={30 + 12 * Math.cos(rad)} cy={42 + 12 * Math.sin(rad)}
                rx="7" ry="5" fill="#FF6B35" stroke="#111" strokeWidth="2"
                transform={`rotate(${a} ${30 + 12 * Math.cos(rad)} ${42 + 12 * Math.sin(rad)})`} />;
            })}
            <circle cx="30" cy="42" r="7" fill="#FFD400" stroke="#111" strokeWidth="2" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
