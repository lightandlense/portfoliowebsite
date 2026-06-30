// Each icon is a small 32x32 SVG showing the missing piece
export function SpecialStickerIcon({ stickerId }) {
  switch (stickerId) {
    case 'sun-rays':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0, 45, 90].map((a) => {
            const rad = (a - 90) * Math.PI / 180;
            const r1 = 10, r2 = 15;
            return <line key={a}
              x1={16 + r1 * Math.cos(rad)} y1={16 + r1 * Math.sin(rad)}
              x2={16 + r2 * Math.cos(rad)} y2={16 + r2 * Math.sin(rad)}
              stroke="#111" strokeWidth="2.5" strokeLinecap="round" />;
          })}
        </svg>
      );
    case 'rainbow-band':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <path d="M 2 20 A 14 14 0 0 1 30 20" fill="none" stroke="#FF6B35" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'butterfly-wing':
      return (
        <svg viewBox="0 0 32 28" width={28} height={25}>
          <path d="M 16 10 Q 2 2 2 14 Q 2 24 16 20 Z" fill="#FF6B35" stroke="#111" strokeWidth="2" />
        </svg>
      );
    case 'bird':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <ellipse cx="16" cy="14" rx="8" ry="5" fill="#E2243B" stroke="#111" strokeWidth="2" />
          <circle cx="22" cy="10" r="5" fill="#E2243B" stroke="#111" strokeWidth="2" />
          <polygon points="26,9 30,11 26,13" fill="#FFD400" stroke="#111" strokeWidth="1" />
        </svg>
      );
    case 'flower-bloom':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,60,120,180,240,300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#E2243B" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
          <circle cx="16" cy="16" r="5" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
        </svg>
      );
    case 'flower-petal':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0, 60, 300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#E2243B" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
        </svg>
      );
    case 'flower-head':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,60,120,180,240,300].map((a) => {
            const rad = a * Math.PI / 180;
            return <ellipse key={a} cx={16 + 8 * Math.cos(rad)} cy={16 + 8 * Math.sin(rad)}
              rx="5" ry="3.5" fill="#FF6B35" stroke="#111" strokeWidth="1.5"
              transform={`rotate(${a} ${16 + 8 * Math.cos(rad)} ${16 + 8 * Math.sin(rad)})`} />;
          })}
          <circle cx="16" cy="16" r="5" fill="#FFD400" stroke="#111" strokeWidth="1.5" />
        </svg>
      );
    case 'bee':
      return (
        <svg viewBox="0 0 32 24" width={28} height={21}>
          <ellipse cx="16" cy="14" rx="8" ry="6" fill="#FFD400" stroke="#111" strokeWidth="2" />
          <line x1="10" y1="12" x2="22" y2="12" stroke="#111" strokeWidth="1.5" />
          <line x1="10" y1="15" x2="22" y2="15" stroke="#111" strokeWidth="1.5" />
          <ellipse cx="11" cy="7" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#111" strokeWidth="1.5" transform="rotate(-20 11 7)" />
          <ellipse cx="21" cy="7" rx="6" ry="4" fill="rgba(255,255,255,0.8)" stroke="#111" strokeWidth="1.5" transform="rotate(20 21 7)" />
        </svg>
      );
    case 'water-stream':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          {[0,1,2].map((i) => (
            <path key={i} d={`M ${6+i*4} ${4+i*4} Q ${18+i*2} ${16+i*3} ${14+i*3} ${28+i*2}`}
              fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      );
    case 'web-section':
      return (
        <svg viewBox="0 0 32 32" width={28} height={28}>
          <line x1="16" y1="16" x2="16" y2="2" stroke="#111" strokeWidth="1.5" />
          <line x1="16" y1="16" x2="29" y2="8" stroke="#111" strokeWidth="1.5" />
          {[8, 14, 20].map((r) => {
            const [x1, y1] = [16, 16 - r];
            const rad = (72 - 90) * Math.PI / 180;
            const [x2, y2] = [16 + r * Math.cos(rad), 16 + r * Math.sin(rad)];
            return <path key={r} d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none" stroke="#111" strokeWidth="1.5" />;
          })}
        </svg>
      );
    default:
      return <span style={{ fontSize: 20 }}>✦</span>;
  }
}

export const SPECIAL_STICKERS = [
  { stickerId: 'sun-rays',       label: 'Sun rays' },
  { stickerId: 'rainbow-band',   label: 'Rainbow band' },
  { stickerId: 'butterfly-wing', label: 'Butterfly wing' },
  { stickerId: 'bird',           label: 'Bird' },
  { stickerId: 'flower-bloom',   label: 'Flower bloom' },
  { stickerId: 'flower-petal',   label: 'Flower petal' },
  { stickerId: 'flower-head',    label: 'Flower head' },
  { stickerId: 'bee',            label: 'Bee' },
  { stickerId: 'water-stream',   label: 'Water stream' },
  { stickerId: 'web-section',    label: 'Web section' },
];
