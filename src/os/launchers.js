import { PROJECTS } from './data/projects';

const projectLaunchers = PROJECTS.map((p) => ({
  id: `project:${p.id}`,
  type: 'project',
  title: p.title,
  glyph: p.icon.glyph,
  color: p.icon.color,
  payload: p.id,
  hideFromRail: p.hideFromRail,
  w: 840,
  h: 575,
}));

const APP_IDS = ['callitin', 'spoonable', 'paintsong', 'mystify'];
const NON_APP_IDS = PROJECTS.map((p) => p.id).filter((id) => !APP_IDS.includes(id));

export const LAUNCHERS = [
  { id: 'finder', type: 'finder', title: 'Projects', glyph: '🗂️', color: '#FFD400', payload: NON_APP_IDS },
  { id: 'apps', type: 'finder', title: 'Apps', glyph: '📱', color: '#a855f7', payload: APP_IDS },
  ...projectLaunchers,
  { id: 'reels', type: 'reels', title: 'Reels', glyph: '🎬', color: '#ff3b00', payload: null },
  { id: 'resume', type: 'resume', title: 'Resume', glyph: '📄', color: '#38bdf8', payload: null },
  { id: 'about', type: 'about', title: 'About', glyph: '🧑‍🚀', color: '#f43f5e', payload: null },
  { id: 'contact', type: 'contact', title: 'Contact', glyph: '✉️', color: '#22c55e', payload: null },
];

export function buildOpenAction(launcher) {
  const action = { id: launcher.id, type: launcher.type, title: launcher.title, payload: launcher.payload };
  if (launcher.w) action.w = launcher.w;
  if (launcher.h) action.h = launcher.h;
  return action;
}
