import { test } from './baseTest';
import { login } from '../src/steps/loginSteps';
import {
  expectSortOptions,
  expectProductListNotEmpty,
  expectProductImagesLoaded
} from '../src/steps/productSteps';

test.describe('PRODUCT SUITE', () => {
  // test.beforeAll(async ({ loginPage }) => {
  // });

  test.beforeEach(async ({ loginPage }) => {
    await login(loginPage, 'standard_user', 'secret_sauce');
  });

  // Check list sort options are displayed all
  test('Product page has sort options @PRODUCT_UI', async ({ productPage }) => {
    await test.step('Check sort options', async () => {
      //need to replace by a function
      await expectSortOptions(productPage, [
        'Name (A to Z)',
        'Name (Z to A)',
        'Price (low to high)',
        'Price (high to low)',
      ]);
    });
  });

  // Verify list product is not empty
  test('Product list is not empty @PRODUCT_UI', async ({ productPage }) => {
    await test.step('Check product list', async () => {
      await expectProductListNotEmpty(productPage);
    });
  });

  // Check function Sort Z-A
  test('Sort Z-A @PRODUCT_SORT', async ({ productPage }) => {
    await test.step('Sort products Z-A', async () => {
      await productPage.sortProducts('Name (Z to A)');

      const names = await productPage.getProductNames();
      test.expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    });
  });

  // Check function Sort Z-A
  test('Sort A-Z @PRODUCT_SORT', async ({ productPage }) => {
    await test.step('Sort products A-Z', async () => {
      await productPage.sortProducts('Name (A to Z)');
      const names = await productPage.getProductNames();
      test.expect(names[0]).toBe('Sauce Labs Backpack');
    });
  });

  // Check function Sort Price low-high
  test('Sort Price (low to high) @PRODUCT_SORT', async ({ productPage }) => {
    await test.step('Sort products Price low-high', async () => {
      await productPage.sortProducts('Price (low to high)');
      const prices = await productPage.getProductPrices();
      test.expect(prices[0]).toBe('$7.99');
    });
  });

  // Check fuction Sort Price high-low
  test('Sort Price (high to low) @PRODUCT_SORT', async ({ productPage }) => {
    await test.step('Sort products Price high-low', async () => {
      await productPage.sortProducts('Price (high to low)');
      const prices = await productPage.getProductPrices();
      test.expect(prices[0]).toBe('$49.99');
    });
  });

  // Check image format is jpg|png
  test('Product images are loaded @PRODUCT_UI', async ({ productPage }) => {
    await test.step('Check product images', async () => {
      await expectProductImagesLoaded(productPage);
    });
  });
});