import { Page } from '@playwright/test';

export default class NavPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get logo() {
    return this.page.getByTestId('headerLogo');
  }

  get HEADER() {
    return {
      shop: this.page.getByTestId('headerItem-0'),
    };
  }
}
