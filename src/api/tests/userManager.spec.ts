import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import { generateOrgstructureName, generateJobName, generateFirstName, generateLastName, generateDate, generateEmail, generateCustomPassword } from "../helpers/randoms";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { JobAPI } from "../restAPI/jobAPI";
import ENV from "../../../env/env";
import { UserManagerAPI } from "../restAPI/userManagerAPI";
import { getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserManagerIdFromResponse } from "../helpers/utils";
import { employeeRole } from "../helpers/constants";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userManagerAPI = new UserManagerAPI(superagent);

describe("Руководитель", () => {
    let userManagerCreationResponse: Response;
    let userManagerSearchResponse: Response;

    let orgstructureId: string;
    let jobName: string;
    let jobId: string;
    let userManagerId: string;

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

            userManagerCreationResponse = await userManagerAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, dateWork, dateBirthday, employeeRole, userRandomEmail, userRandomPassword);

            userManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(userRandomEmail);
            userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);
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
        expect(userManagerResponse.text).toContain(`${userRandomFirstName} ${userRandomSecondName}`);
    });

    test(`Редактирование руководителя`, async () => {
        const editUserManagerResponse = await userManagerAPI.editUserManagerRequest(userManagerId, editedUserRandomFirstName, editedUserRandomSecondName, orgstructureId, jobName, editedDateWork, editedDateBirthday, employeeRole, editedUserRandomEmail, editedUserRandomPassword);

        expect(editUserManagerResponse.status).toBe(200);
        expect(JSON.parse(editUserManagerResponse.text).success).toBe("Данные успешно сохранены");
    });

    test(`Удаление руководителя`, async () => { 
        const deletedUserRandomFirstName = generateFirstName();
        const deletedUserRandomSecondName = generateLastName();
        const deletedDateWork = generateDate();
        const deletedDateBirthday = generateDate();
        const deletedUserRandomEmail = generateEmail();
        const deletedUserRandomPassword = generateCustomPassword();

        await userManagerAPI.createUserManagerRequest(deletedUserRandomFirstName, deletedUserRandomSecondName, orgstructureId, jobName, deletedDateWork, deletedDateBirthday, employeeRole, deletedUserRandomEmail, deletedUserRandomPassword);
        const userManagerSearchResponse = await userManagerAPI.getUserManagerWithSearchRequest(deletedUserRandomEmail);
        const userManagerId = getUserManagerIdFromResponse(userManagerSearchResponse);

        const deletedUserManagerResponse = await userManagerAPI.deleteUserManagerRequest(userManagerId);

        expect(deletedUserManagerResponse.status).toBe(200);
        expect(deletedUserManagerResponse).not.toContain(deletedUserRandomEmail);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userManagerAPI.deleteUserManagerRequest(userManagerId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
