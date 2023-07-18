import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../environment/env";
import { faker } from "@faker-js/faker";

const superagent = request.agent();

let response: Response;

const randomNameOrg = faker.company.buzzNoun();

describe("Авторизация", () => {
    test(`Переход на страницу входа c методом GET`, async () => {
        try {
            response = await superagent.get(`${ENV.BASE_URL}/auth/login`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(response.text).toContain('Платформа управления обучением');
    });

    test(`Ввод реквизитов УЗ c методом POST`, async () => {
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

    test(`Проверка авторизации c методом GET`, async () => {
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

    test(`Добавление орг единицы с методом POST`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addOrgStructure`)
                .set({
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0',
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
                .send(`ci_csrf_token=&name=${randomNameOrg}&org_structure_level_id=&manager_id=`);
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        expect(JSON.parse(response.text).success).toEqual(`Элемент оргструктуры ${randomNameOrg} успешно добавлен`);
    });
});
