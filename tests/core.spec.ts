import { test, expect } from '../pages/base.page';
import { NAV_SUPPORT } from '../supports/nav.support';
import { USER_SUPPORT } from '../supports/user.support';

import dotenv from 'dotenv';

dotenv.config();

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
  await NAV_SUPPORT.goToShop({ navPage });

  await page.locator('div[data-sku]').first().click();
  await productPage.ACTIONS.addToCartBtn.click();
  await expect(cartPage.MINICART.productsCountHeader).toContainText('1');
  await cartPage.MINICART.checkoutBtn.click();

  await cartPage.PAYMENTSUMMARY.checkoutBtn.waitFor();

  await expect(cartPage.PAYMENTSUMMARY.productsCountHeader).toContainText('1');
  const cartItems = await cartPage.PRODUCTS.allProducts;
  await expect(await cartItems.count()).toBe(1);
  await expect(cartItems).toContainText('Ploom X Advanced');
});

test('Verify if it is possible to remove a product from the cart', async ({
  page,
  navPage,
  cartPage,
  productPage,
}) => {
  await NAV_SUPPORT.goToShop({ navPage });

  await page.locator('div[data-sku]').first().click();
  await productPage.ACTIONS.addToCartBtn.click();
  await cartPage.MINICART.checkoutBtn.click();

  await cartPage.PAYMENTSUMMARY.checkoutBtn.waitFor();
  await cartPage.PRODUCTS.allProducts;
  await cartPage.ACTIONS.removeBtn.click();
  await cartPage.ACTIONS.confirmRemoveBtn.click();
  await page
    .getByTestId('emptyCartContainer')
    .first()
    .waitFor({ state: 'attached' });

  await expect(await cartPage.PRODUCTS.allProducts.count()).toBe(0);

  await cartPage.MINICART.icon.click();
  await expect(cartPage.MINICART.productsCountHeader).toContainText('0');
});

test('Verify broken links and images on the product page', async ({
  page,
  navPage,
}) => {
  await NAV_SUPPORT.goToShop({ navPage });

  await page.locator('div[data-sku]').first().click();

  //Scroll down to load all images
  for (let i = 0; i < 20; i++) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(500);
  }

  const brokenLinks: string[] = [];
  const brokenImages: string[] = [];

  const links = page.locator('a[href]');
  const linkCount = await links.count();

  for (let i = 0; i < linkCount; i++) {
    const link = links.nth(i);
    const href = await link.getAttribute('href');

    if (href) {
      //Ignore non-HTTP/HTTPS links
      if (!href.startsWith('http://') && !href.startsWith('https://')) {
        continue;
      }

      //Check HTTP/HTTPS links
      const response = await page.request.get(href);
      if (response.status() >= 400) {
        brokenLinks.push(`${href} (status: ${response.status()})`);
      }
    }
  }

  const images = page.locator('img');
  const imageCount = await images.count();

  for (let i = 0; i < imageCount; i++) {
    const image = images.nth(i);
    const src = await image.getAttribute('src');

    if (
      src &&
      !(await image.evaluate(
        (img) =>
          (img as HTMLImageElement).complete &&
          (img as HTMLImageElement).naturalWidth > 0,
      ))
    ) {
      brokenImages.push(src);
    }
  }

  expect(brokenLinks).toHaveLength(0);
  expect(brokenImages).toHaveLength(0);
});
