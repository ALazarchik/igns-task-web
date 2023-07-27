import { Page, Locator, expect } from '@playwright/test';
import { TEXT_MESSAGES } from '../support/data/constants';

export class ThankYouPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly pageHeader: Locator;
    readonly pageText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = this.page.locator('.title');
        this.pageHeader = this.page.locator('.complete-header');
        this.pageText = this.page.locator('.complete-text');
    }

    async checkWebsiteConfirmsOrder(): Promise<void> {
        expect(await this.pageTitle.innerText()).toContain(TEXT_MESSAGES.CHECKOUT_COMPLETE);
        expect(await this.pageHeader.innerText()).toContain(TEXT_MESSAGES.THANK_YOU_FOR_ORDER);
        expect(await this.pageText.innerText()).toContain(TEXT_MESSAGES.YOUR_ORDER_DISPATCHED);
    }
}