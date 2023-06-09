import { Page } from "@playwright/test";
import { Pages } from "../support/types";
import { LoginPage } from "./loginPage";
import { AdminUsersPage } from "./adminUsersPage";
import { AdminOrgstructurePage } from "./adminOrgstructurePage";

export class PageFactory {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static getPage(page: Page, pageName: Pages) {
        switch (pageName) {
            case Pages.LOG_IN:
                return new LoginPage(page);
            case Pages.ADMIN_USERS:
                return new AdminUsersPage(page);
            case Pages.ADMIN_ORGSTRUCTURE:
                return new AdminOrgstructurePage(page);
            default:
                return new LoginPage(page);
        }
    }
}
