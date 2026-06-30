export const PROJECTS = [
  {
    id: 'urban-projection',
    slug: 'projection-mapping-colorado-springs',
    title: 'Urban Projection',
    category: 'Projection Mapping — Urban Activation',
    tags: ['Projection Mapping', 'Urban', 'Feasibility Study'],
    stats: [
      { value: 'City', label: 'Scale' },
      { value: 'Real-World', label: 'Deployment' },
      { value: 'Feasibility', label: 'Study' },
    ],
    hero: { type: 'image', src: '/images/casestudyimages/butterflies.png' },
    body: [
      { type: 'p', text: 'Large-scale projection mapping onto urban architecture — a feasibility study for a Colorado Springs activation.' },
    ],
    links: [{ kind: 'watch', label: 'Watch on YouTube', url: 'https://www.youtube.com/watch?v=UVEOhV4b6XM' }],
    accent: '#ff8a00',
    icon: { glyph: '🎯', color: '#ff8a00' },
  },
  {
    id: 'gizmo-factory',
    slug: 'gizmo-factory',
    title: 'Gizmo Factory',
    category: 'Creative Technology — Physical-Digital Installation',
    tags: ['Computer Vision', 'Matter.js', 'Projection Mapping'],
    stats: [
      { value: 'CV', label: 'Tracking' },
      { value: 'Physics', label: 'Matter.js' },
      { value: 'Projected', label: 'Surface' },
    ],
    hero: { type: 'video', src: '/images/casestudyimages/GizmoFactory/Viral.mov' },
    body: [
      { type: 'p', text: 'A physical-digital installation: computer-vision-tracked objects drive a projected, physics-simulated factory world.' },
    ],
    links: [{ kind: 'watch', label: 'Watch', url: '/images/casestudyimages/GizmoFactory/process-1.mp4' }],
    accent: '#00d26a',
    icon: { glyph: '🏭', color: '#00d26a' },
  },
  {
    id: 'chromotion',
    slug: 'chromotion',
    title: 'Chromotion',
    category: 'Creative Technology — Interactive Installation',
    tags: ['Computer Vision', 'Pixi.js', 'Python'],
    stats: [
      { value: '2', label: 'Classic Cars' },
      { value: 'Real-Time', label: 'Color Extraction' },
      { value: 'Zero', label: 'App Install' },
    ],
    hero: { type: 'video', src: '/images/casestudyimages/Chromotion/demo.mp4', poster: '/images/casestudyimages/Chromotion/animated-result.jpg' },
    body: [
      { type: 'p', text: 'Color a printed car template with crayons. Hold it up to the kiosk camera. Watch your car drive away on screen — painted in your exact colors, pulled from the paper in real time.' },
    ],
    links: [{ kind: 'watch', label: 'Watch', url: '/images/casestudyimages/Chromotion/demo.mp4' }],
    accent: '#ff3b00',
    icon: { glyph: '🎨', color: '#ff3b00' },
  },
  {
    id: 'real-time-experiments',
    slug: 'real-time-experiments',
    title: 'Real-Time Experiments',
    category: 'Creative Technology — Real-Time & Interactive',
    tags: ['Hand Tracking', 'TouchDesigner', 'WebGL'],
    stats: [
      { value: 'Hand', label: 'Tracking' },
      { value: 'WebGL', label: 'Real-Time' },
      { value: 'Many', label: 'Experiments' },
    ],
    hero: { type: 'interactive' },
    body: [
      { type: 'p', text: 'A running series of real-time interactive sketches — hand-tracking, particle systems, and TouchDesigner/WebGL experiments.' },
    ],
    links: [{ kind: 'try', label: 'See more', url: '/classic/work/real-time-experiments' }],
    accent: '#9333ea',
    icon: { glyph: '🖐️', color: '#9333ea' },
  },
];

export const REELS = [
  { id: 'C6gu4kiC0xf', src: '/videos/C6gu4kiC0xf.mp4', poster: '/images/reels/C6gu4kiC0xf.jpg' },
  { id: 'Co43aVOPOgq', src: '/videos/Co43aVOPOgq.mp4', poster: '/images/reels/Co43aVOPOgq.jpg' },
  { id: 'CosDuregYp4', src: '/videos/CosDuregYp4.mp4', poster: '/images/reels/CosDuregYp4.jpg' },
  { id: 'Cpxh5hcOm-P', src: '/videos/Cpxh5hcOm-P.mp4', poster: '/images/reels/Cpxh5hcOm-P.jpg' },
  { id: 'CqDxinDJcGN', src: '/videos/CqDxinDJcGN.mp4', poster: '/images/reels/CqDxinDJcGN.jpg' },
  { id: 'CqS9h_bpvSJ', src: '/videos/CqS9h_bpvSJ.mp4', poster: '/images/reels/CqS9h_bpvSJ.jpg' },
  { id: 'CrBZHkSsOZf', src: '/videos/CrBZHkSsOZf.mp4', poster: '/images/reels/CrBZHkSsOZf.jpg' },
  { id: 'Cv-J7e7tf0b', src: '/videos/Cv-J7e7tf0b.mp4', poster: '/images/reels/Cv-J7e7tf0b.jpg' },
];

export function getProject(id) {
  return PROJECTS.find((p) => p.id === id);
}
