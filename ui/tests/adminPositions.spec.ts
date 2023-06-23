/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('random-name');
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/support/types";
import { AdminPositionsPage } from "../src/pages/adminPositionsPage";
import { LoginPage } from "../src/pages/loginPage";
import ENV from "../src/support/environment/env";

let loginPage: LoginPage;
let adminPositionsPage: AdminPositionsPage;

const POSITION_NAME_RANDOM: string = random.first();
const POSITION_NAME_EDITED_RANDOM: string = random.first();

test.describe('Knomary Positions page', async () => {
    test.beforeEach(async ({ page }) => {
        adminPositionsPage = PageFactory.getPage(page, Pages.ADMIN_POSITIONS) as AdminPositionsPage;
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;

        await loginPage.visitPage();
        await loginPage.typeMailLoginInEmailField(ENV.ADMIN_MAIL);
        await loginPage.typePasswordInPasswordField(ENV.MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
        await adminPositionsPage.clickGuideDropdownListElement();
        await expect(adminPositionsPage.guideDropdownPositionsListElement).toBeVisible();
        await adminPositionsPage.clickGuideDropdownPositionsListElement();
    });

    test('Should create position by admin', async () => {
        await adminPositionsPage.clickAddButton();
        await expect(adminPositionsPage.nameFieldModalWindow).toBeVisible();
        await adminPositionsPage.typeNameInNameFieldModalWindow(POSITION_NAME_RANDOM);
        await adminPositionsPage.clickSaveButtonModal();
        await expect(adminPositionsPage.getByText(POSITION_NAME_RANDOM)).toBeVisible();
    });

    test('Should search position by admin', async () => {
        await adminPositionsPage.typeNamePositionSearchField(POSITION_NAME_RANDOM);
        await adminPositionsPage.pressEnterSearchField();
        await expect(adminPositionsPage.secondPositionElement).toBeHidden();
        await expect(adminPositionsPage.getByText(POSITION_NAME_RANDOM)).toBeVisible();
    });

    test('Should edit name positions by admin', async () => {
        await adminPositionsPage.typeNamePositionSearchField(POSITION_NAME_RANDOM);
        await adminPositionsPage.pressEnterSearchField();
        await expect(adminPositionsPage.secondPositionElement).toBeHidden();
        await expect(adminPositionsPage.getByText(POSITION_NAME_RANDOM)).toBeVisible();
        await adminPositionsPage.waitForTimeout(1000);
        await adminPositionsPage.checkCheckboxElement();
        await expect(adminPositionsPage.editPositionButton).toBeVisible();
        await adminPositionsPage.clickEditPositionButton();
        await adminPositionsPage.clearNameFieldModalWindow();
        await adminPositionsPage.typeNewNameInNameFieldModalWindow(POSITION_NAME_EDITED_RANDOM);
        await adminPositionsPage.clickSaveButtonModal();
        await expect(adminPositionsPage.getByText(POSITION_NAME_EDITED_RANDOM)).toBeVisible();
    });

    test('Should delete position by admin', async () => {
        await adminPositionsPage.typeNamePositionSearchField(POSITION_NAME_EDITED_RANDOM);
        await adminPositionsPage.pressEnterSearchField();
        await expect(adminPositionsPage.secondPositionElement).toBeHidden();
        await expect(adminPositionsPage.getByText(POSITION_NAME_EDITED_RANDOM)).toBeVisible();
        await adminPositionsPage.waitForTimeout(1000);
        await adminPositionsPage.checkCheckboxElement();
        await expect(adminPositionsPage.deletePositionButton).toBeVisible();
        await adminPositionsPage.clickDeletePositionButton();
        await adminPositionsPage.clickConfirmDeletePositionButton();
        await expect(adminPositionsPage.deletePositionButton).toBeHidden();
        await adminPositionsPage.typeNamePositionSearchField(POSITION_NAME_EDITED_RANDOM);
        await adminPositionsPage.pressEnterSearchField();
        await expect(adminPositionsPage.secondPositionElement).toBeHidden();
        await expect(adminPositionsPage.nothingFoundTitle).toBeVisible();
    });
});
