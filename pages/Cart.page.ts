import { Page, Locator } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly cartPageTitle: Locator;
    readonly cartItemsNames: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartPageTitle = page.locator('[data-test="title"]').filter({ hasText: 'Your Cart' });
        this.cartItemsNames = page.locator('[data-test="inventory-item-name"]');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    }

    async clickCheckoutButton() {
        await this.checkoutButton.waitFor({ state: 'visible' });
        await this.checkoutButton.click();
    }

    async getCartItemsNames() {
        return await this.cartItemsNames.allTextContents();
    }

    async getQuantityOfItemInCart(itemName: string) {
        return (await this.page.locator('.cart_item', { hasText: itemName }).locator('[data-test="item-quantity"]').textContent())?.trim();
    }
    
    async getPriceOfItemInCart(itemName: string) {
        return (await this.page.locator('.cart_item', { hasText: itemName }).locator('[data-test="inventory-item-price"]').textContent())?.trim();
    }
}