import { faker } from '@faker-js/faker';
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/helpers/types";
import { LoginPage } from "../src/pages/loginPage";
import { BASE_MAIN_TEXT, BASE_TITLE, INCORRECT_CREDENTIALS_MESSAGE } from "../src/helpers/constants";

let loginPage: LoginPage;

const INVALID_EMAIL_RANDOM: string = faker.internet.email();
const INVALID_PASSWORD_RANDOM: string = faker.internet.password();

test.describe('Knomary Login page', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;

        await loginPage.visitPage();
    });

    test('Should have page title', async () => {
        await expect(loginPage.getByText(BASE_MAIN_TEXT)).toBeVisible();
        expect(await loginPage.getPageTitle()).toBe(BASE_TITLE);
    });

    test('Should have error message with invalid credentials', async () => {
        await loginPage.typeMailLoginInEmailField(INVALID_EMAIL_RANDOM);
        await loginPage.typePasswordInPasswordField(INVALID_PASSWORD_RANDOM);
        await loginPage.clickOnSignInButton();
        expect(await loginPage.getErrorCredentialsMessageText()).toBe(INCORRECT_CREDENTIALS_MESSAGE);
    });
});
