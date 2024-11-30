import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
    readonly sellerHomepage: Locator = this.page.locator("//a[@id='bylineInfo']");

    async gotoSellerHomepage() {
        await this.sellerHomepage.click();
        await this.page.waitForLoadState('load');
    }
} 