export async function drawImpossibleSmallLabyrinth(page) {
  // Set grid size
  const gridSizeInput = page.locator('input[name="gridSize"]');
  await gridSizeInput.fill('5'); // Simulate setting value to 5
  await gridSizeInput.dispatchEvent('input'); // Trigger 'input' event
  await gridSizeInput.dispatchEvent('change'); // Trigger 'change' event

  const cells = page.locator('.cell');
  const cellCount = await cells.count();

  for (let idx = 0; idx < cellCount; idx++) {
    if (idx >= 10 && idx <= 14) {
      const cell = cells.nth(idx);
      await cell.dispatchEvent('mousedown');
    }
  }

  const firstCell = cells.first();
  await firstCell.dispatchEvent('mouseup');
}
