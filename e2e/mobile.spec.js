import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('mobile viewport shows the classic site instead of the desktop-only interstitial', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero').getByText('RUSSELL')).toBeVisible();
  await expect(page.getByText(/best viewed on desktop/i)).toHaveCount(0);
});

test('no horizontal overflow across the scrolled sections', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['.hero', '.work', '.video-work', '.about', '.contact']) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400); // let whileInView animations settle
  }
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
});

test('tapping a project card opens its full case study', async ({ page }) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /view case study/i }).first();
  await link.scrollIntoViewIfNeeded();
  await link.click();
  await expect(page).toHaveURL(/\/classic\/work\//);
});

test('tapping a reel opens the lightbox without autoplaying first', async ({ page }) => {
  await page.goto('/');
  await page.locator('.video-work').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: /play/i }).first().click();
  await expect(page.locator('.reel-lightbox')).toBeVisible();
});

test('the contact CTA is reachable without scrolling through the whole page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /let's talk/i })).toBeVisible();
});
