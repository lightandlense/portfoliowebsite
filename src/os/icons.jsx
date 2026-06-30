const sv = (children) => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    {children}
  </svg>
);

const IconGrid = () => sv(<>
  <rect x="2" y="2" width="8" height="8"/><rect x="14" y="2" width="8" height="8"/>
  <rect x="2" y="14" width="8" height="8"/><rect x="14" y="14" width="8" height="8"/>
</>);

const IconProjector = () => sv(<>
  <rect x="2" y="9" width="7" height="6"/>
  <polygon points="9,7 22,2 22,22 9,17"/>
  <circle cx="18" cy="12" r="2.5"/>
</>);

const IconGear = () => sv(<>
  <circle cx="12" cy="12" r="4.5"/>
  <rect x="10" y="1" width="4" height="4"/><rect x="10" y="19" width="4" height="4"/>
  <rect x="1" y="10" width="4" height="4"/><rect x="19" y="10" width="4" height="4"/>
</>);

const IconOverlap = () => sv(<>
  <circle cx="9" cy="12" r="7"/>
  <circle cx="15" cy="12" r="7"/>
</>);

const IconTarget = () => sv(<>
  <circle cx="12" cy="12" r="10"/>
  <circle cx="12" cy="12" r="5.5"/>
  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  <line x1="12" y1="1" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="23"/>
  <line x1="1" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="23" y2="12"/>
</>);

const IconPlay = () => sv(<>
  <circle cx="12" cy="12" r="10"/>
  <polygon points="9,7 19,12 9,17" fill="currentColor" stroke="none"/>
</>);

const IconPerson = () => sv(<>
  <circle cx="12" cy="8" r="4"/>
  <path d="M4 22 C4 15 20 15 20 22"/>
</>);

const IconMail = () => sv(<>
  <rect x="2" y="5" width="20" height="14"/>
  <polyline points="2,5 12,13 22,5"/>
</>);

export const ICONS = {
  finder:                      <IconGrid />,
  'project:urban-projection':  <IconProjector />,
  'project:gizmo-factory':     <IconGear />,
  'project:chromotion':        <IconOverlap />,
  'project:real-time-experiments': <IconTarget />,
  reels:                       <IconPlay />,
  about:                       <IconPerson />,
  contact:                     <IconMail />,
};
