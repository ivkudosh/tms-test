import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";
import ENV from "../support/environment/env";

export class AdminOrgstructurePage extends BasePage {
    public readonly yesButton: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${ENV.BASE_URL}/admin/kpi/structure/orgStructure`;
        this.yesButton = page.locator('.modal-dialog .modal-content .modal-footer #btn-delete-element-org-structure');
    }

    public getNameOrgstructureElement(nameOrgstructure: string): Promise<string> {
        return this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(1)`).innerText();
    }

    public async clickEditOrgstructureButton(nameOrgstructure: string): Promise<void> {
        await this.page.locator(`.col-sm-12 #accordion .${nameOrgstructure} .panel-heading h4.panel-title.row a:nth-child(2)`).click();
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
