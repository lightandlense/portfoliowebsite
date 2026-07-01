import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Work from './Work';
import App from '../App';

describe('Work', () => {
  it('links every case study to a route that actually exists (/classic/work/<slug>)', () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    const links = screen.getAllByRole('link', { name: /view case study/i });
    expect(links.length).toBeGreaterThan(0);

    const hrefs = links.map((link) => link.getAttribute('href'));
    for (const href of hrefs) {
      expect(href).toMatch(/^\/classic\/work\/[a-z0-9-]+$/);
    }
  });

  it('every case-study link resolves to a real, rendering route (not a 404 blank page)', () => {
    render(
      <MemoryRouter>
        <Work />
      </MemoryRouter>
    );
    const hrefs = screen
      .getAllByRole('link', { name: /view case study/i })
      .map((link) => link.getAttribute('href'));

    for (const href of hrefs) {
      const { container, unmount } = render(
        <MemoryRouter initialEntries={[href]}>
          <App />
        </MemoryRouter>
      );
      expect(container.textContent.trim().length, `route ${href} rendered nothing`).toBeGreaterThan(0);
      unmount();
    }
  });
});
