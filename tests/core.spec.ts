import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { MiniCartPage } from '../pages/minicart.page';
import { NavPage } from '../pages/nav.page';
import { ProductPage } from '../pages/product.page';
import { UserPage } from '../pages/user.page';

test.beforeEach(async ({ page }) => {
  const userPage = new UserPage(page);
  await page.goto('/');

  await userPage.acceptCookiesAndAge();
});

test.describe('Cart Functionality', () => {
  test('Verify if it is possible to add a product to the cart', async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    const miniCartPage = new MiniCartPage(page);
    const navPage = new NavPage(page);
    const productPage = new ProductPage(page);

    await navPage.goToShop();

    await page.locator('div[data-sku]').first().click();
    await productPage.addToCartBtn.click();
    await expect(miniCartPage.ProductsCountHeader).toContainText('1');
    await miniCartPage.CheckoutBtn.click();

    await cartPage.checkoutBtn.waitFor();

    await expect(cartPage.productsCountHeader).toContainText('1');
    const cartItems = await cartPage.allProducts;
    await expect(await cartItems.count()).toBe(1);
    await expect(cartItems).toContainText('Ploom X Advanced');
  });

  test('Verify if it is possible to remove a product from the cart', async ({
    page,
  }) => {
    const cartPage = new CartPage(page);
    const miniCartPage = new MiniCartPage(page);
    const navPage = new NavPage(page);
    const productPage = new ProductPage(page);

    await navPage.goToShop();

    await page.locator('div[data-sku]').first().click();
    await productPage.addToCartBtn.click();
    await miniCartPage.CheckoutBtn.click();

    await cartPage.checkoutBtn.waitFor();
    await cartPage.allProducts;
    await cartPage.removeBtn.click();
    await cartPage.confirmRemoveBtn.click();
    await page
      .getByTestId('emptyCartContainer')
      .first()
      .waitFor({ state: 'attached' });

    await expect(await cartPage.allProducts.count()).toBe(0);

    await miniCartPage.Icon.click();
    await expect(miniCartPage.ProductsCountHeader).toContainText('0');
  });
});

test('Verify broken links and images on the product page', async ({ page }) => {
  const navPage = new NavPage(page);

  await navPage.goToShop();

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
