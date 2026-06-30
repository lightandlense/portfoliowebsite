import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';

describe('os tokens', () => {
  let css;
  beforeAll(() => { css = fs.readFileSync('src/os/os.css', 'utf8'); });
  it('defines the brutalist tokens', () => {
    for (const v of ['--os-base', '--os-ink', '--os-red', '--os-orange', '--os-yellow', '--os-accent', '--os-border', '--os-shadow-sm', '--os-shadow', '--os-shadow-lg', '--os-mono', '--os-display']) {
      expect(css).toContain(v);
    }
  });
  it('uses the exact accent color reference', () => {
    expect(css).toMatch(/--os-accent:\s*var\(--os-red\)/i);
  });
});
