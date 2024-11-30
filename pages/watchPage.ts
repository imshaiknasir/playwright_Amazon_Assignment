import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class WatchPage extends BasePage {
    readonly watchContainer: Locator = this.page.getByLabel('Apple Watch SE (2nd Gen, 2023) [GPS + Cellular 40mm] Smartwatch with Aluminum Case with Starlight Sport Band. Fitness & Sleep Tracker, Crash Detection, Heart Rate Monitor, Retina Display,');
    readonly quickLook: Locator = this.page.locator("//span[text()='Quick look']");
    readonly watchModal: Locator = this.page.getByTestId('product-showcase-container');
    readonly productTitle: Locator = this.watchModal.locator("//h2/a");

    async hoverOnWatchContainer() {
        await this.watchContainer.first().hover();
    }

    async clickOnQuickLook() {
        await this.quickLook.first().waitFor({ state: 'visible' });
        await this.quickLook.first().click({ force: true });
    }

    async getProductTitle() {
        return await this.productTitle.textContent();
    }
}
