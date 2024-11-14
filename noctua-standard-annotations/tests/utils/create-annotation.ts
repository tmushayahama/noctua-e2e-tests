import { Page } from '@playwright/test';

export async function selectFromAutocomplete(page: Page, inputSelector: string, text?: string, optionId?: string | null = null): Promise<void> {
  await page.locator(inputSelector).click();
  if (text) {
    await page.locator(`${inputSelector} textarea`).fill(text);
  }

  if (optionId) {
    await page.waitForTimeout(1000);
    const options = page.locator('mat-option');
    await options.first().waitFor({ state: 'visible' });
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      const element = option.locator('.noc-term-id, .noc-term-label');
      if (await element.isVisible() && (await element.innerText()).includes(optionId)) {
        await option.click();
        break;
      }
    }
  }
}