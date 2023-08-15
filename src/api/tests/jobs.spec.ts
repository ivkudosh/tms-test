import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import * as cheerio from 'cheerio';
import { JOB_NAME_RANDOM, EDITED_JOB_NAME_RANDOM } from "../helpers/randoms";
import ENV from "../../../env/env";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { JobAPI } from "../restAPI/jobsAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const jobAPI = new JobAPI(superagent);

describe("Должность", () => {
    beforeAll(async () => {

    });

    test(`Добавление должности`, async () => {

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toEqual(`Должность ${JOB_NAME_RANDOM} добавлена`);
    });

    test(`Проверка созданной должности через поиск`, async () => {

        expect(response.status).toBe(200);
        expect(response.text).toContain(JOB_NAME_RANDOM);
    });

    test(`Проверка созданной должности`, async () => {

        const $ = cheerio.load(response.text);
        JOB_ID = $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${JOB_NAME_RANDOM}"]`).attr('data-id');
        JOB_NAME = $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${JOB_NAME_RANDOM}"]`).attr('data-name');

        expect(response.status).toBe(200);
        expect(response.text).toContain(JOB_NAME_RANDOM);
    });

    test(`Редактирование должности`, async () => {

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toBe(`Должность ${EDITED_JOB_NAME_RANDOM} отредактирована`);
    });

    test(`Удаление должности`, async () => {

        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toBe(`Должность удалена`);
    });

});

export { JOB_NAME };
