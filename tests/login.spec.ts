// import { test } from '@playwright/test';
import { test } from './baseTest';
import { login, expectLoginError, logout } from '../src/steps/loginSteps';
import { UserRole } from '../src/enums/UserRole';


test.describe('LOGIN SUITE', () => {
  // test.beforeAll(async ({ loginPage }) => {
  //   await loginPage.goto();
  // });

  // test.beforeEach(async ({ loginPage }) => {
  //   await loginPage.goto();
  // });

  // test.afterAll(async ({ loginPage }) => {
  // });

  // Login valid user
  [UserRole.STANDARD, UserRole.PROBLEM, UserRole.PERFORMANCE].forEach(user => {
    test(`Login happy path with ${user} @LOGIN_POSITIVE`, async ({ loginPage }) => {
      await test.step(`Login with ${user}`, async () => {
        await login(loginPage, user, 'secret_sauce');
        await test.expect(loginPage.page).toHaveURL(/inventory\.html/);
      });
    });
  });

  // Login locked_out_user
  test('Login fail: locked_out_user @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with locked_out_user', async () => {
      await login(loginPage, UserRole.LOCKED, 'secret_sauce');
      await expectLoginError(loginPage, 'Sorry, this user has been locked out.');
    });
  });

  // Login wrong password
  test('Login fail: wrong password @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with wrong password', async () => {
      await login(loginPage, UserRole.STANDARD, 'wrong_password');
      await expectLoginError(loginPage, 'Username and password do not match');
    });
  });

  // Login wrong username
  test('Login fail: wrong username @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with wrong username', async () => {
      await login(loginPage, 'wrong_user', 'secret_sauce');
      await expectLoginError(loginPage, 'Username and password do not match');
    });
  });

  // Login wrong username & password
  test('Login fail: wrong username and password @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with wrong username and password', async () => {
      await login(loginPage, 'wrong_user', 'wrong_password');
      await expectLoginError(loginPage, 'Username and password do not match');
    });
  });

  // Empty username & password
  test('Login fail: empty username and password @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with empty username and password', async () => {
      await login(loginPage, '', '');
      await expectLoginError(loginPage, 'Username is required');
    });
  });

  // Empty username
  test('Login fail: empty username @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with empty username', async () => {
      await login(loginPage, '', 'secret_sauce');
      await expectLoginError(loginPage, 'Username is required');
    });
  });

  // Empty password
  test('Login fail: empty password @LOGIN_NEGATIVE', async ({ loginPage }) => {
    await test.step('Login with empty password', async () => {
      await login(loginPage, UserRole.STANDARD, '');
      await expectLoginError(loginPage, 'Password is required');
    });
  });

  // Logout after login
  test('Logout after login @LOGIN_POSITIVE', async ({ loginPage }) => {
    await test.step('Login and then logout', async () => {
      await login(loginPage, UserRole.STANDARD, 'secret_sauce');
      await logout(loginPage);
    });
  });
});