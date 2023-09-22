import ENV from "../../../env/env";
import { requestHeader } from "../helpers/constants";
import { BaseAPI } from "./baseAPI";

export class UserAPI extends BaseAPI {

    createUserManagerRequest = (userName: string, userSecondName: string, orgstructureId: string, jobName: string, isTeacher: 0 | 1, isExpert: 0 | 1, dateTakeOnWork: string, dateBirthday: string, role: string, email: string, password: string, sendPassword: 1 | 0, userParentId?: string, cityName?: string, attribute?: string ) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/addWorker`)
            .set({'Accept':'application/json, text/javascript, */*; q=0.01',
            'Accept-Language':'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
            'Connection':'keep-alive',
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With':'XMLHttpRequest'})
            .send({
                ci_csrf_token: '',
                first_name: userName,
                second_name: userSecondName,
                midle_name: '',
                org_structure_level_id: orgstructureId,
                position: jobName,
                is_forced_teacher: isTeacher,
                is_expert: isExpert,
                date_take_on_work: dateTakeOnWork,
                date_birthday: dateBirthday,
                city_name: cityName,
                region_name: '',
                project_name: '',
                law_face: '',
                attribute: attribute,
                role: role,
                email: email,
                password: password,
                password2: password,
                send_password: sendPassword,
                generate_person_id: 1,
                parent_id: userParentId
            });
        } catch (error: any) {
            console.error('Something went wrong in createUserManagerRequest');
            throw new Error(error.message);
        }
    };

    getUserManagerRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure`);
        } catch (error: any) {
            console.error('Something went wrong in getUserManagerRequest');
            throw new Error(error.message);
        }
    };

    getUserManagerWithSearchRequest = (userMail: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/index`)
            .set(requestHeader)
            .send(`ci_csrf_token=&is_export=0&ajax=1&filter%5Bsearch%5D=${userMail}`);
        } catch (error: any) {
            console.error('Something went wrong in getUserManagerWithSearchRequest');
            throw new Error(error.message);
        }
    };

    editUserManagerRequest = (userId: string, userName: string, userSecondName: string, orgstructureId: string, jobName: string, isTeacher: 0 | 1, isExpert: 0 | 1, dateTakeOnWork: string, dateBirthday: string, role: string, email: string, password: string, sendPassword: 1 | 0, isActive?: 1 | 0, cityName?: string, attribute?: string ) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/editWorker`)
                .set(requestHeader)
                .send(`user_id=${userId}&first_name=${userName}&last_name=${userSecondName}&org_structure_level_id=${orgstructureId}&position=${jobName}&is_forced_teacher=${isTeacher}&is_expert=${isExpert}&date_take_on_work=${dateTakeOnWork}&date_birthday=${dateBirthday}&city_name=${cityName}&attribute=${attribute}&role=${role}&active=${isActive}&email=${email}&is_new_psw=1&password=${password}&password2=${password}&is_send_new_psw=${sendPassword}&ci_csrf_token=`);
        } catch (error: any) {
            console.error('Something went wrong in editUserManagerRequest');
            throw new Error(error.message);
        }
    };

    getUserManagerModalRequest = (userId: string) => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/getEditWorkerModal/${userId}?csrf_token=`)
                .set(requestHeader);
        } catch (error: any) {
            console.error('Something went wrong in getUserManagerModalRequest');
            throw new Error(error.message);
        }
    };

    getUserManagerPersonIdFromAdminModalRequest = () => {
        try {
            return this.superagent.get(`${ENV.BASE_URL}/admin/kpi/structure/getEditWorkerModal/1?ci_csrf_token=`)
                .set(requestHeader);
        } catch (error: any) {
            console.error('Something went wrong in getUserManagerPersonIdFromAdminModalRequest');
            throw new Error(error.message);
        }
    };

    deleteUserManagerRequest = (userId: string) => {
        try {
            return this.superagent.post(`${ENV.BASE_URL}/admin/kpi/structure/studentsAction`)
                .set(requestHeader)
                .send(`ci_csrf_token=&action=delete&specialities%5B%5D=&students%5B%5D=${userId}`);
        } catch (error: any) {
            console.error('Something went wrong in deleteUserManagerRequest');
            throw new Error(error.message);
        }
    };
}
