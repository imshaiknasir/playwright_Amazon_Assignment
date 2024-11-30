import { chromium, expect, Page, test } from '@playwright/test';
import { BasePage } from '@pages/basePage';
import { LandingPage } from '@pages/landingPage';
import { SearchedResultPage } from '@pages/searchedResultPage';
import { ProductPage } from '@pages/productPage';
import { SellerLandingPage } from '@pages/sellerLandingPage';
import { WatchPage } from '@pages/watchPage';

// test('has title @smoke @e2e @chromium', async ({ page }) => {
//   test.setTimeout(120 * 1000);
//   await page.goto('https://www.amazon.in/', {waitUntil: 'domcontentloaded'});

//   const selectDropdown = page.locator("//select[@id='searchDropdownBox']");
//   await selectDropdown.selectOption({value: 'search-alias=electronics'});

//   const searchBar = page.locator("//input[@id='twotabsearchtextbox']");
//   await searchBar.fill('iPhone 13');

//   const searchSuggesttionContainer = page.locator("//div[@class='autocomplete-results-container']");
//   await expect(searchSuggesttionContainer).toBeVisible();

//   const suggestions = searchSuggesttionContainer.locator("//div[@class='s-suggestion-container']/div[1]");
//   const listofSuggestions = await suggestions.allInnerTexts();
//   for (const suggestion of listofSuggestions) {
//     expect(suggestion.toLowerCase()).toContain('iphone 13');
//   }

//   await searchBar.fill('IPhone 13 128 GB');
//   await suggestions.first().click();

//   const allSearchResults = page.locator("//h2/a[starts-with(@href, '/Apple')]");

//   // Start waiting for new page before clicking. Note no await.
//   const pagePromise = page.context().waitForEvent('page');
//   await allSearchResults.first().click();
//   const newPage = await pagePromise;

//   await newPage.waitForLoadState('domcontentloaded');
//   expect(newPage.url()).toContain('https://www.amazon.in/');

//   const buyerInfoLink = newPage.locator("//a[@id='bylineInfo']");
//   await expect(buyerInfoLink).toBeVisible();
//   await buyerInfoLink.click();

//   await newPage.waitForLoadState('domcontentloaded');
//   expect(newPage.url()).toContain('https://www.amazon.in/stores/Apple/page/');

//   const appleWatchLink = newPage.locator("(//li//span[text()='Apple Watch']/parent::a)[1]");
//   await expect(appleWatchLink).toBeVisible();
//   await appleWatchLink.click();

//   const appleWatchSELink = newPage.locator("//span[text()='Apple Watch SE (GPS + Cellular)']/parent::a");
//   await expect(appleWatchSELink).toBeVisible();
//   await appleWatchSELink.click();

//   await newPage.waitForLoadState('domcontentloaded');

//   const startlightContainer = newPage.locator("(//a[starts-with(@href,'/Apple-Cellular-Smartwatch-Starlight-Detection/dp/')])[1]");
//   await startlightContainer.hover();

//   const quickLook = newPage.locator("(//span[starts-with(text(),'Quick look')])[1]");
//   await expect(quickLook).toBeVisible();
//   await quickLook.click();

//   const quickLookProductModal = newPage.locator("(//div[starts-with(@class,'ProductShowcase__showcase')])[1]");
//   await expect(quickLookProductModal).toBeVisible();

//   const quickLookProductTitle = quickLookProductModal.locator("(//a[starts-with(@href,'/Apple-Cellular-Smartwatch-Starlight-Detection')])[1]");
//   expect(await quickLookProductTitle.textContent()).toContain('Starlight');
// });


test.describe('Amazon Search Test', () => {
  let page: Page;
  let basePage: BasePage;
  let landingPage: LandingPage;
  let searchedResultPage: SearchedResultPage;
  let productPage: ProductPage;
  let sellerLandingPage: SellerLandingPage;
  let watchPage: WatchPage;

  test.beforeAll('Before All Hooks and page initialization', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    page = await context.newPage();

    basePage = new BasePage(page);
    landingPage = new LandingPage(page);
    searchedResultPage = new SearchedResultPage(page);
  });

  test.afterAll('After All Hooks', async () => {
    const pages = page.context().pages();
    for (const page of pages) {
      await page.close();
    }
  });

  test('Amazon Search Test', async () => {
    test.setTimeout(100 * 1000);

    await test.step('Navigate to Amazon', async () => {
      await basePage.navigateToAmazon();
    });

    await test.step('Select Electronics from dropdown', async () => {
      const electronicsValue = 'search-alias=electronics';
      await landingPage.selectSearchCategory(electronicsValue);
    });

    await test.step('Search for IPhone 13', async () => {
      const product = 'iPhone 13';
      await landingPage.searchProduct(product);
    });

    await test.step('Verify search suggestions', async () => {
      const suggestions = await landingPage.getAllSearchSuggestions();
      for (const suggestion of suggestions) {
        expect(suggestion).toContain("iphone");
      }
    });

    await test.step('Search for IPhone 13 128 GB and click on the first suggestion', async () => {
      const product = 'iPhone 13 128 GB';
      await landingPage.searchProduct(product);
      await landingPage.clickOnSpecificSearchSuggestion();
    });

    await test.step('On search result page, click on the first product', async () => {
      const newPage = await searchedResultPage.clickOnFirstProduct();
      await newPage.waitForLoadState('domcontentloaded');

      expect(newPage.url()).toContain('https://www.amazon.in/');

      productPage = new ProductPage(newPage);
      sellerLandingPage = new SellerLandingPage(newPage);
      watchPage = new WatchPage(newPage);
    });

    await test.step('On product page, click and navigate to the seller homepage', async () => {
      await productPage.gotoSellerHomepage();
    });

    await test.step('On seller homepage, click on the watch link', async () => {
      await sellerLandingPage.clickOnAppleWatchNavLink();
      await sellerLandingPage.clickOnAppleWatchSeriesLink();
    });

    await test.step('On watch page, hover on the watch container and click on quick look', async () => {
      await watchPage.hoverOnWatchContainer();
      await watchPage.clickOnQuickLook();
    });

    await test.step('On quick look product modal, verify the product title', async () => {
      const productTitle = await watchPage.getProductTitle();
      expect(productTitle).toContain('Starlight');
    });
  });
});