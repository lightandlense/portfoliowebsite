import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OSApp } from './OSApp';

vi.mock('./hooks/useReducedMotion', () => ({ useReducedMotion: () => true }));
vi.mock('@splinetool/react-spline', () => ({
  default: () => <div data-testid="spline-mock" />,
}));

describe('OSApp', () => {
  it('renders the desktop on a desktop viewport', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: q.includes('min-width'), media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(
      <MemoryRouter>
        <OSApp />
      </MemoryRouter>
    );
    expect(screen.getByText('LIGHT & LENSE//OS')).toBeInTheDocument();
  });

  it('renders the classic site on a phone viewport instead of an interstitial', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(
      <MemoryRouter>
        <OSApp />
      </MemoryRouter>
    );
    expect(screen.getByText('RUSSELL')).toBeInTheDocument();
    expect(screen.queryByText(/best viewed on desktop/i)).not.toBeInTheDocument();
  });
});
