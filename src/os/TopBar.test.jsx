import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopBar } from './TopBar';

describe('TopBar', () => {
  it('renders the brand', () => {
    render(<TopBar />);
    expect(screen.getByText('LIGHT & LENSE//OS')).toBeInTheDocument();
  });
  it('renders a HH:MM clock', () => {
    render(<TopBar />);
    expect(screen.getByTestId('os-clock').textContent).toMatch(/^\d{2}:\d{2}$/);
  });
});
