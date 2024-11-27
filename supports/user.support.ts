import { Page } from '../pages/base.page';

interface IAcceptCookiesAndAge {
  page: Page;
}
const acceptCookiesAndAge = async ({ page }: IAcceptCookiesAndAge) => {
  await page.locator('#onetrust-accept-btn-handler').click();
  await page.locator('.ageconfirmation__confirmBtn').click();
};

export const USER_SUPPORT = { acceptCookiesAndAge };
