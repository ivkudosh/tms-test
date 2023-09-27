import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateJobName, generateLastName, generateOrgstructureName } from "../helpers/randoms";
import { getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserIdFromResponse, getUserPersonIdModalFromResponse } from "../helpers/utils";
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
    let userEmployeeCreationResponse: Response;
    let userEmployeeSearchResponse: Response;

    let orgstructureId: string;
    let jobName: string;
    let jobId: string;
    let userManagerId: string;
    let userManagerPersonId: string;
    let userEmployeeId: string;

    const orgstructureRandomName = generateOrgstructureName();
    const jobRandomName = generateJobName();
    
    const userManagerRandomFirstName = generateFirstName();
    const userManagerRandomSecondName = generateLastName();
    const userManagerDateWork = generateDate();
    const userManagerDateBirthday = generateDate();
    const userManagerRandomEmail = generateEmail({provider: "knomary.com"});
    const userManagerRandomPassword = generateCustomPassword();

    const userEmployeeRandomFirstName = generateFirstName();
    const userEmployeeRandomSecondName = generateLastName();
    const userEmployeeDateWork = generateDate();
    const userEmployeeDateBirthday = generateDate();
    const userEmployeeRandomEmail = generateEmail({provider: "knomary.com"});
    const userEmployeeRandomPassword = generateCustomPassword();

    const editedUserManagerRandomFirstName = generateFirstName();
    const editedUserManagerRandomSecondName = generateLastName();
    const editedUserManagerDateWork = generateDate();
    const editedUserManagerDateBirthday = generateDate();
    const editedUserManagerRandomEmail = generateEmail({provider: "knomary.com"});
    const editedUserManagerRandomPassword = generateCustomPassword();

    const deletedUserManagerRandomFirstName = generateFirstName();
    const deletedUserManagerRandomSecondName = generateLastName();
    const deletedUserManagerDateWork = generateDate();
    const deletedUserManagerDateBirthday = generateDate();
    const deletedUserManagerRandomEmail = generateEmail({provider: "knomary.com"});
    const deletedUserManagerRandomPassword = generateCustomPassword();

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

            userManagerCreationResponse = await userAPI.createUserManagerRequest(userManagerRandomFirstName, userManagerRandomSecondName, orgstructureId, jobName, 1, 1, userManagerDateWork, userManagerDateBirthday, employeeRole, userManagerRandomEmail, userManagerRandomPassword, 1);
            userManagerSearchResponse = await userAPI.getUserManagerWithSearchRequest(userManagerRandomEmail);
            userManagerId = getUserIdFromResponse(userManagerSearchResponse);
            userManagerModalResponse = await userAPI.getUserManagerModalRequest(userManagerId);
            userManagerPersonId = getUserPersonIdModalFromResponse(userManagerModalResponse);

            userEmployeeCreationResponse = await userAPI.createUserManagerRequest(userEmployeeRandomFirstName, userEmployeeRandomSecondName, orgstructureId, jobName, 1, 1, userEmployeeDateWork, userEmployeeDateBirthday, employeeRole, userEmployeeRandomEmail, userEmployeeRandomPassword, 1, userManagerPersonId); //Указываем в userManagerPersonId id сотрудника, у которого есть роль "Руководитель"
            userEmployeeSearchResponse = await userAPI.getUserManagerWithSearchRequest(userEmployeeRandomEmail);
            userEmployeeId = getUserIdFromResponse(userEmployeeSearchResponse);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание руководителя`, async () => {
        expect(userManagerCreationResponse.status).toBe(200);
        expect(JSON.parse(userManagerCreationResponse.text).success).toBe(`Пользователь ${userManagerRandomEmail} успешно добавлен`);
    });

    test(`Проверка созданного руководителя`, async () => {
        const userManagerResponse = await userAPI.getUserManagerRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userManagerRandomEmail);
    });

    test(`Проверка созданного руководителя через поиск`, async () => {
        expect(userManagerSearchResponse.status).toBe(200);
        expect(userManagerSearchResponse.text).toContain(userManagerRandomEmail);
    });

    test(`Открытие формы редактирования руководителя`, async () => {
        const userManagerResponse = await userAPI.getUserManagerModalRequest(userManagerId);

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(userManagerRandomEmail);
    });

    test(`Проверка внутреннего идентификатора (person_id) созданного руководителя в модальном окне администратора `, async () => {
        const userManagerResponse = await userAPI.getUserManagerPersonIdFromAdminModalRequest();

        expect(userManagerResponse.status).toBe(200);
        expect(userManagerResponse.text).toContain(`${userManagerRandomSecondName}`);
    });

    test(`Редактирование руководителя`, async () => {
        const editUserManagerResponse = await userAPI.editUserManagerRequest(userManagerId, editedUserManagerRandomFirstName, editedUserManagerRandomSecondName, orgstructureId, jobName,  1, 1, editedUserManagerDateWork, editedUserManagerDateBirthday, employeeRole, editedUserManagerRandomEmail, editedUserManagerRandomPassword, 0);

        expect(editUserManagerResponse.status).toBe(200);
        expect(JSON.parse(editUserManagerResponse.text).success).toBe("Данные успешно сохранены");
    });

    test(`Создание сотрудника с присвоенным ему руководителям`, async () => {
        expect(userEmployeeCreationResponse.status).toBe(200);
        expect(JSON.parse(userEmployeeCreationResponse.text).success).toBe(`Пользователь ${userEmployeeRandomEmail} успешно добавлен`);
    });

    test(`Удаление руководителя`, async () => { 
        await userAPI.createUserManagerRequest(deletedUserManagerRandomFirstName, deletedUserManagerRandomSecondName, orgstructureId, jobName, 1, 1, deletedUserManagerDateWork, deletedUserManagerDateBirthday, employeeRole, deletedUserManagerRandomEmail, deletedUserManagerRandomPassword, 1);
        const userManagerForDeleteSearchResponse = await userAPI.getUserManagerWithSearchRequest(deletedUserManagerRandomEmail);
        const userManagerIdForDelete = getUserIdFromResponse(userManagerForDeleteSearchResponse);

        const deletedUserManagerResponse = await userAPI.deleteUserManagerRequest(userManagerIdForDelete);

        expect(deletedUserManagerResponse.status).toBe(200);
        expect(deletedUserManagerResponse.text).not.toContain(deletedUserManagerRandomEmail);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userAPI.deleteUserManagerRequest(userEmployeeId);
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
    
    for (let i = 0; i < 1; i++) { //Вместо 1 выбрать количество прогонов теста
        test.skip(`Создание пользователя № ${i + 1}`, async () => { // Убрать метод .skip и установить .only если нужно создать много пользователей
            const randomuserManagerDateWork = generateDate();
            const randomuserManagerDateBirthday = generateDate();
            
            const usersCreationsResponse = await userAPI.createUserManagerRequest(`User-${i + 1}`, "Test", '16446', 'Грузчик', 0, 0, randomuserManagerDateWork, randomuserManagerDateBirthday, employeeRole, (i + 1) + '-test-knomary@knomary.com', '12345678', 0); //Грузчик - должность, которая есть в системе. 16446 - id оргстуктуры, которая есть в системе
            
            expect(usersCreationsResponse.status).toBe(200);
            expect(JSON.parse(usersCreationsResponse.text).success).toBe(`Пользователь ${i + 1}-test-knomary@knomary.com успешно добавлен`);
        });
    }
});
