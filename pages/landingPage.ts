import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LandingPage extends BasePage {
    readonly searchDropDownBox: Locator = this.page.locator("//select[@id='searchDropdownBox']");
    readonly searchBar: Locator = this.page.locator("//input[@id='twotabsearchtextbox']");
    readonly searchSuggestionTextBar: Locator = this.page.locator("//div[@class='s-suggestion-container']/div[contains(@class,'s-suggestion')]");

    async selectSearchCategory(category: string) {
        await this.searchDropDownBox.waitFor({ state: 'visible' });
        await this.searchDropDownBox.selectOption({ value: category });
    }

    async searchProduct(product: string) {
        await this.searchBar.waitFor({ state: 'visible' });
        await this.searchBar.clear();
        await this.searchBar.pressSequentially(product, { delay: 150 });
    }
    async getAllSearchSuggestions() {
        await this.searchSuggestionTextBar.first().waitFor({ state: 'visible' });
        return await this.searchSuggestionTextBar.allInnerTexts();
    }

    async clickOnSpecificSearchSuggestion() {
        await this.searchSuggestionTextBar.first().click({ force: true });
    }
} 