import { faker } from '@faker-js/faker';
import { expect, test } from "@playwright/test";
import ENV from '../../../env/env';
import { Pages } from "../src/helpers/types";
import { AdminUsersPage } from "../src/pages/adminUsersPage";
import { LoginPage } from "../src/pages/loginPage";
import { PageFactory } from "../src/pages/pageFactory";

let loginPage: LoginPage;
let adminUsersPage: AdminUsersPage;

const DATE_RANDOM: string = faker.date.between({ from: '1950-01-01T00:00:00.000Z', to: '2030-01-01T00:00:00.000Z' }).toLocaleDateString().replace(/\./g, '/');
const NAME_RANDOM: string = faker.person.firstName();
const SURNAME_RANDOM: string = faker.person.lastName();
const EMAIL_RANDOM: string = faker.internet.email();
const EDITED_EMAIL_RANDOM: string = faker.internet.email();

test.describe('Knomary Admin users page', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;
        adminUsersPage = PageFactory.getPage(page, Pages.ADMIN_USERS) as AdminUsersPage;

        await loginPage.visitPage();
        await loginPage.typeMailLoginInEmailField(ENV.ADMIN_MAIL);
        await loginPage.typePasswordInPasswordField(ENV.MASTER_PASSWORD);
        await loginPage.clickOnSignInButton();
    });

    test('Should create user by admin', async () => {
        await adminUsersPage.clickAddButton();
        await expect(adminUsersPage.addUserModalWindow).toBeVisible();
        await adminUsersPage.typeNameInNameField(NAME_RANDOM);
        await adminUsersPage.typeSurnameInSurnameField(SURNAME_RANDOM);
        await adminUsersPage.clickOrgStructureField();
        await expect(adminUsersPage.selectElementOrgStructure).toBeVisible();
        await adminUsersPage.clickOrgStructureGroupElement();
        await adminUsersPage.clickSelectButton();
        await adminUsersPage.clickPositionDropdownField();
        await adminUsersPage.clickPositionResultElement();
        await adminUsersPage.typeDateCalendarWorkField(DATE_RANDOM);
        await adminUsersPage.typeDateCalendarBirthdayField(DATE_RANDOM);
        await adminUsersPage.typeEmailInEmailField(EMAIL_RANDOM);
        await adminUsersPage.clickRandomPasswordButton();
        await adminUsersPage.clickSaveModalWindowButton();
        await expect(adminUsersPage.addUserModalWindow).toBeHidden();
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EMAIL_RANDOM);
    });

    test('Should update user name by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await expect(adminUsersPage.emailEditField).toBeVisible();
        await adminUsersPage.clearEmailField();
        await adminUsersPage.typeNewEmailInEmailField(EDITED_EMAIL_RANDOM);
        await adminUsersPage.clickSaveEditModalWindowButton();
        await expect(adminUsersPage.editUserButton).toBeHidden();
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should give a reward to the user by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickRewardUserButton();
        await expect(adminUsersPage.rewardDropdownListElement).toBeVisible();
        await adminUsersPage.clickRewardDropdownListElement();
        await adminUsersPage.clickRewardDropdownResultListsElement();
        await adminUsersPage.typeTextRewardCommentField(NAME_RANDOM);
        await adminUsersPage.clickRewardSaveButton();
        await expect(adminUsersPage.rewardUserButton).toBeHidden();
        await expect(adminUsersPage.createdRewardElement).toBeVisible();
    });

    test('Should block user by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await expect(adminUsersPage.checkActiveSwitcher).toBeVisible();
        await adminUsersPage.clickCheckActiveSwitcherLabel();
        await adminUsersPage.clickSaveEditModalWindowButton();
        await expect(adminUsersPage.editUserButton).toBeHidden();
        await adminUsersPage.clickShowBlockedUserSwitcher();
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should unblock user by admin', async () => {
        await expect(adminUsersPage.showBlockedUserSwitcher).toBeVisible();
        await adminUsersPage.clickShowBlockedUserSwitcher();
        await expect(adminUsersPage.checkboxUserElement).toBeVisible();
        await adminUsersPage.clickFirstCheckboxUserElement();
        await adminUsersPage.clickEditButton();
        await expect(adminUsersPage.checkActiveSwitcher).toBeVisible();
        await adminUsersPage.clickCheckActiveSwitcherLabel();
        await adminUsersPage.clickSaveEditModalWindowButton();
        await expect(adminUsersPage.editUserButton).toBeHidden();
        expect(await adminUsersPage.getFirstUserMailElementText()).toBe(EDITED_EMAIL_RANDOM);
    });

    test('Should delete user by admin', async () => {
        await adminUsersPage.clickFirstCheckboxUserElement();
        await expect(adminUsersPage.deleteUserButton).toBeVisible();
        await adminUsersPage.clickDeleteUserButton();
        await adminUsersPage.clickConfirmDeleteUserButton();
        await expect(adminUsersPage.deleteUserButton).toBeHidden();
        expect(await adminUsersPage.getFirstUserMailElementText()).not.toBe(EDITED_EMAIL_RANDOM);
    });
});
