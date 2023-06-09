import { expect } from "@jest/globals";
import { RegistrationForm } from "../src/registrationForm";
import { Errors, SUCCESS_SUBMIT_FORM } from "../src/helpers/constants";
import {
    passwordRandomMax,
    childAgeRandom,
    invalidPasswordRandom,
    nameRandomBasic,
    emailRandomBasic,
    passwordRandomMaxBasic,
    seniorAgeRandomBasic
} from "../src/helpers/randoms";

let form: RegistrationForm;

describe("Registration form tests", () => {
    beforeEach(() => {
        form = new RegistrationForm();
        form.initializeFields(nameRandomBasic, emailRandomBasic, passwordRandomMaxBasic, passwordRandomMaxBasic, seniorAgeRandomBasic, true);
    });

    test(`Should get text '${Errors.PASSWORD_CONFIRMATION_ERROR}' if password and confirmation password don't match`, () => {
        form.setConfirmPassword(passwordRandomMax);
        expect(() => form.validateForm()).toThrow(Errors.PASSWORD_CONFIRMATION_ERROR);
    });

    test(`Should get text '${Errors.PASSWORD_ERROR}' with password min 7 characters`, () => {
        form.setPassword(invalidPasswordRandom);
        expect(() => form.validateForm()).toThrow(Errors.PASSWORD_ERROR);
    });

    test(`Should get text '${Errors.PASSWORD_CHARACTER_ERROR}' if password doesn't consists of characters`, () => {
        form.setPassword(nameRandomBasic);
        expect(() => form.validateForm()).toThrow(Errors.PASSWORD_CHARACTER_ERROR);
    });

    test(`Should get text '${Errors.AGE_ERROR}' with child age`, () => {
        form.setAge(childAgeRandom);
        expect(() => form.validateForm()).toThrow(Errors.AGE_ERROR);
    });

    test(`Should get text '${Errors.AGREEMENT_ERROR}' with false agreement`, () => {
        form.setAgreement(false);
        expect(() => form.validateForm()).toThrow(Errors.AGREEMENT_ERROR);
    });

    test(`Should get text '${SUCCESS_SUBMIT_FORM}' if form successfully submitted!`, () => {
        expect(form.validateForm()).toBe(SUCCESS_SUBMIT_FORM);
    });

    test(`Should initialize all fields`, () => {
        expect(form.name).toBe(nameRandomBasic);
        expect(form.email).toBe(emailRandomBasic);
        expect(form.password).toBe(passwordRandomMaxBasic);
        expect(form.confirmPassword).toBe(passwordRandomMaxBasic);
        expect(form.age).toBe(seniorAgeRandomBasic);
        expect(form.agreement).toBe(true);
    });
});
