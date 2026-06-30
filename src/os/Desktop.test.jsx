import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Desktop } from './Desktop';

vi.mock('./hooks/useReducedMotion', () => ({ useReducedMotion: () => true }));

beforeEach(() => { window.history.replaceState({}, '', '/'); });

describe('Desktop', () => {
  it('opens a project window when its desktop icon is clicked', async () => {
    render(<Desktop />);
    await userEvent.click(await screen.findByRole('button', { name: /chromotion/i }));
    const wins = await screen.findAllByText('Chromotion');
    expect(wins.length).toBeGreaterThan(0);
  });

  it('boots with a window open from ?open=', async () => {
    window.history.replaceState({}, '', '/?open=project:chromotion');
    render(<Desktop />);
    expect(await screen.findByTestId('project-hero-video')).toBeInTheDocument();
  });

  it('syncs ?open= when a window opens', async () => {
    render(<Desktop />);
    await userEvent.click(await screen.findByRole('button', { name: /reels/i }));
    expect(window.location.search).toContain('open=reels');
  });
});
