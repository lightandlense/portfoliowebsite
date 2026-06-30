import { test, expect } from '@playwright/test';

test('boots and opens a project window', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /projects/i }).first().click();
  await expect(page.getByText('Chromotion').first()).toBeVisible();
});

test('deep link boots into a project', async ({ page }) => {
  await page.goto('/?open=project:chromotion');
  await expect(page.getByTestId('project-hero-video')).toBeVisible();
});
