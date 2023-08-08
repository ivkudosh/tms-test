import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../environment/env";
import { faker } from "@faker-js/faker";
import * as cheerio from 'cheerio';
import { ORG_ID } from "./orgstructure.spec";
import { JOB_NAME } from "./jobs.spec";
import { genPassword } from "../helpers/generatePassword";
import { USER_NAME_RANDOM, USER_SECOND_NAME_RANDOM, DATE_RANDOM, USER_EMAIL_RANDOM, USER_PASSWORD_RANDOM } from "../helpers/randoms";

const superagent = request.agent();

let response: Response;

describe("Авторизация для сотрудника (руководитель)", () => {
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

describe("Создание руководителя", () => {
    test(`Создание пользователя`, async () => {
        try {
            response = await superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addWorker`)
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
                    'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"'
                })
                .send({
                    first_name: USER_NAME_RANDOM,
                    second_name: USER_SECOND_NAME_RANDOM,
                    org_structure_level_id: ORG_ID,
                    position: JOB_NAME,
                    is_forced_teacher: 1,
                    is_expert: 1,
                    date_take_on_work: DATE_RANDOM,
                    date_birthday: DATE_RANDOM,
                    role: '%D0%A1%D0%BE%D1%82%D1%80%D1%83%D0%B4%D0%BD%D0%B8%D0%BA',
                    email: USER_EMAIL_RANDOM,
                    password: USER_PASSWORD_RANDOM,
                    password2: USER_PASSWORD_RANDOM,
                    send_password: 1,
                    generate_person_id: 1
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
        expect(response.status).toBe(200);
        console.log(JSON.parse(response.text));
    });
});
