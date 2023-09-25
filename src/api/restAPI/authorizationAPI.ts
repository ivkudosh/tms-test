import ENV from "../../../env/env";
import { BaseAPI } from "./baseAPI";

export class AuthorizationAPI extends BaseAPI {
    gotoAuthorizationPageRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/auth/login`);
        } catch (error: any) {
            console.error('Something went wrong in goToLoginPage');
            throw new Error(error.message);
        }
    };

    enterCredentialsRequest = (mail: string, password: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/auth/expired`)
                .send(`identity=${mail}&password=${password}&is_two_f_auth=&is_auth_by_id=0&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in enterCredentialsRequest');
            throw new Error(error.message);
        }
    };

    checkAuthorizationRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/wiki`);
        } catch (error: any) {
            console.error('Something went wrong in checkAuthorizationPageRequest');
            throw new Error(error.message);
        }
    };

    logoutAuthorizationRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/auth/logout`);
        } catch (error: any) {
            console.error('Something went wrong in logoutAuthorizationRequest');
            throw new Error(error.message);
        }
    };
}
