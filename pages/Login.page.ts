import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async login(username: string, password: string) {
        await this.usernameInput.waitFor({ state: 'visible' });
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectErrorMessage(message: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(message);
    }
}