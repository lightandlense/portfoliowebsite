import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'node:fs';

describe('os tokens', () => {
  let css;
  beforeAll(() => { css = fs.readFileSync('src/os/os.css', 'utf8'); });
  it('defines the brutalist tokens', () => {
    for (const v of ['--os-base', '--os-ink', '--os-accent', '--os-yellow', '--os-border', '--os-shadow', '--os-mono', '--os-display']) {
      expect(css).toContain(v);
    }
  });
  it('uses the exact accent color', () => {
    expect(css).toMatch(/--os-accent:\s*#ff3b00/i);
  });
});
