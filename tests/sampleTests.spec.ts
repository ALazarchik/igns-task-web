import { test } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import { AllProductsPage } from '../pageObjects/AllProductsPage';
import { USER_DETAILS, PRODUCTS_DETAILS, TEXT_MESSAGES } from '../support/data/constants';
import { CartPage } from '../pageObjects/CartPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';
import { OverviewPage } from '../pageObjects/OverviewPage';
import { ThankYouPage } from '../pageObjects/ThankYouPage';
import { SortConfig } from '../support/interfaces/interfaces';

test.describe('Positive tests with standard user', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.submitLoginCredentials(USER_DETAILS.STANDARD_USER_LOGIN, USER_DETAILS.PASSWORD);
    });
    
    test('[Validation-1] should submit standard user\'s order of 1 item out of 2', async ({ page }) => {
        const allProductsPage = new AllProductsPage(page);
        await allProductsPage.addProductToCartByName(PRODUCTS_DETAILS[0].name);
        await allProductsPage.addProductToCartByName(PRODUCTS_DETAILS[1].name);
        await allProductsPage.goToCart();
    
        const cartPage = new CartPage(page);
        await cartPage.removeProductFromCartByName(PRODUCTS_DETAILS[0].name);
        await cartPage.checkNumberOfItemsInCart(1);
        await cartPage.checkProductContainedInCart([PRODUCTS_DETAILS[1].name]);
        await cartPage.checkTotalCartValueEqualsSumOfItemsPrices([PRODUCTS_DETAILS[1].price]);
        await cartPage.proceedToCheckout();
    
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage
            .submitCheckoutInformation(USER_DETAILS.FIRST_NAME, USER_DETAILS.LAST_NAME, USER_DETAILS.ZIP_CODE);
    
        const overviewPage = new OverviewPage(page);
        await overviewPage.finishOrder();
        
        const thankYouPage = new ThankYouPage(page);
        await thankYouPage.checkWebsiteConfirmsOrder();
    });
    

    const sortConfigs: SortConfig[] = [
        { parameter: 'Name', order: 'asc' },
        { parameter: 'Name', order: 'desc' },
        { parameter: 'Price', order: 'asc' },
        { parameter: 'Price', order: 'desc' },
    ];

    sortConfigs.forEach(config => {
        test(`[Validation-2, 3] should sort products by ${config.parameter} in ${config.order} order`, async ({ page }) => {        
            const allProductsPage = new AllProductsPage(page);
            await allProductsPage.sortProductsBy(config);
            await allProductsPage.checkProductsSortedBy(config);
        });
    });
});

test('[Validation-4] should log in with "locked_out_user"', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.visit();
    await loginPage.submitLoginCredentials(USER_DETAILS.LOCKED_OUT_USER_LOGIN, USER_DETAILS.PASSWORD);
    
    const allProductsPage = new AllProductsPage(page);
    await allProductsPage.checkPageTitleContainsText(TEXT_MESSAGES.PRODUCTS);
});