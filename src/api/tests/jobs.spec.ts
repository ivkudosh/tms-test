import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import * as cheerio from 'cheerio';
import { JOB_NAME_RANDOM, EDITED_JOB_NAME_RANDOM } from "../helpers/randoms";
import ENV from "../../../env/env";

const superagent = request.agent();

let response: Response;

describe("Авторизация для должности", () => {
    test(`Logout`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/auth/logout`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.text).toContain('Платформа управления обучением');
    });

    test(`Переход на страницу входа`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/auth/login`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.text).toContain('Платформа управления обучением');
    });

    test(`Ввод реквизитов УЗ`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/auth/expired`)
                .set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                .send(`identity=${ENV.ADMIN_MAIL}&password=${ENV.MASTER_PASSWORD}&is_two_f_auth=&is_auth_by_id=0&ci_csrf_token=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toEqual("Вход выполнен");
    });

    test(`Проверка авторизации`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/wiki`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.text).toContain("Википедия");
    });
});

describe("Создание должности", () => {
    beforeAll(async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/auth/expired`)
                .set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                .send(`identity=${ENV.ADMIN_MAIL}&password=${ENV.MASTER_PASSWORD}&is_two_f_auth=&is_auth_by_id=0&ci_csrf_token=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Добавление должности`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addPosition`)
                .set({
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Connection': 'keep-alive',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Cache-Control': 'no-cache'
                })
                .send(`name=${JOB_NAME_RANDOM}&ci_csrf_token=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toEqual(`Должность ${JOB_NAME_RANDOM} добавлена`);
    });

    test(`Проверка созданной должности через поиск`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
                .set({
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same - origin',
                    'Sec-Fetch-User': '?1',
                    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'x-requested-with': 'XMLHttpRequest'
                })
                .send(`ci_csrf_token=&ajax=1&filter%5Bsearch%5D=${JOB_NAME_RANDOM}`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.text).toContain(JOB_NAME_RANDOM);
    });

    test(`Проверка созданной должности`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/positions`)
                .set({
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Connection': 'keep-alive',
                    'Cache-Control': 'max-age=0',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
        const $ = cheerio.load(response.text);
        JOB_ID = $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${JOB_NAME_RANDOM}"]`).attr('data-id');
        JOB_NAME = $(`#allUsers #allPositionsBody tr td .settings-row .show-edit-position-modal[data-name="${JOB_NAME_RANDOM}"]`).attr('data-name');

        expect(response.status).toBe(200);
        expect(response.text).toContain(JOB_NAME_RANDOM);
    });

    test(`Редактирование должности`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editPosition`)
                .set({
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty',
                    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                })
                .send(`name=${EDITED_JOB_NAME_RANDOM}&id_position=${JOB_ID}&old_name_position=${EDITED_JOB_NAME_RANDOM}&ci_csrf_token=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toBe(`Должность ${EDITED_JOB_NAME_RANDOM} отредактирована`);
    });

});

export { JOB_NAME };
