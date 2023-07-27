import { Locator, Page, expect } from "@playwright/test";

export class AllProductsPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly sortSelector: Locator;
    readonly allProductsNames: Locator;
    readonly allProductsPrices: Locator;
    readonly allProducts: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = this.page.locator('.shopping_cart_link');
        this.sortSelector = this.page.locator('[data-test="product_sort_container"]');
        this.allProductsNames = this.page.locator('.inventory_item_name');
        this.allProductsPrices = this.page.locator('.inventory_item_price');
        this.allProducts = this.page.locator('.inventory_item');
        this.pageTitle = this.page.locator('.title');
    }

    async addProductToCartByName(productName: string): Promise<void> {
        await this.allProducts.filter({ hasText: productName }).getByRole('button').click();
    }

    async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    async sortProductsBy(parameter: 'Name'|'Price', order: 'asc'|'desc'): Promise<void> {
        let optionValue = 
            parameter === 'Name' ? order === 'asc' ? 'az' : 'za' : order === 'asc' ? 'lohi' : 'hilo';
        await this.sortSelector.selectOption(optionValue);
    }

    async checkProductsSortedBy(parameter: 'Name'|'Price', order: 'asc'|'desc'): Promise<void> {
        let actualSortedValues: string[];
        let expectedSortedValues: string[];
        
        if (parameter === 'Name') {
            actualSortedValues = await this.allProductsNames.allTextContents();
            expectedSortedValues = order === 'asc' ?
                [...actualSortedValues].sort() : [...actualSortedValues].sort().reverse();
        } else {
            actualSortedValues = await this.allProductsPrices.allTextContents();
            expectedSortedValues = order === 'asc' ?
                [...actualSortedValues].sort((a, b) => {
                    return parseFloat( a.split('$')[1] ) - parseFloat( b.split('$')[1] )
                }) :
                [...actualSortedValues].sort((a, b) => {
                    return parseFloat(b.split('$')[1]) - parseFloat(a.split('$')[1])
                });
        }

        expect(actualSortedValues).toStrictEqual(expectedSortedValues);  
    }

    async checkPageTitleContainsText(expectedTitleText: string): Promise<void> {
        const actualTitleText = await this.pageTitle.innerText();
        expect(actualTitleText).toStrictEqual(expectedTitleText);
    }
}