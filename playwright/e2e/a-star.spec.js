// @ts-check
import { test, expect } from '@playwright/test';
import { drawImpossibleSmallLabyrinth } from '../commands/custom-command';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('has buttons and form elements', async ({ page }) => {
  await expect(page.getByText('Start algo')).toBeVisible()
  await expect(page.getByText('Grid size')).toBeVisible()
  await expect(page.getByText('Speed')).toBeVisible()
});

test('Checks default values ', async ({ page }) => {
  // Check the default values for appMenu inputs
  const gridSize = await page.locator('[name="gridSize"]');
  await expect(gridSize).toHaveValue('20');

  const cellSize = await page.locator('[name="cellSize"]');
  await expect(cellSize).toHaveValue('25');

  const speed = await page.locator('[name="speed"]');
  await expect(speed).toHaveValue('5');

  const speedValue = await speed.inputValue();
  expect(speedValue).toBe('5');
});

test('Solve empty labyrinth', async ({ page }) => {
  await page.click('text=Start algo');

  let hasPurpleBackground = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cell')).some((cell) => {
      return window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)';
    });
  });

  expect(hasPurpleBackground).toBe(false);

  await page.waitForTimeout(3000);

  hasPurpleBackground = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cell')).some((cell) => {
      return window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)';
    });
  });

  expect(hasPurpleBackground).toBe(true);
});

test('Should not be able to solve impossible labyrinth', async ({ page }) => {
  // custom commands are just imported functions, just like fixture
  await drawImpossibleSmallLabyrinth(page);

  await page.click('text=Start algo');
  await page.waitForTimeout(3000);

  const hasPurpleBackground = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cell')).some((cell) => {
      return window.getComputedStyle(cell).backgroundColor === 'rgb(128, 0, 128)';
    });
  });

  expect(hasPurpleBackground).toBe(false);
});