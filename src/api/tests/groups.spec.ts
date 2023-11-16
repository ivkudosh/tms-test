import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateGlobalGroupName, generateJobName, generateLastName, generateLocalGroupName, generateOrgstructureName } from "../helpers/randoms";
import { getGroupIdFromResponse, getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserIdFromResponse } from "../helpers/utils";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { GroupsAPI } from "../restAPI/groupsAPI";
import { JobAPI } from "../restAPI/jobsAPI";
import { OrgstructureAPI } from "../restAPI/orgstructuresAPI";
import { UserAPI } from "../restAPI/usersAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userAPI = new UserAPI(superagent);
const groupsAPI = new GroupsAPI(superagent);

describe("Группы", () => {
    let globalGroupCreationResponse: Response;
    let localGroupCreationResponse: Response;
    let globalGroupSearchResponse: Response;
    let localGroupSearchResponse: Response;
    let userModeratorCreationResponse: Response;
    let userModeratorSearchResponse: Response;
    let userModeratorModalResponse: Response;

    let orgstructureId: string;
    let jobName: string;
    let jobId: string;
    let userModeratorId: string;
    let globalGroupId: string;
    let localGroupId: string;
    let userModeratorIdForDelete: string;

    const orgstructureRandomName = generateOrgstructureName();
    const jobRandomName = generateJobName();

    const globalGroupRandomName = generateGlobalGroupName();
    const localGroupRandomName = generateLocalGroupName();
    const editedGlobalGroupRandomName = generateGlobalGroupName();
    const editedLocalGroupRandomName = generateLocalGroupName();
    const deletedGlobalGroupRandomName = generateGlobalGroupName();
    const deletedLocalGroupRandomName = generateGlobalGroupName();

    const userRandomFirstName = generateFirstName();
    const userRandomSecondName = generateLastName();
    const userDateWork = generateDate();
    const userDateBirthday = generateDate();
    const userRandomEmail = generateEmail({provider: "knomary.com"});
    const userRandomPassword = generateCustomPassword();

    const deletedUserRandomFirstName = generateFirstName();
    const deletedUserRandomSecondName = generateLastName();
    const deletedUserDateWork = generateDate();
    const deletedUserDateBirthday = generateDate();
    const deletedUserRandomEmail = generateEmail({provider: "knomary.com"});
    const deletedUserRandomPassword = generateCustomPassword();

    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
            
            await jobAPI.createJobRequest(jobRandomName);
            const jobResponse = await jobAPI.getJobRequest();
            jobName = getJobNameFromResponse(jobResponse, jobRandomName);
            jobId = getJobIdFromResponse(jobResponse, jobRandomName);

            await orgstructureAPI.createOrgstructureRequest(orgstructureRandomName);
            const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();
            orgstructureId = getOrgstructureIdFromResponse(orgstructureResponse, orgstructureRandomName);

            userModeratorCreationResponse = await userAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, 1, 1, userDateWork, userDateBirthday, employeeRole, userRandomEmail, userRandomPassword, 0);
            userModeratorSearchResponse = await userAPI.getUserManagerWithSearchRequest(userRandomEmail);
            userModeratorId = getUserIdFromResponse(userModeratorSearchResponse);

            await userAPI.createUserManagerRequest(deletedUserRandomFirstName, deletedUserRandomSecondName, orgstructureId, jobName, 1, 1, deletedUserDateWork, deletedUserDateBirthday, employeeRole, deletedUserRandomEmail, deletedUserRandomPassword, 0);
            const deletedUserManagerSearchResponse = await userAPI.getUserManagerWithSearchRequest(deletedUserRandomEmail);
            userModeratorIdForDelete = getUserIdFromResponse(deletedUserManagerSearchResponse);

            globalGroupCreationResponse = await groupsAPI.createGlobalGroupRequest(globalGroupRandomName, userModeratorId, orgstructureId);
            globalGroupSearchResponse = await groupsAPI.getGlobalGroupWithSearchRequest(userModeratorId);
            globalGroupId = getGroupIdFromResponse(globalGroupSearchResponse, globalGroupRandomName);

            localGroupCreationResponse = await groupsAPI.createLocalGroupRequest(localGroupRandomName, globalGroupId, orgstructureId, jobName, 2, 2, userModeratorId);
            localGroupSearchResponse = await groupsAPI.getLocalGroupWithSearchRequest(globalGroupId);
            localGroupId = getGroupIdFromResponse(localGroupSearchResponse, localGroupRandomName);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание глобальной группы`, async () => {
        expect(globalGroupCreationResponse.status).toBe(200);
        expect(globalGroupCreationResponse.text).toContain(globalGroupRandomName);
    });

    test(`Создание локальной группы`, async () => {
        expect(localGroupCreationResponse.status).toBe(200);
        expect(localGroupCreationResponse.text).toContain(localGroupRandomName);
    });

    test(`Создание модератора глобальной группы`, async () => {
        expect(userModeratorCreationResponse.status).toBe(200);
        expect(JSON.parse(userModeratorCreationResponse.text).success).toBe(`Пользователь ${userRandomEmail} успешно добавлен`);
    });
    
    test(`Проверка созданной глобальной группы`, async () => {
        const globalGroupResponse = await groupsAPI.getGroupRequest();
        
        expect(globalGroupResponse.status).toBe(200);
        expect(globalGroupResponse.text).toContain(globalGroupRandomName);
        expect(globalGroupResponse.text).toContain(userRandomFirstName);
    });

    test(`Проверка созданной локальной группы`, async () => {
        const localGroupResponse = await groupsAPI.getGroupRequest();
        
        expect(localGroupResponse.status).toBe(200);
        expect(localGroupResponse.text).toContain(localGroupRandomName);
    });

    test(`Проверка созданной глобальной группы через поиск`, async () => {     
        expect(globalGroupSearchResponse.status).toBe(200);
        expect(globalGroupSearchResponse.text).toContain(globalGroupRandomName);
        expect(globalGroupSearchResponse.text).toContain(userRandomFirstName);
    });

    test(`Проверка созданной локальной группы через поиск`, async () => {     
        expect(localGroupSearchResponse.status).toBe(200);
        expect(localGroupSearchResponse.text).toContain(localGroupRandomName);
    });

    test(`Редактирование глобальной группы`, async () => {     
        const editGlobalGroupResponse = await groupsAPI.editGlobalGroupRequest(globalGroupId, editedGlobalGroupRandomName, userModeratorId, orgstructureId);

        expect(editGlobalGroupResponse.status).toBe(200);
        expect(editGlobalGroupResponse.text).toContain(editedGlobalGroupRandomName);
        expect(editGlobalGroupResponse.text).toContain(userRandomFirstName);
    });

    test(`Редактирование локальной группы`, async () => {     
        const editLocalGroupResponse = await groupsAPI.editLocalGroupRequest(localGroupId, editedLocalGroupRandomName, globalGroupId, jobName, 3, 3);

        expect(editLocalGroupResponse.status).toBe(200);
        expect(editLocalGroupResponse.text).toContain(editedLocalGroupRandomName);
    });

    test(`Удаление глобальной группы`, async () => {
        await groupsAPI.createGlobalGroupRequest(deletedGlobalGroupRandomName, userModeratorIdForDelete, orgstructureId);
        const deletedGlobalGroupSearchResponse = await groupsAPI.getGlobalGroupWithSearchRequest(userModeratorIdForDelete);
        const deletedGlobalGroupId = getGroupIdFromResponse(deletedGlobalGroupSearchResponse, deletedGlobalGroupRandomName); 

        const deleteGlobalGroupResponse = await groupsAPI.deleteGroupRequest(deletedGlobalGroupId);

        expect(deleteGlobalGroupResponse.status).toBe(200);
        expect(deleteGlobalGroupResponse.text).not.toContain(deletedGlobalGroupRandomName);
    });

    test(`Удаление локальной группы`, async () => {
        await groupsAPI.createLocalGroupRequest(deletedLocalGroupRandomName, globalGroupId, orgstructureId, jobName, 2, 2, userModeratorId);
        const deletedLocalGroupSearchResponse = await groupsAPI.getLocalGroupWithSearchRequest(globalGroupId);
        const deletedLocalGroupId = getGroupIdFromResponse(deletedLocalGroupSearchResponse, deletedLocalGroupRandomName); 

        const deleteLocalGroupResponse = await groupsAPI.deleteGroupRequest(deletedLocalGroupId);

        expect(deleteLocalGroupResponse.status).toBe(200);
        expect(deleteLocalGroupResponse.text).not.toContain(deletedLocalGroupRandomName);
    });

    afterAll(async () => {
        await groupsAPI.deleteGroupRequest(localGroupId);
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userAPI.deleteUserManagerRequest(userModeratorId);
        await userAPI.deleteUserManagerRequest(userModeratorIdForDelete);
        await groupsAPI.deleteGroupRequest(globalGroupId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
