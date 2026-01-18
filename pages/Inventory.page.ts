import { Page, Locator } from '@playwright/test';

export class InventoryPage {

    readonly inventoryPageTitle: Locator;
    readonly addToCartButton: Locator;
    readonly cartButton: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;

    constructor(page: Page) {
        this.inventoryPageTitle = page.locator('[data-test="title"]').filter({ hasText: 'Products' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.cartButton = page.locator('#shopping_cart_container');
        this.productName = this.addToCartButton.locator('..').locator('..').locator('[data-test*="title-link"]');
        this.productPrice = this.addToCartButton.locator('..').locator('[data-test*="inventory-item-price"]');
    }

    async addFirstProductToCart() {
        await this.addToCartButton.first().waitFor({ state: 'visible' });
        await this.addToCartButton.first().click();
    }

    async clickCartButton() {
        await this.cartButton.waitFor({ state: 'visible' });
        await this.cartButton.click();
    }
}