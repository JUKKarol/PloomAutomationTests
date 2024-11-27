import { Page } from '@playwright/test';

export default class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get MINICART() {
    return {
      productsCountHeader: this.page.locator('div.mini-cart__header-count'),
      checkoutBtn: this.page.getByTestId('miniCartCheckoutButton'),
    };
  }

  get PAYMENTSUMMARY() {
    return {
      checkoutBtn: this.page.getByTestId('loginCheckoutButton'),
    };
  }

  get PRODUCTS() {
    return {
      allProducts: this.page.getByTestId('regular-cart-list').locator('> div'),
    };
  }
}
