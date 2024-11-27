import { test, expect } from '../pages/base.page';
import { USER_SUPPORT } from '../supports/user.support';

test.beforeEach(async ({ page }) => {
  await page.goto('/');

  await USER_SUPPORT.acceptCookiesAndAge({ page });
});

test('Verify if it is possible to add a product to the cart', async ({
  page,
  navPage,
  cartPage,
  productPage,
}) => {
  await navPage.HEADER.shop.click();

  await navPage.logo.first().hover();

  await page.locator('div[data-sku="ploom-x-advanced"]').click();

  await productPage.ACTIONS.addToCartBtn.click();

  await expect(cartPage.MINICART.productsCountHeader).toContainText('1');
  await cartPage.MINICART.checkoutBtn.click();

  await cartPage.PAYMENTSUMMARY.checkoutBtn.waitFor();

  const cartItems = await cartPage.PRODUCTS.allProducts;
  await expect(await cartItems.count()).toBe(1);
  await expect(cartItems).toContainText('Ploom X Advanced');
});
