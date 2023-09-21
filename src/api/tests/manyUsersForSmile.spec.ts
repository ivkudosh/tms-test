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

describe("Создание большого количества юзеров", () => {
    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });
    //Выбрать количество прогонов теста
    for (let i = 0; i < 10; i++) {
        test(`Создание юзеров для улыбки ${i + 1}`, async () => {
            const manyUserRandomFirstName = generateFirstName();
            const manyUserRandomSecondName = generateLastName();
            const manyDateWork = generateDate();
            const manyDateBirthday = generateDate();
            const manyUserRandomEmail = generateEmail();
            const manyUserRandomPassword = generateCustomPassword();

            const usersCreationsResponse = await userManagerAPI.createUserManagerRequest(`${i}-Knomary`, "Test", '16446', 'Грузчик', 0, 0, "01/01/1970", "01/01/1970", employeeRole, (i + 1) + '-knomary@knomary.com', '007', 0);
            //const usersCreationsResponse = await userManagerAPI.createUserManagerRequest(manyUserRandomFirstName, manyUserRandomSecondName, '16446', 'Грузчик', 0, 0, manyDateWork, manyDateBirthday, employeeRole, (i + 1) + '-knomary@knomary.com' + manyUserRandomEmail, manyUserRandomPassword, 0);

            
            expect(usersCreationsResponse.status).toBe(200);
            expect(JSON.parse(usersCreationsResponse.text).success).toBe(`Пользователь ${i + 1}-knomary@knomary.com успешно добавлен`);
        });
    }
});
