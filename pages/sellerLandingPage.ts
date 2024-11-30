import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class SellerLandingPage extends BasePage {
    readonly navLink_appleWatch: Locator = this.page.locator("(//span[text()='Apple Watch']/parent::a/parent::li)[1]");
    readonly navList_appleWatch: Locator = this.page.getByRole('dialog', {name: 'Navigation List'})
    readonly appleWatchSeriesLink: Locator = this.page.getByRole('link', {name: 'Apple Watch SE (GPS + Cellular)', exact: true})

    async clickOnAppleWatchNavLink() {
        await this.navLink_appleWatch.waitFor({ state: 'visible' });
        await this.navLink_appleWatch.click();
    }

    async clickOnAppleWatchSeriesLink() {
        await this.appleWatchSeriesLink.waitFor({ state: 'visible' });
        await this.appleWatchSeriesLink.click();
        await this.page.waitForLoadState('load');
    }
} 