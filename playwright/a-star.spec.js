// @ts-check
import { test, expect } from '@playwright/test';

test('has buttons and form elements', async ({ page }) => {
  await page.goto(' http://192.168.1.10:5173');

  await expect(page.getByText('Start algo')).toBeVisible()
  await expect(page.getByText('Grid size')).toBeVisible()
  await expect(page.getByText('Speed')).toBeVisible()
});

test('solve empty labyrinth', async ({ page }) => {
  await page.goto('https://localhost:5173');

  await page.getByRole('button', { name: 'Start algo' }).click();

  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});