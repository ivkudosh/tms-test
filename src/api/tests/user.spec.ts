import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateJobName, generateLastName, generateOrgstructureName } from "../helpers/randoms";
import { getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserManagerIdFromResponse, getUserManagerPersonIdModalFromResponse } from "../helpers/utils";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { JobAPI } from "../restAPI/jobAPI";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { UserAPI } from "../restAPI/userAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userAPI = new UserAPI(superagent);

describe("Сотрудник/Руководитель", () => {
    let userManagerCreationResponse: Response;
    let userManagerSearchResponse: Response;
    let userManagerModalResponse: Response;

    let orgstructureId: string;
    let jobName: string;
    let jobId: string;
    let userManagerId: string;
    let userManagerPersonId: string;

    const orgstructureRandomName = generateOrgstructureName();
    const jobRandomName = generateJobName();
    const userRandomFirstName = generateFirstName();
    const userRandomSecondName = generateLastName();
    const dateWork = generateDate();
    const dateBirthday = generateDate();
    const userRandomEmail = generateEmail();
    const userRandomPassword = generateCustomPassword();
    
    const editedUserRandomEmail = generateEmail();
    const editedUserRandomFirstName = generateFirstName();
    const editedUserRandomSecondName = generateLastName();
    const editedDateWork = generateDate();
    const editedDateBirthday = generateDate();
    const editedUserRandomPassword = generateCustomPassword();

    beforeAll(async() => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
            
            await jobAPI.createJobRequest(jobRandomName);
            const jobResponse = await jobAPI.getJobRequest();
            jobName = getJobNameFromResponse(jobResponse, jobRandomName);
            jobId = getJobIdFromResponse(jobResponse, jobRandomName);

            await orgstructureAPI.createOrgstructureRequest(orgstructureRandomName);
            const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();
            orgstructureId = getOrgstructureIdFromResponse(orgstructureResponse, orgstructureRandomName);

            userManagerCreationResponse = await userAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, 1, 1, dateWork, dateBirthday, employeeRole, userRandomEmail, userRandomPassword, 1);

            userManagerSearchResponse = await userAPI.getUserManagerWithSearchRequest(userRandomEmail);
            userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);

            userManagerModalResponse = await userAPI.getUserManagerModalRequest(userManagerId);
            userManagerPersonId = getUserManagerPersonIdModalFromResponse(userManagerModalResponse);            
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание руководителя`, async () => {
        expect(userManagerCreationResponse.status).toBe(200);
        expect(JSON.parse(userManagerCreationResponse.text).success).toBe(`Пользователь ${userRandomEmail} успешно добавлен`);
    });

    test(`Проверка созданного руководителя`, async () => {
        const userManagerResponse = await userAPI.getUserManagerRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userRandomEmail);
    });

    test(`Проверка созданного руководителя через поиск`, async () => {
        expect(userManagerSearchResponse.status).toBe(200);
        expect(userManagerSearchResponse.text).toContain(userRandomEmail);
    });

    test(`Открытие формы редактирования руководителя`, async () => {
        const userManagerResponse = await userAPI.getUserManagerModalRequest(userManagerId);

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userRandomEmail);
    });

    test(`Проверка внутреннего идентификатора (person_id) созданного руководителя в модальном окне администратора `, async () => {
        const userManagerResponse = await userAPI.getUserManagerPersonIdFromAdminModalRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(`${userRandomSecondName}`);
    });

    test(`Редактирование руководителя`, async () => {
        const editUserManagerResponse = await userAPI.editUserManagerRequest(userManagerId, editedUserRandomFirstName, editedUserRandomSecondName, orgstructureId, jobName,  1, 1, editedDateWork, editedDateBirthday, employeeRole, editedUserRandomEmail, editedUserRandomPassword, 0);

        expect(editUserManagerResponse.status).toBe(200);
        expect(JSON.parse(editUserManagerResponse.text).success).toBe("Данные успешно сохранены");
    });

    test(`Удаление сотрудника с присвоенным ему руководителям`, async () => {
        const employeeUserRandomFirstName = generateFirstName();
        const employeeUserRandomSecondName = generateLastName();
        const employeeDateWork = generateDate();
        const employeeDateBirthday = generateDate();
        const employeeUserRandomEmail = generateEmail();
        const employeeUserRandomPassword = generateCustomPassword();

        
        await userAPI.createUserManagerRequest(employeeUserRandomFirstName, employeeUserRandomSecondName, orgstructureId, jobName, 1, 1, employeeDateWork, employeeDateBirthday, employeeRole, employeeUserRandomEmail, employeeUserRandomPassword, 1, userManagerPersonId); //Указываем в userManagerPersonId id сотрудника, у которого есть роль "Руководитель"
        const employeeUserManagerSearchResponse = await userAPI.getUserManagerWithSearchRequest(employeeUserRandomEmail);
        const employeeUserManagerId = getUserManagerIdFromResponse(employeeUserManagerSearchResponse);

        const employeeUserManagerResponse = await userAPI.deleteUserManagerRequest(employeeUserManagerId);

        expect(employeeUserManagerResponse.status).toBe(200);
        expect(employeeUserManagerResponse.text).not.toContain(employeeUserRandomEmail);
    });

    test(`Удаление руководителя`, async () => { 
        const deletedUserRandomFirstName = generateFirstName();
        const deletedUserRandomSecondName = generateLastName();
        const deletedDateWork = generateDate();
        const deletedDateBirthday = generateDate();
        const deletedUserRandomEmail = generateEmail();
        const deletedUserRandomPassword = generateCustomPassword();

        await userAPI.createUserManagerRequest(deletedUserRandomFirstName, deletedUserRandomSecondName, orgstructureId, jobName, 1, 1, deletedDateWork, deletedDateBirthday, employeeRole, deletedUserRandomEmail, deletedUserRandomPassword, 1);
        const userManagerSearchResponse = await userAPI.getUserManagerWithSearchRequest(deletedUserRandomEmail);
        const userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);

        const deletedUserManagerResponse = await userAPI.deleteUserManagerRequest(userManagerId);

        expect(deletedUserManagerResponse.status).toBe(200);
        expect(deletedUserManagerResponse.text).not.toContain(deletedUserRandomEmail);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userAPI.deleteUserManagerRequest(userManagerId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});


describe.skip("(Отключен) Создание большого количества пользователей", () => { // Убрать метод .skip и установить .only если нужно создать много пользователей
    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });
    
    for (let i = 0; i < 1; i++) { //Выбрать количество прогонов теста
        test.skip(`Создание пользователя № ${i + 1}`, async () => { // Убрать метод .skip и установить .only если нужно создать много пользователей
            const randomDateWork = generateDate();
            const randomDateBirthday = generateDate();
            
            const usersCreationsResponse = await userAPI.createUserManagerRequest(`User-${i + 1}`, "Test", '16446', 'Грузчик', 0, 0, randomDateWork, randomDateBirthday, employeeRole, (i + 1) + '-test-knomary@knomary.com', '12345678', 0); //Грузчик - должность, которая есть в системе. 16446 - id оргстуктуры, которая есть в системе
            
            expect(usersCreationsResponse.status).toBe(200);
            expect(JSON.parse(usersCreationsResponse.text).success).toBe(`Пользователь ${i + 1}-test-knomary@knomary.com успешно добавлен`);
        });
    }
});
