import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@splinetool/react-spline', () => ({
  default: () => <div data-testid="spline-mock" />,
}));

import SplineBackground from './SplineBackground';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('SplineBackground', () => {
  it('renders a lightweight static fallback on mobile, without loading Spline', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: false, media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(<SplineBackground />);
    expect(screen.getByTestId('spline-bg-static')).toBeInTheDocument();
    expect(screen.queryByTestId('spline-mock')).not.toBeInTheDocument();
  });

  it('loads the real Spline scene on desktop', async () => {
    vi.spyOn(window, 'matchMedia').mockImplementation((q) => ({
      matches: q.includes('min-width'), media: q, addEventListener: () => {}, removeEventListener: () => {},
    }));
    render(<SplineBackground />);
    expect(await screen.findByTestId('spline-mock')).toBeInTheDocument();
  });
});
