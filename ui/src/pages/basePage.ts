import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected url!: string;
    protected readonly selectButton: Locator;
    protected readonly addButton: Locator;
    protected readonly guideDropdownListElement: Locator;
    protected readonly guideDropdownOrgstructureListElement: Locator;

    constructor(protected readonly page: Page) {
        this.selectButton = page.locator('button[type="submit"]', { hasText: "Выбрать" });
        this.addButton = page.locator('div[class="dropdown btn-add"] > a[class="add dropdown-toggle"][data-toggle="modal"]');
        this.guideDropdownListElement = page.locator('.header.dashboard__header .container .dashboard__header-menu.js-wrap__menu ul .js-menu_link .menu-link span', { hasText: 'Справочники' });
        this.guideDropdownOrgstructureListElement = page.locator('.header.dashboard__header .container .dashboard__header-menu.js-wrap__menu ul li:nth-child(1) ul li:nth-child(2)');
    }

    public async visitPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    public getPageTitle(): Promise<string> {
        return this.page.title();
    }

    public async clickSelectButton(): Promise<void> {
        await this.selectButton.click();
    }

    public async clickAddButton(): Promise<void> {
        await this.addButton.click();
    }

    public async clickGuideDropdownListElement(): Promise<void> {
        await this.guideDropdownListElement.click();
    }

    public async clickGuideDropdownOrgstructureListElement(): Promise<void> {
        await this.guideDropdownOrgstructureListElement.click();
    }
}
