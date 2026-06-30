import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { OSApp } from './OSApp';

vi.mock('./hooks/useReducedMotion', () => ({ useReducedMotion: () => true }));

describe('OSApp', () => {
  it('renders the desktop on a desktop viewport', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: q.includes('min-width'), media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(<OSApp />);
    expect(screen.getByText('LIGHT & LENSE//OS')).toBeInTheDocument();
  });
  it('renders the interstitial on a phone viewport', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(<OSApp />);
    expect(screen.getByText(/best viewed on desktop/i)).toBeInTheDocument();
  });
});
