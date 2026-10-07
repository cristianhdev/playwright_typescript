import { test as base, expect } from '@playwright/test';
import { WebPage } from '../pages/webpage';
import {Utils as tools} from '../commons/utils';



type Pages = {
  webPage: WebPage;
  utils: tools;
}

export const test = base.extend<Pages>({
  webPage: async ({ page }, use) => {
    const webPage = new WebPage(page);
    await webPage.navigateToHomePage();
    const pageTitle = await page.title();
    await expect(page).toHaveTitle(/Todo List Online - Minimalist, No-Login Required Web Todo App/);
    await use(webPage);
  },
  utils: async ({}, use) => {
    const utils = new tools();
    await use(utils);
  }
});