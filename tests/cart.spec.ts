import { test } from './baseTest';
import { login } from '../src/steps/loginSteps';
import { openCartStep, expectCartItemsCount, removeItemStep, expectCartBadge, checkoutStep, continueShoppingStep, expectTotalText } from '../src/steps/cartSteps';

test.describe('CART SUITE', () => {
  test.beforeEach(async ({ loginPage }) => {
    await login(loginPage, 'standard_user', 'secret_sauce');
  });

  test('Add product to cart and check badge @CART_ADD', async ({ page, cartPage, productPage }) => {
    await test.step('Add product to cart', async () => {
      await productPage.page.click('.inventory_item:first-child button');
      await expectCartBadge(cartPage, 1);
    });
  });

  test('Remove product from cart @CART_REMOVE', async ({ cartPage, productPage }) => {
    await test.step('Remove product from cart', async () => {
      await productPage.page.click('.inventory_item:first-child button');
      await openCartStep(cartPage);
      await expectCartItemsCount(cartPage, 1);
      await removeItemStep(cartPage, 0);
      await expectCartItemsCount(cartPage, 0);
    });
  });

  test('Continue shopping from cart @CART_CONTINUE', async ({ cartPage, productPage }) => {
    await test.step('Continue shopping', async () => {
      await productPage.page.click('.inventory_item:first-child button');
      await openCartStep(cartPage);
      await continueShoppingStep(cartPage);
      await test.expect(productPage.page).toHaveURL(/inventory\.html/);
    });
  });
});