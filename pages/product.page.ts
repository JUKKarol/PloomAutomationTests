import { Page } from '@playwright/test';

export default class ProductPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get ACTIONS() {
    return {
      addToCartBtn: this.page.getByTestId('pdpAddToProduct'),
    };
  }
}
