import { test, expect } from '../fixtures/page.fixture.ts';
import messages from '../test-data/messages.json';

test.describe('Login tests', () => {
  
  test.beforeEach(async ({ page }) => {

    await page.goto('/');
  });

  test('User can log in with valid credentials', { tag: ['@smoke'] }, async ({ page, loginPage, baseURL }) => {

    await loginPage.login(`${process.env.USERNAME}`, `${process.env.PASSWORD}`);
    await expect(page).toHaveURL(`${baseURL}` + '/inventory.html');
    await expect(loginPage.loginButton).not.toBeVisible();
  });

  test('User cannot log in with locked out account', { tag: ['@negative'] }, async ({ page, loginPage, baseURL }) => {
    
    await loginPage.login(`${process.env.SECOND_USERNAME}`, `${process.env.PASSWORD}`);
    await expect(page).toHaveURL(`${baseURL}`);
    await loginPage.expectErrorMessage(messages.login.locked_out_user);
    await expect(loginPage.loginButton).toBeVisible();
  });
});