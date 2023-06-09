/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/support/types";
import { MASTER_PASSWORD, ADMIN_MAIL } from "../src/support/constants";
import { AdminOrgstructurePage } from "../src/pages/adminOrgstructurePage";
import { LoginPage } from "../src/pages/loginPage";


let adminOrgstructurePage: AdminOrgstructurePage;
let loginPage: LoginPage;

const NAME_RANDOM: string = random.first();
const NAME_EDITED_RANDOM: string = random.first();

test.describe('Knomary Orgstructure page', async () => {
    test.beforeEach(async ({ page }) => {
        adminOrgstructurePage = PageFactory.getPage(page, Pages.ADMIN_ORGSTRUCTURE) as AdminOrgstructurePage;
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;

        await loginPage.visitPage();
        await loginPage.typeMailInEmailField(ADMIN_MAIL);
        await loginPage.typePasswordInPasswordField(MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
        await adminOrgstructurePage.clickGuideDropdownListElement();
        await adminOrgstructurePage.clickGuideDropdownOrgstructureListElement();
    });

    test('Should create orgstructure by admin', async () => {
        await adminOrgstructurePage.clickAddButton();
        await expect(adminOrgstructurePage.orgstructureNameField).toBeVisible();
        await adminOrgstructurePage.typeNameOrgstructureNameField(NAME_RANDOM);
        await adminOrgstructurePage.clickSaveOrgstructureButton();
        expect(await adminOrgstructurePage.getNameOrgstructureElement(NAME_RANDOM)).toContain(NAME_RANDOM);
    });

    test('Should edit orgstructure name by admin', async () => {
        await adminOrgstructurePage.clickEditOrgstructureButton(NAME_RANDOM);
        await expect(adminOrgstructurePage.editOrgstructureNameField).toBeVisible();
        await adminOrgstructurePage.clearOrgstructureNameField();
        await adminOrgstructurePage.typeNewNameOrgstructureNameField(NAME_EDITED_RANDOM);
        await adminOrgstructurePage.clickSaveOrgstructureButton();
        expect(await adminOrgstructurePage.getNameOrgstructureElement(NAME_EDITED_RANDOM)).toContain(NAME_EDITED_RANDOM);
    });

    test('Should delete orgstructure by admin', async () => {
        await adminOrgstructurePage.clickDeleteOrgstructureButton(NAME_EDITED_RANDOM);
        await expect(adminOrgstructurePage.yesButton).toBeVisible();
        await adminOrgstructurePage.clickYesButton();
        await expect(adminOrgstructurePage.nameOrgstructureElement(NAME_RANDOM)).toBeHidden();
    });
});
