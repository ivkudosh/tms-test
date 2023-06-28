import { Locator, Page } from "@playwright/test";

export class BasePage {
    protected url!: string;
    protected readonly selectButton: Locator;
    protected readonly addButton: Locator;
    protected readonly guideDropdownListElement: Locator;
    public readonly guideDropdownOrgstructureListElement: Locator;
    public readonly guideDropdownPositionsListElement: Locator;
    protected readonly saveButtonModalWindow: Locator;
    public readonly nameFieldModalWindow: Locator;
    public readonly filledNameFieldModalWindow: Locator;
    private readonly checkboxElement: Locator;
    public readonly nothingFoundTitle: Locator;

    constructor(protected readonly page: Page) {
        this.selectButton = page.locator('button[type="submit"]', { hasText: "Выбрать" });
        this.addButton = page.locator('div[class="dropdown btn-add"] > a[class="add dropdown-toggle"][data-toggle="modal"]');
        this.guideDropdownListElement = page.locator('.header.dashboard__header .container .dashboard__header-menu.js-wrap__menu ul .js-menu_link .menu-link span', { hasText: 'Справочники' });
        this.guideDropdownOrgstructureListElement = page.locator('.header.dashboard__header .container .dashboard__header-menu.js-wrap__menu ul li:nth-child(1) ul li:nth-child(2)');
        this.guideDropdownPositionsListElement = page.locator('.header.dashboard__header .container .dashboard__header-menu.js-wrap__menu ul li:nth-child(1) ul li:nth-child(4)');
        this.saveButtonModalWindow = page.locator('.modal.fade.in .modal-dialog .modal-content .modal-body .text-center .action-success');
        this.nameFieldModalWindow = page.locator('.modal-dialog .modal-content .modal-body .form-group input[name="name"]');
        this.filledNameFieldModalWindow = page.locator('.modal-dialog .modal-content .modal-body .form-group input[name="name"][value]');
        this.checkboxElement = page.locator(".checkbox .i-checks");
        this.nothingFoundTitle = page.locator(".nothing_found_title");
    }

    public async visitPage(): Promise<void> {
        await this.page.goto(this.url);
    }

    public async reloadPage(): Promise<void> {
        await this.reloadPage();
    }

    public async getPageTitle(): Promise<string> {
        return await this.page.title();
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

    public async clickGuideDropdownPositionsListElement(): Promise<void> {
        await this.guideDropdownPositionsListElement.click();
    }

    public async clickSaveButtonModal(): Promise<void> {
        await this.saveButtonModalWindow.click();
    }

    public getByText(nameText: string): Locator {
        return this.page.getByText(nameText);
    }

    public async checkCheckboxElement(): Promise<void> {
        await this.checkboxElement.check();
    }

    public async clearNameFieldModalWindow(): Promise<void> {
        await this.filledNameFieldModalWindow.clear();
    }

    public async typeNameInNameFieldModalWindow(name: string): Promise<void> {
        await this.nameFieldModalWindow.type(name);
    }

    public async typeNewNameInNameFieldModalWindow(name: string): Promise<void> {
        await this.filledNameFieldModalWindow.type(name);
    }

    public async waitForTimeout(time: number): Promise<void> {
        await this.page.waitForTimeout(time);
    }
}
