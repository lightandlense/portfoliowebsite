import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Window } from './Window';

const win = { id: 'a', type: 'project', title: 'Chromotion', x: 10, y: 10, z: 1, minimized: false };

describe('Window', () => {
  it('renders the title and children', () => {
    render(<Window window={win} reducedMotion><p>hello</p></Window>);
    expect(screen.getByText('Chromotion')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
  it('fires onClose and onMinimize', async () => {
    const onClose = vi.fn(); const onMinimize = vi.fn();
    render(<Window window={win} onClose={onClose} onMinimize={onMinimize} reducedMotion><p>x</p></Window>);
    await userEvent.click(screen.getByLabelText('Close'));
    await userEvent.click(screen.getByLabelText('Minimize'));
    expect(onClose).toHaveBeenCalledWith('a');
    expect(onMinimize).toHaveBeenCalledWith('a');
  });
  it('renders nothing when minimized', () => {
    const { container } = render(<Window window={{ ...win, minimized: true }} reducedMotion><p>x</p></Window>);
    expect(container).toBeEmptyDOMElement();
  });
});
