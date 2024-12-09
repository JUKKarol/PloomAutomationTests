import { expect, type Locator, type Page } from '@playwright/test';

export class MiniCartPage {
  readonly page: Page;
  readonly Icon: Locator;
  readonly ProductsCountHeader: Locator;
  readonly CheckoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.Icon = page.getByTestId('miniCart');
    this.ProductsCountHeader = page.locator('div.mini-cart__header-count');
    this.CheckoutBtn = page.getByTestId('miniCartCheckoutButton');
  }
}
