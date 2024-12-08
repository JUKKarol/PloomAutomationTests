import { expect, type Locator, type Page } from '@playwright/test';

export class NavPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly navItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByTestId('headerLogo');
    this.navItems = page.locator(
      'ul.navigation__listWrapper li.navigation__item',
    );
  }

  async goToShop() {
    if (process.env.BASE_URL?.trim().toLowerCase().endsWith('pl')) {
      await this.navItems.nth(1).click();
    } else {
      await this.navItems.first().click();
    }

    await this.logo.first().hover();
  }
}
