import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { generateJobName } from "../helpers/randoms";
import { getJobIdFromResponse } from "../helpers/utils";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { JobAPI } from "../restAPI/jobsAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const jobAPI = new JobAPI(superagent);

describe("Должность", () => {
    let jobCreationResponse: Response;
    let jobId: string;

    const jobRandomName = generateJobName();

    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
            
            jobCreationResponse = await jobAPI.createJobRequest(jobRandomName);
            const jobResponse = await jobAPI.getJobRequest();
            jobId = getJobIdFromResponse(jobResponse, jobRandomName);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание должности`, async () => {
        expect(jobCreationResponse.status).toBe(200);
        expect(JSON.parse(jobCreationResponse.text).success).toBe(`Должность ${jobRandomName} добавлена`);
    });

    test(`Проверка созданной должности через поиск`, async () => {
        const jobResponse = await jobAPI.getJobWithSearchRequest(jobRandomName);

        expect(jobResponse.status).toBe(200);
        expect(jobResponse.text).toContain(jobRandomName);
    });

    test(`Проверка созданной должности`, async () => {
        const jobResponse = await jobAPI.getJobRequest();

        expect(jobResponse.status).toBe(200);
        expect(jobResponse.text).toContain(jobRandomName);
    });

    test(`Редактирование должности`, async () => {
        const editedJobRandomName = generateJobName();

        const editJobNameResponse = await jobAPI.editJobNameRequest(jobId, editedJobRandomName);

        expect(editJobNameResponse.status).toBe(200);
        expect(JSON.parse(editJobNameResponse.text).success).toBe(`Должность ${editedJobRandomName} отредактирована`);
    });

    test(`Удаление должности`, async () => {
        const deletedJobRandomName = generateJobName();

        await jobAPI.createJobRequest(deletedJobRandomName);
        const jobResponse = await jobAPI.getJobRequest();
        const jobIdForDelete = getJobIdFromResponse(jobResponse, deletedJobRandomName);

        const deletedJobResponse = await jobAPI.deleteJobRequest(jobIdForDelete);

        expect(deletedJobResponse.status).toBe(200);
        expect(JSON.parse(deletedJobResponse.text).success).toBe(`Должности удалены`);
    });

    afterAll(async () => {
        await jobAPI.deleteJobRequest(jobId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
