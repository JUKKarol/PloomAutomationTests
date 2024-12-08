import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.getByTestId('pdpAddToProduct');
  }
}
