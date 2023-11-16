import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { employeeRole } from "../helpers/constants";
import { generateCustomPassword, generateDate, generateEmail, generateFirstName, generateFormName, generateGlobalGroupName, generateJobName, generateLastName, generateOrgstructureName } from "../helpers/randoms";
import { getGroupIdFromResponse, getJobIdFromResponse, getJobNameFromResponse, getOrgstructureIdFromResponse, getUserIdFromResponse } from "../helpers/utils";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { FormsAPI } from "../restAPI/formsAPI";
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
const formAPI = new FormsAPI(superagent);

    describe("Формы", () => {
        let globalGroupSearchResponse: Response;
        let userModeratorSearchResponse: Response;
    
        let orgstructureId: string;
        let jobName: string;
        let jobId: string;
        let userModeratorId: string;
        let globalGroupId: string;
    
        const orgstructureRandomName = generateOrgstructureName();
        const jobRandomName = generateJobName();
        const formRandomName = generateFormName();
    
        const globalGroupRandomName = generateGlobalGroupName();
    
        const userRandomFirstName = generateFirstName();
        const userRandomSecondName = generateLastName();
        const userDateWork = generateDate();
        const userDateBirthday = generateDate();
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
    
                await userAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, 1, 1, userDateWork, userDateBirthday, employeeRole, userRandomEmail, userRandomPassword, 0);
                userModeratorSearchResponse = await userAPI.getUserManagerWithSearchRequest(userRandomEmail);
                userModeratorId = getUserIdFromResponse(userModeratorSearchResponse);
    
                await groupsAPI.createGlobalGroupRequest(globalGroupRandomName, userModeratorId, orgstructureId);
                globalGroupSearchResponse = await groupsAPI.getGlobalGroupWithSearchRequest(userModeratorId);
                globalGroupId = getGroupIdFromResponse(globalGroupSearchResponse, globalGroupRandomName);
            } catch (error: any) {
                throw new Error(error.message);
            }
        });
    
        test(`Создание формы под администратором`, async () => {
            const formCreationResponse = await formAPI.createFormRequest(formRandomName, userModeratorId, globalGroupId);
    
            expect(formCreationResponse.status).toBe(200);
            expect(formCreationResponse.text).toContain(formRandomName);
        });
    
        afterAll(async () => {
            await jobAPI.deleteJobRequest(jobId);
            await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
            await userAPI.deleteUserManagerRequest(userModeratorId);
            await groupsAPI.deleteGroupRequest(globalGroupId);
            await authorizationAPI.logoutAuthorizationRequest();
        });
    });
