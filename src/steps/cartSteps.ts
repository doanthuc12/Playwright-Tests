import { CartPage } from '../pages/CartPage';
import { expect } from '@playwright/test';

export async function openCartStep(cartPage: CartPage) {
  await cartPage.openCart();
}
export async function removeItemStep(cartPage: CartPage, index = 0) {
  await cartPage.removeItem(index);
}
export async function expectCartItemsCount(cartPage: CartPage, expected: number) {
  const count = await cartPage.getItemsCount();
  expect(count).toBe(expected);
}
export async function expectCartBadge(cartPage: CartPage, expected: number) {
  const actual = await cartPage.page.locator(cartPage.selectors.cartBadge).textContent();
  expect(actual).toBe(expected.toString());
}
export async function checkoutStep(cartPage: CartPage) {
  await cartPage.clickCheckout();
}
export async function continueShoppingStep(cartPage: CartPage) {
  await cartPage.continueShopping();
}
export async function expectTotalText(cartPage: CartPage, pattern: RegExp) {
  const text = await cartPage.getTotalText();
  expect(text).toMatch(pattern);
}