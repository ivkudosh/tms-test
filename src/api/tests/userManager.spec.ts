import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import { generateOrgstructureName, generateJobName, generateFirstName, generateLastName, generateDate, generateEmail, generateCustomPassword } from "../helpers/randoms";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { JobAPI } from "../restAPI/jobAPI";
import ENV from "../../../env/env";
import { UserManagerAPI } from "../restAPI/userManagerAPI";
import { getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserManagerIdFromResponse, getUserManagerPersonIdModalFromResponse } from "../helpers/utils";
import { employeeRole } from "../helpers/constants";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userManagerAPI = new UserManagerAPI(superagent);

describe("Руководитель/Сотрудник", () => {
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

            userManagerCreationResponse = await userManagerAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, 1, 1, dateWork, dateBirthday, employeeRole, userRandomEmail, userRandomPassword, 1);

            userManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(userRandomEmail);
            userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);

            userManagerModalResponse = await userManagerAPI.getUserManagerModalRequest(userManagerId);
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
        const userManagerResponse = await userManagerAPI.getUserManagerRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userRandomEmail);
    });

    test(`Проверка созданного руководителя через поиск`, async () => {
        expect(userManagerSearchResponse.status).toBe(200);
        expect(userManagerSearchResponse.text).toContain(userRandomEmail);
    });

    test(`Открытие формы редактирования руководителя`, async () => {
        const userManagerResponse = await userManagerAPI.getUserManagerModalRequest(userManagerId);

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userRandomEmail);
    });

    test(`Проверка внутреннего идентификатора (person_id) созданного руководителя в модальном окне администратора `, async () => {
        const userManagerResponse = await userManagerAPI.getUserManagerPersonIdFromAdminModalRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(`${userRandomSecondName}`);
    });

    test(`Редактирование руководителя`, async () => {
        const editUserManagerResponse = await userManagerAPI.editUserManagerRequest(userManagerId, editedUserRandomFirstName, editedUserRandomSecondName, orgstructureId, jobName,  1, 1, editedDateWork, editedDateBirthday, employeeRole, editedUserRandomEmail, editedUserRandomPassword, 0);

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

        //Указываем в userManagerPersonId id сотрудника, у которого есть роль "Руководитель"
        await userManagerAPI.createUserManagerRequest(employeeUserRandomFirstName, employeeUserRandomSecondName, orgstructureId, jobName, 1, 1, employeeDateWork, employeeDateBirthday, employeeRole, employeeUserRandomEmail, employeeUserRandomPassword, 1, userManagerPersonId);
        const employeeUserManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(employeeUserRandomEmail);
        const employeeUserManagerId = getUserManagerIdFromResponse(employeeUserManagerSearchResponse);

        const employeeUserManagerResponse = await userManagerAPI.deleteUserManagerRequest(employeeUserManagerId);

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

        await userManagerAPI.createUserManagerRequest(deletedUserRandomFirstName, deletedUserRandomSecondName, orgstructureId, jobName, 1, 1, deletedDateWork, deletedDateBirthday, employeeRole, deletedUserRandomEmail, deletedUserRandomPassword, 1);
        const userManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(deletedUserRandomEmail);
        const userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);

        const deletedUserManagerResponse = await userManagerAPI.deleteUserManagerRequest(userManagerId);

        expect(deletedUserManagerResponse.status).toBe(200);
        expect(deletedUserManagerResponse.text).not.toContain(deletedUserRandomEmail);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userManagerAPI.deleteUserManagerRequest(userManagerId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
