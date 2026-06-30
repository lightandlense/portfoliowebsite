import { describe, it, expect } from 'vitest';
import { PROJECTS, getProject, REELS } from './projects';

const REQUIRED = ['id', 'slug', 'title', 'category', 'tags', 'stats', 'hero', 'body', 'links', 'accent', 'icon'];

describe('projects data', () => {
  it('has the four phase-1 projects', () => {
    expect(PROJECTS.map((p) => p.id).sort()).toEqual(
      ['chromotion', 'gizmo-factory', 'real-time-experiments', 'urban-projection'],
    );
  });
  it('every project has all required fields', () => {
    for (const p of PROJECTS) for (const f of REQUIRED) expect(p, p.id).toHaveProperty(f);
  });
  it('every local media path is absolute (starts with /)', () => {
    for (const p of PROJECTS) {
      if (p.hero.type !== 'iframe') expect(p.hero.src.startsWith('/')).toBe(true);
      if (p.hero.poster) expect(p.hero.poster.startsWith('/')).toBe(true);
    }
  });
  it('getProject resolves by id', () => {
    expect(getProject('chromotion').title).toBe('Chromotion');
    expect(getProject('nope')).toBeUndefined();
  });
  it('has 8 reels with posters', () => {
    expect(REELS).toHaveLength(8);
    for (const r of REELS) {
      expect(r.src).toMatch(/^\/videos\/.+\.mp4$/);
      expect(r.poster).toMatch(/^\/images\/reels\/.+\.jpg$/);
    }
  });
});
