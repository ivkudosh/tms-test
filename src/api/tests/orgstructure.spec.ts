import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import { getOrgstructureIdFromResponse } from "../helpers/utils";
import ENV from "../../../env/env";
import { OrgstructureAPI } from "../restAPI/orgstructureAPI";
import { generateOrgstructureName } from "../helpers/randoms";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const orgstructureAPI = new OrgstructureAPI(superagent);

describe("Оргструктура", () => {
    let orgstructureCreationResponse: Response;
    let orgstructureId: string;

    const orgstructureRandomName: string = generateOrgstructureName();

    beforeAll( async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
            orgstructureCreationResponse = await orgstructureAPI.createOrgstructureRequest(orgstructureRandomName);
            const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();
            orgstructureId = getOrgstructureIdFromResponse(orgstructureResponse, orgstructureRandomName);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание оргструктуры`, async () => {
        expect(orgstructureCreationResponse.status).toBe(200);
        expect(JSON.parse(orgstructureCreationResponse.text).success).toEqual(`Элемент оргструктуры ${orgstructureRandomName} успешно добавлен`);
    });

    test(`Проверка получения оргструктуры`, async () => {
        const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();

        expect(orgstructureResponse.status).toBe(200);
        expect(orgstructureResponse.text).toContain(orgstructureRandomName);
    });

    test(`Редактирование оргструктуры`, async () => {
        const editedOrgstructureRandomName = generateOrgstructureName();

        const editOrgstructureResponse = await orgstructureAPI.editOrgstructureNameRequest(orgstructureId, editedOrgstructureRandomName);

        expect(editOrgstructureResponse.status).toBe(200);
        expect(JSON.parse(editOrgstructureResponse.text).success).toBe(`Элемент оргструктуры ${editedOrgstructureRandomName} успешно отредактирован`);
    });

    test(`Удаление оргструктуры`, async () => {
        const deletedOrgstructureRandomName = generateOrgstructureName();

        await orgstructureAPI.createOrgstructureRequest(deletedOrgstructureRandomName);
        const orgstructureResponse = await orgstructureAPI.getOrgstructureRequest();
        const orgstructureIdForDelete = getOrgstructureIdFromResponse(orgstructureResponse, deletedOrgstructureRandomName);

        const deleteOrgstructureResponse = await orgstructureAPI.deleteOrgstructureRequest(orgstructureIdForDelete);

        expect(deleteOrgstructureResponse.status).toBe(200);
        expect(JSON.parse(deleteOrgstructureResponse.text).status).toBe('success');
    });

    afterAll(async () => {
        await orgstructureAPI.deleteOrgstructureRequest(orgstructureId);
        await authorizationAPI.logoutAuthorizationRequest();
    });
});
