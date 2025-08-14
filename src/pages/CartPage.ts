import { Page } from '@playwright/test';

export class CartPage {
  constructor(public page: Page) {}

  readonly selectors = {
    cartIcon: '.shopping_cart_link',
    cartList: '.cart_list',
    cartItem: '.cart_item',
    cartBadge: '.shopping_cart_badge',
    removeBtn: '.cart_item button',
    checkoutBtn: '.checkout_button',
    continueShoppingBtn: `//a[@class='btn_secondary']`,
    totalLabel: '.summary_total_label',
  };

  async openCart() {
    await this.page.click(this.selectors.cartIcon);
    await this.page.waitForSelector(this.selectors.cartList);
  }

  async getItemsCount() {
    return await this.page.locator(this.selectors.cartItem).count();
  }

  async removeItem(index = 0) {
    await this.page.locator(this.selectors.removeBtn).nth(index).click();
  }

  async checkBadge(expectedCount: number) {
    await this.page.waitForSelector(this.selectors.cartBadge);
    return await this.page.locator(this.selectors.cartBadge).textContent() === expectedCount.toString();
  }

  async clickCheckout() {
    await this.page.click(this.selectors.checkoutBtn);
  }

  async continueShopping() {
    await this.page.click(this.selectors.continueShoppingBtn);
  }

  async getTotalText() {
    return await this.page.locator(this.selectors.totalLabel).textContent();
  }
}