import { expect } from "@jest/globals";
import request from "superagent";
import ENV from "../../../env/env";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);

describe("Авторизация", () => {
    test(`Переход на страницу входа`, async () => {
        const gotoAuthorizationPageResponse = await authorizationAPI.gotoAuthorizationPageRequest();

        expect(gotoAuthorizationPageResponse.status).toBe(200);
        expect(gotoAuthorizationPageResponse.text).toContain('Платформа управления обучением');
    });

    test(`Авторизация под администратором`, async () => {
        const enterCredentialsResponse = await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);

        expect(enterCredentialsResponse.status).toBe(200);
        expect(JSON.parse(enterCredentialsResponse.text).success).toBe("Вход выполнен");
    });

    test(`Проверка авторизации администратора`, async () => {
        await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        const checkAuthorizationResponse = await authorizationAPI.checkAuthorizationRequest();

        expect(checkAuthorizationResponse.status).toBe(200);
        expect(checkAuthorizationResponse.text).toContain("Википедия");
    });

    test(`Проверка выхода из учетной записи`, async () => {
        await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        const logoutAuthorizationResponse = await authorizationAPI.logoutAuthorizationRequest();

        expect(logoutAuthorizationResponse.status).toBe(200);
        expect(logoutAuthorizationResponse.text).toContain('Платформа управления обучением');
    });

    afterEach(async () => {
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
