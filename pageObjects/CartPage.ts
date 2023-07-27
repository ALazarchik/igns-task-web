import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartItems: Locator;
    readonly cartItemsNames: Locator;
    readonly cartItemsPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = this.page.locator('.shopping_cart_badge');
        this.cartItems = this.page.locator('.cart_item');
        this.cartItemsNames = this.page.locator( '.inventory_item_name' );
        this.cartItemsPrices = this.page.locator('.inventory_item_price');
    }

    async removeProductFromCartByName(productName: string): Promise<void> {
        await this.cartItems.filter({ hasText: productName }).getByRole('button').click();
    }

    async checkNumberOfItemsInCart(numberOfItems: number): Promise<void> {
        const numberOfItemsInCart = (await this.cartItems.all()).length;
        expect(numberOfItemsInCart).toEqual(numberOfItems);
        const cartBadgeNumberOfItems = Number(await this.cartBadge.innerText());
        expect(cartBadgeNumberOfItems).toEqual(numberOfItems);
    }

    async checkProductContainedInCart(productNames: string[]): Promise<void> {
        const allProductsNames = await this.cartItemsNames.allTextContents();
        productNames.forEach(name => {
            expect(allProductsNames).toContain(name);
        });
    }

    async checkTotalCartValueEqualsSumOfItemsPrices(itemsPrices: number[]): Promise<void> {
        const allProductsPrices = await this.cartItemsPrices.allTextContents();
        const totalAmountInCart = allProductsPrices
            .map(price => Number(price.split('$')[1]))
            .reduce((acc, curr) => acc + curr, 0);
        const itemsPricesSum = itemsPrices.reduce((acc, cur) => acc + cur, 0);
        expect(totalAmountInCart).toEqual(itemsPricesSum);
    }

    async proceedToCheckout(): Promise<void> {
        await this.page.getByText('Checkout').click();
    }
}