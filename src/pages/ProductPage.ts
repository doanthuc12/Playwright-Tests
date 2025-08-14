import { Page } from '@playwright/test';

export class ProductPage {
  constructor(public page: Page) {}
  selectors = {
    title: '.inventory_item_name',
    sort: '.product_sort_container',
    products: '.inventory_item',
    inventoryList: '.inventory_list',
    name: '.inventory_item_name',
    price: '.inventory_item_price',
    img: '.inventory_item_img img',
    footer: '.footer_copy',
    twitter: '.social_twitter',
    facebook: '.social_facebook',
  };

  async getTitle() {
    return await this.page.locator(this.selectors.title).textContent();
  }
  async isLoaded() {
    await this.page.waitForSelector(this.selectors.inventoryList);
  }
  async sortProducts(option: string) {
    await this.page.selectOption(this.selectors.sort, { label: option });
    await this.isLoaded()
  }
  async getProductNames() {
    await this.isLoaded()
    return await this.page.locator(this.selectors.name).allTextContents();
  }
  async getProductPrices() {
    return await this.page.locator(this.selectors.price).allTextContents();
  }
  async getProductImagesSrc(): Promise<string[]> {
    const imgs = this.page.locator(this.selectors.img);
    const count = await imgs.count();
    const srcs: string[] = [];
    for (let i = 0; i < count; i++) {
      const src = await imgs.nth(i).getAttribute('src');
      if (src) srcs.push(src);
    }
    return srcs;
  }
}