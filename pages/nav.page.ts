import { Page } from '@playwright/test';

export default class NavPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get LOGO() {
    return { img: this.page.getByTestId('headerLogo') };
  }

  get HEADER() {
    return {
      navItems: this.page.locator(
        'ul.navigation__listWrapper li.navigation__item',
      ),
    };
  }
}
