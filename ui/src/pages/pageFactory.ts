import { Page } from "@playwright/test";
import { Pages } from "../helpers/types";
import { LoginPage } from "./loginPage";
import { AdminUsersPage } from "./adminUsersPage";
import { AdminOrgstructurePage } from "./adminOrgstructurePage";
import { AdminPositionsPage } from "./adminPositionsPage";
import { AdminGroupsPage } from "./adminGroupsPage";
import { AdminSubordinationPage } from "./adminSubordinationPage";

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
            case Pages.ADMIN_GROUPS:
                return new AdminSubordinationPage(page);
            case Pages.ADMIN_SUBORDINATION:
                return new AdminGroupsPage(page);
            case Pages.ADMIN_POSITIONS:
                return new AdminPositionsPage(page);
            default:
                return new LoginPage(page);
        }
    }
}
