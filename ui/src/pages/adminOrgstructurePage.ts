import { BasePage } from "./basePage";
import { BASE_URL } from "../support/constants";
import { Locator, Page } from "@playwright/test";

export class AdminOrgstructurePage extends BasePage {
    public readonly orgstructureNameField: Locator;
    private readonly saveOrgstructureButton: Locator;
    public readonly editOrgstructureNameField: Locator;
    public readonly yesButton: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${BASE_URL}/admin/kpi/structure/orgStructure`;
        this.orgstructureNameField = page.locator('.modal-dialog .modal-content .modal-body .form-group input[placeholder="Название"]');
        this.saveOrgstructureButton = page.locator('.modal.fade.in .modal-dialog .modal-content .modal-body .text-center .action-success');
        this.editOrgstructureNameField = page.locator('.modal-dialog .modal-content .modal-body .form-group input[placeholder="Название"][value]');
        this.yesButton = page.locator('.modal-dialog .modal-content .modal-footer #btn-delete-element-org-structure');
    }

    public async typeNameOrgstructureNameField(name: string): Promise<void> {
        await this.orgstructureNameField.type(name);
    }

    public async clickSaveOrgstructureButton(): Promise<void> {
        await this.saveOrgstructureButton.click();
    }

    public getNameOrgstructureElement(nameOrgstructure: string): Promise<string> {
        return this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(1)`).innerText();
    }

    public async clickEditOrgstructureButton(nameOrgstructure: string): Promise<void> {
        await this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(2)`).click();
    }

    public async clearOrgstructureNameField(): Promise<void> {
        await this.editOrgstructureNameField.clear();
    }

    public async typeNewNameOrgstructureNameField(name: string): Promise<void> {
        await this.editOrgstructureNameField.type(name);
    }

    public async clickDeleteOrgstructureButton(nameOrgstructure: string): Promise<void> {
        await this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(3)`).click();
    }

    public async clickYesButton(): Promise<void> {
        await this.yesButton.click();
    }

    public nameOrgstructureElement(nameOrgstructure: string): Locator {
        return this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(1)`);
    }
}
