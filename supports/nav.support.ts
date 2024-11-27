import NavPage from '../pages/nav.page';

interface IGoToShop {
  navPage: NavPage;
}
const goToShop = async ({ navPage }: IGoToShop) => {
  if (process.env.BASE_URL?.trim().toLowerCase().endsWith('pl')) {
    await navPage.HEADER.navItems.nth(1).click();
  } else {
    await navPage.HEADER.navItems.first().click();
  }

  await navPage.LOGO.img.first().hover();
};

export const NAV_SUPPORT = { goToShop };
