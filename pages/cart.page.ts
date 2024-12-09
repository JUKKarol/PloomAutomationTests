import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly checkoutBtn: Locator;
  readonly productsCountHeader: Locator;
  readonly allProducts: Locator;
  readonly removeBtn: Locator;
  readonly confirmRemoveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutBtn = page.getByTestId('loginCheckoutButton');
    this.productsCountHeader = page.locator(
      '#one-page-checkout header strong, #aem-checkout [class*="PageLayout-module-title"] span',
    );
    this.allProducts = page.getByTestId('regular-cart-list').locator('> div');
    this.removeBtn = page
      .getByTestId('regular-cart-list')
      .getByTestId('cartRemoveButton');
    this.confirmRemoveBtn = page.getByTestId('remove-item-submit-button');
  }
}
