import { describe, it, expect } from 'vitest';
import {
  initialState, windowReducer,
  openWindow, closeWindow, focusWindow, moveWindow, minimizeWindow, restoreWindow,
} from './windowManager';

const open = (s, id) => windowReducer(s, openWindow({ id, type: 'project', title: id, payload: id }));

describe('windowReducer', () => {
  it('opens a window with incrementing z and default position', () => {
    const s = open(initialState, 'a');
    expect(s.windows).toHaveLength(1);
    expect(s.windows[0]).toMatchObject({ id: 'a', type: 'project', minimized: false });
    expect(s.windows[0].z).toBe(1);
    expect(s.nextZ).toBe(2);
  });
  it('opening an existing id focuses instead of duplicating', () => {
    let s = open(initialState, 'a');
    s = open(s, 'b');
    s = open(s, 'a');
    expect(s.windows).toHaveLength(2);
    const a = s.windows.find((w) => w.id === 'a');
    expect(a.z).toBe(3);
    expect(a.minimized).toBe(false);
  });
  it('closes a window', () => {
    let s = open(initialState, 'a');
    s = windowReducer(s, closeWindow('a'));
    expect(s.windows).toHaveLength(0);
  });
  it('focus raises z-order', () => {
    let s = open(initialState, 'a');
    s = open(s, 'b');
    s = windowReducer(s, focusWindow('a'));
    const a = s.windows.find((w) => w.id === 'a');
    const b = s.windows.find((w) => w.id === 'b');
    expect(a.z).toBeGreaterThan(b.z);
  });
  it('moves a window', () => {
    let s = open(initialState, 'a');
    s = windowReducer(s, moveWindow('a', 250, 120));
    expect(s.windows[0]).toMatchObject({ x: 250, y: 120 });
  });
  it('minimizes and restores (restore re-focuses)', () => {
    let s = open(initialState, 'a');
    s = open(s, 'b');
    s = windowReducer(s, minimizeWindow('a'));
    expect(s.windows.find((w) => w.id === 'a').minimized).toBe(true);
    s = windowReducer(s, restoreWindow('a'));
    const a = s.windows.find((w) => w.id === 'a');
    expect(a.minimized).toBe(false);
    expect(a.z).toBeGreaterThan(s.windows.find((w) => w.id === 'b').z);
  });
  it('does not mutate previous state', () => {
    const s0 = initialState;
    const s1 = open(s0, 'a');
    expect(s0.windows).toHaveLength(0);
    expect(s1).not.toBe(s0);
  });
});
