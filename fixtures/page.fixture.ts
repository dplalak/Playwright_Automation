import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/Login.page.ts';
import { InventoryPage } from '../pages/Inventory.page.ts';
import { CommonPage } from '../pages/Common.page.ts';
import { CartPage } from '../pages/Cart.page.ts';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOne.page.ts';

type PageObjectsFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    commonPage: CommonPage;
    cartPage: CartPage;
    checkoutStepOnePage: CheckoutStepOnePage;
};

export const test = base.extend<PageObjectsFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    inventoryPage: async ({ page }, use) => { await use(new InventoryPage(page)); },
    commonPage: async ({ page }, use) => { await use(new CommonPage(page)); },
    cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
    checkoutStepOnePage: async ({ page }, use) => { await use(new CheckoutStepOnePage(page)); }
});

export { expect } from '@playwright/test';