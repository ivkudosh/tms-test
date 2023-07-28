import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../environment/env";
import { faker } from "@faker-js/faker";
import * as cheerio from 'cheerio';

const superagent = request.agent();

let response: Response;
let ORG_ID: string;

const ORG_NAME_RANDOM: string = faker.company.buzzVerb();
const EDITED_ORG_NAME_RANDOM: string = faker.company.buzzNoun();

describe("Авторизация", () => {
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
    });
});

describe("Создание оргструктуры", () => {
    beforeAll(async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/auth/expired`)
                .set('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8')
                .send(`identity=${ENV.ADMIN_MAIL}&password=${ENV.MASTER_PASSWORD}&is_two_f_auth=&is_auth_by_id=0&ci_csrf_token=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Добавление орг единицы`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addOrgStructure`)
                .set({
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Connection': 'keep-alive',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'Pragma': 'no-cache',
                    'Cache-Control': 'no-cache'
                })
                .send(`ci_csrf_token=&name=${ORG_NAME_RANDOM}&org_structure_level_id=&manager_id=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toEqual(`Элемент оргструктуры ${ORG_NAME_RANDOM} успешно добавлен`);
    });

    test(`Проверка созданной оргструктуры`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/orgStructure`)
                .set({
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                    'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'max-age=0',
                    'Connection': 'keep-alive',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same - origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'sec-ch-ua': '"Google Chrome"; v = "111", "Not(A:Brand"; v = "8", "Chromium"; v = "111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
        const $ = cheerio.load(response.text);
        ORG_ID = $(`.panel.${ORG_NAME_RANDOM}.first-level.panel-hide-or-show .panel-heading .panel-title.row a small`).text().replace(/\/\s*id:\s*/, "");
        expect(response.status).toBe(200);
        expect(response.text).toContain(ORG_NAME_RANDOM);
    });

    test(`Редактирование оргструктуры`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editOrgStructureElement`)
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
                .send(`level_id=${ORG_ID}&ci_csrf_token=&name=${EDITED_ORG_NAME_RANDOM}&id=${ORG_ID}&org_structure_level_id=&manager_id=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toBe(`Элемент оргструктуры ${EDITED_ORG_NAME_RANDOM} успешно отредактирован`);
    });
});
