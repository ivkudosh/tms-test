import { expect } from "@jest/globals";
import request from "superagent";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import ENV from "../../../env/env";
import { UserManagerAPI } from "../restAPI/userManagerAPI";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateLastName } from "../helpers/randoms";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const userManagerAPI = new UserManagerAPI(superagent);

describe("Руководитель/Сотрудник", () => {
    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    for (let i = 0; i < 3; i++) {
        test(`Создание юзеров для улыбки ${i + 1}`, async () => {
            const manyUserRandomFirstName = generateFirstName();
            const manyUserRandomSecondName = generateLastName();
            const manyDateWork = generateDate();
            const manyDateBirthday = generateDate();
            const manyUserRandomEmail = generateEmail();
            const manyUserRandomPassword = generateCustomPassword();

            await userManagerAPI.createUserManagerRequest(manyUserRandomFirstName, manyUserRandomSecondName, '16446', 'Грузчик', manyDateWork, manyDateBirthday, employeeRole, (i + 1) + manyUserRandomEmail, manyUserRandomPassword);
            const userManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(manyUserRandomEmail);

            expect(userManagerSearchResponse.status).toBe(200);
            expect(userManagerSearchResponse.text).toContain(manyUserRandomEmail);
        });
    }
});