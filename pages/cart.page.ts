import { Page } from '@playwright/test';

export default class CartPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get MINICART() {
    return {
      icon: this.page.getByTestId('miniCart'),
      productsCountHeader: this.page.locator('div.mini-cart__header-count'),
      checkoutBtn: this.page.getByTestId('miniCartCheckoutButton'),
    };
  }

  get PAYMENTSUMMARY() {
    return {
      checkoutBtn: this.page.getByTestId('loginCheckoutButton'),
      productsCountHeader: this.page.getByTestId('page-layout-subtitle'),
    };
  }

  get PRODUCTS() {
    return {
      allProducts: this.page.getByTestId('regular-cart-list').locator('> div'),
    };
  }

  get ACTIONS() {
    return {
      removeBtn: this.page
        .getByTestId('regular-cart-list')
        .getByTestId('cartRemoveButton'),
      confirmRemoveBtn: this.page.getByTestId('remove-item-submit-button'),
    };
  }
}
