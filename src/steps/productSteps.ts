import { ProductPage } from '../pages/ProductPage';
import { expect } from '@playwright/test';

export async function expectSortOptions(productPage: ProductPage, options: string[]) {
  for (const option of options) {
    await expect(productPage.page.locator(productPage.selectors.sort)).toContainText(option);
  }
}
export async function expectProductListNotEmpty(productPage: ProductPage) {
  const names = await productPage.getProductNames();
  expect(names.length).toBeGreaterThan(0);
}
export async function expectProductImagesLoaded(productPage: ProductPage) {
  const srcs = await productPage.getProductImagesSrc();
  for (const src of srcs) {
    expect(src).toMatch(/\.(jpg|png)$/);
  }
}