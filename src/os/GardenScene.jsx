// Ambient SVG background for the garden sticker snap desktop.
// Zone interactive elements are layered on top by GardenBackground.
// viewBox 0 0 1920 1080 — preserveAspectRatio slice fills any viewport.

const SKY        = '#F5F0E8';
const GROUND     = '#4a8c40';
const HILL       = '#5cb84a';
const LEAF       = '#3a7a30';
const TRUNK      = '#8b5e3c';
const FENCE_FILL = '#f8f4ec';
const PATH_TAN   = '#c4a274';
const CLOUD_W    = '#ffffff';
const O          = '#111111'; // outline

function Cloud({ cx, cy }) {
  return (
    <g>
      <circle cx={cx - 45} cy={cy + 8} r={34} fill={CLOUD_W} stroke={O} strokeWidth="2.5" />
      <ellipse cx={cx} cy={cy} rx={65} ry={38} fill={CLOUD_W} stroke={O} strokeWidth="2.5" />
      <circle cx={cx + 42} cy={cy + 8} r={28} fill={CLOUD_W} stroke={O} strokeWidth="2.5" />
    </g>
  );
}

// 35 pointed pickets across the full width + two horizontal rails
function Fence() {
  const spacing = 55;
  const count = Math.ceil(1920 / spacing) + 1;
  return (
    <g>
      <rect x="0" y="737" width="1920" height="16" fill={FENCE_FILL} stroke={O} strokeWidth="2" />
      <rect x="0" y="773" width="1920" height="16" fill={FENCE_FILL} stroke={O} strokeWidth="2" />
      {Array.from({ length: count }, (_, i) => {
        const x = 27 + i * spacing;
        return (
          <path
            key={i}
            d={`M ${x - 11} 815 L ${x - 11} 722 L ${x} 678 L ${x + 11} 722 L ${x + 11} 815 Z`}
            fill={FENCE_FILL}
            stroke={O}
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
}

// Left tree — gives visual weight to the left side of the garden
function TreeA() {
  return (
    <g>
      <ellipse cx="210" cy="355" rx="105" ry="118" fill={LEAF} stroke={O} strokeWidth="2.5" />
      <rect x="186" y="440" width="48" height="330" rx="8" fill={TRUNK} stroke={O} strokeWidth="2.5" />
      {/* small branch right — hints at butterfly being nearby */}
      <path d="M 230 495 Q 305 472 375 488" fill="none" stroke={TRUNK} strokeWidth="18" strokeLinecap="round" />
      <path d="M 230 495 Q 305 472 375 488" fill="none" stroke={O}    strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

// Center-right tree — branch connects to where the bird zone sits (68% x, 22% y → 1306, 238)
function TreeB() {
  return (
    <g>
      <ellipse cx="1155" cy="170" rx="100" ry="112" fill={LEAF} stroke={O} strokeWidth="2.5" />
      <rect x="1164" y="255" width="40" height="515" rx="7" fill={TRUNK} stroke={O} strokeWidth="2.5" />
      {/* branch extending right toward bird zone */}
      <path d="M 1184 280 Q 1245 257 1310 243" fill="none" stroke={TRUNK} strokeWidth="18" strokeLinecap="round" />
      <path d="M 1184 280 Q 1245 257 1310 243" fill="none" stroke={O}    strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

// Right tree — branch extends left toward beehive zone (78% x, 58% y → 1498, 626; SVG top ~576)
function TreeC() {
  return (
    <g>
      <ellipse cx="1685" cy="370" rx="90" ry="105" fill={LEAF} stroke={O} strokeWidth="2.5" />
      <rect x="1625" y="455" width="40" height="315" rx="7" fill={TRUNK} stroke={O} strokeWidth="2.5" />
      {/* branch extending left toward beehive */}
      <path d="M 1645 505 Q 1570 540 1500 574" fill="none" stroke={TRUNK} strokeWidth="18" strokeLinecap="round" />
      <path d="M 1645 505 Q 1570 540 1500 574" fill="none" stroke={O}    strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

const GRASS_X = [80, 200, 450, 620, 860, 1120, 1300, 1520, 1750, 1880];

export function GardenScene() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      className="garden-scene"
      aria-hidden="true"
    >
      {/* Sky */}
      <rect x="0" y="0" width="1920" height="1080" fill={SKY} />

      {/* Rolling hills behind fence */}
      <path
        d="M 0 810 Q 480 700 960 748 Q 1440 705 1920 778 L 1920 810 Z"
        fill={HILL}
        stroke={O}
        strokeWidth="1.5"
      />

      {/* Trees (drawn before fence so fence appears in front at ground level) */}
      <TreeA />
      <TreeB />
      <TreeC />

      {/* Clouds */}
      <Cloud cx={520}  cy={90} />
      <Cloud cx={940}  cy={55} />
      <Cloud cx={1285} cy={78} />

      {/* Fence */}
      <Fence />

      {/* Ground */}
      <rect x="0" y="810" width="1920" height="270" fill={GROUND} />
      <rect x="0" y="810" width="1920" height="4"   fill={O} />

      {/* Garden path — perspective trapezoid narrowing toward fence */}
      <path
        d="M 785 1080 L 1135 1080 L 1012 814 L 908 814 Z"
        fill={PATH_TAN}
        stroke={O}
        strokeWidth="2"
      />

      {/* Grass tufts along the ground line */}
      {GRASS_X.map((x) => (
        <g key={x}>
          <path d={`M ${x}   812 Q ${x - 8}  790 ${x - 4}  779`} fill="none" stroke="#3a7a30" strokeWidth="3" strokeLinecap="round" />
          <path d={`M ${x + 6} 812 Q ${x + 2}  786 ${x + 8}  774`} fill="none" stroke="#3a7a30" strokeWidth="3" strokeLinecap="round" />
          <path d={`M ${x - 6} 812 Q ${x - 14} 793 ${x - 10} 782`} fill="none" stroke="#3a7a30" strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
