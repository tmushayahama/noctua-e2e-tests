import { Page } from '@playwright/test';

export class AnnotationPage {
  constructor(private page: Page) { }

  async visit(url: string, modelId: string): Promise<void> {
    await this.page.goto(url + modelId);
    // Add more things here as needed
  }

  async login(): Promise<void> {
    const loginButton = this.page.locator('[data-cy="noc-login-button"]');
    if (await loginButton.isVisible()) {
      await loginButton.click();

      await this.page.locator('a:has-text("Sign in locally")').click();
      await this.page.locator('input[name="username"]').fill('gotremayne');
      await this.page.locator('input[name="password"]').fill('artist12345');
      await this.page.locator('button:has-text("Submit")').click();

      await this.page.waitForTimeout(1000);
      await this.page.locator('#return-trip-login').click();
    } else {
      console.log('Login button not found');
    }
  }

  async typeInTextarea(selector: string, text: string): Promise<void> {
    await this.page.locator(`${selector} textarea`).fill(text);
  }

  async selectAutocompleteOption(optionId: string): Promise<void> {
    await this.page.locator('.mat-autocomplete-panel').waitFor({ state: 'visible' });
    const options = this.page.locator('mat-option');
    const count = await options.count();
    for (let i = 0; i < count; i++) {
      const option = options.nth(i);
      const idElement = option.locator('.noc-term-id');
      if (await idElement.isVisible() && (await idElement.innerText()).includes(optionId)) {
        await option.click();
        break;
      }
    }
  }
}