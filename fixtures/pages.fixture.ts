import { test as base, expect } from '@playwright/test';
import { WebPage } from '../pages/webpage';

type Pages = {
  webPage: WebPage;
}

export const test = base.extend<Pages>({
  webPage: async ({ page }, use) => {
    const webPage = new WebPage(page);
    await webPage.navigateToHomePage();
    const pageTitle = await page.title();
    await expect(page).toHaveTitle(/Todo List Online - Minimalist, No-Login Required Web Todo App/);
    await use(webPage);
  }
});