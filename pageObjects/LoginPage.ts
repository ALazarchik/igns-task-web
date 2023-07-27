import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.loginError = page.locator('[data-test="error"]');
    }

    async visit(): Promise<void> {
        await this.page.goto('/');
    }

    async submitLoginCredentials(login: string, password: string): Promise<void> {
        await this.loginInput.waitFor();
        await this.loginInput.fill(login);
        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);
        await this.loginButton.waitFor();
        await this.loginButton.click();
    }

    async checkLoginErrorMessageText(expectedErrorText: string): Promise<void> {
        await this.loginError.waitFor();
        await expect(this.loginError).toContainText(expectedErrorText);
    }

    async checkLoginErrorHasText(expectedErrorText: string): Promise<void> {
        const actualErrorText = await this.loginError.innerText();
        expect(actualErrorText).toStrictEqual(expectedErrorText);
    }
}