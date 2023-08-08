import ENV from "../../../../env/env";
import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";

export class AdminGroupsPage extends BasePage {

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${ENV.BASE_URL}/admin/kpi/structure/groups`;
    }

}
