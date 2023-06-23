import { BasePage } from "./basePage";
import { Locator, Page } from "@playwright/test";
import ENV from "../support/environment/env";

export class AdminUsersPage extends BasePage {
    public readonly addUserModalWindow: Locator;
    public readonly selectElementOrgStructure: Locator;
    private readonly nameField: Locator;
    private readonly surnameField: Locator;
    private readonly orgStructureField: Locator;
    private readonly orgStructureGroupElement: Locator;
    private readonly positionDropdownField: Locator;
    private readonly positionResultElement: Locator;
    private readonly calendarWorkField: Locator;
    private readonly calendarBirthdayField: Locator;
    private readonly emailField: Locator;
    private readonly randomPasswordButton: Locator;
    private readonly saveModalWindowButton: Locator;
    private readonly createdUserMailElement: Locator;
    public readonly checkboxUserElement: Locator;
    public readonly editUserButton: Locator;
    public readonly emailEditField: Locator;
    private readonly saveEditModalWindowButton: Locator;
    public readonly deleteUserButton: Locator;
    private readonly confirmDeleteUserButton: Locator;
    public readonly checkActiveSwitcher: Locator;
    public readonly showBlockedUserSwitcher: Locator;
    public readonly rewardUserButton: Locator;
    public readonly rewardDropdownListElement: Locator;
    private readonly rewardDropdownResultListsElement: Locator;
    private readonly rewardCommentField: Locator;
    private readonly rewardSaveButton: Locator;
    public readonly createdRewardElement: Locator;

    constructor(protected readonly page: Page) {
        super(page);
        this.url = `${ENV.BASE_URL}/admin/kpi/structure`;
        this.addUserModalWindow = page.locator('#add-student .modal-dialog');
        this.nameField = page.locator('.form-group input[name="first_name"]');
        this.surnameField = page.locator('.form-group input[name="second_name"]');
        this.orgStructureField = page.locator('.form-group a[id="select-worker-org-level"]', { hasText: 'Оргструктура' });
        this.selectElementOrgStructure = page.locator('.modal-content > .modal-header > #myModalLabel', { hasText: 'Выбери элемент орг. структуры' });
        this.orgStructureGroupElement = page.locator('a[data-level="1"]');
        this.positionDropdownField = page.locator('.form-group #position_chosen');
        this.positionResultElement = page.locator('.chosen-drop .chosen-results li:nth-child(2)');
        this.calendarWorkField = page.locator('#date_take_on_work');
        this.calendarBirthdayField = page.locator('.form-group input[name="date_birthday"]');
        this.emailField = page.locator('.form-group > input[name="email"]');
        this.saveModalWindowButton = page.locator('div[class="modal-dialog"] > div[class="modal-content"] > div[class="modal-body"] > form[class="org-structure-new-worker"] > div[class="text-center"] > button[type="submit"]');
        this.randomPasswordButton = page.locator('div[class="form-group choose-password"] > #genPassword');
        this.createdUserMailElement = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(4)');
        this.checkboxUserElement = page.locator('#allUsersBody tr:nth-child(1) .checkbox');
        this.editUserButton = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(2) .settings-user .a_edit-student');
        this.emailEditField = page.locator('.form-group > input[type="email"]');
        this.saveEditModalWindowButton = page.locator('button[class="action-success save_edit_user"]');
        this.deleteUserButton = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(2) .settings-user .a_delete-worker-modal');
        this.confirmDeleteUserButton = page.locator('.modal-content .modal-footer #action-delete-student');
        this.checkActiveSwitcher = page.locator('.form-group .check-block .i-switch.m-t-xs.m-r.switch_active_account');
        this.showBlockedUserSwitcher = page.locator('div[class=" mb-sm"] .check-block label.i-switch.m-t-xs.m-r');
        this.rewardUserButton = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(2) .settings-user .a-give-reward');
        this.rewardDropdownListElement = page.locator('.modal-dialog .modal-content .modal-body #give_reward_form .form-group #reward_id_chosen');
        this.rewardDropdownResultListsElement = page.locator('.modal-dialog .modal-content .modal-body #give_reward_form .form-group #reward_id_chosen .chosen-drop .chosen-results li:nth-child(2)');
        this.rewardCommentField = page.locator('.modal-dialog .modal-content .modal-body #give_reward_form .form-group #comment_id');
        this.rewardSaveButton = page.locator('.modal-dialog .modal-content .modal-footer #action-reward-student');
        this.createdRewardElement = page.locator('#allUsersBody tr:nth-child(1) td:nth-child(8) u a[data-cnt="1"]');
    }

    public async typeNameInNameField(name: string): Promise<void> {
        await this.nameField.type(name);
    }

    public async typeSurnameInSurnameField(surname: string): Promise<void> {
        await this.surnameField.type(surname);
    }

    public async clickOrgStructureField(): Promise<void> {
        await this.orgStructureField.click();
    }

    public async clickOrgStructureGroupElement(): Promise<void> {
        await this.orgStructureGroupElement.click();
    }

    public async clickPositionDropdownField(): Promise<void> {
        await this.positionDropdownField.click();
    }

    public async clickPositionResultElement(): Promise<void> {
        await this.positionResultElement.click();
    }

    public async typeDateCalendarWorkField(date: string): Promise<void> {
        await this.calendarWorkField.type(date);
    }

    public async typeDateCalendarBirthdayField(date: string): Promise<void> {
        await this.calendarBirthdayField.type(date);
    }

    public async typeEmailInEmailField(email: string): Promise<void> {
        await this.emailField.type(email);
    }

    public async clickRandomPasswordButton(): Promise<void> {
        await this.randomPasswordButton.click();
    }

    public async clickSaveModalWindowButton(): Promise<void> {
        await this.saveModalWindowButton.click();
    }

    public getFirstUserMailElementText(): Promise<string> {
        return this.createdUserMailElement.innerText();
    }

    public async clickFirstCheckboxUserElement(): Promise<void> {
        await this.checkboxUserElement.click();
    }

    public async clickEditButton(): Promise<void> {
        await this.editUserButton.click();
    }

    public async clearEmailField(): Promise<void> {
        await this.emailEditField.clear();
    }

    public async typeNewEmailInEmailField(email: string): Promise<void> {
        await this.emailEditField.type(email);
    }

    public async clickSaveEditModalWindowButton(): Promise<void> {
        await this.saveEditModalWindowButton.click();
    }

    public async clickDeleteUserButton(): Promise<void> {
        await this.deleteUserButton.click();
    }

    public async clickConfirmDeleteUserButton(): Promise<void> {
        await this.confirmDeleteUserButton.click();
    }

    public async clickCheckActiveSwitcherLabel(): Promise<void> {
        await this.checkActiveSwitcher.click();
    }

    public async clickShowBlockedUserSwitcher(): Promise<void> {
        await this.showBlockedUserSwitcher.click();
    }

    public async clickRewardUserButton(): Promise<void> {
        await this.rewardUserButton.click();
    }

    public async clickRewardDropdownListElement(): Promise<void> {
        await this.rewardDropdownListElement.click();
    }

    public async clickRewardDropdownResultListsElement(): Promise<void> {
        await this.rewardDropdownResultListsElement.click();
    }

    public async typeTextRewardCommentField(text: string): Promise<void> {
        await this.rewardCommentField.type(text);
    }

    public async clickRewardSaveButton(): Promise<void> {
        await this.rewardSaveButton.click();
    }
}
