import { Page } from "@playwright/test";

export class LoginPage {
  constructor(public page: Page) {}
  selectors = {
    username: '#user-name',
    password: '#password',
    loginBtn: '#login-button',
    error: '[data-test="error"]',
    menuBtn: `//div[@class='bm-burger-button']//button[1]`,
    logoutLink: '#logout_sidebar_link',
  };

  async goto() {
    await this.page.goto('https://www.saucedemo.com/v1/');
  }
  async login(username: string, password: string) {
    await this.page.fill(this.selectors.username, username);
    await this.page.fill(this.selectors.password, password);
    await this.page.click(this.selectors.loginBtn);
  }
  async getErrorText() {
    return await this.page.locator(this.selectors.error).textContent();
  }
  async logout() {
    await this.page.click(this.selectors.menuBtn);
    await this.page.click(this.selectors.logoutLink);
  }
}