import { test as base } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductPage } from '../src/pages/ProductPage';
import { CartPage } from '../src/pages/CartPage';

type Fixtures = {
  loginPage: LoginPage;
  productPage: ProductPage;
  cartPage: CartPage;
};
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  productPage: async ({ page }, use) => await use(new ProductPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
});