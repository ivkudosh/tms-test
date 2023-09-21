import { expect } from "@jest/globals";
import request, { Response } from "superagent";
import ENV from "../../../env/env";
import { AuthorizationAPI } from "../restAPI/authorizationAPI";
import { GroupsAPI } from "../restAPI/groupsAPI";

const superagent = request.agent();

const authorizationAPI = new AuthorizationAPI(superagent);
const groupsAPI = new GroupsAPI(superagent);

describe("Группы", () => {
    let globalGroupCreationResponse: Response;

    beforeAll(async () => {
        try {
            await authorizationAPI.enterCredentialsRequest(ENV.ADMIN_MAIL, ENV.MASTER_PASSWORD);
        } catch (error: any) {
            throw new Error(error.message);
        }
    });

    test(`Создание глобальной группы`, async () => {
        globalGroupCreationResponse = await groupsAPI.createGlobalGroupRequest('testik', '100655', '16715');

        expect(globalGroupCreationResponse.status).toBe(200);
    });
});