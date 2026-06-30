import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BootScreen } from './BootScreen';

vi.mock('./hooks/useReducedMotion', () => ({ useReducedMotion: () => true }));

describe('BootScreen', () => {
  it('shows boot text and calls onDone (immediately under reduced motion)', async () => {
    const onDone = vi.fn();
    render(<BootScreen onDone={onDone} />);
    expect(screen.getByText(/LIGHT & LENSE\/\/OS/)).toBeInTheDocument();
    await waitFor(() => expect(onDone).toHaveBeenCalled());
  });
});
