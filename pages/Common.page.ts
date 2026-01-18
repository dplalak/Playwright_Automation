import { Page, Locator } from '@playwright/test';

export class CommonPage {

    readonly cartBadgeCount: Locator;
    
    constructor(page: Page) {
        this.cartBadgeCount = page.locator('[data-test="shopping-cart-badge"]');
    }

    async getCartBadgeCount() {
        return await this.cartBadgeCount.textContent();
    }
}