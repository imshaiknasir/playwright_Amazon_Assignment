import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class SearchedResultPage extends BasePage {
    readonly searchResultTitle: Locator = this.page.locator("//h2/a[not(contains(@href,'https'))][not(contains(@href,'click'))]");


    async clickOnFirstProduct() {
        const newPagePromise = this.page.context().waitForEvent('page');
        await this.searchResultTitle.first().click();
        return await newPagePromise;
    }

    async getAllSearchResultTitles() {
        return await this.searchResultTitle.allTextContents();
    }
} 