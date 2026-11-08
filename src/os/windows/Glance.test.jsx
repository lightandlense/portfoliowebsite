import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Glance } from './Glance';
import { GLANCE } from '../data/glance';

describe('Glance', () => {
  it('every summary has the four required lines and no em dashes', () => {
    for (const [slug, g] of Object.entries(GLANCE)) {
      for (const k of ['result', 'role', 'tech', 'problem']) expect(g[k], `${slug}.${k}`).toBeTruthy();
      expect(JSON.stringify(g), slug).not.toContain('—');
    }
  });

  it('puts Result first and leaves out What broke when the case has none', () => {
    const { container } = render(<Glance slug="spoonable" />);
    expect(container.querySelector('dt').textContent).toBe('Result');
    expect(screen.queryByText('What broke')).toBeNull();
  });

  it('renders nothing for an unknown slug', () => {
    const { container } = render(<Glance slug="nope" />);
    expect(container.firstChild).toBeNull();
  });
});
