import { Page } from '@playwright/test';  

export class OverviewPage {
    readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    async finishOrder() : Promise<void> {
        await this.page.getByText('Finish').click();
    }
}