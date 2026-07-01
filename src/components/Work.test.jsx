import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Work from './Work';

describe('Work', () => {
  it('links every case study to a route that actually exists (/classic/work/<slug>)', () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link', { name: /view case study/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link.getAttribute('href')).toMatch(/^\/classic\/work\/[a-z0-9-]+$/);
    }
  });
});
