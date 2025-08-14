import { LoginPage } from '../pages/LoginPage';
import { expect } from '@playwright/test';

export async function login(loginPage: LoginPage, username: string, password: string) {
  await loginPage.goto();
  await loginPage.login(username, password);
}
export async function expectLoginError(loginPage: LoginPage, expected: string) {
  await expect(loginPage.page.locator(loginPage.selectors.error)).toBeVisible();
  await expect(loginPage.page.locator(loginPage.selectors.error)).toContainText(expected);
}
export async function logout(loginPage: LoginPage) {
  await loginPage.logout();
  await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/v1/index.html');
}