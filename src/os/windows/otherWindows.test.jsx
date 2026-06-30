import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsFinder } from './ProjectsFinder';
import { ReelsApp } from './ReelsApp';
import { AboutWindow } from './AboutWindow';
import { ContactWindow } from './ContactWindow';

describe('ProjectsFinder', () => {
  it('opens a project on row click', async () => {
    const onOpenProject = vi.fn();
    render(<ProjectsFinder onOpenProject={onOpenProject} />);
    await userEvent.click(screen.getByRole('button', { name: /chromotion/i }));
    expect(onOpenProject).toHaveBeenCalledWith('chromotion');
  });
});

describe('ReelsApp', () => {
  it('shows the views stat and 8 posters, and plays on click', async () => {
    render(<ReelsApp />);
    expect(screen.getByText(/91M\+/)).toBeInTheDocument();
    const posters = screen.getAllByRole('button', { name: /play reel/i });
    expect(posters).toHaveLength(8);
    await userEvent.click(posters[0]);
    expect(screen.getByTestId('reel-player')).toBeInTheDocument();
  });
});

describe('AboutWindow', () => {
  it('renders the about photo and recognition', () => {
    render(<AboutWindow />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/images/about me photo.jpg');
    expect(screen.getByText(/Olympics/i)).toBeInTheDocument();
  });
});

describe('ContactWindow', () => {
  it('has a mailto link', () => {
    render(<ContactWindow />);
    expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:lightandlense@gmail.com');
  });
});
