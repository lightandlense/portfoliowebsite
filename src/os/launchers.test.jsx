import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LAUNCHERS, buildOpenAction } from './launchers';
import { DesktopIcons } from './DesktopIcons';
import { Dock } from './Dock';

describe('launchers', () => {
  it('includes the four projects + finder/reels/about/contact', () => {
    const ids = LAUNCHERS.map((l) => l.id);
    for (const id of ['finder', 'reels', 'about', 'contact', 'project:chromotion']) {
      expect(ids).toContain(id);
    }
  });
  it('buildOpenAction maps to a window descriptor', () => {
    const l = LAUNCHERS.find((x) => x.id === 'project:chromotion');
    expect(buildOpenAction(l)).toMatchObject({ id: 'project:chromotion', type: 'project', payload: 'chromotion' });
  });
});

describe('DesktopIcons', () => {
  it('fires onOpen with the launcher on click', async () => {
    const onOpen = vi.fn();
    render(<DesktopIcons onOpen={onOpen} />);
    await userEvent.click(screen.getByRole('button', { name: /projects/i }));
    expect(onOpen).toHaveBeenCalled();
  });
});

describe('Dock', () => {
  it('marks running windows', () => {
    render(<Dock openIds={new Set(['project:chromotion'])} onOpen={() => {}} />);
    expect(screen.getByTestId('dock-item-project:chromotion')).toHaveAttribute('data-running', 'true');
  });
});
