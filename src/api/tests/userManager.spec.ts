import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import { generateOrgstructureName, generateJobName, generateFirstName, generateLastName, generateDate, generateEmail, generateCustomPassword } from "../helpers/randoms";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { JobAPI } from "../restAPI/jobAPI";
import ENV from "../../../env/env";
import { UserManagerAPI } from "../restAPI/userManagerAPI";
import { getJobNameFromResponse, getOrgstructureIdFromResponse } from "../helpers/utils";
import { employeeRole } from "../helpers/constants";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);
const jobAPI = new JobAPI(superagent);
const userManagerAPI = new UserManagerAPI(superagent);

describe("Руководитель", () => {
    let orgstructureCreationResponse: Response;
    let jobCreationResponse: Response;
    let userManagerCreationResponse: Response;
    let orgstructureId: string;
    let jobName: string;

    const orgstructureRandomName: string = generateOrgstructureName();
    const jobRandomName = generateJobName();
    const userRandomFirstName = generateFirstName();
    const userRandomSecondName = generateLastName();
    const dateWork = generateDate();
    const dateBirthday = generateDate();
    const userRandomEmail = generateEmail();
    const userRandomPassword = generateCustomPassword();    

    beforeAll(async() => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание руководителя`, async () => {
        jobCreationResponse = await jobAPI.createJobRequest(jobRandomName);
            const jobResponse = await jobAPI.getJobRequest();
            jobName = getJobNameFromResponse(jobResponse, jobRandomName);

            orgstructureCreationResponse = await orgstructureAPI.createOrgstructureRequest(orgstructureRandomName);
            const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();
            orgstructureId = getOrgstructureIdFromResponse(orgstructureResponse, orgstructureRandomName);

            userManagerCreationResponse = await userManagerAPI.createUserManagerRequest(userRandomFirstName, userRandomSecondName, orgstructureId, jobName, dateWork, dateBirthday, employeeRole, userRandomEmail, userRandomPassword);
        expect(userManagerCreationResponse.status).toBe(200);
    }, 30000); //установил 30 сек, ибо если менее 5, то тест валится
});
