import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { snapReducer, initialSnapState, completeZone, loadSnapState } from './snapReducer';

describe('snapReducer', () => {
  it('starts with all zones incomplete', () => {
    expect(Object.values(initialSnapState.completedZones).every(v => v === false)).toBe(true);
    expect(Object.keys(initialSnapState.completedZones)).toHaveLength(10);
  });

  it('completes a zone', () => {
    const next = snapReducer(initialSnapState, completeZone('sun'));
    expect(next.completedZones.sun).toBe(true);
    expect(next.completedZones.rainbow).toBe(false);
  });

  it('does not mutate previous state', () => {
    const s0 = initialSnapState;
    const s1 = snapReducer(s0, completeZone('sun'));
    expect(s0.completedZones.sun).toBe(false);
    expect(s1).not.toBe(s0);
  });

  it('unknown action returns unchanged state', () => {
    const s = snapReducer(initialSnapState, { type: 'NOOP' });
    expect(s).toBe(initialSnapState);
  });

  it('completing an already-done zone is idempotent', () => {
    const s1 = snapReducer(initialSnapState, completeZone('sun'));
    const s2 = snapReducer(s1, completeZone('sun'));
    expect(s2.completedZones.sun).toBe(true);
    expect(Object.values(s2.completedZones).filter(Boolean).length).toBe(1);
  });
});

describe('loadSnapState', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => localStorage.clear());

  it('returns initial state when nothing saved', () => {
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(false);
  });

  it('merges saved completions onto initial state', () => {
    localStorage.setItem('llos-completed-zones', JSON.stringify({ sun: true, bird: true }));
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(true);
    expect(s.completedZones.bird).toBe(true);
    expect(s.completedZones.rainbow).toBe(false);
  });

  it('returns initial state when localStorage contains invalid JSON', () => {
    localStorage.setItem('llos-completed-zones', 'not-json');
    const s = loadSnapState();
    expect(s.completedZones.sun).toBe(false);
  });
});
