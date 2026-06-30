import { PROJECTS } from './data/projects';

const projectLaunchers = PROJECTS.map((p) => ({
  id: `project:${p.id}`,
  type: 'project',
  title: p.title,
  glyph: p.icon.glyph,
  color: p.icon.color,
  payload: p.id,
}));

export const LAUNCHERS = [
  { id: 'finder', type: 'finder', title: 'Projects', glyph: '🗂️', color: '#111', payload: null },
  ...projectLaunchers,
  { id: 'reels', type: 'reels', title: 'Reels', glyph: '🎬', color: '#ff3b00', payload: null },
  { id: 'about', type: 'about', title: 'About', glyph: '🧑‍🚀', color: '#111', payload: null },
  { id: 'contact', type: 'contact', title: 'Contact', glyph: '✉️', color: '#111', payload: null },
];

export function buildOpenAction(launcher) {
  return { id: launcher.id, type: launcher.type, title: launcher.title, payload: launcher.payload };
}
