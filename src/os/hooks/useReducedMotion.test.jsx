import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

describe('useReducedMotion', () => {
  it('returns false when not preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
  it('returns true when preferred', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true, addEventListener: () => {}, removeEventListener: () => {} });
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
