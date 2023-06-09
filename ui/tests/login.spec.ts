/* eslint-disable @typescript-eslint/no-var-requires */
const emails = require('email-generator');
import { test, expect } from "@playwright/test";
import { PageFactory } from "../src/pages/pageFactory";
import { Pages } from "../src/support/types";
import { LoginPage } from "../src/pages/loginPage";
import { generator } from 'ts-password-generator';
import { BASE_TITLE, INCORRECT_CREDENTIALS_MESSAGE } from "../src/support/constants";

let loginPage: LoginPage;

const EMAIL_RANDOM: string = emails.generateEmail().replace(/"/g, "");
const PASSWORD_RANDOM: string = generator({ haveNumbers: true, charsQty: 18, isUppercase: true, haveString: true, haveSymbols: true });

test.describe('Knomary Login page', async () => {
    test.beforeEach(async ({ page }) => {
        loginPage = PageFactory.getPage(page, Pages.LOG_IN) as LoginPage;

        await loginPage.visitPage();
    });

    test('Should have page title message with invalid credentials', async () => {
        const actualTitle = await loginPage.getPageTitle();
        expect(actualTitle).toBe(BASE_TITLE);
    });

    test('Should have error message with invalid credentials', async () => {
        await loginPage.typeMailInEmailField(EMAIL_RANDOM);
        await loginPage.typePasswordInPasswordField(PASSWORD_RANDOM);
        await loginPage.clickOnSignInButton();
        expect(await loginPage.getErrorCredentialsMessageText()).toBe(INCORRECT_CREDENTIALS_MESSAGE);
    });
});
