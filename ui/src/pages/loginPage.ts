import { BasePage } from "./basePage";
import { BASE_URL } from "../support/constants";
import { Locator, Page } from "@playwright/test";

export class LoginPage extends BasePage {
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly signInButton: Locator;
    private readonly errorCredentialsElement: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = BASE_URL;
        this.emailField = page.locator('#identitys');
        this.passwordField = page.locator('#password');
        this.signInButton = page.locator('//button[@type="submit"]', { hasText: "Войти" });
        this.errorCredentialsElement = page.locator('div[class="fix_send js-fix_send"] > div > p > p');
    }

    public async typeMailInEmailField(mail: string): Promise<void> {
        await this.emailField.type(mail);
    }

    public async typePasswordInPasswordField(password: string): Promise<void> {
        await this.passwordField.type(password);
    }

    public async clickOnSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    public getErrorCredentialsMessageText(): Promise<string> {
        return this.errorCredentialsElement.innerText();
    }
}
