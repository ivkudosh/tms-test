import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";
import ENV from "../support/environment/env";
export class AdminPositionsPage extends BasePage {
    public readonly createdPositionElement: Locator;
    public readonly secondPositionElement: Locator;
    private readonly searchField: Locator;
    public readonly editPositionButton: Locator;
    public readonly deletePositionButton: Locator;
    public readonly confirmDeletePositionButton: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${ENV.BASE_URL}/admin/kpi/structure/positions`;
        this.createdPositionElement = page.locator("#positions #allUsers #allPositionsBody tr:nth-child(1) td:nth-child(2)");
        this.secondPositionElement = page.locator("#positions #allUsers #allPositionsBody tr:nth-child(2) td:nth-child(2)");
        this.searchField = page.locator(".form-control.filter-input-position");
        this.editPositionButton = page.locator("#positions #allUsers #allPositionsBody tr:nth-child(1) td:nth-child(2) .settings-row .show-edit-position-modal");
        this.deletePositionButton = page.locator("#positions #allUsers #allPositionsBody tr:nth-child(1) td:nth-child(2) .settings-row .show-delete-position-modal");
        this.confirmDeletePositionButton = page.locator("#btn-delete-position.action-success");
    }

    public async typeNamePositionSearchField(namePosition: string): Promise<void> {
        await this.searchField.type(namePosition);
    }

    public async pressEnterSearchField(): Promise<void> {
        await this.searchField.press("Enter");
    }

    public async clickEditPositionButton(): Promise<void> {
        await this.editPositionButton.click();
    }

    public async clickDeletePositionButton(): Promise<void> {
        await this.deletePositionButton.click();
    }

    public async clickConfirmDeletePositionButton(): Promise<void> {
        await this.confirmDeletePositionButton.click();
    }
}
