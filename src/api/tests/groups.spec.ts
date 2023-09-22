import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateGroupName, generateJobName, generateLastName, generateOrgstructureName } from "../helpers/randoms";
import { getGroupIdFromResponse, getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserIdFromResponse } from "../helpers/utils";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { GroupsAPI } from "../restAPI/groupsAPI";
import { JobAPI } from "../restAPI/jobAPI";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { UserAPI } from "../restAPI/userAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userAPI = new UserAPI(superagent);
const groupsAPI = new GroupsAPI(superagent);

describe("Группы", () => {
    let globalGroupCreationResponse: Response;
    let userModeratorCreationResponse: Response;
    let userModeratorSearchResponse: Response;
    let userModeratorModalResponse: Response;
    let globalGroupSearchResponse: Response;


    let orgstructureId: string;
    let jobName: string;
    let jobId: string;
    let userModeratorId: string;
    let userModeratorPersonId: string;
    let groupId: string;

    const orgstructureRandomName = generateOrgstructureName();
    const groupRandomName = generateGroupName();
    const editedGroupRandomName = generateGroupName();
    const jobRandomName = generateJobName();
    const userRandomFirstName = generateFirstName();
    const userRandomSecondName = generateLastName();
    const dateWork = generateDate();
    const dateBirthday = generateDate();
    const userRandomEmail = generateEmail({provider: "knomary.com"});
    const userRandomPassword = generateCustomPassword();

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

            userModeratorCreationResponse = await userAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, 1, 1, dateWork, dateBirthday, employeeRole, userRandomEmail, userRandomPassword, 0);
            userModeratorSearchResponse = await userAPI.getUserManagerWithSearchRequest(userRandomEmail);
            userModeratorId = getUserIdFromResponse(userModeratorSearchResponse);

            globalGroupCreationResponse = await groupsAPI.createGlobalGroupRequest(groupRandomName, userModeratorId, orgstructureId);
            globalGroupSearchResponse = await groupsAPI.getGlobalGroupWithSearchRequest(userModeratorId);
            groupId = getGroupIdFromResponse(globalGroupSearchResponse, groupRandomName);            
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание глобальной группы`, async () => {
        expect(globalGroupCreationResponse.status).toBe(200);
        expect(globalGroupCreationResponse.text).toContain(groupRandomName);
    });

    
    test(`Проверка созданной глобальной группы`, async () => {
        const globalGroupResponse = await groupsAPI.getGlobalGroupRequest();
        
        expect(globalGroupResponse.status).toBe(200);
        expect(globalGroupResponse.text).toContain(groupRandomName);
        expect(globalGroupResponse.text).toContain(userRandomFirstName);
    });

    test(`Проверка созданной глобальной группы через поиск`, async () => {     
        expect(globalGroupSearchResponse.status).toBe(200);
        expect(globalGroupSearchResponse.text).toContain(groupRandomName);
        expect(globalGroupSearchResponse.text).toContain(userRandomFirstName);
    });

    test(`Редактирование глобальной группы`, async () => {     
        const editGlobalGroupResponse = await groupsAPI.editGlobalGroupRequest(groupId, editedGroupRandomName, userModeratorId, orgstructureId);

        expect(editGlobalGroupResponse.status).toBe(200);
        expect(editGlobalGroupResponse.text).toContain(editedGroupRandomName);
        expect(editGlobalGroupResponse.text).toContain(userRandomFirstName);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await userAPI.deleteUserManagerRequest(userModeratorId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
