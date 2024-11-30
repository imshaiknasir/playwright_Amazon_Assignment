import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateToAmazon() {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }
} 