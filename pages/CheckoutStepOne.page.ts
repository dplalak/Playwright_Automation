import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepOnePage {

    readonly checkoutStepOnePageTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.checkoutStepOnePageTitle = page.locator('[data-test="title"]').filter({ hasText: 'Checkout: Your Information' });
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    }

    async expectAllElementsAreVisible() {
        await Promise.all([
            expect(this.checkoutStepOnePageTitle).toBeVisible(),
            expect(this.firstNameInput).toBeVisible(),
            expect(this.lastNameInput).toBeVisible(),
            expect(this.postalCodeInput).toBeVisible(),
            expect(this.continueButton).toBeVisible(),
            expect(this.cancelButton).toBeVisible()
        ]);
    }
}