import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly minicartIcon: Locator;
  readonly minicartProductsCountHeader: Locator;
  readonly minicartCheckoutBtn: Locator;
  readonly checkoutBtn: Locator;
  readonly productsCountHeader: Locator;
  readonly allProducts: Locator;
  readonly removeBtn: Locator;
  readonly confirmRemoveBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.minicartIcon = page.getByTestId('miniCart');
    this.minicartProductsCountHeader = page.locator(
      'div.mini-cart__header-count',
    );
    this.minicartCheckoutBtn = page.getByTestId('miniCartCheckoutButton');
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
