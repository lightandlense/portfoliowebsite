const sv = (children) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    {children}
  </svg>
);

const IconFolder = (color) => sv(<>
  <path d="M2 7 H9 L11 9 H22 V20 H2 Z" fill={color}/>
</>);

const IconProjector = (color) => sv(<>
  <rect x="2" y="9" width="7" height="6" fill={color}/>
  <polygon points="9,7 22,2 22,22 9,17" fill={color} fillOpacity="0.5"/>
  <circle cx="18" cy="12" r="2.5" fill="#111"/>
</>);

const IconBallStar = () => sv(<>
  <circle cx="12" cy="12" r="10" fill="#FFD400"/>
  <polygon points="12,7 13.3,10.3 16.8,10.5 14,12.7 14.9,16.1 12,14.2 9.1,16.1 10,12.7 7.2,10.5 10.7,10.3" fill="#E2243B" stroke="none"/>
</>);

const IconOverlap = (color) => sv(<>
  <circle cx="9" cy="12" r="7" fill={color} fillOpacity="0.75"/>
  <circle cx="15" cy="12" r="7" fill="#00c2ff" fillOpacity="0.75"/>
</>);

const IconTarget = (color) => sv(<>
  <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.25"/>
  <circle cx="12" cy="12" r="5.5" fill={color} fillOpacity="0.6"/>
  <circle cx="12" cy="12" r="1.5" fill={color}/>
  <line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/>
  <line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/>
</>);

const IconPlay = (color) => sv(<>
  <circle cx="12" cy="12" r="10" fill={color}/>
  <polygon points="9,7 19,12 9,17" fill="#fff" stroke="none"/>
</>);

const IconPerson = (color) => sv(<>
  <circle cx="12" cy="8" r="4" fill={color}/>
  <path d="M4 22 C4 15 20 15 20 22" fill={color}/>
</>);

const IconMail = (color) => sv(<>
  <rect x="2" y="5" width="20" height="14" fill={color} fillOpacity="0.85"/>
  <polyline points="2,5 12,13 22,5" fill="none"/>
</>);

const IconResume = (color) => sv(<>
  <rect x="4" y="2" width="16" height="20" fill={color} fillOpacity="0.18"/>
  <polyline points="8,7 16,7"/>
  <polyline points="8,11 16,11"/>
  <polyline points="8,15 13,15"/>
</>);

const IconScissors = (color) => sv(<>
  <circle cx="6" cy="6" r="3" fill={color}/>
  <circle cx="6" cy="18" r="3" fill={color}/>
  <line x1="20" y1="4" x2="8.5" y2="15.5"/>
  <line x1="8.5" y1="8.5" x2="20" y2="20"/>
</>);

// Each entry is a render function taking the launcher's accent color, so the
// same bold-outline icon shape is reused across launchers but tinted to
// match that launcher's color (see DesktopIcons.jsx).
export const ICONS = {
  finder:                      IconFolder,
  'project:urban-projection':  IconProjector,
  'project:gizmo-factory':     IconBallStar,
  'project:chromotion':        IconOverlap,
  'project:real-time-experiments': IconTarget,
  'project:ai-hair-extensions': IconScissors,
  reels:                       IconPlay,
  resume:                      IconResume,
  about:                       IconPerson,
  contact:                     IconMail,
};
