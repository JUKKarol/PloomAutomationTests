import { test as base, expect, Page } from 'playwright/test';
import NavPage from './nav.page';
import CartPage from './cart.page';
import ProductPage from './product.page';

export const test = base.extend<{
  navPage: NavPage;
  cartPage: CartPage;
  productPage: ProductPage;
}>({
  navPage: async ({ page }, use) => {
    await use(new NavPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
});
export { expect, Page };
