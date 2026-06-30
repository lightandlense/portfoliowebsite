import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MobileInterstitial } from './MobileInterstitial';

describe('MobileInterstitial', () => {
  it('explains desktop-only and offers contact', () => {
    render(<MobileInterstitial />);
    expect(screen.getByText(/best viewed on desktop/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:lightandlense@gmail.com');
  });
});
