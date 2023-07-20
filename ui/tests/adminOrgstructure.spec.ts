import { faker } from '@faker-js/faker';
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/helpers/types";
import { AdminOrgstructurePage } from "../src/pages/adminOrgstructurePage";
import { LoginPage } from "../src/pages/loginPage";
import ENV from "../../environment/env";

let adminOrgstructurePage: AdminOrgstructurePage;
let loginPage: LoginPage;

const ORGSTRUCTURE_NAME_RANDOM: string = faker.company.buzzNoun();
const ORGSTRUCTURE_NAME_EDITED_RANDOM: string = faker.company.buzzNoun();

test.describe('Knomary Orgstructure page', async () => {
    test.beforeEach(async ({ page }) => {
        adminOrgstructurePage = PageFactory.getPage(page, Pages.ADMIN_ORGSTRUCTURE) as AdminOrgstructurePage;
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;

        await loginPage.visitPage();
        await loginPage.typeMailLoginInEmailField(ENV.ADMIN_MAIL);
        await loginPage.typePasswordInPasswordField(ENV.MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
        await adminOrgstructurePage.clickGuideDropdownListElement();
        await expect(adminOrgstructurePage.guideDropdownOrgstructureListElement).toBeVisible();
        await adminOrgstructurePage.clickGuideDropdownOrgstructureListElement();
    });

    test('Should create orgstructure by admin', async () => {
        await adminOrgstructurePage.clickAddButton();
        await expect(adminOrgstructurePage.nameFieldModalWindow).toBeVisible();
        await adminOrgstructurePage.typeNameInNameFieldModalWindow(ORGSTRUCTURE_NAME_RANDOM);
        await adminOrgstructurePage.clickSaveButtonModal();
        expect(await adminOrgstructurePage.getNameOrgstructureElement(ORGSTRUCTURE_NAME_RANDOM)).toContain(ORGSTRUCTURE_NAME_RANDOM);
    });

    test('Should edit orgstructure name by admin', async () => {
        await adminOrgstructurePage.clickEditOrgstructureButton(ORGSTRUCTURE_NAME_RANDOM);
        await expect(adminOrgstructurePage.filledNameFieldModalWindow).toBeVisible();
        await adminOrgstructurePage.clearNameFieldModalWindow();
        await adminOrgstructurePage.typeNewNameInNameFieldModalWindow(ORGSTRUCTURE_NAME_EDITED_RANDOM);
        await adminOrgstructurePage.clickSaveButtonModal();
        expect(await adminOrgstructurePage.getNameOrgstructureElement(ORGSTRUCTURE_NAME_EDITED_RANDOM)).toContain(ORGSTRUCTURE_NAME_EDITED_RANDOM);
    });

    test('Should delete orgstructure by admin', async () => {
        await adminOrgstructurePage.clickDeleteOrgstructureButton(ORGSTRUCTURE_NAME_EDITED_RANDOM);
        await expect(adminOrgstructurePage.yesButton).toBeVisible();
        await adminOrgstructurePage.clickYesButton();
        await expect(adminOrgstructurePage.nameOrgstructureElement(ORGSTRUCTURE_NAME_RANDOM)).toBeHidden();
    });
});
