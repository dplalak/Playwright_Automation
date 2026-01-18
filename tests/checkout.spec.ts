import { test, expect } from '../fixtures/page.fixture.ts';

test.describe('Checkout tests', () => {
  
  test.beforeEach(async ({ page, loginPage }) => {

    await page.goto('/');
    await loginPage.login(`${process.env.USERNAME}`, `${process.env.PASSWORD}`);
  });

  test('User can add product to cart and proceed to checkout', { tag: ['@smoke'] }, async ({ inventoryPage, commonPage, cartPage, checkoutStepOnePage }) => {

    await expect(inventoryPage.inventoryPageTitle).toBeVisible();

    const productName = (await inventoryPage.productName.first().textContent())?.trim();
    const productPrice = (await inventoryPage.productPrice.first().textContent())?.trim();
    if (!productName || !productPrice) throw new Error('Product name or price not found');

    await inventoryPage.addFirstProductToCart();
    expect(await commonPage.getCartBadgeCount()).toBe('1');
    await inventoryPage.clickCartButton();

    await expect(cartPage.cartPageTitle).toBeVisible();
    const cartItemsNames = await cartPage.getCartItemsNames();
    expect(cartItemsNames).toContain(productName);
    expect(await cartPage.getQuantityOfItemInCart(productName)).toBe('1');
    expect(await cartPage.getPriceOfItemInCart(productName)).toBe(productPrice);

    await cartPage.clickCheckoutButton();
    await checkoutStepOnePage.expectAllElementsAreVisible();
  });
});