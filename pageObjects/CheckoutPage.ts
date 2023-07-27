import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator('[data-test="firstName"]');
        this.lastNameInput = this.page.locator('[data-test="lastName"]');
        this.zipCodeInput = this.page.locator('[data-test="postalCode"]');
    }

    async submitCheckoutInformation(firstname: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.waitFor();
        await this.zipCodeInput.fill(zipCode);
        await this.page.getByText('Continue').click();
    }
}